<template>
  <div>
    <div class="order-list-page page">
      <div class="text-center">
        <div class="container">
          <h1 class="jumbotron-heading mt-100">Them anh va video</h1>
          <p class="lead text-muted">Chuyển bài viết của bạn thành video đơn giản nhanh chóng</p>
        </div>
      </div>
      <div class="container">
        <div class="card">
            <div class="video">
                  <video id="videoElement" controls poster="velocity-thumbnail.jpg"
                    @canplay="updatePaused" @playing="updatePaused" @pause="updatePaused">
                        <source src="https://s3-ap-northeast-1.amazonaws.com/daniemon/demos/Velocity-Mobile.mp4" type="video/mp4" media="all and (max-width:680px)"> 
                        <source src="https://s3-ap-northeast-1.amazonaws.com/daniemon/demos/Velocity-Mobile.webm" type="video/webm" media="all and (max-width:680px)"> 
                        <source src="https://s3-ap-northeast-1.amazonaws.com/daniemon/demos/Velocity-SD.mp4" type="video/mp4">
                        <source src="https://s3-ap-northeast-1.amazonaws.com/daniemon/demos/Velocity-SD.webm" type="video/webm">
                        <p>Sorry, there's a problem playing this video. Please try using a different browser.</p>
                    </video>

  <div class="controls">
    <button v-show="paused" @click="play">&#9654;</button>
    <button v-show="playing" @click="pause">&#9208;</button>
  </div>
            </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style>
    .jumbotron{
        background-color: white !important;
    }
</style>

<script>
import { mapActions } from 'vuex'
import mixinRoute from '@core/mixins/route'
import mixinTable from '@core/mixins/table'

export default {
  mixins: [mixinRoute, mixinTable],
  created() {
    this.filter = this.getRouteQuery()
  },
  data() {
    return {
    videoElement: null,
    paused: null
    }
  },

 methods: {
    updatePaused(event) {
      this.videoElement = event.target;
      this.paused = event.target.paused;
    },
    play() {
      this.videoElement.play();
    },
    pause() {
      this.videoElement.pause();
    }
  },
  computed: {
    playing() { return !this.paused; }
  },


  watch: {
    filter: {
      handler: function() {
        this.handleFetch()
      },
      deep: true,
    },
  },
}
</script>
