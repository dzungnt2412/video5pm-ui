<template>
  <div class="full-page">
    <div class="wrapper wrapper-full-page">
      <div
        class="page-header header-filter"
        :class="setPageClass"
        filter-color="black"
        :style="setBgImage"
      >
        <div class="container md-offset">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    backgroundColor: {
      type: String,
      default: 'black',
    },
  },
  inject: {
    autoClose: {
      default: true,
    },
  },
  data() {
    return {
      responsive: false,
      showMenu: false,
      menuTransitionDuration: 250,
      pageTransitionDuration: 300,
      year: new Date().getFullYear(),
    }
  },
  computed: {
    setBgImage() {
      let images = {
        Pricing: './img/bg-pricing.jpg',
        'sign-in': './img/login.jpg',
        'sign-up': './img/register.jpg',
        Lock: './img/lock.jpg',
      }
      return {
        backgroundImage: `url(${images[this.$route.name]})`,
      }
    },
    setPageClass() {
      return `${this.$route.meta.class || ''}-page`.toLowerCase()
    },
  },
}
</script>
<style lang="scss" scoped>
$scaleSize: 0.1;
$zoomOutStart: 0.7;
$zoomOutEnd: 0.46;
@keyframes zoomIn8 {
  from {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
  100% {
    opacity: 1;
  }
}
.wrapper-full-page .zoomIn {
  animation-name: zoomIn8;
}
@keyframes zoomOut8 {
  from {
    opacity: 1;
    transform: scale3d($zoomOutStart, $zoomOutStart, $zoomOutStart);
  }
  to {
    opacity: 0;
    transform: scale3d($zoomOutEnd, $zoomOutEnd, $zoomOutEnd);
  }
}
.wrapper-full-page .zoomOut {
  animation-name: zoomOut8;
}
</style>
