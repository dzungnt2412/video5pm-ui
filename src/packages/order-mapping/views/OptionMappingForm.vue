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
        <router-link :to="{ name: 'option-mapping-list' }">
          Option mapping rules
        </router-link>
      </p-button>
      <h1 class="page-title">{{ pageTitle }}</h1>
    </div>
    <div class="page-content container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-block">
              <div class="row">
                <div class="col-12">
                  <div class="d-flex">
                    <h5 class="white-space-nowrap mr-15">Lionnix Product</h5>
                    <div class="form-group mb-0">
                      <p-select
                        :class="[
                          { 'is-invalid': errors.has('product_type_id') },
                        ]"
                        v-model="form.product_type_id"
                        @input="onProductTypeChange"
                        placeholder="Select product"
                        v-validate="'required'"
                        name="product_type_id"
                      >
                        <option
                          v-for="product in products"
                          :value="product.id"
                          :key="product.id"
                        >
                          {{ product.name }}
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
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <h4>Lionnix</h4>
                </div>
                <div class="col-6">
                  <h4>Shop</h4>
                </div>
              </div>
              <div
                class="row mb-15"
                v-for="(rule, ruleIndex) in form.rules"
                :key="ruleIndex"
              >
                <!-- map option -->
                <div class="col-6">
                  <div class="form-group flex-fill">
                    <label>Option</label>
                    <p-select
                      :class="[
                        {
                          'is-invalid': errors.has(
                            `option_set_target-${ruleIndex}`
                          ),
                        },
                      ]"
                      :value="rule.option_set.target_value"
                      @input="
                        (value) => onOptionSetTargetValueChange(rule, value)
                      "
                      placeholder="Select option set"
                      v-validate="'required'"
                      :name="`option_set_target-${ruleIndex}`"
                    >
                      <option
                        v-for="(optionSet, index) in optionSets"
                        :value="optionSet.id"
                        :key="index"
                      >
                        {{ optionSet.name }}
                      </option>
                    </p-select>
                    <div
                      class="invalid-feedback"
                      v-if="errors.has(`option_set_target-${ruleIndex}`)"
                    >
                      Please choose Lionnix option
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="d-flex ml--10 mt--10">
                    <div class="form-group flex-fill pl-10 pt-10">
                      <label>Option values</label>
                      <input
                        placeholder="Option values, separated by commas"
                        :class="[
                          {
                            'is-invalid': errors.has(
                              `option_conditions-${ruleIndex}`
                            ),
                          },
                        ]"
                        type="text"
                        @input="
                          (event) =>
                            onRuleOptionConditionsChange(
                              rule,
                              event.target.value
                            )
                        "
                        :value="rule.option.conditions"
                        class="flex-fill form-control"
                        v-validate="'required'"
                        :name="`option_conditions-${ruleIndex}`"
                      />
                      <div
                        class="invalid-feedback"
                        v-if="errors.has(`option_conditions-${ruleIndex}`)"
                      >
                        Please enter option values, separated by commas
                      </div>
                    </div>
                  </div>
                </div>
                <!-- end map option -->

                <!-- map option values -->
                <div class="col-6">
                  <div
                    class="form-group mb-2"
                    v-if="
                      getOptionsWithOptionSetId(rule.option_set.target_value)
                        .length > 0
                    "
                  >
                    <label>
                      Values
                    </label>
                    <div
                      class="mb-10"
                      v-for="(option, index) in getOptionsWithOptionSetId(
                        rule.option_set.target_value
                      )"
                      :key="index"
                    >
                      <p-select
                        :class="[
                          {
                            'is-invalid': errors.has(
                              `option_target-${ruleIndex}-${index}`
                            ),
                          },
                        ]"
                        @input="
                          (val) =>
                            setOptionTargetValueByIndex(ruleIndex, index, val)
                        "
                        :value="getOptionTargetValueByIndex(ruleIndex, index)"
                        placeholder="Select option value"
                        v-validate="'required'"
                        :name="`option_target-${ruleIndex}-${index}`"
                      >
                        <option
                          v-for="(option, index) in getOptionsWithOptionSetId(
                            rule.option_set.target_value
                          )"
                          :key="index"
                          :value="option.id"
                        >
                          {{ option.value }}
                        </option>
                      </p-select>
                      <div
                        class="invalid-feedback"
                        v-if="errors.has(`option_target-${ruleIndex}-${index}`)"
                      >
                        Please choose a option value
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <div
                    class="form-group mb-0"
                    v-if="rule.option.values.length > 0"
                  >
                    <label>
                      Values
                    </label>
                    <div
                      class="mb-10"
                      v-for="(value, index) in rule.option.values"
                      :key="index"
                    >
                      <p-select
                        :class="[
                          {
                            'is-invalid': errors.has(
                              `option_value-${ruleIndex}-${index}`
                            ),
                          },
                        ]"
                        @input="
                          (val) => setOptionValueByIndex(ruleIndex, index, val)
                        "
                        :value="getOptionValueByIndex(ruleIndex, index)"
                        placeholder="Select option value"
                        v-validate="'required'"
                        :name="`option_value-${ruleIndex}-${index}`"
                      >
                        <option
                          v-for="(v, index) in rule.option.values"
                          :key="index"
                          :value="v"
                        >
                          {{ v }}
                        </option>
                      </p-select>
                      <div
                        class="invalid-feedback"
                        v-if="errors.has(`option_value-${ruleIndex}-${index}`)"
                      >
                        Please choose a option value
                      </div>
                    </div>
                  </div>
                </div>
                <!-- end map option values -->
                <div class="col-12">
                  <div class="d-flex justify-content-end">
                    <a
                      href="#"
                      class="btn-delete-option"
                      @click="deleteOption(ruleIndex)"
                    >
                      Delete option
                    </a>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12" @click="addNewOption">
                  <p-button type="default">Add new option</p-button>
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
              v-if="optionMappingState.id"
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
import { cloneDeep, isObjectDiff } from '@core/utils'
import { types } from '../constant'
export default {
  name: 'OptionMappingForm',
  data() {
    return {
      mode: 'new',
      form: {
        product_type_id: null,
        /**
         * [{
            option_set: {
              condition: '',
              target_value: null,
            },
            option: {
              conditions: '',
              values: [],
              target_values: [],
            },
          }],
         */
        rules: [],
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
      optionMappingState: (state) => state.orderMapping,
      products: (state) => state.productTypes,
      options: (state) => state.options,
      optionSets: (state) => state.optionSets,
    }),
    pageTitle() {
      return this.mode === 'new'
        ? 'Create option mapping rule'
        : 'Update option mapping rule'
    },
    getOptionsWithOptionSetId() {
      return (id) => {
        return this.options.filter((option) => option.option_set_id === id)
      }
    },
    getOptionValueByIndex() {
      return (ruleIndex, index) => {
        const rule = this.form.rules[ruleIndex]
        if (!rule) {
          return null
        }
        const value = rule.option.values[index]
        if (!value) {
          return null
        }
        return value
      }
    },
    getOptionTargetValueByIndex() {
      return (ruleIndex, index) => {
        const rule = this.form.rules[ruleIndex]
        if (!rule) {
          return null
        }
        const targetValue = rule.option.target_values[index]
        if (!targetValue) {
          return null
        }
        return targetValue
      }
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
      fetchOptionsByProductId: 'fetchOptionsByProductId',
    }),
    addNewOption() {
      const rules = this.form.rules
      rules.push({
        option_set: {
          condition: '',
          target_value: null,
        },
        option: {
          conditions: '',
          values: [],
          target_values: [],
        },
      })
    },
    deleteOption(index) {
      this.form.rules.splice(index, 1)
    },
    onOptionSetTargetValueChange(rule, val) {
      rule.option_set.target_value = val
      const options = this.getOptionsWithOptionSetId(val)
      rule.option.target_values = options.map((option) => option.id)
    },
    onRuleOptionConditionsChange(rule, val) {
      rule.option.conditions = val

      const newConditionsArr = val
        .split(',')
        .filter((condition) => condition.trim() !== '')

      rule.option.values.forEach((value, index) => {
        if (newConditionsArr[index]) {
          rule.option.values[index] = newConditionsArr[index]
        }
      })
      if (newConditionsArr.length > rule.option.values.length) {
        newConditionsArr
          .slice(rule.option.values.length)
          .forEach((condition) => {
            rule.option.values.push(condition)
          })
      } else if (newConditionsArr.length < rule.option.values.length) {
        rule.option.values = rule.option.values.slice(
          0,
          newConditionsArr.length
        )
      }
    },
    setOptionValueByIndex(ruleIndex, index, value) {
      const rule = this.form.rules[ruleIndex]
      this.$set(rule.option.values, index, value)
    },
    setOptionTargetValueByIndex(ruleIndex, index, value) {
      const rule = this.form.rules[ruleIndex]
      this.$set(rule.option.target_values, index, value)
    },
    async onProductTypeChange(id) {
      const result = await this.fetchOptionsByProductId(id)
      if (!result.success) {
        this.$toast.open({
          type: 'error',
          message:
            result.message || 'Something went wrong. Please try again later',
        })
      }
    },
    async fetch() {
      this.isFetching = true
      const promises = [this.fetchProductTypes()]
      if (this.$route.params.id && this.$route.params.id !== 'new') {
        this.mode = 'edit'
        promises.push(
          this.fetchOrderMapping({
            type: types.option,
            id: +this.$route.params.id,
          })
        )
      }
      const [, res2] = await Promise.all(promises)
      if (res2 && res2.success) {
        await this.transformStateToLocalForm(this.optionMappingState)
      }
      this.initialForm = cloneDeep(this.form)
      this.isFetching = false
    },
    async transformStateToLocalForm(data) {
      this.form.product_type_id = data.product_type_id
      const result = await this.fetchOptionsByProductId(data.product_type_id)
      if (!result.success) {
        this.$toast.open({
          type: 'error',
          message:
            result.message || 'Something went wrong. Please try again later',
        })
        return
      }

      // find all option_set rules
      const optionSetRules = data.rules.filter(
        (rule) => rule.column === 'option_set'
      )
      this.form.rules = optionSetRules.map((optionSetRule) => {
        const formRule = {
          option_set: {
            condition: optionSetRule.condition,
            target_value: optionSetRule.target_value
              ? parseInt(optionSetRule.target_value)
              : null,
          },
          option: {
            conditions: '',
            values: [],
            target_values: [],
          },
        }

        if (optionSetRule.target_value) {
          //now find all option rules attach to this option set rules
          const optionIds = this.getOptionsWithOptionSetId(
            parseInt(optionSetRule.target_value)
          ).map((option) => option.id)

          const optionRules = data.rules.filter(
            (rule) =>
              rule.column === 'option' &&
              rule.target_value &&
              optionIds.indexOf(parseInt(rule.target_value)) > -1
          )

          formRule.option.values = optionRules.map(
            (optionRule) => optionRule.condition
          )
          formRule.option.target_values = optionRules.map((optionRule) =>
            optionRule.target_value ? parseInt(optionRule.target_value) : null
          )
          formRule.option.conditions = formRule.option.values.join(',')
        }

        return formRule
      })
    },
    tranformLocalFormToPayload() {
      const payload = {
        product_type_id: this.form.product_type_id,
        rules: [],
        type: types.option,
        disjunctive: false,
      }
      if (this.mode !== 'new') {
        payload.id = this.optionMappingState.id
      }
      this.form.rules.map((rule) => {
        // option set
        payload.rules.push({
          column: 'option_set',
          relation: 'equal',
          condition: rule.option_set.condition,
          target_value: String(rule.option_set.target_value),
        })
        // option
        rule.option.values.map((value, index) => {
          payload.rules.push({
            column: 'option',
            relation: 'equal',
            condition: value,
            target_value: String(rule.option.target_values[index]),
          })
        })
      })

      return payload
    },
    discard() {
      this.form = cloneDeep(this.initialForm)
    },
    showConfirmDelete() {
      this.$dialog.confirm({
        title: `Delete option mapping?`,
        message: `Are you sure you want to delete this option mapping?`,
        confirmText: 'Delete',
        onConfirm: () => this.delete(),
        type: 'danger',
      })
    },
    async save() {
      const isValid = await this.$validator.validateAll()
      if (!isValid) return
      this.isSaving = true
      if (this.mode === 'new') {
        await this.create()
      } else {
        await this.update()
      }
      this.isSaving = false
    },
    async create() {
      const payload = this.tranformLocalFormToPayload()
      const response = await this.createOrUpdateOrderMapping({
        type: types.option,
        payload,
      })
      if (response.success) {
        this.$toast.open({
          type: 'success',
          message: 'Your option mapping was created',
        })
        this.$router.push({
          name: 'option-mapping-update',
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
      const payload = this.tranformLocalFormToPayload()
      const response = await this.createOrUpdateOrderMapping({
        type: types.option,
        payload,
      })
      if (response.success) {
        this.$toast.open({
          type: 'success',
          message: 'Your option mapping was updated',
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
        type: types.option,
        id: this.optionMappingState.id,
      })
      if (response.success) {
        this.$toast.open({
          type: 'success',
          message: 'Your option mapping was deleted',
        })
        this.$router.push({
          name: 'option-mapping-list',
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
