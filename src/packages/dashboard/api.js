import http from '@core/services/http'
import { buildQueryString } from '@core/utils/url'

export default {
  fetchStatisticOrders(payload = {}) {
    const date = {
      start_date: '2018-01-01',
      end_date: '2025-01-01',
    }

    return http.get(
      `/statistics/order?${buildQueryString(Object.assign({}, date, payload))}`
    )
  },
  fetchStatisticTopSalesCountries(payload = {}) {
    const date = {
      start_date: '2018-01-01',
      end_date: '2025-01-01',
    }

    return http.get(
      `/statistics/top-selling-countries?${buildQueryString(
        Object.assign({}, date, payload)
      )}`
    )
  },
}
