<template>
  <PageDetailLoading v-if="isFetching"></PageDetailLoading>
  <div class="order-view-page page" v-else>
    <UnsavedBar
      :show="isVisibleUpdateOrder"
      @save="handleUpdateOrders(false)"
      title="Cập nhập đơn hàng"
    ></UnsavedBar>
    <div class="page-header">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <p-button icon="chevron-left" class="btn-pure pl-0">
              <router-link :to="{ name: 'container-list' }">
                Delivery order
              </router-link>
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
                <h4 class="order-number">{{ container.id }}</h4>
                <span class="order-date ml-10 mr-10">
                  {{ container.created_at | datetime }}
                </span>
                <span v-status:status="container.status" class="ml-10"></span>
              </div>
              <div class="order-metadata d-flex align-items-center">
                <p-button
                  @click="confirmUpdateContainer('canceled')"
                  v-if="isAllowUpdateCancel"
                  class="ml-10"
                  type="danger"
                  :disabled="isContainerUpdating"
                >
                  Cancel
                </p-button>
              </div>
            </div>
            <div class="row mt-15">
              <div
                class="col-12"
                :class="{ 'col-md-8': isVisibleStatisticSection }"
              >
                <section class="card section-order-items">
                  <div class="card-block">
                    <template>
                      <div>
                        <status-tab
                          v-model="filter.status"
                          :status="orderStatus"
                        ></status-tab>
                        <p-input
                          placeholder="Tìm kiếm theo mã đơn hàng"
                          prefixIcon="search"
                          class="mb-20"
                          type="search"
                          :value="filter.search"
                          @keyup.enter="handleSearch"
                        >
                          <template slot="append">
                            <p-button
                              type="default"
                              icon="close"
                              v-if="filter.search"
                              @click="clearSearch"
                            ></p-button>
                          </template>
                        </p-input>
                      </div>
                    </template>
                    <VclTable class="my-20" v-if="isOrdersFetching"> </VclTable>
                    <template>
                      <div v-for="(order, i) in orders" :key="i" class="mb-30">
                        <div
                          class="d-flex align-items-center justify-content-between"
                        >
                          <div class="d-flex align-items-center">
                            <div class="d-flex align-items-center flex-wrap">
                              <span class="font-size-16 mr-10">{{
                                order.id
                              }}</span>
                              <router-link
                                class=" font-size-16 mr-10 text-no-underline"
                                target="_blank"
                                :to="{
                                  name: 'order-view',
                                  params: { id: order.id },
                                }"
                              >
                                | {{ order.ref_id }}
                              </router-link>
                              <span class="font-size-16 mr-10">{{
                                getOrderTitle(order)
                              }}</span>
                              <span
                                v-status:status="order.status"
                                class="mr-10"
                              >
                                {{ order.status }}
                              </span>
                            </div>
                          </div>
                          <div class="actions mr-20">
                            <p-tooltip
                              label="Sửa đơn hàng"
                              position="top"
                              type="dark"
                            >
                              <p-button
                                size="xs"
                                type="default"
                                icon="pencil"
                                @click="handleFetchOrder(order.id)"
                                v-if="isAllowUpdateOrder(order)"
                              >
                              </p-button>
                            </p-tooltip>
                          </div>
                        </div>
                        <order-items
                          :display="'container'"
                          :order="order"
                          :order-id="order.id"
                          :items="order.order_items"
                          :designs="designs"
                          :shop-id="shopId"
                          :fetch-designs="fetchDesigns"
                          :is-allow-update="isAllowUpdateOrder(order)"
                          @selectedDesign="handleSelectedDesign"
                        />
                      </div>

                      <div
                        class="d-flex justify-content-between align-items-center"
                      >
                        <span>
                          {{ paginationLabel }}
                        </span>
                        <p-pagination
                          :total="count"
                          :perPage="filter.limit"
                          :current.sync="filter.page"
                          size="sm"
                        >
                        </p-pagination>
                      </div>
                    </template>
                  </div>
                </section>
              </div>
              <div class="col-12 col-md-4" v-if="isVisibleStatisticSection">
                <section class="card section-order-items">
                  <div class="card-block">
                    <div class="card-title d-flex justify-content-between">
                      <h4>Thống kê sản phẩm</h4>
                    </div>
                    <div class="table-responsive">
                      <table class="table table-hover">
                        <thead>
                          <tr>
                            <th>Tên</th>
                            <th>SL</th>
                            <th>Đơn giá</th>
                            <th class="text-right">Thành tiền</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(item, i) in statisticsProductBases"
                            :key="i"
                          >
                            <td>{{ item.name }}</td>
                            <td>{{ item.qty }}</td>
                            <td>{{ item.price | formatPrice }}</td>
                            <td class="text-right">
                              {{ (item.price * item.qty) | formatPrice }}
                            </td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr>
                            <td colspan="3">Tổng tiền sản phẩm</td>
                            <td class="text-right">
                              <strong>{{
                                statisticTotalAmount | formatPrice
                              }}</strong>
                            </td>
                          </tr>
                          <tr>
                            <td colspan="3">Tổng tiền vận chuyển</td>
                            <td class="text-right">
                              <strong>
                                {{ container.total_shipping_fee | formatPrice }}
                              </strong>
                            </td>
                          </tr>
                          <tr>
                            <td colspan="3">Tổng tất cả</td>
                            <td class="text-right">
                              <strong>
                                {{
                                  (statisticTotalAmount +
                                    container.total_shipping_fee)
                                    | formatPrice
                                }}
                              </strong>
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <modal-update-orders-wrong
      :visible.sync="isVisibleUpdateOrdersWrong"
      :orders="wrongOrders"
      :loading="isOrderUpdating"
      @tryAgain="handleUpdateOrders(true)"
      v-if="isVisibleUpdateOrdersWrong"
    />

    <modal-update-order
      :visible.sync="isVisibleEditOrder"
      :current="order"
      :countries="countries"
      :loading="isOrderUpdating"
      @save="handleUpdateOrder"
      v-if="isVisibleEditOrder"
    />
  </div>
