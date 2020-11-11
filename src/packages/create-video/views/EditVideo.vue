<template>
  <div>
    <div class="page-video">
      <div class="text-center">
        <div class="container">
          <p class="jumbotron-heading mt-20">Thêm ảnh và video</p>
          <p class="text-description"
            >Chuyển bài viết của bạn thành video đơn giản nhanh chóng</p
          >
        </div>
      </div>
      <div class="container">
        <div class="card card-video">
          <div class="add-video">
            <video
              class="video"
              id="videoElement"
              controls
              poster="velocity-thumbnail.jpg"
              @canplay="updatePaused"
              @playing="updatePaused"
              @pause="updatePaused"
            >
              <source
                src="https://s3-ap-northeast-1.amazonaws.com/daniemon/demos/Velocity-Mobile.mp4"
                type="video/mp4"
                media="all and (max-width:680px)"
              />
              <source
                src="https://s3-ap-northeast-1.amazonaws.com/daniemon/demos/Velocity-Mobile.webm"
                type="video/webm"
                media="all and (max-width:680px)"
              />
              <source
                src="https://s3-ap-northeast-1.amazonaws.com/daniemon/demos/Velocity-SD.mp4"
                type="video/mp4"
              />
              <source
                src="https://s3-ap-northeast-1.amazonaws.com/daniemon/demos/Velocity-SD.webm"
                type="video/webm"
              />
              <p
                >Sorry, there's a problem playing this video. Please try using a
                different browser.</p
              >
            </video>

            <div class="controls">
              <p-button class=" btn-play" v-show="paused" @click="play"
                >&#9654;</p-button
              >
              <p-button class=" btn-play" v-show="playing" @click="pause"
                >&#9208;</p-button
              >
            </div>
            <div class="add">
              <p-button
                class="btn btn-primary btn-special"
                @click="visibleUploadModal"
                >Thêm video</p-button
              >
            </div>
            <br />
            <div class="progress">
              <div class="progress-bar" style="width:70%">70%</div>
            </div>
            <br />

            <div>
              <a href="#" class="btn btn-secondary" style="margin-right:600px"
                >Back</a
              >
              <a href="#" class="btn btn-secondary m-10">Cancel</a>
              <a href="#" class="btn btn-primary" @click.prevent="creatAudio()"
                >Next</a
              >
            </div>
          </div>
        </div>
      </div>
      <modal-upload-video :visible.sync="isVisibleUpload"></modal-upload-video>
    </div>
  </div>
</template>

<script>
import mixinRoute from '@core/mixins/route'
import mixinTable from '@core/mixins/table'
import ModalUploadVideo from './components/ModalUploadVideo'

export default {
  mixins: [mixinRoute, mixinTable],
  components: {
    ModalUploadVideo,
  },
  created() {
    this.filter = this.getRouteQuery()
  },
  data() {
    return {
      isVisibleUpload: false,
      videoElement: null,
      paused: null,
    }
  },

  methods: {
    updatePaused(event) {
      this.videoElement = event.target
      this.paused = event.target.paused
    },
    play() {
      this.videoElement.play()
    },
    pause() {
      this.videoElement.pause()
    },
    visibleUploadModal() {
      this.isVisibleUpload = true
    },
  },
  computed: {
    playing() {
      return !this.paused
    },
  },

  watch: {
    filter: {
      handler: function() {},
      deep: true,
    },
  },
}
</script>
