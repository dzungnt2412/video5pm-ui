<template>
  <div >
    <div class="page-video">
      <div class="text-center">
        <div class="container">
          <p class="jumbotron-heading mt-80">Nhập nội dung</p>
          <p class="text-description"
            >Chuyển bài viết của bạn thành video đơn giản nhanh chóng</p
          >
        </div>
      </div>
      <div class="container">
        <div class="card card-video">
          <p class="card-title">Tiêu đề video</p>
          <p-input
            placeholder="Nhập tiêu đề video"
            class="mb-2"
            v-model="title"
          />
          <br />
          <p-input
            placeholder="Nhập nội dung..."
            class="mb-2"
            type="textarea"
            v-model="content"
          />
          <div class="d-flex flex-row-reverse">
            <p-button
              class=" ml-10 mt-30 btn btn-primary"
              :loading="isFetching"
              @click="createVideo"
            >
              Next
            </p-button>
            <p-button
              class="ml-10 mt-30 btn btn-secondary"
              @click="Cancel"
            >
              Cancel
            </p-button>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.jumbotron {
  background-color: white !important;
}

</style>

<script>
import { mapActions, mapState } from 'vuex'

import mixinRoute from '@core/mixins/route'
import { CREATE_VIDEO_PREVIEW, } from '../store'
import Storage from '@core/helpers/storage'
export default {
  mixins: [mixinRoute,],
  computed:{
    ...mapState('video', {
      video: (state) => state.video,
    }),

  },
  data() {
    return {
      isFetching: false,
      result: {},
      actions: {},
      title: "",
      content: "",
    }
  },

  methods: {
    ...mapActions('video', [CREATE_VIDEO_PREVIEW,]),

    async createVideo() {
      Storage.set("video", null)
      Storage.set("lengthPrevious", 0)
      this.isFetching = true
      if (this.title == "" || this.content == "") {
        this.$toast.open({
          type: 'error',
          message: "Title or content must required",
        })
        this.isFetching = false
        return
      }
      let formData = new FormData()
      formData.append('text', this.content)
      formData.append('user_id', 1)
      formData.append('title', this.title)

      const result = await this.createVideoPreview(formData)

      if (!result.success) {
        this.$toast.open({ message: result.message, type: 'error' })
        this.isFetching = false
        return
      }

      Storage.set("video", this.video)

      this.$router.push('/edit-video')

    },


  },

}
</script>