</template>
<script>
/*eslint-disable*/
import { mapState, mapActions } from 'vuex'
import { VclTable } from 'vue-content-loading'
import { cloneDeep } from '@core/utils'
import { ORDER_STATUS_CANCELED, ORDER_STATUS_PAID } from '@core/constants'
import mixinRoute from '@core/mixins/route'
import mixinTable from '@core/mixins/table'
import {
  FETCH_CONTAINER,
  FETCH_ORDERS,
  FETCH_ORDER,
  UPDATE_ORDER,
} from '@/packages/container/store/types'
import mixinUpdateOrder from '../mixins/update-order'
import { Pagination } from '@kit'
import Accordion from '@kit/Accordion'
import AccordionItem from '@kit/AccordionItem'
import { formatPrice } from '@core/utils/formatter'
import {
  FETCH_PRODUCT_TYPES,
  FETCH_USERS_BY_ROLE,
} from '@/packages/shared/store'
import Thumbnail from '@components/shared/Thumbnail'
import mixinContainer from '../mixins/container'
import { ORDER_STATUS } from '../constants'
import StatusTab from '@components/shared/StatusTab'
import OrderItems from './components/OrderItems'
import ModalUpdateOrdersWrong from './components/ModalUpdateOrdersWrong'
import ModalUpdateOrder from './components/ModalUpdateOrder'

