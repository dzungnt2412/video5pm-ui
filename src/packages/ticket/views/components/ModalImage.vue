<template>
  <div class="img-modal" :class="{ active: isShow }">
    <span class="close" @click="handleClose">&times;</span>
    <div class="modal-content">
      <img class="img" :src="src" />
      <div class="caption"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalZoomImage',
  props: {
    src: {
      type: String,
      default: '',
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isShow: this.visible,
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false)
    },
  },
  watch: {
    visible(value) {
      this.isShow = value
    },
  },
}
</script>
