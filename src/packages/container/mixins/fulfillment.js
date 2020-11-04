export default {
  data() {
    return {
      isUpTracking: false,
      isVisibleEditOrderTracking: false,
    }
  },
  methods: {
    handleVisibleModalUpdateOrderTracking(item) {
      this.trackingUpdate = item
      this.isVisibleEditOrderTracking = true
    },

    handleVisibleModalCreateOrderTracking() {
      this.isVisibleCreateOrderTracking = true
    },
  },
}
