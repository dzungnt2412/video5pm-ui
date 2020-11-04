<template>
  <p-modal :active.sync="visible" :title="title" @close="handleClose">
    <slot />
    <template slot="footer">
      <p-button type="default" @click="handleClose">
        OK
      </p-button>
    </template>
  </p-modal>
</template>

<script>
export default {
  name: 'ModalPreviewImport',
  props: {
    title: {
      type: String,
      default: 'Preview import',
    },
    importing: {
      type: Boolean,
      default: false,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    displayImport: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    handleImport() {
      this.$emit('startImport')
    },

    handleClose() {
      this.$emit('update:visible', false)
      this.$emit('close')
      location.reload()
    },
  },
}
</script>
