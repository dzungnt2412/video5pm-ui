<template>
  <PageDetailLoading v-if="isFetching"></PageDetailLoading>
  <div class="order-view-page page" v-else>
    <div class="page-header">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <p-button icon="chevron-left" class="btn-pure pl-0">
              <router-link :to="{ name: 'order-list' }">Đơn hàng</router-link>
            </p-button>
          </div>
        </div>
      </div>
    </div>
    <div class="page-content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div
              class="d-flex align-items-center justify-content-between flex-wrap"
            >
              <div class="order-metadata d-flex align-items-center">
                <h4 class="order-number">{{ order.ref_id }}</h4>
                <span class="order-date ml-10 mr-10">{{
                  order.created_at | datetime
                }}</span>
                <span v-status:status="order.status"></span>
              </div>
              <div class="order-metadata d-flex align-items-center">
                <p-button
                  @click="confirmUpdateOrder('canceled')"
                  class="ml-10"
                  type="danger"
                  v-if="isAllowCancel"
                  >Cancel</p-button
                >
              </div>
            </div>
            <div class="row mt-15">
              <div class="col-12 col-md-8">
                <section class="card section-order-items">
                  <div class="card-block">
                    <div
                      class="card-title d-flex align-items-center justify-content-between"
                    >
                      <h4>Danh sách sản phẩm</h4>
                      <p-tooltip
                        label="Sửa sản phẩm"
                        position="top"
                        type="dark"
                      >
                        <p-button
                          icon="pencil"
                          type="default"
                          name="pencil"
                          @click="toggleEditOrder"
                          v-if="isAllowUpdateOrder(order)"
                          size="sm"
                        ></p-button>
                      </p-tooltip>
                    </div>
                    <order-items
                      :order="order"
                      :items="orderItems"
                      :editing="editing"
                      :designs="designs"
                      :fetch-designs="fetchDesigns"
                      :product-types="productTypes"
                      :shop-id="order.shop_id"
                      @selectedProduct="handleSelectedProductType"
                      @selectedDesign="handleSelectedDesign"
                      :is-allow-update="isAllowUpdateOrder(order)"
                    />
                    <div class="text-right mt-15" v-if="editing">
                      <p-button
                        @click="handleUpdateOrder(null)"
                        :disabled="isUpdating"
                        >Update order</p-button
                      >
                    </div>
                  </div>
                </section>
              </div>
              <div class="col-12 col-md-4">
                <section class="card section-order-shipping">
                  <div class="card-block">
                    <div
                      class="card-title d-flex align-items-center justify-content-between"
                    >
                      <h4>Thông tin vận chuyển</h4>
                      <p-tooltip
                        label="Sửa thông tin"
                        position="top"
                        type="dark"
                      >
                        <p-button
                          icon="pencil"
                          type="default"
                          name="pencil"
                          @click="handleVisibleModalUpdateOrder"
                          size="xs"
                        ></p-button>
                      </p-tooltip>
                    </div>
                    <p class="card-text">
                      <b>Tên:</b> {{ order | displayname }}<br />
                      <span v-if="order.phone"
                        ><b>Điện thoại: </b>{{ order.phone }} <br
                      /></span>
                      <b>Địa chỉ:</b> {{ order.address }},
                      <span v-if="order.address2">{{ order.address2 }}</span
                      >, <span>{{ order.city }} {{ order.postcode }}</span
                      ><br />
                      <span v-if="order.state_code">
                        <b>Mã thành phố:</b> {{ order.state_code }}<br
                      /></span>
                      <span><b>Mã quốc gia:</b> {{ order.country_code }}</span>
                      <br />
                      <span v-if="order.shipping_code"
                        ><b>Hình thức vận chuyển: </b
                        >{{ order.shipping_method }} ({{
                          order.shipping_code.toUpperCase()
                        }})</span
                      >
                    </p>
                  </div>
                </section>
                <section class="card section-order-note" v-if="order.note">
                  <div class="card-block">
                    <h4 class="card-title">Note</h4>
                    <div class="card-text">{{ order.note }}</div>
                  </div>
                </section>
                <section
                  class="card section-order-tracking"
                  v-if="order.fulfillments.length > 0"
                >
                  <div class="card-block">
                    <div
                      class="card-title d-flex align-items-center justify-content-between"
                    >
                      <h4>Fulfillments</h4>
                    </div>
                    <div class="card-text">
                      <div
                        v-for="item in order.fulfillments"
                        :key="item.id"
                        class="d-flex align-items-center justify-content-between"
                      >
                        <a :href="item.tracking_url" target="_blank">{{
                          item.tracking_number
                        }}</a>
                        <span class="actions" v-show="false">
                          <p-tooltip
                            label="Xem chi tiết"
                            position="top"
                            type="dark"
                          >
                            <button
                              class="btn--link"
                              @click="
                                handleVisibleModalUpdateOrderTracking(item)
                              "
                            >
                              Xem
                            </button>
                          </p-tooltip>
                        </span>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal-update-order
      :visible.sync="isVisibleEditOrder"
      :current="order"
      :countries="countries"
      :loading="isOrderUpdating"
      @save="handleUpdateOrder"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { cloneDeep } from '@core/utils'
