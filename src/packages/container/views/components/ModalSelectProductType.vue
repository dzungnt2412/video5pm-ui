<template>
  <md-dialog
    :md-active="visible"
    @md-closed="handleClose"
    @md-clicked-outside="handleClose"
  >
    <md-dialog-title>Choose product types</md-dialog-title>
    <div class="md-layout change-design-modal">
      <div class="md-layout-item md-size-100">
        <md-field>
          <label>Search by title</label>
          <md-input :value="query" @input="onQueryChange"></md-input>
        </md-field>
      </div>
      <div class="md-layout-item md-size-100">
        <div class="md-scrollbar">
          <md-list class="md-triple-line">
            <md-list-item v-for="(item, i) in validProducts" :key="i">
              <div class="md-list-item-text">
                <span>{{ item.name }}</span>
              </div>

              <md-button
                class="md-list-action"
                @click="handleSelectProductType(item)"
                :disabled="loading"
              >
                Select
              </md-button>
            </md-list-item>
          </md-list>
        </div>
      </div>
    </div>
  </md-dialog>
</template>

<script>
import debounce from 'lodash/debounce'

export default {
  name: 'ModalSelectProductType',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    products: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    validProducts() {
      return this.query
        ? this.products.filter(
            ({ name }) =>
              name.toLowerCase().indexOf(this.query.toLowerCase()) !== -1
          )
        : this.products
    },
  },
  data() {
    return {
      isFetching: false,
      query: '',
      items: [],
      currentPage: 1,
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false)
    },

    handleSelectProductType(item) {
      this.$emit('selected', item)
    },

    onQueryChange: debounce(function(val) {
      this.query = val
    }, 500),
  },
}
</script>
<style lang="scss" scoped>
.md-scrollbar {
  max-height: 300px;
  overflow: auto;
}
</style>
