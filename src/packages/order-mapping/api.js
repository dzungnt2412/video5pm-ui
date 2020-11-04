import http from '@core/services/http'
import { buildQueryString } from '@core/utils/url'

export default {
  // Product types
  fetchProductTypes(payload = {}) {
    return http.get(`/products/types/all?${buildQueryString(payload)}`)
  },

  fetchProductType(id) {
    return http.get(`/products/types/${id}`)
  },

  addProductType(payload) {
    return http.post('/products', { product_type: payload })
  },

  updateProductType(payload) {
    return http.put(`/products/types/${payload.id}`, { product_type: payload })
  },

  updateProductTypesStatus(payload) {
    return http.put('/products/types/status', payload)
  },

  // Packages
  fetchPackages(payload = {}) {
    return http.get(`/products/packages?${buildQueryString(payload)}`)
  },

  addPackage(payload) {
    return http.post('/packages', payload)
  },

  updatePackage(payload) {
    return http.put(`/package/${payload.id}`, { package: payload })
  },
  /**
   * Fetch order mapping list and count
   * @param payload
   * @return {*}
   */
  fetchOrderMappings(type, payload) {
    return http.get(`/order-mapping/${type}?${buildQueryString(payload)}`)
    // return _new Promise((resolve) => {
    //   resolve({"order_mappings":[{"product_type_id":null,"rules":[{"column":"option_set","relation":"equal","condition":"Sizes","target_value":null},{"column":"option","relation":"equal","condition":"Small","target_value":null},{"column":"option","relation":"equal","condition":" Medium","target_value":null},{"column":"option_set","relation":"equal","condition":"Color","target_value":null},{"column":"option","relation":"equal","condition":"Blue","target_value":null},{"column":"option","relation":"equal","condition":" Red","target_value":null}],"type":"option","disjunctive":false}]})
    // })
  },
  /**
   * Fetch order mapping
   * @param id
   * @return {*}
   */
  fetchOrderMapping(type, id) {
    return http.get(`/order-mapping/${type}/${id}`)
  },
  /**
   * Create or update order mapping
   * @param payload
   * @return {*}
   */
  createOrUpdateOrderMapping(type, payload) {
    return http.post(`/order-mapping/${type}`, payload)
  },
  /**
   * Delete order mapping
   * @param id
   * @return {*}
   */
  deleteOrderMapping(type, id) {
    return http.delete(`/order-mapping/${type}/${id}`)
  },

  /**
   * Get options and option sets by product id
   * @param id
   * @return {*}
   */
  getOptionsByProductId(id) {
    return http.get(`/products/options/${id}`)
  },

  /**
   * Fetch order mapping fail lists
   * @param id
   * @return {*}
   */
  fetchOrderMappingFails(payload) {
    return http.get(
      `/order-mapping/order-map-fail?${buildQueryString(payload)}`
    )
  },

  /**
   * Retry order mapping fails
   * @param id
   * @return {*}
   */
  retryOrderMappingFails(payload) {
    return http.post(`/order-mapping/retry-order-map-fail`, payload)
  },
}
