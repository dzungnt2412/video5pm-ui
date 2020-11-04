<template>
  <div class="page">
    <div class="page-content container-fluid">
      <div class="row">
        <div class="col-xl-12">
          <div class="card">
            <div class="card-body">
              <VclTable class="my-20" v-if="isFetching"> </VclTable>
              <template v-else-if="shops.length">
                <div class="table-responsive">
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th width="80">ID</th>
                        <th>Tên shop</th>
                        <th>Domain</th>
                        <th>Ngày</th>
                        <th class="text-right"> </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, i) in shops" :key="i">
                        <td>{{ item.id }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.domain }}</td>
                        <td>{{ item.created_at | date }}</td>
                        <td class="text-right">
                          <p-popover
                            class="mx-10"
                            placement="top"
                            trigger="hover"
                            type="dark"
                            content="Sao chép API key"
                            compact
                          >
                            <a
                              slot="reference"
                              href="#"
                              @click.prevent="handleCopyApiKey(item.api_key)"
                            >
                              <p-icon name="copy" iconPack="md"></p-icon>
                            </a>
                          </p-popover>
                          <p-popover
                            class="mx-10"
                            placement="top"
                            trigger="hover"
                            type="dark"
                            content="Sửa thông tin"
                            compact
                          >
                            <router-link
                              slot="reference"
                              :to="{
                                name: 'shop-edit',
                                params: { id: item.id },
                              }"
                            >
                              <p-icon name="edit" iconPack="md"></p-icon>
                            </router-link>
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
              <EmptySearchResult
                v-else
                title="No shops found"
              ></EmptySearchResult>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VclTable } from 'vue-content-loading'
import { mapActions, mapState } from 'vuex'
import mixinRoute from '@core/mixins/route'
import mixinTable from '@core/mixins/table'
import EmptySearchResult from '@components/shared/EmptySearchResult'
import { FETCH_SHOPS } from '../store'

export default {
  name: 'ShopList',
  mixins: [mixinRoute, mixinTable],
  components: {
    VclTable,
    EmptySearchResult,
  },
  computed: {
    ...mapState('shop', {
      shops: (state) => state.shops,
    }),
    ...mapState('shared', {
      shopList: (state) => state.shops,
      count: (state) => state.countShop,
    }),
  },
  data() {
    return {
      isFetching: false,
      result: {},
    }
  },
  created() {
    this.filter = this.getRouteQuery()
  },
  methods: {
    ...mapActions('shop', [FETCH_SHOPS]),
    ...mapActions('shared', {
      fetchShopList: FETCH_SHOPS,
    }),

    async init() {
      this.isFetching = true
      this.handleUpdateRouteQuery()
      this.result = await this.fetchShops(this.filter)
      this.isFetching = false
    },

    async handleCopyApiKey(key) {
      try {
        await this.$copyText(key)
        this.$toast.open('Copied')
      } catch (e) {
        this.$toast.open({
          type: 'error',
          text: 'Có lỗi xảy ra. Vui lòng thử lại.',
        })
      }
    },

    handleActionItem() {},
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
