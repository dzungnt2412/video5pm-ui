import http from '@core/services/http'
import { buildQueryString } from '@core/utils/url'

export default {
  /**
   * Create video
   * @param payload
   * @return {*}
   */
  creatVideoPreview(payload) {
    return http.post("/create-video-preview",payload)
  },
  /**
   * Upload video
   * @param payload
   * @return {*}
   */
  uploadVideo(payload) {
    return http.post("/upload-video",payload)
  },
}
