<template>
  <div class="page">
    <div class="page-header">
      <div class="d-flex align-items-center justify-content-between">
        <h1 class="page-title">Product Mapping Rules</h1>
        <div class="page-header-group-actions__right">
          <p-button @click="addNewRule">
            Add new rule
          </p-button>
        </div>
      </div>
    </div>
    <div class="page-content container-fluid">
      <div class="row">
        <div class="col-xl-12">
          <div class="card">
            <div class="card-body">
              <p-select
                placeholder="Filter by Lionnix product"
                class="mb-2"
                :value="filter.product_type_ids"
                @input="onProductTypeSelect"
              >
                <option :value="[]">All</option>
                <option
                  v-for="(product, index) in products"
                  :key="index"
                  :value="[product.id]"
                >
                  {{ product.name }}
                </option>
              </p-select>
              <VclTable class="my-20" v-if="isFetching"> </VclTable>
              <template v-else-if="orderMappingsList.length">
                <div class="table-responsive">
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th>Lionnix Product</th>
                        <th>Conditions</th>
                        <th>Date</th>
                        <th class="text-right">
                          <span class="mr-10">Action</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, i) in orderMappingsList" :key="i">
                        <td>{{ item.product_type_name }}</td>
                        <td>
                          <template
                            v-for="(rule, index) in item.rules"
                            class="d-flex"
                          >
                            <span :key="index">{{ getRulePhrase(rule) }}</span>
                            <span
                              :key="`${index}-badge`"
                              class="text-uppercase badge badge-round badge-default mx-2 vertical-align-bottom"
                              v-if="index < item.rules.length - 1"
                            >
                              {{ filterType(item) }}
                            </span>
                          </template>
                        </td>
                        <td>{{ item.created_at | date }}</td>
                        <td class="text-right">
                          <div class="d-flex justify-content-end">
                            <p-button
                              type="default"
                              icon="edit"
                              size="sm"
                              @click="editMapping(item)"
                            ></p-button>
                            <p-button
                              class="ml-2"
                              type="danger"
                              size="sm"
                              icon="close"
                              @click="showConfirmDeleteMapping(item)"
                            ></p-button>
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
                title="No product mappings found"
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
import { mapActions, mapState, mapMutations } from 'vuex'
import mixinRoute from '@core/mixins/route'
import mixinTable from '@core/mixins/table'
import EmptySearchResult from '@components/shared/EmptySearchResult'
import { types, productConditionRelations, conditionColumns } from '../constant'
import { FETCH_ORDER_MAPPINGS } from '../store'

export default {
  name: 'ProductMappingList',
  mixins: [mixinRoute, mixinTable],
  components: {
    VclTable,
    EmptySearchResult,
  },
  computed: {
    ...mapState('orderMapping', {
      orderMappingsList: (state) => state.orderMappingsList,
      count: (state) => state.orderMappingsCount,
      products: (state) => state.productTypes,
    }),
    filterType() {
      return (item) => {
        return item.disjunctive ? 'or' : 'and'
      }
    },
    getRulePhrase() {
      return (rule) => {
        const conditionTitle = conditionColumns.find(
          (column) => column.value === rule.column
        )
        const relationTitle = productConditionRelations.find(
          (relation) => relation.value === rule.relation
        )
        return `${conditionTitle.text} ${relationTitle.text} ${rule.condition}`
      }
    },
  },
  data() {
    return {
      isFetching: false,
      filter: {
        product_type_ids: [],
      },
    }
  },
  created() {
    this.filter = this.getRouteQuery()
  },
  methods: {
    ...mapActions('orderMapping', {
      fetchOrderMappingList: 'fetchOrderMappingList',
      fetchProductTypes: 'fetchProductTypes',
      deleteOrderMapping: 'deleteOrderMapping',
    }),
    ...mapMutations('orderMapping', {
      updateStateOrderMappings: FETCH_ORDER_MAPPINGS,
    }),
    async init() {
      this.isFetching = true
      this.handleUpdateRouteQuery()
      await Promise.all([
        this.fetchOrderMappingList({
          type: types.product_type,
          payload: this.filter,
        }),
        this.fetchProductTypes(),
      ])
      this.isFetching = false
    },
    showConfirmDeleteMapping(item) {
      this.$dialog.confirm({
        title: `Delete product mapping?`,
        message: `Are you sure you want to delete this product mapping?`,
        confirmText: 'Delete',
        onConfirm: () => this.deleteMapping(item),
        type: 'danger',
      })
    },
    async deleteMapping(item) {
      this.isFetching = true
      const response = await this.deleteOrderMapping({
        type: types.product_type,
        id: item.id,
      })
      if (response.success) {
        this.$toast.open({
          type: 'success',
          message: 'Your product mapping was deleted',
        })
        this.fetchOrderMappingList({
          type: types.product_type,
          payload: this.filter,
        })
      } else {
        this.$toast.open({
          type: 'error',
          message:
            response.message || 'Something went wrong. Please try again later',
        })
      }
      this.isFetching = false
    },
    editMapping(item) {
      this.$router.push({
        name: 'product-mapping-update',
        params: { id: item.id },
      })
    },
    addNewRule() {
      this.$router.push({
        name: 'product-mapping-_new',
      })
    },
    onProductTypeSelect(val) {
      this.filter.product_type_ids = val
    },
  },
  beforeRouteLeave(to, from, next) {
    this.updateStateOrderMappings([])
    next()
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
