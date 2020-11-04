import { cloneDeep } from '@core/utils'

export default {
  computed: {
    totalSelected() {
      return this.action && this.action.selected
        ? this.action.selected.length
        : 0
    },
    paginationLabel() {
      const page = this.filter.page ? this.filter.page : 0
      const from = (page - 1) * this.filter.limit || 1
      const totalPage = Math.ceil(this.count / this.filter.limit)

      if (totalPage < this.filter.page || !from) {
        return ''
      }

      let to =
        this.count >= this.filter.limit ? page * this.filter.limit : this.count

      if (to > this.count) {
        to = this.count
      }

      return to > from
        ? `Hiển thị ${from}-${to} trong tổng ${this.count} kết quả`
        : ''
    },
    selectedIds() {
      return this.action && this.action.selected && this.action.selected.length
        ? this.action.selected.map(({ id }) => id)
        : []
    },
    items() {
      return []
    },
    isAllChecked() {
      return (
        this.action.selected &&
        this.items.length === this.action.selected.length &&
        this.totalSelected > 0
      )
    },
    isIndeterminate() {
      return this.action.selected
        ? this.action.selected.length > 0 &&
            this.action.selected.length < this.items.length
        : false
    },
    selectionCountText() {
      return `${this.totalSelected} đơn hàng đã được chọn`
    },
  },
  data() {
    return {
      filter: {
        page: 1,
        limit: 20,
        search: '',
      },
      action: {
        current: '',
        selected: [],
        visibleConfirm: false,
      },
      actions: {},
    }
  },
  methods: {
    /**
     * On multiple items selected
     * @param selected
     */
    onMultipleSelect(selected) {
      this.$set(this.action, 'selected', selected)
    },

    handleActionItem() {},

    /**
     * Handle action
     * @param current
     * @param item
     */
    handleAction(current, item = {}) {
      this.action.current = current
      this.action.item = item

      if (
        this.actions &&
        this.actions[current] &&
        this.actions[current].isNeedConfirm
      ) {
        this.$dialog.confirm({
          title: 'Are you sure you want to do this?',
          onConfirm: () => this.handleActionItem(),
        })
        return
      }

      this.handleActionItem()
    },

    handleSearch(e) {
      // Default result after search in page 1
      this.filter.page = 1
      this.$set(this.filter, 'search', e.target.value)
    },

    clearSearch() {
      this.$set(this.filter, 'search', '')
    },
    /**
     * On action confirm
     */
    onActionConfirm() {
      this.handleActionItem()
    },

    /**
     * Toggle select all
     */
    toggleSelectAll() {
      let selected = []

      if (this.isAllChecked) {
        selected = []
      } else {
        selected = cloneDeep(this.items)
      }

      this.$set(this.action, 'selected', selected)
    },
  },
  watch: {
    $route: function() {
      if (this.action.selected) {
        this.$set(this.action, 'selected', [])
      }
    },
  },
}
