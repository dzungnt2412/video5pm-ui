<template>
  <p-modal
    :active="visible"
    title="Tạo hoặc thêm đơn hàng vào delivery order"
    @close="handleClose"
  >
    <p-alert
      title="Bạn chỉ được chọn các đơn có trạng thái Pending"
      type="danger"
      v-if="isHasInvalidOrders"
    >
    </p-alert>
    <slot name="prepend"></slot>
    <div class="form-group">
      <label class="form-control-label">
        Bạn có muốn thêm đơn hàng vào delivery order đã được tạo trước đó?
      </label>
      <p-select v-model="selectedContainer">
        <option :value="0">No</option>
        <option v-for="(item, i) in containers" :key="i" :value="item.id">
          Order number: {{ item.ref_id }} - Ngày:
          {{ item.created_at | datetime }}
        </option>
      </p-select>
    </div>
    <template slot="footer">
      <p-button type="default" :disabled="loading" @click="handleClose">
        Cancel
      </p-button>
      <p-button
        type="primary"
        :loading="loading"
        :disabled="loading"
        @click.prevent="handleSave"
      >
        {{ buttonText }}
      </p-button>
    </template>
  </p-modal>
</template>

<script>
import { ORDER_STATUS_PENDING } from '@core/constants'

export default {
  name: 'ModalCreateOrAppendContainer',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    orders: {
      type: Array,
      default: () => [],
    },
    containers: {
      type: Array,
      default: () => [],
    },
    fetchContainers: {
      type: Function,
      default: () => {},
    },
    shopId: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    availableOrders() {
      return this.orders.filter(({ status }) => status === 'pending')
    },
    isHasInvalidOrders() {
      return this.availableOrders.length < this.orders.length
    },
    buttonText() {
      return this.selectedContainer ? 'Gán vào delivery order' : 'Create'
    },
  },
  data() {
    return {
      isFetching: false,
      selectedContainer: 0,
    }
  },
  mounted() {
    this.handleFetchContainers()
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false)
    },

    async handleFetchContainers() {
      this.isFetching = true
      const payload = {
        status: ORDER_STATUS_PENDING,
        limit: 250,
      }

      const result = await this.fetchContainers(payload)
      this.isFetching = false

      if (!result.success) {
        this.$toast.open({ type: 'error', message: result.message })
      }
    },

    handleSave() {
      const ids = this.availableOrders.map(({ id }) => id)
      this.$emit('save', {
        ids,
        containerId: this.selectedContainer,
      })
    },
  },
}
</script>
