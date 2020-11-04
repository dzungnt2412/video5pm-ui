import api from '../api'

// Constant types
const FETCH_TICKET = 'fetchTicket'
const FETCH_TICKETS = 'fetchTickets'
const COUNT_TICKETS = 'countTickets'
const FETCH_TICKET_MESSAGES = 'fetchTicketMessages'
const COUNT_TICKET_MESSAGES = 'countTicketMessages'
const PUSH_TICKET_MESSAGE = 'pushTicketMessage'
const UPDATE_MESSAGE_TICKET = 'updateTicketMessage'
const FETCH_CATEGORIES = 'fetchCategories'
const FETCH_TICKET_STATICTIS = 'fetchTicketStatictis'

export const state = {
  tickets: [],
  count: 0,
  messages: [],
  ticket: {},
  categories: [],
  statisticTickets: {},
}

export const mutations = {
  [FETCH_TICKETS](state, payload) {
    state.tickets = payload
  },
  [FETCH_TICKET](state, payload) {
    state.ticket = payload
  },
  [COUNT_TICKETS](state, payload) {
    state.count = payload
  },
  [FETCH_TICKET_MESSAGES](state, payload) {
    state.messages = payload
  },
  [COUNT_TICKET_MESSAGES](state, payload) {
    state.count = payload
  },
  [PUSH_TICKET_MESSAGE](state, payload) {
    state.messages = [payload, ...state.messages]
  },
  [FETCH_CATEGORIES](state, payload) {
    state.categories = payload
  },
  [FETCH_TICKET_STATICTIS](state, payload) {
    state.statisticTickets = payload
  },
  [UPDATE_MESSAGE_TICKET](state, payload) {
    state.messages = payload
  },
}

export const actions = {
  // eslint-disable-next-line
  async createTicket({ commit }, payload) {
    const response = await api.createTicket(payload)
    if (response && response.ticket && response.ticket.id) {
      return { success: true, id: response.ticket.id }
    }

    return {
      success: false,
      message: response.errorMessage || '',
    }
  },

  async fetchTickets({ commit }, payload) {
    let success = true
    let message = ''
    let [list, count] = await Promise.all([
      api.fetchTickets(payload),
      api.countTickets(payload),
    ])

    if (!list || list.error || !count) {
      list = {
        tickets: [],
      }
      count = { count: 0 }
      success = false
      message = list.errorMessage || ''
    }

    commit(FETCH_TICKETS, list.tickets)
    commit(COUNT_TICKETS, count.count)

    return { success, message, items: list.tickets }
  },

  async fetchTicket({ commit }, payload) {
    let result = { success: true }
    let response = await api.fetchTicket(payload)

    if (!response || response.error) {
      result = {
        success: false,
        message: response.errorMessage || '',
      }

      response = {
        ticket: {},
      }
    }

    commit(FETCH_TICKET, response.ticket)
    return result
  },
  // eslint-disable-next-line no-empty-pattern
  async fetchTicketFile({}, payload) {
    let result = { success: true }
    let response = await api.fetchTicketFile(payload)

    if (!response || response.error) {
      result = {
        success: false,
        message: response.errorMessage || '',
      }
    }
    result.blob = response
    return result
  },

  // eslint-disable-next-line
  async closeTicket({ commit }, payload) {
    let result = { success: true }
    let response = await api.closeTicket(payload)

    if (!response || response.error) {
      result = {
        success: false,
        message: response.errorMessage || '',
      }
    }

    return result
  },

  async fetchTicketMessages({ commit }, ticket_id, payload) {
    let success = true
    let message = ''
    let [list, count] = await Promise.all([
      api.fetchTicketMessages(ticket_id, payload),
      api.countTicketMessages(ticket_id, payload),
    ])

    if (!list || list.error || !count) {
      list = {
        messages: [],
      }
      count = { count: 0 }
      success = false
      message = list.errorMessage || ''
    }

    commit(FETCH_TICKET_MESSAGES, list.messages)
    commit(COUNT_TICKET_MESSAGES, count.count)

    return { success, message, items: list.messages }
  },

  // eslint-disable-next-line
  async pushMessage({ commit }, payload) {
    const response = await api.pushMessage(payload)
    if (response && response.message && response.message.id) {
      return { success: true, id: response.message.id }
    }

    return {
      success: false,
      message: response.errorMessage || '',
    }
  },

  fetchCategories({ commit }) {
    const categories = [
      'Thay đổi thông tin đặt hàng',
      'Hủy đơn',
      'Vấn đề về thời gian sản xuất & tracking',
      'Label',
      'Vấn đề sau khi phát hàng (thiếu, sai sản phẩm, chất lượng kém,…)',
      'Trường hợp khác',
    ]
    commit(FETCH_CATEGORIES, categories)
  },

  // eslint-disable-next-line
  async fetchTicketStatictis({ commit }) {
    let result = { success: true }
    let response = await api.fetchStatisticTicketStatus()

    if (response && response.errorMessage) {
      result = { success: false, message: response.errorMessage }
      response = { totals: {} }
    }

    commit(FETCH_TICKET_STATICTIS, response.totals)
    return result
  },
}
