<template>
  <p-modal
    :active="visible"
    title="Tạo thư mục design mới"
    @close="handleClose"
  >
    <div
      class="form-group"
      :class="[
        { 'has-success': !errors.has('sku') },
        { 'has-danger': errors.has('sku') },
      ]"
    >
      <label for="sku" class="form-control-label">
        SKU
      </label>
      <p-input
        v-model="sku"
        name="sku"
        id="sku"
        v-validate="'required|alpha_dash|min:3'"
      >
      </p-input>
      <span class="invalid-feedback" v-if="errors.has('sku')">
        {{ errors.first('sku') }}
      </span>
    </div>

    <template slot="footer">
      <p-button type="default" @click="handleClose" :disable="loading">
        Cancel
      </p-button>
      <p-button type="primary" @click="handleCreateDesign" :disable="loading">
        Tạo
      </p-button>
    </template>
  </p-modal>
</template>

<script>
export default {
  name: 'ModalChangeDesign',
  props: {
    visible: {
      type: Boolean,
      default: true,
    },
    createDesign: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      sku: '',
      loading: false,
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false)
    },

    async handleCreateDesign() {
      const validate = await this.$validator.validateAll()

      if (!validate) {
        return
      }

      this.loading = true
      const result = await this.createDesign({ sku: this.sku })
      this.loading = false

      if (result && result.success) {
        this.$emit('created', result.id)
      } else {
        this.$toast.open({
          message: result.message,
          type: 'error',
        })
      }
    },
  },
}
</script>
