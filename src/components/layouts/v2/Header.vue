<template>
  <nav
    class="site-navbar navbar navbar-default navbar-fixed-top navbar-mega navbar-inverse bg-indigo-600"
    role="navigation"
  >
    <div class="navbar-header">
      <button
        type="button"
        class="navbar-toggler hamburger hamburger-close navbar-toggler-left"
        :class="{ hided: !isSidebarOpen }"
        data-toggle="menubar"
        @click.prevent="toggleShowSidebar"
      >
        <span class="sr-only">Toggle navigation</span>
        <span class="hamburger-bar"></span>
      </button>
      <button
        type="button"
        class="navbar-toggler collapsed"
        data-target="#site-navbar-collapse"
        data-toggle="collapse"
        @click.prevent="toggleShowNavbar"
      >
        <i class="icon wb-more-horizontal" aria-hidden="true"></i>
      </button>
      <div class="navbar-brand navbar-brand-center">
        <router-link to="/">
          <img
            class="navbar-brand-logo"
            src="@assets/img/logo.png"
            title="Remark"
            alt="Lionnix"
          />
          <span class="navbar-brand-text hidden-xs-down">Video5m</span>
        </router-link>
      </div>
    </div>

    <div class="navbar-container container-fluid">
      <div
        class="navbar-collapse navbar-collapse-toolbar collapse"
        :class="{ show: isShowNavbarOnMobile }"
      >
        <ul class="nav navbar-toolbar">
          <li class="nav-item hidden-float">
            <a
              href="#"
              class="nav-link"
              data-toggle="menubar"
              @click.prevent="toggleShowSidebar"
            >
              <i
                class="icon hamburger hamburger-arrow-left unfolded"
                :class="{ hided: !isSidebarOpen }"
              >
                <span class="sr-only">Toggle menubar</span>
                <span class="hamburger-bar"></span>
              </i>
            </a>
          </li>
          <li class="nav-item" v-if="shop && shop.id">
            <div class="nav-link disabled">{{
              shop && shop.name ? shop.name : ''
            }}</div>
          </li>
        </ul>
        <ul class="nav navbar-toolbar navbar-right navbar-toolbar-right">
          <li class="nav-item dropdown notifications">
            <p-dropdown
              @on-open="onOpenDropdownNotifi"
              :dropdownClass="'dropdown-menu-right dropdown-menu-media'"
            >
              <a
                class="nav-link navbar-avatar"
                title="Notifications"
                slot="trigger"
              >
                <i class="icon wb-bell" aria-hidden="true"></i>
                <span class="badge badge-pill badge-danger up">{{
                  countNotiUnread
                }}</span>
              </a>
              <div class="dropdown-menu-header">
                <h5>Thông báo</h5>
                <span
                  v-if="notifications.length"
                  class="badge badge-round badge-danger"
                  >New {{ countNotiUnread }}</span
                >
              </div>
              <div
                v-on:scroll.passive="scrollHandler"
                class="list-group custome-scroll-y"
              >
                <div data-role="container">
                  <div data-role="content">
                    <a
                      v-for="(item, index) in notifications"
                      :key="index"
                      class="list-group-item dropdown-item"
                      :class="item.status"
                    >
                      <div class="media">
                        <div class="pr-10">
                          <i
                            class="icon wb-order bg-red-600 white icon-circle"
                            aria-hidden="true"
                          ></i>
                        </div>
                        <div class="media-body">
                          <h6 class="media-heading">{{ item.title }}</h6>
                          <p
                            v-if="
                              item.type === 'export' ||
                                item.type === 'export_fullfill'
                            "
                            @click="downloadFile(item.message, item.type)"
                            >Cick To Download</p
                          >
                          <p v-else v-html="item.message"></p>
                          <time class="media-meta">{{
                            item.created_at | datetime
                          }}</time>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div class="dropdown-menu-footer">
                <a
                  class="dropdown-menu-footer-btn"
                  href="javascript:void(0)"
                  role="button"
                >
                  <i class="icon wb-settings" aria-hidden="true"></i>
                </a>
                <a
                  class="dropdown-item"
                  href="javascript:void(0)"
                  role="menuitem"
                  >Tất cả thông báo</a
                >
              </div>
            </p-dropdown>
          </li>
          <li class="nav-item dropdown" v-if="shops && shops.length">
            <p-dropdown>
              <a
                class="nav-link navbar-avatar pointer dropdown-toggle"
                slot="trigger"
                :style="{ 'line-height': '30px' }"
                v-if="validShops.length > 0"
                >Chọn shop</a
              >
              <p-dropdown-item
                v-for="(item, i) in validShops"
                :key="i"
                @click="handleSelectShop(item)"
                >{{ item.name }}</p-dropdown-item
              >
            </p-dropdown>
          </li>
          <li class="nav-item dropdown">
            <p-dropdown>
              <a class="nav-link navbar-avatar pointer" slot="trigger">
                <span class="avatar">
                  <img src="@assets/img/avatar-default.svg" alt="..." />
                </span>
              </a>
              <p-dropdown-item class="clearfix">
                <router-link
                  :to="{ name: 'shop-add' }"
                  :style="{ color: 'inherit' }"
                >
                  <p-icon name="store" icon-pack="md"></p-icon>Thêm shop mới
                </router-link>
              </p-dropdown-item>
              <p-dropdown-item class="clearfix">
                <router-link
                  :to="{ name: 'change-profile' }"
                  :style="{ color: 'inherit' }"
                >
                  <p-icon name="account-o" icon-pack="md"></p-icon>Sửa thông tin
                  tài khoản
                </router-link>
              </p-dropdown-item>
              <p-dropdown-item class="clearfix">
                <router-link
                  :to="{ name: 'change-password' }"
                  :style="{ color: 'inherit' }"
                >
                  <p-icon name="key" icon-pack="md"></p-icon>Đổi mật khẩu
                </router-link>
              </p-dropdown-item>
              <p-dropdown-item class="clearfix">
                <router-link to="/logout" :style="{ color: 'inherit' }">
                  <p-icon name="lock-open" icon-pack="md"></p-icon>Đăng xuất
                </router-link>
              </p-dropdown-item>
            </p-dropdown>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<style scoped>
