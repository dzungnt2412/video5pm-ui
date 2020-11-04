<template>
  <div class="order-list-page page">
    <div class="page-header">
      <div class="page-header-group ml-0">
        <div class="page-header-group-actions__left">
          <a
            href="#"
            class="btn btn-primary"
            @click.prevent="visibleImportModal"
          >
            <p-icon name="upload"></p-icon>
            <span class="ml-5">Thêm đơn hàng</span>
          </a>
          <a
            href="#"
            class="ml-10 btn btn-primary"
            v-if="selectedIds && selectedIds.length"
            @click.prevent="handleExportOrders"
          >
            <p-icon name="download" icon-pack="md"></p-icon>
            <span class="ml-5">Tải đơn đã chọn</span>
          </a>
        </div>
      </div>
    </div>
    <div class="page-content container-fluid">
      <div class="row">
        <div class="col-xl-12">
          <div class="card">
            <div class="card-body">
              <status-tab v-model="filter.status" :status="orderStatus" />
              <p-input
                placeholder="Tìm kiếm đơn hàng (theo mã đơn | tên khách | phương thức vận chuyển)"
                prefixIcon="search"
                class="mb-2"
                type="password"
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
              <VclTable class="my-20" v-if="isFetching"></VclTable>
              <template v-else-if="orders.length">
                <div class="table-responsive">
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th
                          width="40"
                          class="order-select"
                          :colspan="totalSelected > 0 ? 9 : 1"
                        >
                          <p-checkbox
                            class="order-select-checkbox"
                            :style="totalSelected > 0 && { width: 0 }"
                            :value="isAllChecked"
                            @change.native="toggleSelectAll"
                            :indeterminate="isIndeterminate"
                          ></p-checkbox>
                          <div
                            class="bulk-actions d-flex align-items-center"
                            v-if="totalSelected > 0"
                          >
                            <div class="bulk-actions__main-bar">
                              <span class="bulk-actions__selection-count">{{
                                selectionCountText
                              }}</span>
                              <p-button
                                class="bulk-actions__actions"
                                type="primary"
                                @click="handleAction('process')"
                                v-if="
                                  availableCreateContainerOrders &&
                                    availableCreateContainerOrders.length
                                "
                                >Tạo deliver Order</p-button
                              >
                            </div>
                            <span class="bulk-select-all" v-if="isAllChecked"
                              >Tất cả các đơn trên trang này được chọn.</span
                            >
                          </div>
                        </th>
                        <template v-if="totalSelected === 0">
                          <th>Mã</th>
                          <th>Design</th>
                          <th>Tracking Number</th>
                          <th>Số đơn hàng</th>
                          <th>Tên khách hàng</th>
                          <th :style="{ 'max-width': '150px' }">SKU</th>
                          <th>Quốc gia</th>
                          <th>Ngày</th>
                          <th title="Phương thức vận chuyển">PT vận chuyển</th>
                          <th>Trạng thái</th>
                          <th class="text-right">Chức năng</th>
                        </template>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, i) in orders" :key="i">
                        <td width="30" class="ml-0 text-center">
                          <p-checkbox
                            v-model="action.selected"
                            :native-value="item"
                          ></p-checkbox>
                        </td>
                        <td width="40">
                          <router-link
                            :style="{ textDecoration: 'none' }"
                            :to="{
                              name: 'order-view',
                              params: { id: item.id },
                            }"
                            >{{ item.id }}</router-link
                          ></td
                        >
                        <td>
                          <template>
                            <div class="order-thumbnail">
                              <thumbnail
                                class="order-image"
                                v-if="
                                  item.order_items &&
                                    item.order_items.length &&
                                    item.order_items[0].image
                                "
                                :src="item.order_items[0].image"
                              />
                              <img
                                class="order-image order-image-placeholder"
                                :src="imagePlaceholder"
                                v-else
                                alt
                              />
                            </div>
                          </template>
                        </td>
                        <td>
                          <span>{{ item.fulfillments | trackingNumbers }}</span>
                        </td>
                        <td>{{ item.ref_id }}</td>
                        <td>
                          {{
                            item.full_name
                              ? item.full_name
                              : item.first_name + ' ' + item.last_name
                          }}
                        </td>
                        <td :style="{ 'max-width': '150px' }">
                          <p-tooltip
                            :label="getSKU(item)"
                            position="top"
                            type="dark"
                            :active="getSKU(item).length > 30"
                            >{{ truncate(getSKU(item), 30) }}</p-tooltip
                          >
                        </td>
                        <td>{{ item.country_code }}</td>
                        <td>{{ item.created_at | date('dd/MM/yyyy') }}</td>
                        <td>
                          <p-tooltip
                            :label="item.shipping_method"
                            position="top"
                            type="dark"
                            >{{ item.shipping_code | shippingName }}</p-tooltip
                          >
                        </td>
                        <td>
                          <span v-status:status="item.status"></span>
                        </td>
                        <td class="text-right">
                          <p-popover
                            class="mx-10"
                            placement="top"
                            trigger="hover"
                            type="dark"
                            content="Xem chi tiết"
                            compact
                          >
                            <router-link
                              slot="reference"
                              :to="{
                                name: 'order-view',
                                params: { id: item.id },
                              }"
                            >
                              <p-icon name="eye" iconPack="md"></p-icon>
                            </router-link>
                          </p-popover>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <span>{{ paginationLabel }}</span>
                  <p-pagination
                    :total="count"
                    :perPage="filter.limit"
                    :current.sync="filter.page"
                    size="sm"
                  ></p-pagination>
                </div>
              </template>
              <EmptySearchResult
                v-else
                title="Không tìm thấy đơn hàng"
              ></EmptySearchResult>
            </div>
          </div>
        </div>
      </div>
    </div>

    <modal-import
      :visible.sync="isVisibleImport"
      :uploading="isUploading"
      :error="importOrderErrors.file"
      accept=".csv"
      title="Thêm đơn hàng từ file *.CSV"
      @close="handleCloseImportFile"
      @selected="handleImportOrder"
      v-if="isVisibleImport"
    >
      <p class="font-weight-700">
        Yêu cầu: Upload file *.CSV theo
        <a
          href="https://static.lionnix.net/file-templates/lionnix-template-fulfill.csv"
          target="_blank"
        >
          <u>mẫu của hệ thống</u>
        </a>
      </p>
    </modal-import>

    <modal-preview-import-order
      :visible.sync="isVisiblePreview"
      :order="resultImport.order"
      :order-errors="resultImport.import_errors"
      :total="resultImport.total_order"
      :importing="isImporting"
      @import="handleImportFile"
      v-if="isVisiblePreview"
    ></modal-preview-import-order>

    <modal-create-or-append-container
      :visible.sync="isVisibleCreateOrderAppendContainer"
      :loading="isContainerCreating"
      :orders="availableCreateContainerOrders"
      :containers="containers"
      :fetch-containers="fetchContainers"
      @save="handleCreateContainer"
      v-if="isVisibleCreateOrderAppendContainer"
    ></modal-create-or-append-container>
  </div>
