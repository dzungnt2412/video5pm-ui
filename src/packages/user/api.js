import http from '@core/services/http'
import { buildQueryString } from '@core/utils/url'

export default {
  /**
   * Fetch profile
   * @return {*}
   */
  fetchProfile() {
    return http.get('/users/me')
  },

  /**
   * Change password
   * @param payload
   * @return {*}
   */
  changePassword(payload) {
    return http.put('/auth/change-password', payload)
  },

  /**
   * Change profile
   * @param payload
   * @return {*}
   */
  changeProfile(payload) {
    return http.put('/users/current/profile', { user: payload })
  },

  /**
   * get users role supports by seller
   * @param payload
   * @return {*}
   */
  fetchSupports(sellerID) {
    return http.get(`/users/${sellerID}/supports`)
  },

  fetchUsers(payload) {
    return http.get(`/users/roles?${buildQueryString(payload)}`)
  },

  /**
   * store permission staff support seller
   * @param payload
   * @param payload
   * @return {*}
   */
  storePermissionStaffSupportSeller(payload) {
    return http.post(`/users/permissions/${payload.seller_id}/seller`, {
      ids: payload.support_ids,
    })
  },
}