.dropdown-item {
  padding: 2px;
  height: 50px;
}

.clearfix > a {
  padding: 0 15px;
  display: flex;
  align-items: center;
  height: 100% !important;
  width: 100% !important;
}
.list-group-item.dropdown-item {
  height: 90px;
}
</style>
<script>
import http from '@core/services/http'
import Browser from '@core/helpers/browser'
import { mapState, mapMutations, mapActions } from 'vuex'
import SocketService from '@core/services/socket'
import {
  FULLFILL_EXPORT_BUCKET,
  ORDER_EXPORT_BUCKET,
} from '@core/constants/storage'
import {
  PUSH_NOTIFICATION,
  FETCH_NOTIFICATIONS,
  COUNT_NOTIFICATIONS,
  COUNT_NOTIFICATIONS_UNREAD,
  READ_NOTIFICATIONS,
} from '@/packages/shared/store'

export default {
  name: 'Header',
  props: {
    shop: {
      type: Object,
      default: () => {},
    },
    shops: {
      type: Array,
      default: () => [],
    },
    isSidebarOpen: {
      type: Boolean,
      default: true,
    },
  },
  created() {
    const vm = this
    SocketService.connect((e) => {
      let msg = JSON.parse(e.data)
      vm.pushNotification(msg)
    })

    this.init()
  },
  data() {
    return {
      isFetchNotity: false,
      isShowNavbarOnMobile: false,
      socket: null,
    }
  },
  computed: {
    ...mapState('shared', {
      notifications: (state) => state.notifications,
      countNoti: (state) => state.countNoti,
      countNotiUnread: (state) => state.countNotiUnread,
    }),

    validShops() {
      return this.shop && this.shops
        ? this.shops.filter(({ id }) => id !== this.shop.id)
        : []
    },
  },
  methods: {
    ...mapActions('shared', [
      FETCH_NOTIFICATIONS,
      COUNT_NOTIFICATIONS,
      COUNT_NOTIFICATIONS_UNREAD,
      READ_NOTIFICATIONS,
    ]),
    ...mapMutations('shared', [PUSH_NOTIFICATION]),

    async scrollHandler(e) {
      let element = e.target
      let length = this.notifications.length
      if (this.countNoti <= length) {
        return
      }

      if (this.isFetchNotity) {
        return
      }

      this.isFetchNotity = true

      if (element.scrollHeight - element.scrollTop === element.clientHeight) {
        let last = this.notifications[length - 1]
        await this.fetchNotifications({ limit: 10, last_id: last.id })
        await this.readNotifications()
      }

      this.isFetchNotity = false
    },

    async init() {
      await Promise.all([
        this.fetchNotifications({ limit: 10 }),
        this.countNotifications(),
        this.countNotificationsUnread({ status: 'unread' }),
      ])
    },

    handleSelectShop(shop) {
      this.$emit('selectShop', shop)
    },
    toggleShowSidebar() {
      this.$emit('toggleShowSidebar')
    },
    toggleShowNavbar() {
      this.isShowNavbarOnMobile = !this.isShowNavbarOnMobile
    },
    async downloadFile(url, item_type) {
      let type
      if (item_type === 'export') {
        type = ORDER_EXPORT_BUCKET
      } else if (item_type === 'export_fullfill') {
        type = FULLFILL_EXPORT_BUCKET
      }
      const arr = url.split('/')
      arr.shift()

      const fileName = arr.join('_')

      const data = await http.get(
        `/uploads/file-export/download?type=${type}&url=${url}`,
        {
          type: 'blob',
        }
      )
      try {
        Browser.downloadBlob(data, `${fileName}.csv`)
      } catch (error) {
        this.$toast.open({ type: 'error', message: 'File error !!!' })
      }
    },
    async onOpenDropdownNotifi(v) {
      if (v) {
        await this.readNotifications()
      }
    },
  },
}
</script>