</template>

<script>
import { truncate } from '@core/utils/string'
import { VclTable } from 'vue-content-loading'
import { mapState, mapActions } from 'vuex'
import { ORDER_STATUS_PENDING } from '@core/constants'
import Browser from '@core/helpers/browser'
import mixinRoute from '@core/mixins/route'
import mixinTable from '@core/mixins/table'
import mixinExportOrder from '@/packages/container/mixins/export-file'
import {
  CREATE_CONTAINER,
  FETCH_ORDERS,
  IMPORT_ORDERS,
  PREVIEW_IMPORT_ORDERS,
  FETCH_CONTAINERS,
  EXPORT_ORDERS,
} from '../store/types'
import { ORDER_STATUS } from '../constants'
import EmptySearchResult from '@components/shared/EmptySearchResult'
import Thumbnail from '@components/shared/Thumbnail'
import ModalImport from '@components/shared/modal/ModalImport'
import StatusTab from '@components/shared/StatusTab'
import ModalCreateOrAppendContainer from './components/ModalCreateOrAppendContainer'
import ModalPreviewImportOrder from './components/ModalPreviewImportOrder'
import shippings from '@/packages/shared/data/shippings'
import { ORDER_EXPORT_BUCKET } from '@core/constants/storage'

export default {
  name: 'OrderList',
  mixins: [mixinRoute, mixinTable, mixinExportOrder],
  components: {
    Thumbnail,
    ModalImport,
    ModalCreateOrAppendContainer,
    ModalPreviewImportOrder,
    StatusTab,
    VclTable,
    EmptySearchResult,
  },
  filters: {
    shippingName(value) {
      if (value) {
        return shippings[value] || ''
      }
      return ''
    },
    trackingNumbers(value) {
      if (!value) {
        return
      }

      const items = value.map((item) => {
        return item.tracking_number
      })

      return items.toString()
    },
  },
  computed: {
    ...mapState('container', {
      count: (state) => state.orderCount,
      orders: (state) => state.orders,
      containers: (state) => state.containers,
    }),
    orderStatus() {
      return ORDER_STATUS
    },
    availableCreateContainerOrders() {
      if (!this.action.selected || !this.action.selected.length) {
        return []
      }

      let orders = this.action.selected
      return orders.filter(
        ({ status, container_id }) =>
          container_id < 1 && status === ORDER_STATUS_PENDING
      )
    },
    items() {
      return this.orders
    },
    imagePlaceholder() {
      return require('@assets/img/image-placeholder.png')
    },
  },
  data() {
    return {
      isFetching: true,
      result: {},
      actions: {
        delete: {
          title: 'Delete',
          isNeedConfirm: false,
        },
        process: {
          title: 'Process',
        },
        cancel: {
          title: 'Cancel',
          isNeedConfirm: true,
        },
      },
      filter: {
        search: '',
        limit: 20,
        status: '',
      },
      isVisibleImport: false,
      isUploading: false,
      isImporting: false,
      orderItems: [],
      file: null,
      isVisiblePreview: false,
      resultImport: {},
      isVisibleCreateOrderAppendContainer: false,
      isContainerCreating: false,
      importOrder: {
        create_container: true,
        file: null,
      },
      importOrderErrors: {},
      createContainerErrors: {},
    }
  },
  created() {
    this.filter = this.getRouteQuery()
  },
  methods: {
    truncate,
    ...mapActions('container', [
      FETCH_ORDERS,
      IMPORT_ORDERS,
      PREVIEW_IMPORT_ORDERS,
      CREATE_CONTAINER,
      FETCH_CONTAINERS,
      EXPORT_ORDERS,
    ]),

    async init() {
      this.isFetching = true
      const { container_id: id } = this.$route.query

      if (id) {
        this.$set(this.filter, 'container_id', parseInt(id, 10))
      }

      this.handleUpdateRouteQuery()
      this.result = await this.fetchOrders(this.filter)
      this.isFetching = false
    },

    async handleActionItem() {
      if (this.action.current === 'process') {
        this.isVisibleCreateOrderAppendContainer = true
        return
      }

      if (this.action.current === 'cancel') {
        this.handleRejectOrders(this.action.item, 'canceled')
      }
    },

    async handleCreateContainer({ ids, containerId }) {
      this.createContainerErrors.shop = ''
      this.isContainerCreating = true
      const payload = { order_ids: ids }

      if (containerId) {
        payload.container_id = containerId
      }

      const result = await this.createContainer(payload)
      this.isContainerCreating = false

      if (!result.success) {
        this.$toast.open({ type: 'error', message: result.message })
        return
      }

      if (containerId) {
        await this.init()
        this.$toast.open({
          type: 'success',
          message: `Thêm đơn hàng vào delivery order ${containerId} thành công`,
        })
        this.isVisibleCreateOrderAppendContainer = false
        return
      }

      this.$toast.open({
        type: 'success',
        message: 'Delivery order đã được tạo thành công',
      })
      this.$router.push({ name: 'container-view', params: { id: result.id } })
    },

    async handleImportOrder(file) {
      this.importOrder.file = file

      if (!this.validateImportOrder()) {
        return
      }

      this.importOrder.file = file
      this.isUploading = true
      this.resultImport = await this.importOrders({
        file: this.importOrder.file,
        shop_id: this.importOrder.shop_id,
      })

      this.isVisibleImport = false
      this.isVisiblePreview = true

      if (this.resultImport && this.resultImport.success) {
        this.isUploading = false
        return
      }

      this.$toast.open({
        type: 'error',
        message: this.resultImport.message || 'File không đúng định dạng',
      })
      this.isUploading = false
    },

    async handleImportFile() {
      const payload = {
        file_url: this.resultPreview.file_url,
        total_order: this.resultPreview.total_order,
        create_container: this.importOrder.create_container,
      }

      this.isImporting = true
      this.resultImport = await this.importOrders(payload)

      if (this.resultImport && this.resultImport.success) {
        if (this.resultImport.container_id) {
          this.$toast.open({
            type: 'success',
            message: 'Thêm đơn hàng thành công',
          })
          this.$router.push({
            name: 'container-view',
            params: { id: this.resultImport.container_id },
          })
          return
        }

        this.handleResetImportFile()
        this.isVisiblePreview = false
        this.isImporting = false
        this.$dialog.alert({
          title: 'Import orders',
          message:
            'Chúng tôi hiện đang import lên hệ thống. Điều này sẽ mất ít thời gian. Một email sẽ được gửi cho bạn sau khi quá trình import hoàn tất.',
        })
        return
      }

      this.$toast.open({
        type: 'error',
        message: this.resultImport.message,
      })
    },

    handleResetImportFile() {
      this.$set(this, 'resultPreview', {})
      this.file = null
      this.isVisiblePreview = false
    },

    handleCloseImportFile() {
      this.file = null
      this.isVisibleImport = false
    },

    visibleImportModal() {
      this.isVisibleImport = true
    },

    importTrackingSuccessful() {
      return this.init()
    },

    validateImportOrder() {
      this.$set(
        this.importOrderErrors,
        'file',
        !this.importOrder.file ? '*Chưa có file' : ''
      )

      return !Object.values(this.importOrderErrors).filter(Boolean).length
    },

    async handleExportOrders() {
      const result = await this.exportOrders(this.selectedIds)
      this.exportFile(result, `orders.csv`, ORDER_EXPORT_BUCKET)
    },

    getSKU(order) {
      if (order && order.order_items) {
        return order.order_items
          .map(({ sku }) => sku)
          .filter((sku) => sku)
          .join(', ')
      }
    },
  },
  watch: {
    filter: {
      handler: function() {
        this.init()
      },
      deep: true,
    },
  },
}
</script>
