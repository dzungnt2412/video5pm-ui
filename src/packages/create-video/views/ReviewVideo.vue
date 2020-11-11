<template>
  <div>
    <div class="page-video">
      <div class="text-center">
        <div class="container">
          <p class="jumbotron-heading mt-20"
            >Chúc mừng ! Video của bạn đã hoàn thành</p
          >
          <p class="text-description">Share it to the world, bro</p>
        </div>
      </div>
      <div class="container">
        <div class="card card-video">
          <div class="add-video">
            <video
              class="video"
              style="width: 100%"
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

            <div>
              <a href="/create-video" class="btn btn-secondary m-10"
                >Customize</a
              >
              <a href="#" class="btn btn-secondary" style="margin-right:550px"
                >Share</a
              >
              <a href="#" class="btn btn-primary" @click.prevent="creatAudio()"
                >Publish</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixinRoute from '@core/mixins/route'
import mixinTable from '@core/mixins/table'

export default {
  mixins: [mixinRoute, mixinTable],
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
