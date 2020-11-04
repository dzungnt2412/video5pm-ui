<template>
  <div
    class="animsition layout-full"
    :class="$route.meta && $route.meta.class ? $route.meta.class : ''"
  >
    <p-noti></p-noti>
    <div class="app container-fluid">
      <div class="row">
        <div class="img  disable-moblie hide-tablet">
          <div class="img_logo">
            <img
              class="img_logo-img"
              src="~@/assets/img/logo_white.png"
              alt=""
            />
          </div>
          <div class="img_text">
            <span class="img_text-span"
              >Comprehensive fulfillment solution for seller</span
            >
          </div>
        </div>
        <div class="content ">
          <div class="content_help hide-tablet disable-moblie">
            <img
              class="content_help-icon"
              src="~@/assets/img/Support.png"
              alt=""
            />
            <span class="content_help-text">Need help?</span>
          </div>
          <!-- logo tablet -->
          <div class="logo_tablet">
            <img
              src="~@/assets/img/logo_dark 2.png"
              alt=""
              class="logo_tablet-img"
            />
          </div>
          <!-- end logo tablet -->
          <div class="form">
            <router-view :key="$route.fullPath" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PNoti from '../v2/Notibar'
import { mapState } from 'vuex'
export default {
  name: 'FullPage',
  components: {
    PNoti,
  },
  computed: {
    ...mapState('shared', {
      notificationMessage: (state) => state.notificationMessage,
      notificationLabel: (state) => state.notificationLabel,
    }),
  },
}
</script>
