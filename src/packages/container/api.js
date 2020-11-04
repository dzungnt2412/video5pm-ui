import http from '@core/services/http'
import { buildQueryString } from '@core/utils/url'

export default {
  /**
   * Fetch container
   * @param payload
   * @return {*}
   */
  fetchContainers(payload) {
    return http.get(`/orders/containers?${buildQueryString(payload)}`)
  },

  /**
   * Fetch order count
   * @param payload
   * @return {*}
   */
  fetchContainerCount(payload) {
    return http.get(`/orders/containers/count?${buildQueryString(payload)}`)
  },

  /**
   * Fetch container
   * @param id
   * @return {*}
   */
  fetchContainer(id) {
    return http.get(`/orders/containers/${id}`)
  },

  /**
   * Fetch orders
   * @param payload
   * @return {*}
   */
  fetchOrders(payload) {
    return http.get(`/orders?${buildQueryString(payload)}`)
  },

  /**
   * Fetch order count
   * @param payload
   * @return {*}
   */
  fetchOrderCount(payload) {
    return http.get(`/orders/count?${buildQueryString(payload)}`)
  },

  /**
   * Fetch order
   * @param payload
   * @return {*}
   */
  fetchOrder(payload) {
    return http.get(`/orders/${payload}`)
  },

  /**
   * Import orders
   * @param payload
   * @return {*}
   */
  importOrders(payload) {
    const formData = new FormData()

    formData.append('file', payload.file)

    if (payload.shop_id) {
      formData.append('shop_id', payload.shop_id)
    }

    return http.post('/orders/import', formData)
  },

  /**
   * Preview import orders
   * @param payload
   * @return {*}
   */
  previewImportOrders(payload) {
    const formData = new FormData()

    formData.append('file', payload.file)

    if (payload.shop_id) {
      formData.append('shop_id', payload.shop_id)
    }

    return http.post('/orders/import/preview', formData)
  },

  /**
   * Update order
   * @param payload
   * @return {*}
   */
  updateOrder(payload) {
    return http.put(`/orders/${payload.id}`, { order: payload })
  },

  /**
   * Create container
   * @param payload
   * @return {*}
   */
  createContainer(payload) {
    return http.post('/orders/containers', payload)
  },

  /**
   * Append orders to container
   * @param payload
   * @return {*}
   */
  appendContainer(payload) {
    return http.put('/orders/containers/append', payload)
  },

  /**
   * Create container
   * @param payload
   * @return {*}
   */
  updateContainer(payload) {
    return http.put(`/orders/containers/${payload.id}`, { container: payload })
  },

  /**
   * Export container
   * @param id
   * @return {*}
   */
  exportContainer(id) {
    return http.post('/orders/export', { container_id: id })
  },

  /**
   * Export orders
   * @param ids
   * @return {*}
   */
  exportOrders(ids) {
    return http.post('/orders/export', { order_ids: ids })
  },

  /**
   * Get Logs
   * @param {String} url
   * @return {*}
   */
  getLogs(params) {
    return http.get(`/logs?${buildQueryString(params)}`)
  },
}
