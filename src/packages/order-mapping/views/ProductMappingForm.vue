<template>
  <PageDetailLoading v-if="isFetching"></PageDetailLoading>
  <div class="page" v-else>
    <UnsavedBar
      :show="isShowUnsavedBar"
      :showDiscard="true"
      :loading="isSaving"
      @save="save"
      @discard="discard"
      title="Save"
    ></UnsavedBar>
    <div class="page-header">
      <p-button icon="chevron-left" class="btn-pure pl-0 mb-15">
        <router-link :to="{ name: 'product-mapping-list' }">
          Product mapping rules
        </router-link>
      </p-button>
      <h1 class="page-title">{{ pageTitle }}</h1>
    </div>
    <div class="page-content container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-block">
              <div class="d-flex mt-20">
                <span class="mr-15 mt-10">Lionnix product</span>
                <div class="form-group mb-0">
                  <p-select
                    :class="[{ 'is-invalid': errors.has('product_type_id') }]"
                    v-model="form.product_type_id"
                    v-validate="'required'"
                    name="product_type_id"
                    placeholder="Select product"
                    style="width: 250px;"
                  >
                    <option
                      v-for="(item, i) in products"
                      :key="i"
                      :value="item.id"
                    >
                      {{ item.name }}
                    </option>
                  </p-select>
                  <div
                    class="invalid-feedback"
                    v-if="errors.has('product_type_id')"
                  >
                    Product type is required
                  </div>
                </div>
              </div>
              <div class="d-flex mt-15 align-items-center">
                <p class="m-0 mr-30">Must match</p>
                <p-radio
                  class="mr-15"
                  v-model="form.disjunctive"
                  :native-value="true"
                >
                  All conditions
                </p-radio>
                <p-radio v-model="form.disjunctive" :native-value="false">
                  Any condition
                </p-radio>
              </div>
              <div>
                <condition-item
                  v-for="(rule, index) in form.rules"
                  :condition="rule"
                  :key="index"
                  :disable-remove="index === 0"
                  @remove="removeCondition(index)"
                  @input="changeCondition(index, $event)"
                  type="product_type"
                  ref="conditions"
                />
                <div class="row">
                  <div class="col-12 mt-2">
                    <p-button
                      type="default"
                      class="mt-2"
                      @click.prevent="addCondition"
                    >
                      Add new condition
                    </p-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="d-flex justify-content-between">
            <p-button
              type="danger"
              @click="showConfirmDelete"
              @disabled="isDeleting"
              :loading="isDeleting"
              v-if="productMappingState.id"
            >
              Delete
            </p-button>
            <div v-else></div>
            <div class="d-flex">
              <p-button type="default" @click="discard">
                Cancel
              </p-button>
              <p-button
                class="ml-15"
                @click="save"
                :disabled="isSaving"
                :loading="isSaving"
              >
                Save
              </p-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { cloneDeep, isObjectDiff, asyncFilter } from '@core/utils'
import ConditionItem from './components/ConditionItem'
import { types } from '../constant'
export default {
  name: 'ProductMappingForm',
  components: {
    ConditionItem,
  },
  data() {
    return {
      mode: 'new',
      form: {
        disjunctive: true,
        product_type_id: null,
        type: types.product_type,
        rules: [
          {
            column: 'title',
            relation: 'contain',
            condition: '',
          },
        ],
      },
      initialForm: {},
      isShowUnsavedBar: false,
      isFetching: false,
      isSaving: false,
      isDeleting: false,
    }
  },
  computed: {
    ...mapState('orderMapping', {
      productMappingState: (state) => state.orderMapping,
      products: (state) => state.productTypes,
    }),
    pageTitle() {
      return this.mode === 'new'
        ? 'Create product mapping rule'
        : 'Update product mapping rule'
    },
  },
  watch: {
    form: {
      handler(val) {
        this.isShowUnsavedBar = isObjectDiff(val, this.initialForm)
      },
      deep: true,
    },
    initialForm: {
      handler(val) {
        this.isShowUnsavedBar = isObjectDiff(val, this.form)
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions('orderMapping', {
      createOrUpdateOrderMapping: 'createOrUpdateOrderMapping',
      fetchOrderMapping: 'fetchOrderMapping',
      deleteOrderMapping: 'deleteOrderMapping',
      fetchProductTypes: 'fetchProductTypes',
    }),
    removeCondition(index) {
      this.form.rules.splice(index, 1)
    },
    changeCondition(index, event) {
      this.$set(this.form.rules, index, event)
    },
    addCondition() {
      const rules = this.form.rules
      rules.push({
        ...rules[rules.length - 1],
        condition: '',
      })
    },
    async fetch() {
      this.isFetching = true
      const promises = [this.fetchProductTypes()]
      if (this.$route.params.id && this.$route.params.id !== 'new') {
        this.mode = 'edit'
        promises.push(
          this.fetchOrderMapping({
            type: types.product_type,
            id: +this.$route.params.id,
          })
        )
      }
      const [, res2] = await Promise.all(promises)
      if (res2 && res2.success) {
        this.form = cloneDeep(this.productMappingState)
      }
      this.initialForm = cloneDeep(this.form)
      this.isFetching = false
    },
    discard() {
      this.form = cloneDeep(this.initialForm)
    },
    showConfirmDelete() {
      this.$dialog.confirm({
        title: `Delete product mapping?`,
        message: `Are you sure you want to delete this product mapping?`,
        confirmText: 'Delete',
        onConfirm: () => this.delete(),
        type: 'danger',
      })
    },
    async save() {
      const validate = await this.$validator.validateAll()

      let isConditionsValid = true
      if (this.$refs.conditions && this.$refs.conditions.length) {
        const filtered = await asyncFilter(this.$refs.conditions, async (c) => {
          const isValid = await c.$validator.validateAll()
          return isValid
        })
        isConditionsValid = filtered.length === this.$refs.conditions.length
      }
      if (!validate || !isConditionsValid) {
        return
      }

      this.isSaving = true
      if (this.mode === 'new') {
        await this.create()
      } else {
        await this.update()
      }
      this.isSaving = false
    },
    async create() {
      const response = await this.createOrUpdateOrderMapping({
        type: types.product_type,
        payload: cloneDeep(this.form),
      })
      if (response.success) {
        this.$toast.open({
          type: 'success',
          message: 'Your product mapping was created',
        })
        this.$router.push({
          name: 'product-mapping-update',
          params: {
            id: response.id,
          },
        })
      } else {
        this.$toast.open({
          type: 'error',
          message:
            response.message || 'Something went wrong. Please try again later',
        })
      }
    },
    async update() {
      const response = await this.createOrUpdateOrderMapping({
        type: types.product_type,
        payload: cloneDeep(this.form),
      })
      if (response.success) {
        this.$toast.open({
          type: 'success',
          message: 'Your product mapping was updated',
        })
        await this.fetch()
      } else {
        this.$toast.open({
          type: 'error',
          message:
            response.message || 'Something went wrong. Please try again later',
        })
      }
    },
    async delete() {
      this.isDeleting = true
      const response = await this.deleteOrderMapping({
        type: types.product_type,
        id: this.productMappingState.id,
      })
      if (response.success) {
        this.$toast.open({
          type: 'success',
          message: 'Your product mapping was deleted',
        })
        this.$router.push({
          name: 'product-mapping-list',
        })
      } else {
        this.$toast.open({
          type: 'error',
          message:
            response.message || 'Something went wrong. Please try again later',
        })
      }
      this.isDeleting = false
    },
  },
  created() {
    this.fetch()
  },
}
</script>
