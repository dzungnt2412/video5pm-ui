import api from '../api'

export const FETCH_POINT = 'fetchUserPoint'

export const state = {
  user_point: {
    point: 0,
  },
}

export const mutations = {
  [FETCH_POINT](state, payload) {
    state.user_point = payload
  },
}

export const actions = {
  /**
   * Fetch current prize
   * @param commit
   * @param payload
   * @returns {Promise<boolean>}
   */
  async fetchUserPoint({ commit }) {
    let userPoint = {}
    let isSuccess = false
    const response = await api.fetchUserPoint()
    if (response && !response.error) {
      userPoint = response.user_point
      isSuccess = true
    }

    commit(FETCH_POINT, userPoint)

    return isSuccess
  },
}
