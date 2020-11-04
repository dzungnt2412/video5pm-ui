<template>
  <div class="wrapper" :class="[{ 'nav-open': $sidebar.showSidebar }]">
    <side-bar
      :active-color="sidebarBackground"
      :background-image="sidebarBackgroundImage"
      :data-background-color="sidebarBackgroundColor"
    >
      <template slot="links">
        <sidebar-item
          :link="{ name: 'Dashboard', icon: 'dashboard', path: '/' }"
        >
        </sidebar-item>
        <sidebar-item
          :link="{
            name: 'Delivery Order',
            icon: 'local_shipping',
            path: '/delivery-orders',
          }"
        >
        </sidebar-item>
        <sidebar-item
          :link="{
            name: 'Orders',
            icon: 'shopping_cart',
            path: '/orders',
          }"
        >
        </sidebar-item>
        <sidebar-item
          :link="{ name: 'Design', icon: 'image', path: '/design' }"
        >
        </sidebar-item>
        <sidebar-item
          :link="{
            name: 'Shops',
            icon: 'local_mall',
            path: '/shops',
          }"
        >
        </sidebar-item>
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar
        :shop="shop"
        :shops="shops"
        @selectShop="handleSelectShop"
      ></top-navbar>
      <div
        :class="{ content: !$route.meta.hideContent }"
        @click="toggleSidebar"
      >
        <router-view :key="$route.name"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-_new */
import { mapState, mapActions } from 'vuex'
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import TopNavbar from './TopNavbar'
import Sidebar from './Sidebar'
import SidebarItem from './SidebarItem'
import { SELECT_SHOP } from '@/packages/shop/store'

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`)
  } else {
    setTimeout(() => {
      initScrollbar(className)
    }, 100)
  }
}

export default {
  name: 'Default',
  components: {
    TopNavbar,
    SidebarItem,
    'side-bar': Sidebar,
  },
  computed: {
    ...mapState('shop', {
      shop: (state) => state.shop,
      shops: (state) => state.shops,
    }),
  },
  data() {
    return {
      sidebarBackgroundColor: 'black',
      sidebarBackground: 'green',
      sidebarBackgroundImage: './img/sidebar-2.jpg',
      sidebarMini: true,
      sidebarImg: true,
    }
  },
  methods: {
    ...mapActions('shop', [SELECT_SHOP]),

    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false)
      }
    },
    minimizeSidebar() {
      if (this.$sidebar) {
        this.$sidebar.toggleMinimize()
      }
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
  mounted() {
    let docClasses = document.body.classList
    let isWindows = navigator.platform.startsWith('Win')
    if (isWindows) {
      // if we are on windows OS we activate the perfectScrollbar function
      initScrollbar('sidebar')
      initScrollbar('sidebar-wrapper')
      initScrollbar('main-panel')

      docClasses.add('perfect-scrollbar-on')
    } else {
      docClasses.add('perfect-scrollbar-off')
    }
  },
  watch: {
    sidebarMini() {
      this.minimizeSidebar()
    },
  },
}
</script>
