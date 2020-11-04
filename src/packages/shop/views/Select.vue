<template>
  <div class="page vertical-align text-center">
    <div class="page-content vertical-align-middle">
      <div class="panel">
        <div class="panel-body">
          <div class="brand">
            <h2 class="brand-text font-size-18">
              Chọn shop
            </h2>
          </div>

          <div class="list-group text-left" v-if="shops && shops.length">
            <a
              class="list-group-item list-group-item-action"
              @click.prevent="handleSelectShop(shop)"
              v-for="shop in shops"
              :key="shop.id"
            >
              {{ shop.name }}
            </a>
          </div>
          <router-link
            :to="{ name: 'shop-add' }"
            class="btn btn-primary btn-block mt-4"
          >
            Thêm shop mới
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import { FETCH_SHOPS, SELECT_SHOP } from '@/packages/shop/store'

export default {
  name: 'SelectShop',
  computed: {
    ...mapState('shop', {
      shops: (state) => state.shops,
    }),
  },
  data() {
    return {
      isAdding: false,
    }
  },
  mounted() {
    this.handleFetchShops()
  },
  methods: {
    ...mapActions('shop', [FETCH_SHOPS, SELECT_SHOP]),

    async handleFetchShops() {
      const result = await this.fetchShops()

      if (!result.success) {
        this.$toast.open({ type: 'error', message: result.message || '' })
        return
      }

      if (this.shops.length === 0) {
        this.$router.push({ name: 'shop-add' })
      }
    },

    /**
     * Handle select shop
     * @param shop
     * @return {Promise<void>}
     */
    async handleSelectShop(shop) {
      const result = await this.selectShop({ fetch: false, id: shop.id })

      if (result.success) {
        this.$router.push('/')
      } else {
        this.$toast.open({ type: 'error', message: result.message || '' })
      }
    },
  },
}
</script>
