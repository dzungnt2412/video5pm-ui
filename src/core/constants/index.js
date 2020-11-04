// Roles
export const ROLE_SELLER = 'seller'

// Order and container status
export const ORDER_STATUS_DRAFT = 'draft'
export const ORDER_STATUS_PENDING = 'pending'
export const ORDER_STATUS_PROCESS = 'process'
export const ORDER_STATUS_PAID = 'paid'
export const ORDER_STATUS_UNPAID = 'unpaid'
export const ORDER_STATUS_CANCELED = 'canceled'
export const ORDER_STATUS_FULFILLED = 'fulfilled'
export const ORDER_STATUS_AWAITING = 'awaiting'
export const ORDER_STATUS_REJECT = 'rejected'

export const ACL_KEYS = {
  setStatusPaid: 'setStatusPaid',
  setStatusUnPaid: 'setStatusUnPaid',
  setStatusProcess: 'setStatusProcess',
  setStatusContainerCancel: 'setStatusContainerCancel',
  setStatusOrderCancel: 'setStatusOrderCancel',
  importTrackingNumber: 'updateTrackingNumber',
  updateOrder: 'updateOrder',
}

export const ACL = {
  [ACL_KEYS.updateOrder]: [ROLE_SELLER],
}

export const NOT_STAFF_GET_LIMIT = 50

export const MAX_DESIGN_FILE = 15
