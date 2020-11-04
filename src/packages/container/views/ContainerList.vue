<template>
  <div class="order-list-page page">
    <div class="page-content container-fluid">
      <div class="row">
        <div class="col-xl-12">
          <div class="card">
            <div class="card-body">
              <status-tab v-model="filter.status" :status="containerStatus" />
              <p-input
                placeholder="Tìm kiếm delivery order theo ID"
                prefixIcon="search"
                class="mb-2"
                type="username"
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
              <VclTable class="my-20" v-if="isFetching"> </VclTable>
              <template v-else-if="containers.length">
                <div class="table-responsive">
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th width="80">ID</th>
                        <th>Tổng tiền</th>
                        <th>Ngày</th>
                        <th>Trạng thái</th>
                        <th class="text-right">Chức năng</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in containers" :key="index">
                        <td width="80">
                          <router-link
                            class="text-no-underline"
                            :to="{
                              name: 'container-view',
                              params: { id: item.id },
                            }"
                          >
                            {{ item.id }}
                          </router-link>
                        </td>
                        <td>
                          <span v-if="item.status === 'pending'">
                            Pending
                          </span>
                          <span v-else>
                            {{ item.total_amount | formatPrice }}
                          </span>
                        </td>
                        <td>
                          {{ item.created_at | date }}
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
                                name: 'container-view',
                                params: { id: item.id },
                              }"
                            >
                              <p-icon name="eye" iconPack="md"></p-icon>
                            </router-link>
                          </p-popover>
                          <p-popover
                            class="mx-10"
                            placement="top"
                            trigger="hover"
                            type="dark"
                            content="Tải xuống"
                            compact
                          >
                            <a
                              slot="reference"
                              href="#"
                              @click.prevent="handleExportContainer(item.id)"
                            >
                              <p-icon
                                name="long-arrow-down "
                                iconPack="md"
                              ></p-icon>
                            </a>
                          </p-popover>
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
              <template v-else>
                <EmptySearchResult
                  title="Không tìm thấy delivery order"
                ></EmptySearchResult>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VclTable } from 'vue-content-loading'
import { mapState, mapActions } from 'vuex'
import mixinRoute from '@core/mixins/route'
import mixinTable from '@core/mixins/table'
import { FETCH_CONTAINERS } from '../store/types'
import { CONTAINER_STATUS } from '../constants'
import EmptySearchResult from '@components/shared/EmptySearchResult'
import StatusTab from '@components/shared/StatusTab'
import mixinContainerExport from '@/packages/container/mixins/container-export'

export default {
  name: 'ContainerList',
  mixins: [mixinRoute, mixinTable, mixinContainerExport],
  components: {
    StatusTab,
    VclTable,
    EmptySearchResult,
  },
  computed: {
    ...mapState('container', {
      count: (state) => state.containerCount,
      containers: (state) => state.containers,
    }),
    containerStatus() {
      return CONTAINER_STATUS
    },
    notFoundImage() {
      return require('@assets/img/notfound.svg')
    },
  },
  data() {
    return {
      isFetching: true,
      result: {},
      actions: {},
    }
  },
  created() {
    this.filter = this.getRouteQuery()
  },
  methods: {
    ...mapActions('container', [FETCH_CONTAINERS]),

    async handleFetchContainers() {
      this.isFetching = true
      this.handleUpdateRouteQuery()
      this.result = await this.fetchContainers(this.filter)
      this.isFetching = false
    },

    handleActionItem() {},
  },
  watch: {
    filter: {
      handler: function() {
        this.handleFetchContainers()
      },
      deep: true,
    },
  },
}
</script>
