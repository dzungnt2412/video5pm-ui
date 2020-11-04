<template>
  <div class="table-responsive order-items">
    <table
      class="table table-hover order-items-table"
      :style="{ 'min-width': '1200px' }"
    >
      <thead>
        <tr>
          <th>Design</th>
          <th :style="{ width: '150px' }">Sản phẩm</th>
          <th :style="{ width: '150px' }">Loại sản phẩm</th>
          <th :style="{ width: '150px' }">SKU</th>
          <th>Attributes</th>
          <th class="text-center" :style="{ width: '120px' }">Số lượng</th>
          <th class="text-right">Giá</th>
          <th class="text-center" :style="{ width: '150px' }"> Vận chuyển</th>
          <th class="text-center" :style="{ width: '150px' }"
            >Giá vận chuyển</th
          >
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td>
            <template v-if="item.image">
              <a href="#" @click.prevent="handleChangeDesign(item)">
                <p-tooltip
                  label="sửa design"
                  position="right"
                  type="dark"
                  :active="isAllowUpdate"
                >
                  <div class="order-thumbnail">
                    <thumbnail class="order-image" :src="item.image" />
                  </div>
                </p-tooltip>
              </a>
            </template>
            <template v-else>
              <a href="#" @click.prevent="handleChangeDesign(item)">
                <p-tooltip
                  label="Chọn design"
                  position="right"
                  type="dark"
                  :active="isAllowUpdate"
                >
                  <div class="order-thumbnail">
                    <img
                      class="order-image order-image-placeholder"
                      :src="imagePlaceholder"
                    />
                  </div>
                </p-tooltip>
              </a>
            </template>
          </td>
          <td>
            <p-input
              v-if="editing"
              type="text"
              placeholder="Name"
              v-model="item.name"
            >
            </p-input>
            <span v-else>
              {{ item.name }}
            </span>
          </td>
          <td>
            <span v-if="item.product_variant">{{
              item.product_variant.name
            }}</span>
            <span v-else class="badge badge-warning">{{
              'Chưa phân loại'
            }}</span>
          </td>
          <td :style="{ 'max-width': '200px' }">
            <p-input
              v-if="editing"
              type="text"
              placeholder="SKU"
              v-model="item.sku"
            >
            </p-input>
            <span v-else>
              {{ item.sku }}
            </span>
          </td>
          <td>
            <template v-if="item.attribute">
              <template v-if="editing">
                <div
                  class="form-group form-material"
                  v-for="(_, key) in item.attribute"
                  :key="key"
                >
                  <label class="form-control-label">{{ key }}</label>
                  <input class="form-control" v-model="item.attribute[key]" />
                </div>
              </template>
              <div v-else>
                <div v-for="(_, key) in item.attribute" :key="key">
                  {{ `${key}: ${item.attribute[key]}` }}
                </div>
              </div>
            </template>
          </td>
          <td class="text-center" :style="{ 'max-width': '150px' }">
            <p-input
              v-if="editing"
              placeholder="Qty"
              v-model.number="item.quantity"
              type="number"
            >
            </p-input>
            <span v-else>
              {{ item.quantity }}
            </span>
          </td>
          <td class="text-right">
            {{ getPrice(item) | formatPrice }}
          </td>
          <td class="text-center">
            <span v-if="order.shipping_method">{{
              order.shipping_method
            }}</span>
            <span class="badge badge-round badge-warning" v-else>
              Pending
            </span>
          </td>
          <td class="text-center">
            <template
              v-if="order && order.shipping_code && item.product_base_id"
            >
              <span v-if="item.shipping_fee">
                {{ item.shipping_fee | formatPrice }}
              </span>
              <span v-else>
                Free
              </span>
            </template>
            <template v-else>
              <span class="badge badge-round badge-warning">
                Pending
              </span>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
    <modal-change-design
      :sku="item.sku"
      :visible.sync="isVisible"
      :fetch-designs="fetchDesigns"
      :shop-id="shopId"
      @selected="handleSelectedDesign"
      v-if="isVisible"
    />
  </div>
</template>

<script>
import Thumbnail from '@components/shared/Thumbnail'
import ModalChangeDesign from './ModalChangeDesign'
export default {
  name: 'OrdersItems',
  components: {
    Thumbnail,
    ModalChangeDesign,
  },
  props: {
    display: {
      type: String,
      default: 'order',
    },
    items: {
      type: Array,
      default: () => [],
    },
    orderId: {
      type: Number,
      default: 0,
    },
    editing: {
      type: Boolean,
      default: false,
    },
    fetchDesigns: {
      type: Function,
      default: () => {},
    },
    productTypes: {
      type: Array,
      default: () => [],
    },
    designs: {
      type: Array,
      default: () => [],
    },
    shopId: {
      type: Number,
      default: 0,
    },
    isAllowUpdate: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isVisible: false,
      item: {},
    }
  },
  computed: {
    imagePlaceholder() {
      return require('@assets/img/image-placeholder.png')
    },
  },
  methods: {
    handleChangeDesign(item) {
      if (!this.isAllowUpdate) return
      this.item = item
      this.isVisible = true
    },

    handleSelectedDesign({ url, design }) {
      this.$emit('selectedDesign', {
        design,
        url,
        item: this.item,
        orderId: this.orderId,
      })
      this.isVisible = false
    },

    getAttributes(attributes) {
      const attribute = []

      if (attributes) {
        Object.keys(attributes).forEach((key) => {
          attribute.push(`${key}: ${attributes[key]}`)
        })
      }

      return attribute.join(' | ')
    },

    getPrice(item) {
      if (typeof item.product_type !== 'undefined' && item.product_type.price) {
        return item.product_type.price
      }

      return item.price || 0
    },
  },
}
</script>
