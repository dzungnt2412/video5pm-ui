<template>
  <p-dialog
    :active="visible"
    title="Một vài đơn hàng bị lỗi."
    @close="handleClose"
  >
    <table class="table table-hover">
      <thead>
        <tr>
          <th>Tên khách</th>
          <th>Địa chỉ</th>
          <th>Quốc gia</th>
          <th>Ngày</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ item.first_name }} {{ item.last_name }}</td>
          <td>{{ item.address }}</td>
          <td>{{ item.country_code }}</td>
          <td>{{ item.created_at | datetime }}</td>
        </tr>
      </tbody>
    </table>
    <template slot="footer">
      <p-button type="success" @click="handleTryAgain" :disabled="loading">
        Thử lại
      </p-button>
    </template>
  </p-dialog>
</template>
<script>
export default {
  name: 'ModalUpdateOrdersWrong',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    orders: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false)
    },

    handleTryAgain() {
      this.$emit('tryAgain')
    },
  },
}
</script>
