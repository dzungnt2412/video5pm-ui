<template>
  <div class="site-menubar site-menubar-light">
    <div class="site-menubar-body">
      <ul class="site-menu">
        <li
          v-for="(menu, i) in availableMenus"
          class="site-menu-item has-sub"
          :class="{
            active: isActive(menu.route),
            hover: hoverIndex === i,
            open: isActive(menu.route) && menu.sub,
          }"
          :key="i"
          @mouseover="onHover(i)"
          @mouseout="onHover(-1)"
        >
          <router-link :to="menu.route">
            <i class="site-menu-icon" :class="`wb-${menu.icon}`"></i>
            <span class="site-menu-title">{{ menu.title }}</span>
          </router-link>
          <ul class="site-menu-sub" v-if="menu.sub">
            <li class="site-menu-item" v-for="(sub, j) in menu.sub" :key="j">
              <router-link :to="sub.route" class="animsition-link">
                <span class="site-menu-title">{{ sub.title }}</span>
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { isObject } from '@core/utils/type'

export default {
  name: 'Sidebar',
  props: {
    isSidebarOpen: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    menus() {
      return [
        {
          title: 'Home',
          icon: 'dashboard',
          route: '/',
        },
        {
          title: 'Create video',
          icon: 'image',
          route: { name: 'create-video' },
        },
        {
          title: 'My video',
          icon: 'report',
          route: { name: 'order-list' },
        },
        {
          title: 'Pricing',
          icon: 'payment',
          route: { name: 'design-list' },
        },
        // TODO: uncomment me
        // {
        //   title: 'Setting',
        //   icon: 'settings',
        //   route: { name: 'settings' },
        // },
      ]
    },
    availableMenus() {
      return this.menus.filter((menu) => menu.disable !== true)
    },
  },
  data() {
    return {
      hoverIndex: -1,
    }
  },
  methods: {
    isActive(route) {
      if (isObject(route)) {
        return this.$route.name === route.name
      }

      return this.$route.path === route || this.$route.fullPath === route
    },
    onHover(i) {
      this.hoverIndex = i
    },
  },
}
</script>
