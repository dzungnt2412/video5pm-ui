import { mapState, mapActions } from 'vuex'
import { UPDATE_ORDER } from '@/packages/container/store/types'
import { FETCH_COUNTRIES } from '@/packages/shared/store'
import {
  ACL_KEYS,
  ORDER_STATUS_DRAFT,
  ORDER_STATUS_PENDING,
  ORDER_STATUS_UNPAID,
  // ORDER_STATUS_PAID,
} from '@core/constants'

export default {
  computed: {
    ...mapState('shared', {
      countries: (state) => state.countries,
    }),
    isAllowCancel() {
      return (
        this.order.status === ORDER_STATUS_DRAFT ||
        this.order.status === ORDER_STATUS_PENDING
      )
    },
  },
  data() {
    return {
      isVisibleEditOrder: false,
      isOrderUpdating: false,
      trackingUpdate: {},
    }
  },
  mounted() {
    this.handleFetchCountries()
  },
  methods: {
    ...mapActions('container', [UPDATE_ORDER]),
    ...mapActions('shared', [FETCH_COUNTRIES]),

    handleVisibleModalUpdateOrder() {
      this.isVisibleEditOrder = true
    },

    async handleFetchCountries() {
      this.fetchCountries()
    },

    handleHasProvince() {},

    isAllowUpdateOrder(order) {
      return (
        this.$hasAuthorize(ACL_KEYS.updateOrder) &&
        (!this.$isSeller() ||
          order.status === ORDER_STATUS_PENDING ||
          order.status === ORDER_STATUS_UNPAID)
      )
    },
  },
  watch: {
    hasProvince: function(val) {
      this.handleHasProvince(val)
    },
  },
}
