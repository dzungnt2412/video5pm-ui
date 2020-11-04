import api from '../api'
import ShopService from '@core/services/shop'
import AuthService from '@core/services/auth'

export const FETCH_PRODUCT_TYPES = 'fetchProductTypes'
export const FETCH_PRODUCT_TYPE = 'fetchProductType'
export const UPDATE_PRODUCT_TYPE = 'updateProductType'
export const CREATE_PRODUCT_TYPE = 'createProductType'
export const UPDATE_PRODUCT_TYPES_STATUS = 'updateProductTypesStatus'

export const FETCH_PACKAGES = 'fetchPackages'
export const FETCH_PACKAGE = 'fetchPackage'
export const UPDATE_PACKAGE = 'updatePackage'
export const CREATE_PACKAGE = 'createPackage'

export const FETCH_ORDER_MAPPINGS = 'fetchOrderMappings'
export const FETCH_ORDER_MAPPINGS_COUNT = 'fetchOrderMappingsCount'
export const FETCH_ORDER_MAPPING = 'fetchOrderMapping'

export const FETCH_PRODUCT_OPTIONS = 'fetchProductOptions'

export const FETCH_ORDER_MAPPING_FAILS = 'fetchOrderMappingFails'
export const FETCH_ORDER_MAPPING_FAILS_COUNT = 'fetchOrderMappingFailsCount'
/**
 * State
 */
export const state = {
  productType: {},
  productTypes: [],
  packages: [],
  package: {},
  orderMappingsList: [],
  orderMappingsCount: 0,
  orderMapping: {},
  options: [],
  optionSets: [],
  orderMappingFails: [],
  orderMappingFailsCount: 0,
}

