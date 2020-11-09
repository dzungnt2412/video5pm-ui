<template>
  <div>
    <div class="order-list-page page">
      <div class="text-center">
        <div class="container">
          <h1 class="jumbotron-heading mt-100">Nhập nội dung</h1>
          <p class="lead text-muted">Chuyển bài viết của bạn thành video đơn giản nhanh chóng</p>
        </div>
      </div>
      <div class="container">
        <h4>Tiêu đề video</h4>
        <p-input
          placeholder="Nhập tiêu đề video"
          @data="getInputTitle($event)"
          class="mb-2"
        />
        <br>
        <p-input
          placeholder="Nhập nội dung"
          class="mb-2"
          type="textarea"
          @data="getInputContent($event)"
        />
        <p>
            <a href="#" class="btn btn-primary m-2" >Cancel</a>
            <a href="#" class="btn btn-secondary m-2"  @click.prevent="creatAudio()">Next</a>
        </p>
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

    getInputTitle(e){
        this.title = e
    },

    getInputContent(e){
        this.content = e
    },

    creatAudio(){
        this.listText = this.content.split(".")
        this.listText.forEach(element => {
            console.log(element)
        });
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
