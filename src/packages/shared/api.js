import http from '@core/services/http'
import { buildQueryString } from '@core/utils/url'

export default {
  fetchStatisticTotalSales(payload = {}) {
    return http.get(
      `/statistics/referred-users?${buildQueryString(
        payload
      )}&start_date=1970-01-01&end_date=2025-01-01`,
      payload
    )
  },
  fetchStatisticTotalUsers(payload = {}) {
    return http.get(
      `/statistics/ref-total-sale?${buildQueryString(
        payload
      )}&start_date=1970-01-01&end_date=2025-01-01`
    )
  },
  fetchUsersByRole(payload) {
    return http.get(`/users/roles?${buildQueryString(payload)}`)
  },
  countUsersByRole(payload) {
    return http.get(`/users/roles/count?${buildQueryString(payload)}`)
  },
  fetchUsersByRef(payload) {
    return http.get(`/users/referred-users?${buildQueryString(payload)}`)
  },
  fetchProductTypes(payload = {}) {
    return http.get(`/products/bases?${buildQueryString(payload)}`)
  },
  fetchAllProductBases(payload = {}) {
    return http.get(`/products/bases/all?${buildQueryString(payload)}`)
  },
  fetchShops(payload = {}) {
    return http.get(`/shops?${buildQueryString(payload)}`)
  },
  fetchShopCount(payload = {}) {
    return http.get(`/shops/count?${buildQueryString(payload)}`)
  },
  fetchProviders(payload = {}) {
    return http.get(`/products/providers?${buildQueryString(payload)}`)
  },
  fetchNotifications(payload = {}) {
    return http.get(`/users/notifications?${buildQueryString(payload)}`)
  },
  countNotifications(payload = {}) {
    return http.get(`/users/notifications/count?${buildQueryString(payload)}`)
  },
  readNotifications(payload = {}) {
    return http.put(`/users/notifications/read`, { ids: payload })
  },
}
