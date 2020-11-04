<template>
  <div class="page vertical-align text-center">
    <div class="page-content vertical-align-middle">
      <div class="panel">
        <div class="panel-body">
          <div class="brand">
            <h2 class="brand-text font-size-18">
              Thêm shop mới
            </h2>
          </div>
          <form @submit.prevent="handleAddShop" class="text-left">
            <div
              class="form-group"
              :class="[
                { 'has-success': !errors.has('name') },
                { 'has-danger': errors.has('name') },
              ]"
            >
              <label class="form-control-label">
                Tên shop
              </label>
              <p-input v-model="shop.name" name="name" v-validate="'required'">
              </p-input>
              <span class="invalid-feedback" v-if="errors.has('name')">
                {{ errors.first('name') }}
              </span>
            </div>

            <div
              class="form-group"
              :class="[
                { 'has-success': !errors.has('domain') },
                { 'has-danger': errors.has('domain') },
              ]"
            >
              <label class="form-control-label">
                Domain
              </label>
              <p-input
                v-model="shop.domain"
                name="domain"
                v-validate="'required'"
              >
              </p-input>
              <span class="invalid-feedback" v-if="errors.has('domain')">
                {{ errors.first('domain') }}
              </span>
            </div>

            <p-button
              class="btn-block"
              @click="handleAddShop"
              :loading="isAdding"
            >
              Thêm shop mới
            </p-button>
          </form>
          <p>
            <router-link :to="{ name: 'shop-select' }">
              Chọn shop khác
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { ADD_SHOP } from '@/packages/shop/store'
import { cleanDomain } from '@core/utils'

export default {
  name: 'SelectShop',
  data() {
    return {
      isAdding: false,
      shop: {
        name: '',
        domain: '',
      },
    }
  },
  methods: {
    ...mapActions('shop', [ADD_SHOP]),

    /**
     * Handle select shop
     * @return {Promise<void>}
     */
    async handleAddShop() {
      const validate = await this.$validator.validateAll()

      if (!validate) {
        return
      }

      const shop = Object.assign({}, this.shop)
      shop.domain = cleanDomain(this.shop.domain)
      const result = await this.addShop({ shop })

      if (result.success) {
        this.$toast.open({
          type: 'success',
          message: 'Thêm shop mới thành công.',
        })
        this.$router.push('/')
      } else {
        this.$toast.open({ type: 'error', message: result.message })
      }
    },
  },
}
</script>
