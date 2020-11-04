<template>
  <md-toolbar
    md-elevation="0"
    class="md-transparent"
    :class="{
      'md-toolbar-absolute md-white md-fixed-top': $route.meta.navbarAbsolute,
    }"
  >
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <h3 class="md-title">
          <strong>{{
            shop && shop.name ? `Shop: ${shop.name}` : 'Lionnix'
          }}</strong>
        </h3>
      </div>
      <div class="md-toolbar-section-end">
        <md-button
          class="md-just-icon md-round md-simple md-toolbar-toggle"
          :class="{ toggled: $sidebar.showSidebar }"
          @click="toggleSidebar"
        >
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </md-button>

        <div class="md-collapse">
          <md-list>
            <li class="md-list-item" v-if="shops && shops.length">
              <a
                class="md-list-item-router md-list-item-container md-button-clean dropdown"
              >
                <div class="md-list-item-content">
                  <dropdown direction="down">
                    <md-button
                      slot="title"
                      class="md-button md-just-icon md-simple"
                      data-toggle="dropdown"
                    >
                      <md-icon>dashboard</md-icon>
                    </md-button>
                    <ul class="dropdown-menu dropdown-menu-right">
                      <li v-for="(item, i) in validShops" :key="i">
                        <a href="#" @click.prevent="handleSelectShop(item)">
                          {{ item.name }}
                        </a>
                      </li>
                    </ul>
                  </dropdown>
                </div>
              </a>
            </li>

            <li class="md-list-item">
              <a
                class="md-list-item-router md-list-item-container md-button-clean dropdown"
              >
                <div class="md-list-item-content">
                  <dropdown direction="down">
                    <md-button
                      slot="title"
                      class="md-button md-just-icon md-simple"
                      data-toggle="dropdown"
                    >
                      <i class="material-icons">person</i>
                      <p class="hidden-lg hidden-md">Profile</p>
                    </md-button>
                    <ul class="dropdown-menu dropdown-menu-right">
                      <li>
                        <router-link :to="{ name: 'shop-add' }">
                          Add new shop
                        </router-link>
                      </li>
                      <li>
                        <router-link :to="{ name: 'change-profile' }">
                          Change profile
                        </router-link>
                      </li>
                      <li>
                        <router-link :to="{ name: 'change-profile' }">
                          Change password
                        </router-link>
                      </li>
                      <li>
                        <router-link to="/logout">Logout</router-link>
                      </li>
                    </ul>
                  </dropdown>
                </div>
              </a>
            </li>
          </md-list>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
import Dropdown from '@kit/Dropdown'
export default {
  name: 'TopNavBar',
  components: {
    Dropdown,
  },
  props: {
    shop: {
      type: Object,
      default: () => {},
    },
    shops: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    validShops() {
      return this.shop && this.shops
        ? this.shops.filter(({ id }) => id !== this.shop.id)
        : []
    },
  },
  methods: {
    handleSelectShop(shop) {
      this.$emit('selectShop', shop)
    },

    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
    },

    minimizeSidebar() {
      if (this.$sidebar) {
        this.$sidebar.toggleMinimize()
      }
    },
  },
}
</script>
