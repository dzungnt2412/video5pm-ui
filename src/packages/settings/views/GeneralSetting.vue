<template>
  <PageDetailLoading v-if="isFetching"></PageDetailLoading>
  <div class="order-view-page page" v-else>
    <div class="page-header">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <p-button icon="chevron-left" class="btn-pure pl-0">
              <router-link :to="{ name: 'settings' }">Settings</router-link>
            </p-button>
          </div>
        </div>
      </div>
    </div>
    <div class="page-content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div
              class="d-flex align-items-center justify-content-between flex-wrap"
            >
              <div class="order-metadata d-flex align-items-center">
                <h4 class="order-number">General</h4>
              </div>
            </div>
          </div>
          <div class="col-4 mb-10">
            <b>Store Details</b>
            <p>We will use this information to contact you</p>
          </div>
          <div class="col-8 mb-10">
            <p>Store name</p>
            <p-input
              type="text"
              placeholder="Store name"
              v-model="shop.name"
              disabled
            >
            </p-input>
          </div>
          <div class="col-4 "> </div>
          <div class="col-4" v-show="false">
            <p>Account Email</p>
            <p-input type="text" placeholder="Account email"> </p-input>
          </div>
          <div class="col-8">
            <p>Shop Domain</p>
            <p-input type="text" disabled v-model="shop.domain"> </p-input>
          </div>
        </div>
        <hr v-show="false" />
        <div class="row" v-show="false">
          <div class="col-4">
            <b>Store currency</b>
          </div>
          <div class="col-8">
            <p>Store currency</p>
            <p-input type="text" placeholder="Store currency"> </p-input>
          </div>
        </div>
        <hr />
        <div class="row">
          <div class="col-4">
            <b>Connect shop</b>
          </div>
          <div
            class="col-4"
            v-for="(platform, i) in platforms"
            :key="i"
            v-show="
              (platform.type === shop.platform && shop.domain !== '') ||
                shop.platform === ''
            "
          >
            <div class="panel panel-bordered">
              <div class="panel-heading">
                <img :src="platform.logo" height="190px" alt="No Thumbnail" />
              </div>
              <div class="d-flex justify-content-between choose-shop">
                <template
                  v-if="platform.type === shop.platform && shop.domain !== ''"
                >
                  <b>{{ shop.domain }}</b>
                  <p-button type="danger" @click="confirmRemoveConnectShop">
                    Disconnect
                  </p-button>
                </template>
                <template v-else-if="platform.isChoose">
                  <p-input
                    type="text"
                    v-model="url"
                    :placeholder="platform.example"
                  />
                  <p-button type="primary" @click="connectShop(platform.type)">
                    Connect
                  </p-button>
                </template>
                <template v-else>
                  <b>{{ platform.title }}</b>
                  <p-button type="primary" @click="chosePlatform(platform)">
                    Choose
                  </p-button>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.justify-content-between {
  justify-content: space-between;
}
.choose-shop {
  padding: 30px 10px;
}
</style>

<script>
import { mapState, mapActions } from 'vuex'
import { isValidDomain } from '@core/utils'
import { REMOVE_CONNECT_SHOP, FETCH_SHOP, SELECT_SHOP } from '../../shop/store'

export default {
  mounted() {
    this.init()
  },
  computed: {
    ...mapState('shop', {
      shop: (state) => state.shop,
    }),
  },
  data() {
    return {
      isFetching: false,
      platforms: [
        {
          logo: `${process.env.VUE_APP_ASSETS}/shopify-logo.jpg`,
          type: 'shopify',
          title: 'Shopify',
          isChoose: false,
          example: 'shop-lionnix.myshopify.com',
        },
        {
          logo: `${process.env.VUE_APP_ASSETS}/woocommerce-logo.jpg`,
          title: 'Woocommerce',
          type: 'woocommerce',
          isChoose: false,
          example: 'http://wp.lionnix.net/',
        },
      ],
      url: '',
    }
  },
  methods: {
    ...mapActions('shop', [REMOVE_CONNECT_SHOP, FETCH_SHOP, SELECT_SHOP]),

    async init() {
      this.isFetching = true
      await this.fetchShop(this.shop.id)
      await this.selectShop({ id: this.shop.id })

      this.isFetching = false

      const { message } = this.$route.query
      if (message) {
        return this.$toast.open({ type: 'error', message: message })
      }
    },
    connectShop(type) {
      const check = this.isValidURL(type)
      if (!check) {
        return this.$toast.open({ type: 'error', message: 'URL is invalid' })
      }
      let urlPath = this.url.trim()
      urlPath = urlPath.replace(/\/+$/, '')
      const url = `${process.env.VUE_APP_BASE_API_ENDPOINT}/platforms/install/${type}?shop_id=${this.shop.id}&domain=${urlPath}`

      window.open(url, '_self')
    },
    isValidURL(type) {
      if (type === 'shopify') {
        let regex = new RegExp(/^(https:?\/?\/?)/gi)
        this.url = this.url.replace(regex, '')

        regex = new RegExp(/.*(.myshopify.com\/?)$/gm)
        const check = regex.test(this.url)

        return check
      } else {
        return isValidDomain(this.url)
      }
    },
    chosePlatform(platform) {
      if (this.shop.domain && this.shop.platform) {
        return this.$toast.open({
          type: 'error',
          message: 'Shop is connecting with other platform',
        })
      }
      this.url = ''

      for (let i = 0; i < this.platforms.length; i++) {
        this.platforms[i].isChoose = false
      }

      platform.isChoose = true
    },
    confirmRemoveConnectShop() {
      this.$dialog.confirm({
        message: 'Are you sure you want to do this?',
        onConfirm: () => this.removeShop(this.shop),
      })
    },
    async removeShop(shop) {
      const response = await this.removeConnectShop(shop)

      if (!response.success) {
        return this.$toast.open({ type: 'error', message: response.message })
      }
    },
  },
}
</script>
