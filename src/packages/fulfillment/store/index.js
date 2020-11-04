import api from '../api'

// Constant types
const FETCH_FULFILLMENTS = 'fetchFulfillments'
const COUNT_FULFILLMENTS = 'countFulfillments'
const EXPORT_FULFILLMENTS = 'exportFulfillments'

export const state = {
  fulfillments: [],
  count: 0,
  download: {},
}

export const mutations = {
  [FETCH_FULFILLMENTS](state, payload) {
    state.fulfillments = payload
  },
  [COUNT_FULFILLMENTS](state, payload) {
    state.count = payload
  },
  [EXPORT_FULFILLMENTS](state, payload) {
    state.download = payload
  },
}

export const actions = {
  async fetchFulfillments({ commit }, payload) {
    let success = true
    let message = ''
    let [list, count] = await Promise.all([
      api.fetchFulfillments(payload),
      api.countFulfillments(payload),
    ])

    if (!list || list.error || !count) {
      list = {
        fulfillments: [],
      }
      count = { count: 0 }
      success = false
      message = list.errorMessage || ''
    }

    commit(FETCH_FULFILLMENTS, list.fulfillments)
    commit(COUNT_FULFILLMENTS, count.count)

    return { success, message, items: list.fulfillments }
  },
  async exportFulfillments({ commit }, payload) {
    let success = true
    let message = ''
    let response = await api.exportFulfillments(payload)
    if (!response || response.error) {
      success = false
      message = response.errorMessage || response.message || ''
    }

    commit(EXPORT_FULFILLMENTS, response)

    return {
      success,
      message,
      queue: response.queue,
      url: response.download,
    }
  },
}
