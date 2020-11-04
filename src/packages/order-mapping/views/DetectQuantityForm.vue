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
      <h1 class="page-title">Quantity Detection Rules</h1>
    </div>
    <div class="page-content container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-block">
              <div class="card-title">
                <h4>
                  Conditions
                </h4>
              </div>
              <div>
                <condition-item
                  v-for="(rule, index) in form.rules"
                  :condition="rule"
                  :key="index"
                  :disable-remove="index === 0"
                  @remove="removeCondition(index)"
                  @input="changeCondition(index, $event)"
                  ref="conditions"
                  type="quantity"
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
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import { cloneDeep, isObjectDiff, asyncFilter } from '@core/utils'
import ConditionItem from './components/ConditionItem'
import { types } from '../constant'
import { FETCH_ORDER_MAPPINGS } from '../store'
export default {
  name: 'SettingDetectQuantity',
  components: {
    ConditionItem,
  },
  data() {
    return {
      form: {
        disjunctive: true,
        product_type_id: 0,
        type: types.quantity,
        rules: [
          {
            column: 'title',
            relation: 'match',
            condition: '',
          },
        ],
      },
      initialForm: {},
      isShowUnsavedBar: false,
      isFetching: false,
      isSaving: false,
    }
  },
  computed: {
    ...mapState('orderMapping', {
      quantityMappingState: (state) => state.orderMapping,
      quantityMappingListState: (state) => state.orderMappingsList,
    }),
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
      fetchOrderMapping: 'fetchOrderMapping',
      fetchOrderMappingList: 'fetchOrderMappingList',
      createOrUpdateOrderMapping: 'createOrUpdateOrderMapping',
    }),
    ...mapMutations('orderMapping', {
      updateStateOrderMappings: FETCH_ORDER_MAPPINGS,
    }),
    async fetch() {
      this.isFetching = true
      let result = await this.fetchOrderMappingList({
        type: types.quantity,
      })
      if (
        result &&
        result.success &&
        this.quantityMappingListState.length > 0
      ) {
        result = await this.fetchOrderMapping({
          type: types.quantity,
          id: this.quantityMappingListState[0].id,
        })
        if (result && result.success) {
          this.form = cloneDeep(this.quantityMappingState)
        }
      }
      this.initialForm = cloneDeep(this.form)
      this.isFetching = false
    },
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
    discard() {
      this.form = cloneDeep(this.initialForm)
    },
    async save() {
      if (this.$refs.conditions && this.$refs.conditions.length) {
        const filtered = await asyncFilter(this.$refs.conditions, async (c) => {
          const isValid = await c.$validator.validateAll()
          return isValid
        })
        const isConditionsValid =
          filtered.length === this.$refs.conditions.length
        if (!isConditionsValid) {
          return
        }
      }
      this.isSaving = true
      const result = await this.createOrUpdateOrderMapping({
        type: types.quantity,
        payload: cloneDeep(this.form),
      })

      if (result && result.success) {
        this.$toast.open({
          type: 'success',
          message: 'Saved successfully',
        })
        await this.fetch()
      } else {
        this.$toast.open({
          type: 'error',
          message:
            result.message || 'Something went wrong. Please try again later',
        })
      }
      this.isSaving = false
    },
  },
  beforeRouteLeave(to, from, next) {
    this.updateStateOrderMappings([])
    next()
  },
  created() {
    this.fetch()
  },
}
</script>
