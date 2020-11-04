import { mapActions } from 'vuex'
import { UPDATE_ORDER } from '@/packages/container/store/types'
import { cloneDeep } from '@core/utils'
import { ACL_KEYS, ORDER_STATUS_UNPAID } from '@core/constants'

export default {
  methods: {
    ...mapActions('container', [UPDATE_ORDER]),

    async handleRejectOrders(order, status) {
      const payload = cloneDeep(order)
      payload.status = status

      const result = await this.updateOrder(payload)

      if (result.success) {
        this.$toast.open({
          type: 'success',
          message: 'Cập nhập đơn hàng thành công',
        })
      } else {
        this.$toast.open({
          type: 'error',
          message: result.message,
        })
      }
    },

    isAllowRejectOrder(order) {
      if (!this.$hasAuthorize(ACL_KEYS.rejectOrder)) {
        return false
      }

      // Todo: Allow cancel with some status
      return [ORDER_STATUS_UNPAID].indexOf(order.status) !== -1
    },
  },
}
