<template>
  <div id="app">
    <component :is="layout">
      <router-view :key="$route.name"></router-view>
    </component>
    <notifications position="bottom center" />
    <div
      id="scroll-top"
      class="scroll-top"
      @click="scrollToTop"
      v-show="isShowScrollTop"
    >
      <a href="javascript:void(0)">
        <i class="icon md-chevron-up"></i>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      isShowScrollTop: false,
    }
  },
  metaInfo() {
    return {
      title: this.$route.meta.title || '',
      titleTemplate: '%s - Lionnix',
    }
  },
  created() {
    window.onscroll = () => {
      let pos = window.pageYOffset
      if (pos > window.innerHeight) {
        this.isShowScrollTop = true
      } else {
        this.isShowScrollTop = false
      }
    }
  },
  computed: {
    layout() {
      return `${this.$route.meta.layout || 'default'}-layout`
    },
  },
  components: {
    'default-layout': () => import('@layouts/v2/Index'),
    'full-page-layout': () => import('@layouts/v2-full-page/Index'),
  },
  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
  },
}
</script>
