import Browser from '@core/helpers/browser'
import AuthService from '@core/services/auth'
import ShopService from '@core/services/shop'

// eslint-disable-next-line
const beforeEach = (router, store) => {
  router.beforeEach(async (to, from, next) => {
    // Logout
    if (
      to.fullPath.startsWith('/logout') ||
      (!store.getters['auth/isSeller'] && AuthService.isAuthenticated())
    ) {
      AuthService.clear()
      ShopService.clear()
      Browser.redirect('/')
      return
    }

    // No required auth
    if (to.meta.noAuthRequired) {
      return next()
    }

    if (!AuthService.isAuthenticated()) {
      return next({ name: 'sign-in' })
    }

    if (store.getters['auth/isSeller']) {
      if (['shop-select', 'shop-add'].indexOf(to.name) !== -1) {
        return next()
      }

      // Handle select shop
      if (!ShopService.getId()) {
        const result = await store.dispatch('shop/selectShop', { fetch: true })

        if (!result.success) {
          if (result.noData) {
            return next({ name: 'shop-add' })
          }

          if (result.fetchError) {
            return next({ name: 'shop-select' })
          }
        }
      }

      // Fetch shops
      if (!store.state.shop.shops || !store.state.shop.shops.length) {
        store.dispatch('shop/fetchShops')
      }
    }

    return next()
  })
}

export default beforeEach
