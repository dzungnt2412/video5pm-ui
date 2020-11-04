import http from '@core/services/http'
import { buildQueryString } from '@core/utils/url'

export default {
  fetchFulfillments(params) {
    return http.get(`/fulfillments?${buildQueryString(params)}`)
  },
  countFulfillments(params) {
    return http.get(`/fulfillments/count?${buildQueryString(params)}`)
  },
  exportFulfillments(params) {
    return http.get(`/fulfillments/export?${buildQueryString(params)}`)
  },
}