export default {
  name: 'ContainerView',
  mixins: [mixinRoute, mixinTable, mixinContainer, mixinUpdateOrder],
  components: {
    StatusTab,
    Thumbnail,
    OrderItems,
    Accordion,
    AccordionItem,
    ModalUpdateOrdersWrong,
    ModalUpdateOrder,
    Pagination,
    VclTable,
  },
  computed: {
    ...mapState('container', {
      container: (state) => state.container,
      currentOrders: (state) => state.orders,
      count: (state) => state.orderCount,
      order: (state) => state.order,
      consignments: (state) => state.consignments,
    }),
    ...mapState('shared', {
      productTypes: (state) => state.productTypes,
      supplierUsers: (state) => state.users,
    }),
    ...mapState('design', {
      designs: (state) => state.designs,
    }),

    containerId() {
      return parseInt(this.$route.params.id, 10)
    },

    isVisibleStatisticSection() {
      const status = ['pending', 'draft', 'canceled']
      return (
        this.statisticsProductBases &&
        this.statisticsProductBases.length &&
        status.indexOf(this.order.status) === -1
      )
    },

    wrongOrders() {
      return this.orders.filter(
        ({ id }) => this.wrongOrderIds.indexOf(id) !== -1
      )
    },

    isVisibleActions() {
      return this.container && this.container.status !== ORDER_STATUS_CANCELED
    },

    shopId() {
      return this.container && this.container.shop ? this.container.shop.id : 0
    },

    user() {
      return this.container.shop && this.container.shop.user
        ? this.container.shop.user
        : {}
    },
    statisticsProductBases() {
      return this.container && this.container.product_bases
        ? this.container.product_bases.filter((item) => item.id)
        : []
    },
    orderStatus() {
      return ORDER_STATUS
    },
    statisticTotalShippingFees() {
      return this.statisticsProductBases
        ? this.statisticsProductBases.reduce(
            (total, item) => total + item.shipping_fee * item.qty,
            0
          )
        : 0
    },
    statisticTotalAmount() {
      return this.statisticsProductBases
        ? this.statisticsProductBases.reduce(
            (amount, item) => amount + item.price * item.qty,
            0
          )
        : 0
    },
    items() {
      const items = []
      this.orders.forEach((order) => {
        order.order_items.forEach((item) => {
          items.push({
            id: item.id,
            order_id: item.order_id,
            consignment_id: item.consignment_id,
            name: item.name,
            image: item.image,
            sku: item.sku,
            product_type: item.product_type,
            price: item.price,
            quantity: item.quantity,
            attribute: item.attribute,
            shipping_method: order.shipping_method,
            shipping_fee: item.shipping_fee,
            order_status: item.shipping_fee,
          })
        })
      })

      return items
    },
  },
  data() {
    return {
      isFetching: true,
      isOrderFetching: true,
      isOrdersFetching: true,
      resultFetchOrder: {},
      isVisibleSelectSupplier: false,
      isSupplierAssigning: false,
      isExpandOrders: false,
      orders: [],
      isVisibleUpdateOrder: false,
      isVisibleUpdateOrdersWrong: false,
      isOrderUpdating: false,
      wrongOrderIds: [],
      updateOrderIds: [],
      isVisibleAppendConsignment: false,
      isVisibleUpdateOrderStatus: false,
      styleTable: 0,
    }
  },
  created() {
    this.filter = this.getRouteQuery()
    this.init()
  },
  methods: {
    ...mapActions('container', [
      FETCH_CONTAINER,
      FETCH_ORDERS,
      FETCH_ORDER,
      UPDATE_ORDER,
    ]),
    ...mapActions('design', ['fetchDesigns']),
    ...mapActions('shared', [FETCH_PRODUCT_TYPES, FETCH_USERS_BY_ROLE]),
    formatPrice,

    async init() {
      await Promise.all([this.handleFetchContainer(), this.handleFetchOrders()])
    },

    async handleFetchContainer() {
      this.isFetching = true
      const result = await this.fetchContainer(this.containerId)

      if (!result.success) {
        this.$toast.open({ message: result.message, type: 'error' })
      }

      this.isFetching = false
    },

    async handleFetchOrders() {
      this.isExpandOrders = false
      this.isOrdersFetching = true
      this.handleUpdateRouteQuery()
      this.resultFetchOrder = await this.fetchOrders(
        Object.assign({ container_id: this.containerId }, this.filter)
      )
      this.isExpandOrders = true
      this.isOrdersFetching = false
    },

    async handleFetchOrder(orderId) {
      this.isOrderFetching = true
      const result = await this.fetchOrder(orderId)

      if (result.success) {
        this.handleVisibleModalUpdateOrder()
      } else {
        this.$toast.open({ type: 'error', message: result.message })
      }
    },

    handleSelectedDesign({ url, orderId, design, item }) {
      this.handleUpdateOrderItem(orderId, item, {
        design_id: design.id,
        design,
        image: url,
      })
    },

    handleUpdateOrderItem(orderId, item, val) {
      const index = this.orders.findIndex(({ id }) => id === orderId)

      if (index === -1) {
        return
      }

      const orderItems = this.orders[index].order_items
      const indexItem = orderItems.findIndex(({ id }) => id === item.id)

      if (indexItem !== -1) {
        const newVal = Object.assign({}, orderItems[indexItem], val)
        this.$set(this.orders[index].order_items, indexItem, newVal)
        this.isVisibleUpdateOrder = true
        this.updateOrderIds.push(orderId)
      }
    },

    /**
     * Handle update multiple orders
     * @param exceptSuccess
     * @return {Promise<void>}
     */
    async handleUpdateOrders(exceptSuccess = false) {
      const orders = []
      this.orders.forEach((order) => {
        if (
          this.updateOrderIds.indexOf(order.id) !== -1 &&
          (!exceptSuccess || this.wrongOrderIds.indexOf(order.id) !== -1)
        ) {
          orders.push(order)
        }
      })

      if (!orders.length) {
        return
      }

      const promises = []
      orders.forEach((order) => {
        promises.push(this.updateOrder(order))
      })

      this.isOrderUpdating = true
      let result = await Promise.all(promises)
      this.isOrderUpdating = false

      // Result
      if (result && Array.isArray(result)) {
        const wrongOrderIds = result
          .filter(({ success }) => success === false)
          .map(({ id }) => id)

        if (wrongOrderIds.length === 0) {
          this.updateOrderIds = []
          this.wrongOrderIds = []
          this.isVisibleUpdateOrdersWrong = false
          this.isVisibleUpdateOrder = false
          await this.handleFetchOrders()
          await this.handleFetchContainer()
          this.$toast.open({
            type: 'success',
            message: 'Cập nhập order thành công',
          })
          return
        }

        this.isVisibleUpdateOrdersWrong = true
        this.wrongOrderIds = wrongOrderIds
      }
    },

    async handleUpdateOrder(order) {
      const payload = cloneDeep(order)
      delete payload.order_items
      this.isOrderUpdating = true
      this.resultUpdate = await this.updateOrder(payload)

      if (this.resultUpdate && this.resultUpdate.success) {
        this.isOrderUpdating = false
        this.isVisibleEditOrder = false
        await this.handleFetchContainer()
        this.$toast.open({
          type: 'success',
          message: 'Cập nhập order item thành công',
        })
        return
      }

      this.$toast.open({ type: 'error', message: this.resultUpdate.message })
      this.isOrderUpdating = false
    },

    getOrderTitle(order) {
      let title = `| ${order.country_code} | ${order.shipping_method}`

      if (order.fulfillments.length) {
        const items = order.fulfillments.map((item) => {
          return item.tracking_number
        })

        title += ` | ${items.toString()}`
      }

      return title
    },

    toggleOpen(action) {
      this.isExpandOrders = action === 'expand'
    },
  },
  watch: {
    currentOrders: {
      handler: function(val) {
        if (val) {
          this.orders = cloneDeep(val)
        }
      },
      immediate: true,
    },
    filter: {
      handler: function() {
        this.handleFetchOrders()
      },
      immediate: true,
      deep: true,
    },
  },
}
</script>
