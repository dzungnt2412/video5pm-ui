<template>
  <p-modal :title="title" :active.sync="isVisible" @close="handleClose">
    <slot name="prepend"></slot>
    <div
      class="form-group"
      :class="[{ 'has-success': !error }, { 'has-danger': error }]"
    >
      <p-upload v-model="file" :accept="accept">
        <div class="btn btn-primary">
          <p-icon name="upload"></p-icon>
          <span class="ml-10">Chọn file</span>
        </div>
      </p-upload>
      <span class="ml-10" v-if="!file"></span>
      <span class="ml-10" v-else>{{ file.name }}</span>
      <span class="invalid-feedback" v-if="error">
        {{ error }}
      </span>
    </div>
    <slot />

    <template slot="footer">
      <p-button type="default" @click="handleClose">
        <span>Cancel</span>
      </p-button>
      <p-button
        type="primary"
        @click="handleSave"
        :disabled="!file && uploading"
      >
        <span>Upload file</span>
      </p-button>
    </template>
  </p-modal>
</template>

<script>
export default {
  name: 'ModalImport',
  props: {
    visible: {
      type: Boolean,
    },
    title: {
      type: String,
      default: '',
    },
    supportUrl: {
      type: String,
      default: '',
    },
    uploading: {
      type: Boolean,
      default: false,
    },
    accept: {
      type: [Object, Array, String],
      default: '',
    },
    error: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isSubmit: false,
      file: null,
      isVisible: false,
      isValid: true,
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false)
    },
    handleSave() {
      if (this.uploading) {
        console.log('selected')
        return
      }
      this.$emit('selected', this.file)
    },
    handleFileChange(e) {
      const files = e.target.files || e.dataTransfer.files

      if (files.length) {
        this.file = files[0]
      }
    },
  },
  watch: {
    file: {
      handler: function(val) {
        this.file = val
      },
      immediate: true,
    },
    visible: {
      handler: function(val) {
        this.isVisible = val
      },
      immediate: true,
    },
  },
}
</script>
