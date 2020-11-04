import http from '@core/services/http'
import { buildQueryString } from '@core/utils/url'
import { RESPONSE_TYPE_BLOB } from '@core/constants/http'

export default {
  createTicket(payload) {
    return http.post('/tickets', payload)
  },
  fetchTicket(id) {
    return http.get(`/tickets/${id}`)
  },
  fetchTickets(params) {
    return http.get(`/tickets?${buildQueryString(params)}`)
  },
  countTickets(params) {
    return http.get(`/tickets/count?${buildQueryString(params)}`)
  },
  pushMessage(payload) {
    return http.post(`/tickets/${payload.ticket_id}/message`, payload)
  },
  fetchTicketMessages(id, params) {
    return http.get(`/tickets/${id}/messages?${buildQueryString(params)}`)
  },
  countTicketMessages(id, params) {
    return http.get(`/tickets/${id}/messages/count?${buildQueryString(params)}`)
  },
  deleteMessage(ticket_id, id) {
    return http.delete(`/tickets/${ticket_id}/message/${id}`)
  },
  forwardTicket(payload) {
    return http.post(`/tickets/${payload.ticket_id}/forward`, payload)
  },
  fetchStatisticTicketStatus(payload) {
    return http.get(`/tickets/statistic/status?${buildQueryString(payload)}`)
  },
  fetchTicketFile(payload) {
    return http.get(
      `/uploads/file-export/download?${buildQueryString(payload)}`,
      RESPONSE_TYPE_BLOB
    )
  },
}
