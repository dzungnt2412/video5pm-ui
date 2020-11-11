<template>
  <div>
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
            @data="getInputTitle($event)"
            class="mb-2"
          />
          <br />
          <p-input
            placeholder="Nhập nội dung..."
            class="mb-2"
            type="textarea"
            @data="getInputContent($event)"
          />
          <p style="padding-left:720px">
            <a href="#" class="btn btn-secondary m-10">Cancel</a>
            <a href="#" class="btn btn-primary" @click.prevent="creatAudio()"
              >Next</a
            >
          </p>
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
import { mapActions } from 'vuex'
import { SHOW_NOTIFICATION_MESSAGE } from '@/packages/shared/store'
import mixinRoute from '@core/mixins/route'
import mixinTable from '@core/mixins/table'

export default {
  mixins: [mixinRoute, mixinTable],
  created() {
    this.filter = this.getRouteQuery()
  },
  data() {
    return {
      isFetching: true,
      result: {},
      actions: {},
      title: null,
      content: null,
      listText: [],
    }
  },

  methods: {
    ...mapActions('shared', [SHOW_NOTIFICATION_MESSAGE]),

    pushNoti() {
      this.showNotificationMessage({
        label: 'success',
        message: 'This is message success',
      })
    },

    async handleFetch() {
      this.handleUpdateRouteQuery()
    },

    getInputTitle(e) {
      this.title = e
    },

    getInputContent(e) {
      this.content = e
    },

    creatAudio() {
      this.listText = this.content.split('.')
      this.listText.forEach((element) => {
        console.log(element)
      })
    },
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
