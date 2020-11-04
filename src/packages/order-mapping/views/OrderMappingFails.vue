<template>
  <div class="order-list-page page">
    <div class="page-header">
      <h1 class="page-title">Order Mapping Fails</h1>
    </div>
    <div class="page-content container-fluid">
      <div class="row">
        <div class="col-xl-12">
          <div class="card">
            <div class="card-body">
              <VclTable class="my-20" v-if="isFetching"> </VclTable>
              <template v-else-if="orderMappingsFails.length">
                <div class="table-responsive">
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th
                          width="40"
                          class="order-select"
                          :colspan="totalSelected > 0 ? 4 : 1"
                        >
                          <p-checkbox
                            class="order-select-checkbox"
                            :style="totalSelected > 0 && { width: 0 }"
                            :value="isAllChecked"
                            @change.native="toggleSelectAll"
                            :indeterminate="isIndeterminate"
                          >
                          </p-checkbox>
                          <div
                            class="bulk-actions d-flex align-items-center"
                            v-if="totalSelected > 0"
                          >
                            <div class="bulk-actions__main-bar">
                              <span class="bulk-actions__selection-count">
                                {{ selectionCountText }}
                              </span>
                              <p-button
                                class="bulk-actions__actions"
                                type="primary"
                                @click="handleAction('retry')"
                              >
                                Retry
                              </p-button>
                            </div>
                            <span class="bulk-select-all" v-if="isAllChecked">
                              Tất cả các đơn trên trang này được chọn.
                            </span>
                          </div>
                        </th>
                        <template v-if="totalSelected === 0">
                          <th>Order</th>
                          <th>Reason</th>
                          <th class="text-right">
                            <span class="mr-10">Action</span>
                          </th>
                        </template>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, i) in orderMappingsFails" :key="i">
                        <td width="30" class="ml-0 text-center">
                          <p-checkbox
                            v-model="action.selected"
                            :native-value="item"
                          >
                          </p-checkbox>
                        </td>
                        <td>{{ item.order_number }}</td>
                        <td>
                          {{ item.reason }}
                        </td>
                        <td class="text-right">
                          <div class="d-flex justify-content-end">
                            <p-button
                              class="ml-15"
                              type="default"
                              size="sm"
                              icon="refresh"
                              iconPack="md"
                              @click="updateAndRetryItem(item)"
                              >Update and Retry</p-button
                            >
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="d-flex justify-content-between align-items-center">
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
              <EmptySearchResult
                v-else
                title="No order mapping failed"
              ></EmptySearchResult>
            </div>
          </div>
        </div>
      </div>
    </div>
    <MOdalUpdateAndRetryMapping
      v-if="isVisibleRetryMapping"
      :visible.sync="isVisibleRetryMapping"
      :orderId="selectedOrderId"
      @save="init"
    />
  </div>
</template>

<script>
import { VclTable } from 'vue-content-loading'
import { mapActions, mapState } from 'vuex'
import mixinRoute from '@core/mixins/route'
import mixinTable from '@core/mixins/table'
import EmptySearchResult from '@components/shared/EmptySearchResult'
import MOdalUpdateAndRetryMapping from './components/ModalUpdateAndRetryMapping'
export default {
  name: 'ProductMappingList',
  mixins: [mixinRoute, mixinTable],
  components: {
    VclTable,
    EmptySearchResult,
    MOdalUpdateAndRetryMapping,
  },
  computed: {
    ...mapState('orderMapping', {
      orderMappingsFails: (state) => state.orderMappingFails,
      count: (state) => state.orderMappingFailsCount,
      products: (state) => state.productTypes,
    }),
    items() {
      return this.orderMappingsFails
    },
  },
  data() {
    return {
      isFetching: false,
      isVisibleRetryMapping: false,
      selectedOrderId: 0,
      actions: {
        retry: {
          title: 'Retry',
          isNeedConfirm: true,
        },
      },
    }
  },
  created() {
    this.filter = this.getRouteQuery()
  },
  methods: {
    ...mapActions('orderMapping', {
      fetchOrderMappingFails: 'fetchOrderMappingFails',
      fetchProductTypes: 'fetchProductTypes',
      retryOrderMappingFails: 'retryOrderMappingFails',
    }),

    async init() {
      this.isFetching = true
      this.handleUpdateRouteQuery()
      await Promise.all([
        this.fetchOrderMappingFails(this.filter),
        this.fetchProductTypes(),
      ])
      this.isFetching = false
    },
    updateAndRetryItem(item) {
      this.selectedOrderId = item.id
      this.isVisibleRetryMapping = true
    },
    async retryAllItems() {
      const responseRetry = await this.retryOrderMappingFails({
        ids: this.orderMappingsFails.map((order) => order.id),
      })
      if (!responseRetry || !responseRetry.success) {
        this.$toast.open({ type: 'error', message: responseRetry.message })
        this.isSaving = false
        return
      }
      await this.init()
      this.$set(this.action, 'selected', [])
      this.$toast.open({
        type: 'success',
        message: 'Retry successfully',
      })
    },
    async handleActionItem() {
      if (this.action.current === 'retry') {
        await this.retryAllItems()
        return
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
