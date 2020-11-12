import api from '../api'

export const CREATE_VIDEO_PREVIEW = 'createVideoPreview'
export const UPLOAD_VIDEO = 'uploadVideo'

/**
 * State
 */
export const state = {
  video: {},
}

export const mutations = {
  /**
   * Fetch a shop
   * @param state
   * @param payload
   */
  [CREATE_VIDEO_PREVIEW]: (state, payload) => {
    state.video = payload
  },
  /**
   * Fetch a shop
   * @param state
   * @param payload
   */
  [UPLOAD_VIDEO]: (state, payload) => {
    state.video = payload
  },
}

/**
 * Actions
 */
export const actions = {
  /**
   * Create video preview
   * @param commit
   * @return {Promise<{success: boolean, message: (*|string)}|{success: boolean}>}
   */
  async createVideoPreview({ commit }, payload) {
    let result = { success: true }
    let response = await api.creatVideoPreview(payload)

    if (!response || response.message) {
      result = { success: false, message: response.message }
      response = { video: {} }
    }

    commit(CREATE_VIDEO_PREVIEW, response.video)
    return result
  },

  /**
   * Upload video preview
   * @param commit
   * @return {Promise<{success: boolean, message: (*|string)}|{success: boolean}>}
   */
  async uploadVideo({ commit }, payload) {
    let result = { success: true }
    let response = await api.uploadVideo(payload)

    if (!response || response.message ) {
      result = { success: false, message: response.message }
      response = { video: {} }
      return result
    }

    commit(UPLOAD_VIDEO, response.video)
    return result
  },
}
