import api from '../api'
import {
  FETCH_ORDERS,
  FETCH_ORDER_COUNT,
  FETCH_ORDER,
  FETCH_CONTAINERS,
  FETCH_CONTAINER_COUNT,
  FETCH_CONTAINER,
  CREATE_CONTAINER,
  UPDATE_ORDER,
  FETCH_LOGS,
  CANCEL_TRACKING_NUMBER,
} from './types'

export default {
  /**
   * Fetch orders
   * @param commit
   * @param payload
   * @return {Promise<object>}
   */
  async fetchOrders({ commit }, payload) {
    let result = { success: true }
    let [list, count] = await Promise.all([
      api.fetchOrders(payload),
      api.fetchOrderCount(payload),
    ])

    if (!list.orders || !count) {
      list.orders = []
      count = { count: 0 }
      result = {
        success: false,
        message: list.errorMessage || '',
      }
    }

    commit(FETCH_ORDERS, list.orders)
    commit(FETCH_ORDER_COUNT, count.count)

    return result
  },

  /**
   * Fetch order
   * @param commit
   * @param payload
   * @return {Promise<object>}
   */
  async fetchOrder({ commit }, payload) {
    let result = { success: true }
    let response = await api.fetchOrder(payload)

    if (!response || !response.order) {
      response.order = {}
      result = {
        success: false,
        message: response.errorMessage || '',
      }
    }

    commit(FETCH_ORDER, response.order)

    return result
  },

  /**
   * Fetch containers
   * @param commit
   * @param payload
   * @return {Promise<object>}
   */
  async fetchContainers({ commit }, payload) {
    let result = { success: true }
    let [list, count] = await Promise.all([
      api.fetchContainers(payload),
      api.fetchContainerCount(payload),
    ])

    if (!list || !list.containers || !count) {
      list.containers = []
      count = { count: 0 }
      result = { success: false, message: list.errorMessage }
    }

    commit(FETCH_CONTAINERS, list.containers)
    commit(FETCH_CONTAINER_COUNT, count.count)

    return result
  },

  /**
   * Fetch order
   * @param commit
   * @param payload
   * @return {Promise<object>}
   */
  async fetchContainer({ commit }, payload) {
    let result = { success: true }
    let response = await api.fetchContainer(payload)

    if (!response.container) {
      response.container = {}
      result = {
        success: false,
        message: response.errorMessage,
      }
    }

    commit(FETCH_CONTAINER, response.container)

    return result
  },

  /**
   * Create or append container
   * @param commit
   * @param payload
   * @return {Promise<{success: boolean, message: (*|string)}|{success: boolean}>}
   */
  async createContainer({ commit }, payload) {
    const response = payload.container_id
      ? await api.appendContainer(payload)
      : await api.createContainer(payload)

    if (response && response.container) {
      commit(CREATE_CONTAINER, payload.order_ids)
      return { success: true, id: response.container.id }
    }

    return {
      success: false,
      message: response.errorMessage || '',
    }
  },

  /**
   * Update container
   * @param commit
   * @param payload
   * @return {Promise<{success: boolean}>}
   */
  async updateContainer({ commit }, payload) {
    let result = { success: true }
    let response = await api.updateContainer(payload)

    if (response && response.error) {
      result = { success: false, message: response.errorMessage || '' }
    } else {
      commit(FETCH_CONTAINER, response.container)
    }

    return result
  },

  /**
   * Import orders
   * @param commit
   * @param payload
   * @return {Promise<*>}
   */
  // eslint-disable-next-line
  async previewImportOrders({ commit }, payload) {
    const response = await api.previewImportOrders(payload)
    //eslint-disable-next-line
    if (
      response &&
      typeof response.import_errors !== 'undefined' &&
      typeof response.total_order !== 'undefined' &&
      (response.import_errors.length || response.total_order > 0)
    ) {
      return {
        success: true,
        ...response,
      }
    }

    return {
      success: false,
      message: response.errorMessage || '',
    }
  },

  /**
   * Import orders
   * @param commit
   * @param payload
   * @return {Promise<Object>}
   */
  // eslint-disable-next-line
  async importOrders({ commit }, payload) {
    const response = await api.importOrders(payload)

    if (
      response &&
      typeof response.import_errors !== 'undefined' &&
      typeof response.total_order !== 'undefined' &&
      (response.import_errors.length || response.total_order > 0)
    ) {
      return {
        success: true,
        ...response,
      }
    }

    return {
      success: false,
      message: response.errorMessage || '',
    }
  },

  /**
   * Update order
   * @param commit
   * @param payload
   * @return {Promise<object>}
   */
  async updateOrder({ commit }, payload) {
    const response = await api.updateOrder(payload)

    if (response && response.order) {
      commit(UPDATE_ORDER, response.order)

      return { success: true }
    }

    return {
      id: payload.id,
      success: false,
      message: response.errorMessage || '',
    }
  },

  /**
   * Export container
   * @param commit
   * @param payload
   * @return {Promise<{success: boolean}>}
   */
  // eslint-disable-next-line
  async exportContainer({ commit }, payload) {
    let result = { success: true }
    const response = await api.exportContainer(payload)

    if (response && response.errorMessage) {
      result = { success: false, message: response.errorMessage }
    } else {
      result = Object.assign(result, {
        queue: response.queue,
        url: response.download,
      })
    }

    return result
  },

  /**
   * Export orders
   * @param commit
   * @param payload
   * @return {Promise<{success: boolean}>}
   */
  //eslint-disable-next-line
  async exportOrders({ commit }, payload) {
    let result = { success: true }
    const response = await api.exportOrders(payload)

    if (response.error || response.message) {
      result = { success: false, message: response.errorMessage }
    } else {
      result.queue = response.queue
      result.url = response.download
    }

    return result
  },

  async getLogs({ commit }, payload) {
    let result = { success: true }
    const response = await api.getLogs(payload)

    if (response && !response.logs) {
      response.logs = []
      result = { success: false, message: response.errorMessage }
    }

    commit(FETCH_LOGS, response.logs)
    return result
  },

  //eslint-disable-next-line
  async createTracking({ commit }, payload) {
    let result = { success: true }
    const response = await api.createTracking(payload)

    if (response && response.errorMessage) {
      result = { success: false, message: response.errorMessage }
    }

    return result
  },

  /* eslint-disable no-alert, no-console */
  async cancelTracking({ commit }, payload) {
    let result = { success: true }
    const response = await api.cancelTracking(payload)

    if (response && response.errorMessage) {
      result = { success: false, message: response.errorMessage }
    }

    commit(CANCEL_TRACKING_NUMBER, payload)
    return result
  },
}
