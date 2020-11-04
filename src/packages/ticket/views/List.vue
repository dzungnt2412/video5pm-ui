<template>
  <div>
    <p-input
      placeholder="Tìm kiếm ticket theo Mã đơn hàng/Tiêu đề"
      prefixIcon="search"
      class="mb-2 taf"
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
        <p-button type="default" slot="trigger" @click="handlerShowModalFilter">
          <span class="mr-10">Lọc nâng cao</span>
        </p-button>
        <p-dropdown class="ml-20" :dropdown-class="'dropdown-menu-right'">
          <p-button type="dark" slot="trigger">
            <span class="mr-10">Sắp xếp</span>
            <p-icon :icon-pack="'md'" name="swap-vertical"></p-icon>
          </p-button>
          <template>
            <p-dropdown-item @click="onSort('created_at:desc')"
              >Ngày tạo mới nhất</p-dropdown-item
            >
            <p-dropdown-item @click="onSort('created_at:asc')"
              >Ngày tạo cũ nhất</p-dropdown-item
            >
            <p-dropdown-item @click="onSort('updated_at:desc')"
              >Ngày trả lời mới nhất</p-dropdown-item
            >
            <p-dropdown-item @click="onSort('updated_at:asc')"
              >Ngày trả lời cũ nhất</p-dropdown-item
            >
          </template>
        </p-dropdown>
      </template>
    </p-input>
    <div class="card">
      <div class="card-body">
        <div class="d-filters">
          <!-- eslint-disable -->
          <div
            v-for="(item, key) in filter"
            :key="key"
            v-if="item && filterKeyShow.indexOf(key) !== -1"
            class="badge badge-lg badge-outline badge-dark"
          >
            <span>{{ key | textKeyFilter }}: {{ item }}</span>
            <a href="#" @click="filter[key] = ''"
              ><p-icon name="close-mini"></p-icon
            ></a>
          </div>
          <!-- eslint-enable -->
        </div>
        <VclTable class="my-20" v-if="isFetching"></VclTable>
        <template v-else-if="tickets.length">
          <div class="table-responsive-xl">
            <table class="table table-hover table-border">
              <thead>
                <tr>
                  <th width="50">ID</th>
                  <th>Tiêu đề</th>
                  <th>Mã đơn hàng</th>
                  <th class="text-right">Ngày tạo</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in tickets" :key="index">
                  <td>{{ item.id }}</td>
                  <td>
                    <router-link
                      class="text-no-underline"
                      slot="reference"
                      :to="{
                        name: 'ticket-view',
                        params: { id: item.id },
                      }"
                    >
                      <strong>{{ truncate(item.subject, 50) }}</strong>
                    </router-link>
                  </td>
                  <td>{{ item.ref_id }}</td>
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
          title="Không tìm thấy ticket"
        ></EmptySearchResult>
      </div>
    </div>
    <modal-filter
      :visible.sync="showModalFilter"
      :categories="categories"
      @update="handlerFilterAdvanced"
    ></modal-filter>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import EmptySearchResult from '@components/shared/EmptySearchResult'
import debounce from 'lodash/debounce'
import mixinRoute from '@core/mixins/route'
import mixinTable from '@core/mixins/table'
import { VclTable } from 'vue-content-loading'
import ModalFilter from './components/ModalFilter'
import { truncate } from '@core/utils/string'

export default {
  name: 'TicketList',
  mixins: [mixinRoute, mixinTable],
  components: {
    EmptySearchResult,
    VclTable,
    ModalFilter,
  },
  data() {
    return {
      showModalFilter: false,
      isFetching: false,
      result: {},
      filterKeyShow: [
        'support',
        'search',
        'category',
        'seller',
        'accountant',
        'start_date',
        'end_date',
        'sort',
      ],
      filter: {
        page: 1,
        search: '',
        sort: '',
        limit: 50,
      },
    }
  },
  filters: {
    textKeyFilter(v) {
      return v.replace('_', ' ')
    },
  },
  computed: {
    ...mapState('ticket', {
      tickets: (state) => state.tickets,
      count: (state) => state.count,
      categories: (state) => state.categories,
    }),

    ticketStatus() {
      return ['open', 'process', 'close']
    },
  },
  created() {
    this.filter = this.getRouteQuery()
  },
  methods: {
    truncate,
    ...mapActions('ticket', ['fetchTickets', 'fetchCategories']),

    async init() {
      this.isFetching = true
      this.handleUpdateRouteQuery()
      this.result = await this.fetchTickets(this.filter)
      await this.fetchCategories()
      this.isFetching = false
    },

    handleSearch: debounce(function(e) {
      this.filter.search = e.target.value
    }, 500),

    handlerCreateTicket() {
      this.$router.push({ name: 'ticket-form' })
    },

    onSort(order) {
      this.filter.sort = order
    },
    handlerShowModalFilter() {
      this.showModalFilter = true
    },

    handlerFilterAdvanced(v) {
      this.filter = Object.assign(this.filter, v)
      this.init()
      this.showModalFilter = false
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
