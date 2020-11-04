<template>
  <p-modal
    :class="'ticket-filter'"
    :size="'md'"
    :active.sync="isShow"
    @close="handleClose"
    :title="'Bộ lọc nâng cao'"
  >
    <div class="form-group row">
      <label class="col-sm-3">Ngày: </label>
      <div class="col-sm-9">
        <p-datepicker
          :format="'dd/mm/yyyy'"
          @update="selectDate"
          v-model="filter.start_date"
        ></p-datepicker>
      </div>
    </div>
    <div class="form-group row">
      <label class="col-sm-3">Danh mục:</label>
      <div class="col-sm-9">
        <select class="form-control" v-model="filter.category">
          <option value="" disabled>-- Chọn danh mục --</option>
          <option
            v-for="(item, index) in categories"
            :key="index"
            :value="item"
            >{{ item }}</option
          >
        </select>
      </div>
    </div>
    <template slot="footer">
      <p-button type="default" @click="handleClose">
        <span>Đóng</span>
      </p-button>
      <p-button type="primary" @click="handleFilter">
        <span>Lọc</span>
      </p-button>
    </template>
  </p-modal>
</template>

<script>
import { date } from '@core/utils/datetime'

export default {
  name: 'ModalTicketFilter',
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
    src: {
      type: String,
      default: '',
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isShow: this.visible,
      cb_accountant: [],
      filter: {
        category: '',
        start_date: '',
        end_date: '',
        seller: 0,
        support: 0,
        accountant: '',
      },
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false)
    },
    handleFilter() {
      this.$emit('update', this.filter)
    },
    selectDate(v) {
      this.filter.start_date = date(v.startDate, 'yyyy-MM-dd')
      this.filter.end_date = date(v.endDate, 'yyyy-MM-dd')
    },
  },
  watch: {
    visible(value) {
      this.isShow = value
    },
  },
}
</script>