export const mutations = {
  /**
   * Fetch a product type
   * @param state
   * @param payload
   */
  [FETCH_PRODUCT_TYPE]: (state, payload) => {
    state.productType = payload
  },

  /**
   * Fetch product types
   * @param state
   * @param payload
   */
  [FETCH_PRODUCT_TYPES]: (state, payload) => {
    state.productTypes = payload
  },

  /**
   * Add _new product type
   * @param state
   * @param payload
   */
  [CREATE_PRODUCT_TYPE]: (state, payload) => {
    state.productTypes.unshift(payload)
  },

  /**
   * fetch packages
   * @param state
   * @param payload
   */
  [FETCH_PACKAGES]: (state, payload) => {
    state.packages = payload
  },

  [FETCH_PACKAGE]: (state, payload) => {
    state.package = payload
  },

  [CREATE_PACKAGE]: (state, payload) => {
    state.packages.push(payload)
  },
  [FETCH_ORDER_MAPPINGS]: (state, payload) => {
    state.orderMappingsList = payload
  },
  [FETCH_ORDER_MAPPINGS_COUNT]: (state, payload) => {
    state.orderMappingsCount = payload
  },
  [FETCH_ORDER_MAPPING]: (state, payload) => {
    state.orderMapping = payload
  },
  [FETCH_PRODUCT_OPTIONS]: (state, payload) => {
    state.options = payload.options
    state.optionSets = payload.option_sets
  },
  [FETCH_ORDER_MAPPING_FAILS]: (state, payload) => {
    state.orderMappingFails = payload
  },
  [FETCH_ORDER_MAPPING_FAILS_COUNT]: (state, payload) => {
    state.orderMappingFailsCount = payload
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
   * Fetch product types
   * @param commit
   * @return {Promise<{success: boolean, message: (*|string)}|{success: boolean}>}
   */
  async fetchProductTypes({ commit }, payload) {
    let result = { success: true }
    let response = await api.fetchProductTypes(payload)

    if (response && response.errorMessage) {
      result = { success: false, message: response.errorMessage }
      response = { product_types: [] }
    }

    commit(FETCH_PRODUCT_TYPES, response.product_types)
    return result
  },

  async fetchProductType({ commit }, payload) {
    let result = { success: true }
    let response = await api.fetchProductType(payload)

    if (response && !response.product_type) {
      result = { success: true, message: response.errorMessage }
      response = { product_type: {} }
    }

    commit(FETCH_PRODUCT_TYPE, response.product_type)

    return result
  },

  /**
   * Add product type
   * @param commit
   * @param payload
   * @return {Promise<{success: boolean, message: *}|{success: boolean}>}
   */
  async createProductType({ commit }, payload) {
    const response = await api.addProductType(payload)

    if (response && response.product_type && response.product_type.id) {
      commit(CREATE_PRODUCT_TYPE, response.product_type)
      return { success: true, id: response.product_type.id }
    }

    return { success: false, message: response.message || response.error }
  },

  /**
   * Update product type
   * @param commit
   * @param payload
   * @return {Promise<{success: boolean}>}
   */
  // eslint-disable-next-line
  async updateProductType({ commit }, payload) {
    let result = { success: true }
    let response = await api.updateProductType(payload)

    if (response && response.errorMessage) {
      result = { success: false, message: response.errorMessage }
      response = { product_type: {} }
    }

    commit(FETCH_PRODUCT_TYPE, response.product_type)

    return result
  },

  //eslint-disable-next-line
  async updateProductTypesStatus({ commit }, payload) {
    let result = { success: true }
    let response = await api.updateProductTypesStatus(payload)

    if (response && response.errorMessage) {
      result = { success: false, message: response.errorMessage }
    }

    return result
  },

  async fetchPackages({ commit }, params) {
    let result = { success: true }
    let response = await api.fetchPackages(params)

    if (response && response.errorMessage) {
      result = { success: false, message: response.errorMessage }
      response = { packages: {} }
    }

    commit(FETCH_PACKAGES, response.packages)

    return result
  },

  async fetchPackage({ commit }, params) {
    let result = { success: true }
    let response = await api.fetchPackages(params)

    if (response && response.errorMessage) {
      result = { success: false, message: response.errorMessage }
      response = { package: {} }
    }

    commit(FETCH_PACKAGE, response.package)

    return result
  },

  /**
   * Fetch order mapping list
   * @param commit
   * @param payload
   * @return {Promise<object>}
   */
  async fetchOrderMappingList({ commit }, { type, payload }) {
    let result = { success: true }
    let list = await api.fetchOrderMappings(type, payload)
    if (!list.order_mappings) {
      list.order_mappings = []
      list.count = 0
      result = {
        success: false,
        message: list.errorMessage || '',
      }
    }

    commit(FETCH_ORDER_MAPPINGS, list.order_mappings)
    commit(FETCH_ORDER_MAPPINGS_COUNT, list.count)

    return result
  },

  /**
   * Fetch order mapping
   * @param commit
   * @param payload
   * @return {Promise<object>}
   */
  async fetchOrderMapping({ commit }, { type, id }) {
    let result = { success: true }
    let response = await api.fetchOrderMapping(type, id)

    if (response && response.errorMessage) {
      result = { success: false, message: response.errorMessage }
      response = { order_mapping: {} }
    }

    commit(FETCH_ORDER_MAPPING, response.order_mapping)
    return result
  },
  /**
   * Create or update order mapping
   * @param commit
   * @param payload
   * @return {Promise<object>}
   */
  async createOrUpdateOrderMapping(_, { type, payload }) {
    let response = await api.createOrUpdateOrderMapping(type, payload)

    if (response && response.errorMessage) {
      return { success: false, message: response.errorMessage }
    }

    return { success: true, id: response.id }
  },

  /**
   * Delete order mapping
   * @param commit
   * @param payload
   * @return {Promise<object>}
   */
  async deleteOrderMapping(_, { type, id }) {
    let response = await api.deleteOrderMapping(type, id)

    if (response && response.errorMessage) {
      return { success: false, message: response.errorMessage }
    }

    return { success: true }
  },

  async fetchOptionsByProductId({ commit }, id) {
    let result = { success: true }
    let response = await api.getOptionsByProductId(id)

    if (response && response.errorMessage) {
      result = { success: false, message: response.errorMessage }
      response = { options: [], option_sets: [] }
    }

    commit(FETCH_PRODUCT_OPTIONS, response)
    return result
  },

  /**
   * Fetch order mapping fails
   * @param commit
   * @param payload
   * @return {Promise<object>}
   */
  async fetchOrderMappingFails({ commit }, payload) {
    let result = { success: true }
    let list = await api.fetchOrderMappingFails(payload)
    if (!list.order_map_fails) {
      list.order_map_fails = []
      list.count = 0
      result = {
        success: false,
        message: list.errorMessage || '',
      }
    }

    commit(FETCH_ORDER_MAPPING_FAILS, list.order_map_fails)
    commit(FETCH_ORDER_MAPPING_FAILS_COUNT, list.count)

    return result
  },

  /**
   * Retry order mapping fails
   * @param commit
   * @param payload
   * @return {Promise<object>}
   */
  async retryOrderMappingFails(_, payload) {
    let response = await api.retryOrderMappingFails(payload)

    if (response && response.errorMessage) {
      return { success: false, message: response.errorMessage }
    }

    return { success: true }
  },
}

/**
 * Handle selected shop
 * @param commit
 * @param shop
 * @param accessToken
 */
const handleSelected = (commit, { shop, accessToken }) => {
  commit(FETCH_PRODUCT_TYPE, shop)
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
