<template>
  <p-modal
    :size="'xl'"
    :active.sync="isShow"
    :title="`Retry map order ${order.ref_id}`"
    @close="close"
  >
    <div class="row">
      <div class="col-12">
        <section class="section-order-items">
          <div>
            <h4>Order items</h4>
            <order-items
              :order="order"
              :items="orderItems"
              :editing="true"
              :designs="designs"
              :fetch-designs="fetchDesigns"
              :product-types="productTypes"
              :shop-id="order.shop_id"
              @selectedProduct="handleSelectedProductType"
              @selectedDesign="handleSelectedDesign"
              :is-allow-update="true"
            />
          </div>
        </section>
      </div>
    </div>
    <template slot="footer">
      <p-button type="default" @click="close">
        <span>Cancel</span>
      </p-button>
      <p-button type="primary" @click="save" :disabled="isSaving || isFetching">
        <span>Update and Retry</span>
      </p-button>
    </template>
  </p-modal>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { cloneDeep } from '@core/utils'
import { FETCH_ORDER, UPDATE_ORDER } from '@/packages/container/store/types'
import OrderItems from '@/packages/container/views/components/OrderItems'
export default {
  name: 'ModalUpdateAndRetryMapping',
  components: {
    OrderItems,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    orderId: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapState('container', {
      order: (state) => state.order,
    }),
    ...mapState('shared', {
      productTypes: (state) => state.productTypes,
    }),
    ...mapState('design', {
      designs: (state) => state.designs,
    }),
  },
  data() {
    return {
      isFetching: false,
      isSaving: false,
      isShow: this.visible,
      orderItems: [],
    }
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions('container', [FETCH_ORDER, UPDATE_ORDER]),
    ...mapActions('design', ['fetchDesigns']),
    ...mapActions('orderMapping', {
      retryOrderMappingFails: 'retryOrderMappingFails',
    }),
    async init() {
      this.isFetching = true
      await this.fetchOrder(this.orderId)
      this.isFetching = false
    },
    handleSelectedDesign({ url, item, design }) {
      this.handleUpdateOrderItem(item, {
        design,
        design_id: design.id,
        image: url,
      })
    },

    handleSelectedProductType({ item, product }) {
      this.handleUpdateOrderItem(item, {
        product_type_id: product.id,
        product_type: product,
      })
    },
    handleUpdateOrderItem(item, newVal) {
      const index = this.orderItems.findIndex(({ id }) => id === item.id)

      if (index !== -1) {
        this.editing = true
        this.$set(this.orderItems, index, Object.assign({}, item, newVal))
      }
    },
    close() {
      this.$emit('update:visible', false)
    },
    async save() {
      this.isSaving = true
      const response = await this.updateOrder(
        Object.assign({}, this.order, { order_items: this.orderItems })
      )

      if (!response || !response.success) {
        this.$toast.open({ type: 'error', message: response.message })
        this.isSaving = false
        return
      }
      this.$set(this, 'orderItems', cloneDeep(this.order.order_items))
      const responseRetry = await this.retryOrderMappingFails({
        ids: [this.orderId],
      })

      if (!responseRetry || !responseRetry.success) {
        this.$toast.open({ type: 'error', message: responseRetry.message })
        this.isSaving = false
        return
      }
      this.$toast.open({
        type: 'success',
        message: 'Updated successfully',
      })
      this.$emit('save')
      this.close()
    },
  },
  watch: {
    visible(value) {
      this.isShow = value
    },
    'order.order_items': function(val) {
      this.$set(this, 'orderItems', cloneDeep(val))
    },
  },
}
</script>
