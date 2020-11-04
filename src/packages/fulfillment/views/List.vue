<template>
  <div class="page">
    <div class="page-content">
      <button
        class="btn btn-primary mb-25 mr-25 float-right"
        @click="exportExcel"
        >Export</button
      >
      <div style="clear:both"></div>
      <div class="row">
        <div class="col-11">
          <p-datepicker
            placeholder="Tìm kiếm ticket theo Mã đơn hàng/Tiêu đề"
            prefixIcon="search"
            class="mb-2 taf"
            type="search"
            style="width:100%"
            @update="changeDate"
          ></p-datepicker>
        </div>
        <div class="col-1">
          <p-button icon="search" @click="fetch">Search</p-button>
        </div>
      </div>
    </div>
    <div class="page-content container-fluid">
      <div class="row">
        <div class="col-xl-12">
          <VclTable class="my-20" v-if="isFetching"></VclTable>
          <template v-else-if="fulfillments.length">
            <div class="table-responsive-xl">
              <table class="table table-hover table-border">
                <thead>
                  <tr>
                    <th>Order Number</th>
                    <th>Tracking Company</th>
                    <th>Tracking Number</th>
                    <th>Tracking URL</th>
                    <th class="text-right">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in fulfillments" :key="index">
                    <td>{{ item.order ? item.order.ref_id : '' }}</td>
                    <td>{{ item.tracking_company }}</td>
                    <td>{{ item.tracking_number }}</td>
                    <td>
                      <a :href="item.tracking_url" target="_blank">
                        {{ item.tracking_url }}
                      </a>
                    </td>
                    <td class="text-right">{{
                      item.created_at | datetime('dd/MM/yyyy HH:mm')
                    }}</td>
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
            title="Không tìm thấy fulfillment"
          ></EmptySearchResult>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EmptySearchResult from '@components/shared/EmptySearchResult'
import { mapState, mapActions } from 'vuex'
import mixinRoute from '@core/mixins/route'
import { VclTable } from 'vue-content-loading'
import mixinTable from '@core/mixins/table'
import mixinExportOrder from '@/packages/container/mixins/export-file'
import { FULLFILL_EXPORT_BUCKET } from '@core/constants/storage'
export default {
  name: 'FulfillmentList',
  mixins: [mixinRoute, mixinTable, mixinExportOrder],
  components: {
    EmptySearchResult,
    VclTable,
  },
  data: () => ({
    isFetching: false,
    filter: {
      page: 1,
      search: '',
      limit: 50,
      user_id: 0,
    },
  }),
  computed: {
    ...mapState('fulfillment', {
      fulfillments: (state) => state.fulfillments,
      count: (state) => state.count,
      download: (state) => state.download,
    }),
  },
  created() {
    this.filter = this.getRouteQuery()

    this.fetch()
  },
  methods: {
    ...mapActions('fulfillment', [
      'fetchFulfillments',
      'countFulfillments',
      'exportFulfillments',
    ]),

    async fetch() {
      this.isFetching = true
      this.handleUpdateRouteQuery()

      const result = await this.fetchFulfillments(this.filter)

      if (!result.success) {
        this.$notify({
          title: 'Alert',
          type: 'error',
          text: 'Server Error',
        })
      }

      this.isFetching = false
    },

    changeDate(date) {
      this.date = date

      this.filter = {
        ...this.filter,
        create_start_date: date.startDate.toISOString().split('T')[0],
        create_end_date: date.endDate.toISOString().split('T')[0],
      }
    },
    async exportExcel() {
      if (!this.filter.create_end_date || !this.filter.create_start_date) {
        return this.$notify({
          title: 'Alert',
          type: 'error',
          text: 'Please choose the time to export',
        })
      }

      const timePerDay = 24 * 60 * 60 * 1000
      const endDate = new Date(this.filter.create_end_date)
      const startDate = new Date(this.filter.create_start_date)
      const days = (endDate - startDate) / timePerDay // 1 day

      if (days > 7) {
        return this.$notify({
          title: 'Alert',
          type: 'error',
          text: 'Export : Max 7 days',
        })
      }

      this.handleUpdateRouteQuery()

      const result = await this.exportFulfillments(this.filter)

      this.exportFile(result, `fullfill-export.csv`, FULLFILL_EXPORT_BUCKET)
    },
  },
  watch: {
    filter: {
      handler: function() {
        this.fetch()
      },
      deep: true,
    },
  },
}
</script>
