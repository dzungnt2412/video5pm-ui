<template>
  <div
    class="animsition dashboard"
    :class="{
      'site-menubar-unfold': isSidebarOpen,
      'site-menubar-hide': !isSidebarOpen,
    }"
  >
    <p-noti></p-noti>
    <p-header
      :shop="shop"
      :shops="shops"
      @selectShop="handleSelectShop"
      @toggleShowSidebar="toggleShowSidebar"
      :isSidebarOpen="isSidebarOpen"
    />
    <p-sidebar :isSidebarOpen="isSidebarOpen" />
    <router-view :key="$route.name"></router-view>
  </div>
</template>

<script>
import isMobile from 'ismobilejs'
import { mapState, mapActions } from 'vuex'
import { SELECT_SHOP } from '@/packages/shop/store'
import '@assets/scss/bootstrap.scss'
import '@assets/scss/bootstrap-extend.scss'
import '@assets/scss/web-icons/web-icons.scss'
import '@assets/fonts/material-design/material-design.min.css'
import '@assets/scss/site.scss'
import PHeader from './Header'
import PSidebar from './Sidebar'
import PNoti from './Notibar'

export default {
  name: 'Version2',
  components: {
    PHeader,
    PSidebar,
    PNoti,
  },
  computed: {
    ...mapState('shop', {
      shop: (state) => state.shop,
      shops: (state) => state.shops,
    }),
    ...mapState('shared', {
      notificationMessage: (state) => state.notificationMessage,
      notificationLabel: (state) => state.notificationLabel,
    }),
  },
  data() {
    return {
      isSidebarOpen: true,
    }
  },
  mounted() {
    if (isMobile.phone) {
      this.isSidebarOpen = false
    }
  },
  methods: {
    ...mapActions('shop', [SELECT_SHOP]),

    toggleShowSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen
    },
    async handleSelectShop(shop) {
      const result = await this.selectShop({ id: shop.id })

      if (!result.success) {
        this.$toast.open({ type: 'error', message: result.message })
        return
      }

      this.$toast.open(`Chọn shop ${shop.name} thành công`)

      if (this.$route.name === 'dashboard') {
        setTimeout(() => {
          location.reload()
        }, 500)
      } else {
        this.$router.push('/')
      }
    },
  },
}
</script>
