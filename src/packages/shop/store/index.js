import api from '../api'
import ShopService from '@core/services/shop'
import AuthService from '@core/services/auth'

export const FETCH_SHOPS = 'fetchShops'
export const FETCH_SHOP = 'fetchShop'
export const FETCH_SHOP_UPDATE = 'fetchShopUpdate'
export const SELECT_SHOP = 'selectShop'
export const UPDATE_SHOP = 'updateShop'
export const ADD_SHOP = 'addShop'
export const REMOVE_CONNECT_SHOP = 'removeConnectShop'

/**
 * State
 */
export const state = {
  shop: {},
  shopUpdate: {},
  shops: [],
}

export const mutations = {
  /**
   * Fetch a shop
   * @param state
   * @param payload
   */
  [FETCH_SHOP]: (state, payload) => {
    state.shop = payload
  },

  /**
   * Fetch shops
   * @param state
   * @param payload
   */
  [FETCH_SHOPS]: (state, payload) => {
    state.shops = payload
  },

  /**
   * Add _new shop
   * @param state
   * @param payload
   */
  [ADD_SHOP]: (state, payload) => {
    state.shops.push(payload)
  },

  [FETCH_SHOP_UPDATE]: (state, payload) => {
    state.shopUpdate = payload
  },
}

/**
 * Actions
 */
export const actions = {
  /**
   * Init
   * @param commit
   */
  init({ commit }) {
    ShopService.init()

    if (ShopService.getId()) {
      handleSelected(commit, { shop: ShopService.shop })
    }
  },

  /**
   * Fetch shops
   * @param commit
   * @return {Promise<{success: boolean, message: (*|string)}|{success: boolean}>}
   */
  async fetchShops({ commit }, payload) {
    let result = { success: true }
    let response = await api.fetchShops(payload)

    if (response && response.errorMessage) {
      result = { success: false, message: response.errorMessage }
      response = { shops: [] }
    }

    commit(FETCH_SHOPS, response.shops)
    return result
  },

  async fetchShop({ commit }, payload) {
    let result = { success: true }
    let response = await api.fetchShop(payload)

    if (response && !response.shop) {
      result = { success: true, message: response.errorMessage }
      response = { shop: {} }
    }

    commit(FETCH_SHOP_UPDATE, response.shop)

    return result
  },

  /**
   * Select shop
   * @param commit
   * @param state
   * @param commit
   * @param dispatch
   * @param payload
   * @return {Promise<object>}
   */
  async selectShop({ commit, state, dispatch }, payload = {}) {
    if (payload.fetch) {
      const result = await dispatch('fetchShops')

      if (result && !result.success) {
        return {
          success: false,
          fetchError: false,
        }
      }
    }

    if (!state.shops.length) {
      return {
        success: false,
        noData: true,
      }
    }

    const shopId = payload.id || state.shops[0].id
    const response = await api.selectShop({ shop_id: shopId })

    if (response && response.access_token) {
      const shop = state.shops.find(({ id }) => id === shopId)
      handleSelected(commit, { shop, accessToken: response.access_token })
      return {
        success: true,
      }
    }

    return {
      success: false,
      message: response.errorMessage || '',
    }
  },

  /**
   * Add shop
   * @param commit
   * @param payload
   * @return {Promise<{success: boolean, message: *}|{success: boolean}>}
   */
  async addShop({ commit }, payload) {
    const response = await api.addShop(payload)

    if (response && response.access_token) {
      commit(ADD_SHOP, response.shop)

      handleSelected(commit, {
        shop: response.shop,
        accessToken: response.access_token,
      })

      return { success: true }
    }

    return { success: false, message: response.message || response.error }
  },

  /**
   * Update shop
   * @param commit
   * @param payload
   * @return {Promise<{success: boolean}>}
   */
  // eslint-disable-next-line
  async updateShop({ commit }, payload) {
    let result = { success: true }
    let response = await api.updateShop(payload)

    if (response && response.errorMessage) {
      result = { success: false, message: response.errorMessage }
      response = { shop: {} }
    }

    commit(FETCH_SHOP_UPDATE, response.shop)

    return result
  },
  async removeConnectShop({ commit }, payload) {
    let result = { success: true }
    let response = await api.removeConnectShop(payload)

    if (!response || response.error) {
      result = {
        success: false,
        message: response.errorMessage || response.error || '',
      }

      response = {
        shop: {},
      }
    }

    handleSelected(commit, response)
    return result
  },
}

/**
 * Handle selected shop
 * @param commit
 * @param shop
 * @param accessToken
 */
export const handleSelected = (commit, { shop, accessToken }) => {
  commit(FETCH_SHOP, shop)
  ShopService.set(shop)

  const storage = {
    id: shop.id,
    domain: shop.domain,
    name: shop.name,
    logo: shop.logo,
    platform: shop.platform,
  }
  ShopService.storage(storage)

  if (accessToken) {
    AuthService.storageAccessToken(accessToken)
  }
}
