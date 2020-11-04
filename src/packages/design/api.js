import http from '@core/services/http'
import { buildQueryString } from '@core/utils/url'

export default {
  /**
   * Fetch designs
   * @param payload
   * @return {*}
   */
  fetchDesigns(payload) {
    return http.get(`/designs?${buildQueryString(payload)}`)
  },
  /**
   * Fetch designs
   * @param designID
   * @return {*}
   */
  fetchDesignFiles(designID) {
    return http.get(`/designs/${designID}/files`)
  },
  /**
   * Fetch design count
   * @param payload
   * @return {*}
   */
  fetchDesignCount(payload) {
    return http.get(`/designs/count?${buildQueryString(payload)}`)
  },

  /**
   * Fetch design
   * @param designId
   * @return {*}
   */
  fetchDesign(designId) {
    return http.get(`/designs/${designId}`)
  },

  /**
   * Create design
   * @param payload
   * @return {*}
   */
  create(payload) {
    return http.post(`/designs`, payload)
  },

  /**
   * Update design
   * @param payload
   * @return {*}
   */
  update(payload) {
    return http.put(`/designs/${payload.id}/files`, payload.body)
  },

  updateSku(payload) {
    return http.put(`/designs/${payload.id}`, payload)
  },

  delete(payload) {
    return http.delete(`/designs/${payload.id}`)
  },
  deleteDesignFile(payload) {
    return http.delete(`/designs/${payload.design_id}/files/${payload.id}`)
  },
  /**
   * Update design
   * @param payload
   * @return {*}
   */
  archive(payload) {
    return http.put(`/designs/archive`, payload)
  },
  /**
   * Missing thumbnail
   * @param {String} url
   * @return {*}
   */
  missingThumbnail(url) {
    return http.get(
      `/designs/miss-thumbnail?${buildQueryString({
        url: url,
      })}`
    )
  },

  getImage(url) {
    return http.get(url, { type: 'blob' })
  },
}
