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
              style=" width: 460px;height: 270px;
"
              poster="velocity-thumbnail.jpg"
              @canplay="updatePaused"
              @playing="updatePaused"
              @pause="updatePaused"
            >
              <source
                :src= getVideo.path
                type="video/mp4"
                media="all and (max-width:680px)"
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
                :loading="isFetching"
                @click="visibleUploadModal"
                >Thêm video</p-button
              >
            </div>
            <br />
            <div class="progress">
              <div class="progress-bar" v-bind:style="{ width: getLength}">{{ length }}</div>
            </div>
            <br />

            <div>
              <a
                href="/create-video"
                class="btn btn-secondary"
                style="margin-right:600px"
                >Back</a
              >
              <a href="#" class="btn btn-secondary m-10">Cancel</a>
              <a href="/review-video" class="btn btn-primary" 
                >Next</a
              >
            </div>
          </div>
        </div>
      </div>
      <modal-upload-video 
        :visible.sync="isVisibleUpload"
        @upload="handlerUpload"
      ></modal-upload-video>
    </div>
  </div>
</template>

<style>
 video{
   border: solid 1px black;
 }
</style>

<script>
import mixinRoute from '@core/mixins/route'
import ModalUploadVideo from './components/ModalUploadVideo'
import { UPLOAD_VIDEO, } from '../store'
import {  mapState, mapActions } from 'vuex'
import Storage from '@core/helpers/storage'

export default {
  mixins: [mixinRoute],
  components: {
    ModalUploadVideo,
  },
  computed:{
    
    ...mapState('video', {
      video: (state) => state.video,
    }),
    playing() {
      return !this.paused
    },
    getLength(){
      console.log(this.length/this.totalDuration*100)
      let t = this.length/this.totalDuration*100
      return t + "%"
    },
    getVideo(){
      return this.videoPreview
    }

  },
  data() {
    return {
      isFetching: false,
      isVisibleUpload: false,
      videoElement: null,
      paused: null,
      videoPreview : Storage.get("video"),
      totalDuration : Storage.get("video").length/1000,
      length : Storage.get("lengthPrevious"),

    }
  },

  methods: {
    ...mapActions('video', [UPLOAD_VIDEO,]),
    updatePaused(event) {
      this.videoElement = event.target
      this.paused = event.target.paused
    },
    init(){
      this.videoPreview = Storage.get("video")
      this.totalDuration = Storage.get("video").length/1000
      this.length = Storage.get("lengthPrevious")
      this.$router.push('/edit-video')
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
    async handlerUpload(length, file){
      console.log(length)
      this.isVisibleUpload = false

      this.isFetching = true
      let formData = new FormData()
      formData.append('video_id', this.videoPreview.id)
      formData.append('length', length)
      formData.append('file', file)

      const result = await this.uploadVideo(formData)

      if (!result.success) {
        this.$toast.open({ message: result.message, type: 'error' })
        this.isFetching = false
        return
      }

      Storage.set("video", this.video)
      this.videoPreview = this.video
      let lengthPrevious =  Storage.get("lengthPrevious") == null ? 0 : (Storage.get("lengthPrevious") + length)
      Storage.set("lengthPrevious", lengthPrevious)
      
      this.isFetching = false
      this.init()
    },
  },

}
</script>
