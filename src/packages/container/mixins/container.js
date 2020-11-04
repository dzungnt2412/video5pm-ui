import { mapActions } from 'vuex'
import { UPDATE_CONTAINER } from '@/packages/container/store/types'
import {
  ORDER_STATUS_CANCELED,
  ORDER_STATUS_PROCESS,
  ORDER_STATUS_PENDING,
  ORDER_STATUS_DRAFT,
} from '@core/constants'

export default {
  data() {
    return {
      isContainerUpdating: false,
      containerTotalAmount: 0,
      resultUpdateContainer: {},
      updateContainerStatus: '',
    }
  },
  computed: {
    isAllowUpdateCancel() {
      return (
        this.container.status === ORDER_STATUS_DRAFT ||
        this.container.status === ORDER_STATUS_PENDING
      )
    },
  },
  methods: {
    ...mapActions('container', [UPDATE_CONTAINER]),

    /**
     * Handle update container
     * @param newVal
     * @return {Promise<boolean>}
     */
    async handleUpdateContainer(newVal) {
      this.isContainerUpdating = true
      const payload = Object.assign({}, this.container, newVal)
      this.resultUpdateContainer = await this.updateContainer(payload)
      this.isContainerUpdating = false

      if (this.resultUpdateContainer.success) {
        this.handleFetchOrders()
        this.$toast.open({
          type: 'success',
          message: 'Cập nhật delivery order thành công',
        })
        return true
      }

      this.$toast.open({
        type: 'error',
        message: this.resultUpdateContainer.message,
      })
      return false
    },

    confirmUpdateContainer(action) {
      this.$dialog.confirm({
        message: 'Are you sure you want to do this?',
        onConfirm: () => this.onUpdateContainerActionConfirm(action),
      })
    },

    async onUpdateContainerActionConfirm(action) {
      const payload = {}
      switch (action) {
        case 'canceled':
          payload.status = ORDER_STATUS_CANCELED
          break
        case 'process':
          payload.status = ORDER_STATUS_PROCESS
      }

      this.handleUpdateContainer(payload)
    },
  },
}
