import Vue from 'vue'
import { ORDER_STATUS_UNPAID } from '@core/constants'
import {
  FETCH_CONTAINERS,
  FETCH_CONTAINER_COUNT,
  FETCH_CONTAINER,
  FETCH_ORDERS,
  FETCH_ORDER,
  FETCH_ORDER_COUNT,
  FETCH_LOGS,
  CREATE_CONTAINER,
  UPDATE_ORDER,
} from './types'

export default {
  [FETCH_CONTAINERS]: (state, payload) => {
    state.containers = payload
  },

  [FETCH_CONTAINER_COUNT]: (state, payload) => {
    state.containerCount = payload
  },

  [FETCH_CONTAINER]: (state, payload) => {
    state.container = payload
  },

  [FETCH_ORDERS]: (state, payload) => {
    state.orders = payload
  },

  [FETCH_ORDER]: (state, payload) => {
    state.order = payload
  },

  [FETCH_ORDER_COUNT]: (state, payload) => {
    state.orderCount = payload
  },

  [CREATE_CONTAINER]: (state, payload) => {
    payload.forEach((orderId) => {
      const index = state.orders.findIndex(({ id }) => orderId === id)

      if (index !== -1) {
        Vue.set(
          state.orders,
          index,
          Object.assign({}, state.orders[index], {
            status: ORDER_STATUS_UNPAID,
          })
        )
      }
    })
  },

  [UPDATE_ORDER]: (state, payload) => {
    const index = state.orders.findIndex(({ id }) => id === payload.id)

    if (index !== -1) {
      Vue.set(state.orders, index, payload)
    }

    state.order = payload
  },
  [FETCH_LOGS]: (state, payload) => {
    state.logs = payload
  },
}