import { FETCH_ORDER, UPDATE_ORDER } from '@/packages/container/store/types'
import mixinFulfillment from '../mixins/fulfillment'
import mixinUpdateOrder from '../mixins/update-order'
import OrderItems from './components/OrderItems'
import ModalUpdateOrder from './components/ModalUpdateOrder'
import {
  FETCH_PRODUCT_TYPES,
  FETCH_PROVIDERS,
  FETCH_COUNTRIES,
} from '@/packages/shared/store'
import { ORDER_STATUS_CANCELED } from '@core/constants'

export default {
  name: 'OrderView',
  mixins: [mixinUpdateOrder, mixinFulfillment],
  components: {
    OrderItems,
    ModalUpdateOrder,
  },
  computed: {
    ...mapState('container', {
      order: (state) => state.order,
    }),
    ...mapState('shared', {
      productTypes: (state) => state.productTypes,
      providers: (state) => state.providers,
      countries: (state) => state.countries,
    }),
    ...mapState('design', {
      designs: (state) => state.designs,
    }),
    shopId() {
      return this.order ? this.order.shop_id : 0
    },
    orderId() {
      return parseInt(this.$route.params.id, 10)
    },
  },
  data() {
    return {
      editing: false,
      isFetching: false,
      isUpdating: false,
      orderItems: [],
      resultFetch: {},
      resultUpdate: {},
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    ...mapActions('container', [FETCH_ORDER, UPDATE_ORDER, 'getLogs']),
    ...mapActions('shared', [
      FETCH_PRODUCT_TYPES,
      FETCH_PROVIDERS,
      FETCH_COUNTRIES,
    ]),
    ...mapActions('design', ['fetchDesigns']),

    async init() {
      const id = parseInt(this.$route.params.id, 10)

      if (id < 1) {
        return this.$router.push({ name: 'order-list' })
      }

      this.isFetching = true

      const { r1 } = await Promise.all([this.fetchOrder(id)])

      this.resultFetch = r1
      this.isFetching = false
    },

    async handleUpdateOrder(order) {
      this.isUpdating = true
      this.resultUpdate = await this.updateOrder(
        Object.assign({}, order || this.order, { order_items: this.orderItems })
      )

      if (this.resultUpdate && this.resultUpdate.success) {
        this.$set(this, 'orderItems', cloneDeep(this.order.order_items))
        this.editing = false
        this.isVisibleEditOrder = false
        this.init()
        this.$toast.open({
          type: 'success',
          message: 'Cập nhập order item thành công',
        })
      } else {
        this.$toast.open({ type: 'error', message: this.resultUpdate.message })
      }

      this.isUpdating = false
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
    toggleEditOrder() {
      if (this.editing) {
        this.$set(this, 'orderItems', cloneDeep(this.order.order_items))
        this.editing = false
      } else {
        this.editing = true
      }
    },

    confirmUpdateOrder(action) {
      this.$dialog.confirm({
        message: 'Are you sure you want to do this?',
        onConfirm: () => this.onUpdateOrderActionConfirm(action),
      })
    },

    async onUpdateOrderActionConfirm(action) {
      const order = Object.assign({}, this.order)
      switch (action) {
        case 'canceled':
          order.status = ORDER_STATUS_CANCELED
          break
      }

      this.handleUpdateOrder(order)
    },
  },
  watch: {
    'order.order_items': function(val) {
      this.$set(this, 'orderItems', cloneDeep(val))
    },
  },
  filters: {
    displayname: (order) => {
      return order.full_name || `${order.first_name} ${order.last_name}`
    },
  },
}
</script>
