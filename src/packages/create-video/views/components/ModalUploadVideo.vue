<template>
  <p-modal :active="visible" title="Upload Video" @close="handleClose">
    <template>
      <div align="center">
        <upload
          class="order-uploader"
          drag
          :headers="uploadHeaders"
          :on-change="handleChangeFile"
          :on-success="handleSuccess"
          :max-file-size="100000000"
          :before-upload="beforeUpload"
          accept=".mp4"
        >
          <img
            class="el-icon-upload"
            src="./../../../../assets/img/upload.png"
            alt=""
          />
          <div class="el-upload__text">
            Drop files to upload, or <em>browrse</em>
          </div>
          <div class="el-before-upload__text">
            No file chosen
          </div>
        </upload>
      </div>
    </template>

    <template slot="footer"> </template>
  </p-modal>
</template>

<script>
import mixinRoute from '@core/mixins/route'
import mixinTable from '@core/mixins/table'
import mixinUpload from '@core/mixins/upload'
import { Upload } from '@kit/index'

export default {
  name: 'ModalUploadVideo',
  mixins: [mixinRoute, mixinTable, mixinUpload],
  components: { Upload },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },

  computed: {},
  data() {
    return {}
  },
  methods: {
    handleClose() {
      this.visible = false
    },
  },
}
</script>
