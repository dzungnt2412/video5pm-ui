<template>
  <div class="row">
    <div class="col-11">
      <div class="row">
        <div class="col-6 col-sm-4 mt-2 d-flex pr-2">
          <p-select v-model="internalValue.column">
            <option
              v-for="column in conditionColumns"
              :key="column.value"
              :value="column.value"
            >
              {{ column.text }}
            </option>
          </p-select>
        </div>
        <div class="col-6 col-sm-4 mt-2 d-flex px-2">
          <p-select v-model="internalValue.relation" class="flex-fill">
            <option
              :value="relation.value"
              v-for="relation in relations"
              :key="relation.value"
            >
              {{ relation.text }}
            </option>
          </p-select>
        </div>

        <div
          class="col-12 col-sm-4 mt-2 mb-0 px-2 form-group"
          v-if="selectedProperty"
        >
          <input
            :class="[{ 'is-invalid': errors.has('condition') }]"
            type="text"
            v-model="internalValue.condition"
            v-validate="'required'"
            name="condition"
            class="flex-fill form-control"
          />
          <div class="invalid-feedback" v-if="errors.has('condition')">
            Field is required
          </div>
        </div>
      </div>
    </div>
    <div class="col-1 mt-2 pl-2">
      <p-button
        type="default"
        icon="close"
        @click.prevent="handleRemove"
        v-if="!disableRemove"
      >
      </p-button>
    </div>
  </div>
</template>

<script>
import { cloneDeep } from '@core/utils'
import {
  conditionColumns,
  productConditionRelations,
  quantityConditionRelations,
  types,
} from '../../constant'
export default {
  name: 'ConditionItem',
  props: {
    type: {
      type: String,
      default: types.product_type,
    },
    condition: {
      type: Object,
      default: () => {
        return {
          column: 'tag',
          relation: 'equals',
          condition: '',
        }
      },
    },
    disableRemove: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    conditionColumns() {
      return conditionColumns
    },

    relations() {
      return this.type === types.quantity
        ? quantityConditionRelations
        : productConditionRelations
    },

    selectedProperty() {
      return this.conditionColumns.find(
        ({ value }) => value === this.internalValue.column
      )
    },
  },
  data() {
    return {
      internalValue: {},
    }
  },
  created() {
    this.internalValue = cloneDeep(this.condition)
  },
  methods: {
    handleRemove() {
      this.$emit('remove', this.value)
    },
  },
  watch: {
    condition: {
      handler: function(val) {
        this.internalValue = cloneDeep(val)
      },
      deep: true,
    },
    internalValue: {
      handler: function(val) {
        if (
          JSON.stringify(this.internalValue) != JSON.stringify(this.condition)
        ) {
          this.$emit('input', val)
        }
      },
      deep: true,
    },
  },
}
</script>
