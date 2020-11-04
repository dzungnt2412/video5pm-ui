import http from '@core/services/http'
import { buildQueryString } from '@core/utils/url'

export default {
  fetchShops(payload = {}) {
    return http.get(`/users/shops?${buildQueryString(payload)}`)
  },
  removeConnectShop(payload = {}) {
    const { id } = payload
    return http.delete(`/platforms/${id}`)
  },

  fetchShop(id) {
    return http.get(`/shops/${id}`)
  },

  selectShop(payload) {
    return http.post('/auth/shop-access-token', payload)
  },

  addShop(payload) {
    return http.post('/shops', payload)
  },

  updateShop(payload) {
    return http.put(`/shops/${payload.id}`, { shop: payload })
  },
}
