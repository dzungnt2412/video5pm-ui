<template>
  <div class="page">
    <div class="page-header">
      <p-button icon="chevron-left" class="btn-pure pl-0 m-b-10">
        <router-link :to="{ name: 'shop-list' }">Shop</router-link>
      </p-button>
      <h1 class="page-title">Cập nhật</h1>
    </div>
    <div class="page-content">
      <div class="row annotated-section d-flex justify-content-between my-20">
        <div class="col-12 col-sm-3"></div>

        <div class="col-12 col-sm-8">
          <div class="panel">
            <div class="panel-body container-fluid">
              <div class="form-group">
                <label for="name">Tên shop</label>
                <input
                  :class="[
                    { 'is-valid': !errors.has('name') },
                    { 'is-invalid': errors.has('name') },
                  ]"
                  id="name"
                  class="form-control"
                  placeholder="Tên shop"
                  v-model="shop.name"
                  name="name"
                  v-validate="'required'"
                  :readonly="true"
                />
                <div class="invalid-feedback" v-if="errors.has('name')">
                  {{ errors.first('name') }}
                </div>
              </div>
              <div class="form-group">
                <label for="domain">Domain</label>
                <input
                  :class="[
                    { 'is-valid': !errors.has('domain') },
                    { 'is-invalid': errors.has('domain') },
                  ]"
                  id="domain"
                  class="form-control"
                  placeholder="Domain"
                  v-model="shop.domain"
                  name="domain"
                  v-validate="'required|url'"
                />
                <div class="invalid-feedback" v-if="errors.has('domain')">
                  {{ errors.first('domain') }}
                </div>
              </div>
              <div class="form-group">
                <label for="api-callback">Callback url</label>
                <input
                  :class="[
                    { 'is-valid': !errors.has('api_callback') },
                    { 'is-invalid': errors.has('api_callback') },
                  ]"
                  id="api-callback"
                  class="form-control"
                  placeholder="Callback url"
                  v-model="shop.api_callback"
                  name="api_callback"
                  v-validate="'url'"
                  data-vv-as="callback url"
                />
                <div class="invalid-feedback" v-if="errors.has('api_callback')">
                  {{ errors.first('api_callback') }}
                </div>
              </div>
              <div class="form-group">
                <label for="api-key">API key</label>
                <input
                  id="api-key"
                  class="form-control"
                  placeholder="API Key"
                  v-model="shop.api_key"
                  :readonly="true"
                />
              </div>
              <p-button
                @click="handleUpdateShop"
                :disabled="isUpdating"
                :loading="isUpdating"
              >
                Cập nhật
              </p-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { cloneDeep } from '@core/utils'
import { FETCH_SHOP, UPDATE_SHOP } from '../store'

export default {
  name: 'ShopEdit',
  computed: {
    ...mapState('shop', {
      current: (state) => state.shopUpdate,
    }),
    shopId() {
      return parseInt(this.$route.params.id)
    },
  },
  data() {
    return {
      isUpdating: false,
      isFetching: false,
      resultFetch: {},
      shop: {},
    }
  },
  mounted() {
    this.handleFetchShop()
  },
  methods: {
    ...mapActions('shop', [FETCH_SHOP, UPDATE_SHOP]),

    async handleFetchShop() {
      this.isFetching = true
      this.resultFetch = await this.fetchShop(this.shopId)

      if (this.resultFetch.success) {
        this.$set(this, 'shop', cloneDeep(this.current))
      }

      this.isFetching = false
    },

    async handleUpdateShop() {
      const validate = await this.$validator.validateAll()

      if (!validate) {
        return
      }

      this.isUpdating = true
      const result = await this.updateShop(this.shop)

      if (result.success) {
        this.$set(this, 'shop', cloneDeep(this.current))
        this.$toast.open({ type: 'success', message: 'Cập nhật thành công' })
      } else {
        this.$toast.open({ type: 'error', message: result.message })
      }

      this.isUpdating = false
    },
  },
}
</script>
