<template>
  <div class="page">
    <div class="page-header">
      <div class="d-flex align-items-center justify-content-between">
        <h1 class="page-title">Option Mapping Rules</h1>
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
                        <th>Options</th>
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
                          <div
                            v-for="(line, index) in formatDisplayRules(item)"
                            class="d-flex"
                            :key="index"
                          >
                            {{ line }}
                          </div>
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
                title="No option mappings found"
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
import { types } from '../constant'
import { FETCH_ORDER_MAPPINGS } from '../store'
export default {
  name: 'OptionMappingList',
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
    formatDisplayRules() {
      return (item) => {
        if (!item.rules || item.rules.length === 0) {
          return []
        }
        return item.rules
          .reduce((acc, rule) => {
            if (rule.column === 'option_set') {
              acc.push({
                name: rule.condition,
                values: [],
              })
            } else {
              acc[acc.length - 1].values.push(rule.condition)
            }
            return acc
          }, [])
          .map((optionSet) => {
            return optionSet.values.join(', ')
          })
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
          type: types.option,
          payload: this.filter,
        }),
        this.fetchProductTypes(),
      ])
      this.isFetching = false
    },
    showConfirmDeleteMapping(item) {
      this.$dialog.confirm({
        title: `Delete option mapping?`,
        message: `Are you sure you want to delete this option mapping?`,
        confirmText: 'Delete',
        onConfirm: () => this.deleteMapping(item),
        type: 'danger',
      })
    },
    async deleteMapping(item) {
      this.isFetching = true
      const response = await this.deleteOrderMapping({
        type: types.option,
        id: item.id,
      })
      if (response.success) {
        this.$toast.open({
          type: 'success',
          message: 'Your option mapping was deleted',
        })
        this.fetchOrderMappingList({
          type: types.option,
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
        name: 'option-mapping-update',
        params: { id: item.id },
      })
    },
    addNewRule() {
      this.$router.push({
        name: 'option-mapping-_new',
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
