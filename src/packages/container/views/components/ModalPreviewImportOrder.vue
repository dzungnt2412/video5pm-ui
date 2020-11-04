<template>
  <modal-preview-import
    title="Xem trước đơn hàng"
    :visible="visible"
    :importing="importing"
    :displayImport="total > 0"
    @startImport="handleImportFile"
    @close="handleClose"
  >
    <p> Bạn sẽ thêm {{ total }} đơn hàng </p>
    <div v-if="orderErrors && orderErrors.length">
      <strong class="text-danger">
        Đơn hàng bị lỗi: {{ orderErrors.length }}
      </strong>
      <table>
        <thead>
          <tr>
            <th>Dòng</th>
            <th>Mã đơn hàng</th>
            <th>Tên sản phẩm</th>
            <th>Lỗi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in orderErrors" :key="i">
            <td>{{ item.line }}</td>
            <td>{{ item.order_id }}</td>
            <td>{{ item.product_name }}</td>
            <td class="text-danger">
              <ul v-html="'<li>' + item.errors.join('</li><li>') + '</li>'">
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <template v-if="order && order.order_items">
      <table class="table table-hover">
        <tbody>
          <tr>
            <td>Tên khách</td>
            <td>{{ order.full_name }}</td>
          </tr>
          <tr>
            <td>Ngày</td>
            <td>{{ order.created_at | datetime }}</td>
          </tr>
          <tr>
            <td>Địa chỉ</td>
            <td> {{ order.address }}, {{ order.city }} </td>
          </tr>
          <tr>
            <td>Phương thức vận chuyển</td>
            <td>
              {{ order.shipping_method }}
            </td>
          </tr>
        </tbody>
      </table>

      <h4>Order items</h4>

      <table class="table table-hover">
        <thead>
          <tr>
            <th>Tên sản phẩm</th>
            <th>SKU</th>
            <th>Số lượng</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in order.order_items" :key="i">
            <td>{{ item.name }}</td>
            <td>{{ item.sku }}</td>
            <td>{{ item.quantity }}</td>
          </tr>
        </tbody>
      </table>
    </template>
  </modal-preview-import>
</template>

<script>
import ModalPreviewImport from '@components/shared/modal/ModalPreviewImport'

export default {
  name: 'ModalPreviewImportOrder',
  components: {
    ModalPreviewImport,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    importing: {
      type: Boolean,
      default: false,
    },
    total: {
      type: Number,
      default: 0,
    },
    orderErrors: {
      type: Array,
      default: () => [],
    },
    order: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    handleImportFile() {
      if (this.importing) {
        return
      }
      this.$emit('import')
    },

    handleClose() {
      this.$emit('update:visible', false)
    },
  },
}
</script>
