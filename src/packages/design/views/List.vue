<template>
  <div class="design-page page">
    <div class="page-header">
      <div class="page-header-group-actions__right">
        <p-button @click="handleVisibleCreateDesign">
          Thêm design
        </p-button>
      </div>
    </div>
    <div class="page-content container-fluid">
      <div class="row">
        <div class="col-xl-12">
          <div class="card">
            <div class="card-body">
              <p-input
                placeholder="Tìm kiếm design theo SKU"
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
              <VclTable class="my-20" v-if="isFetching"> </VclTable>
              <template v-else-if="designItems && designItems.length">
                <div class="row list-design mb-20">
                  <div
                    class="col-6 col-sm-4 col-md-2 list-design-item"
                    v-for="(item, index) in designItems"
                    :key="index"
                  >
                    <div class="list-design-item-content-wrapper">
                      <router-link
                        :title="item.sku"
                        :to="{ name: 'design-edit', params: { id: item.id } }"
                      >
                        <img
                          src="@assets/img/folder.png"
                          width="35"
                          class="list-design-item__icon"
                          alt=""
                        />
                        <span>{{ item.sku }}</span>
                      </router-link>
                    </div>
                  </div>
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
                title="Không tìm thấy design"
              ></EmptySearchResult>
            </div>
          </div>
        </div>
      </div>
    </div>

    <modal-create-design
      :visible.sync="isVisibleCreateDesign"
      :create-design="createDesign"
      v-if="isVisibleCreateDesign"
      @created="handleCreateDesignDesign"
    />
  </div>
</template>

<script>
import EmptySearchResult from '@components/shared/EmptySearchResult'
import { mapActions, mapState } from 'vuex'
import { VclTable } from 'vue-content-loading'
import debounce from 'lodash/debounce'
import mixinRoute from '@core/mixins/route'
import mixinTable from '@core/mixins/table'
import mixinCreateDesign from '../mixins/create-design'
import { FETCH_DESIGNS } from '../store'
import ModalCreateDesign from './components/ModalCreateDesign'

export default {
  name: 'DesignList',
  mixins: [mixinRoute, mixinTable, mixinCreateDesign],
  components: {
    VclTable,
    ModalCreateDesign,
    EmptySearchResult,
  },
  computed: {
    ...mapState('design', {
      designs: (state) => state.designs,
      count: (state) => state.count,
    }),
    designItems() {
      return this.designs && this.filter.search
        ? this.designs.filter(
            ({ sku }) =>
              sku.toLowerCase().indexOf(this.filter.search.toLowerCase()) !== -1
          )
        : this.designs
    },
    designIcon() {
      return './img/folder.png'
    },
  },
  data() {
    return {
      isFetching: false,
      result: {},
      filter: {
        page: 1,
        search: '',
        limit: 50,
        user_id: 0,
      },
      actions: {
        delete: {
          title: 'Delete',
          isNeedConfirm: false,
        },
      },
    }
  },
  created() {
    this.filter = this.getRouteQuery()
  },
  methods: {
    ...mapActions('design', [FETCH_DESIGNS]),

    async init() {
      this.isFetching = true
      this.handleUpdateRouteQuery()
      this.result = await this.fetchDesigns(this.filter)
      this.isFetching = false
    },

    handleActionItem() {},

    handleSearch: debounce(function(e) {
      // Default result after search in page 1
      this.filter.page = 1
      this.filter.search = e.target.value
    }, 500),
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
