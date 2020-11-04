import api from '../api'

/**
 * Types
 */
export const CHANGE_PASSWORD = 'changePassword'
export const CHANGE_PROFILE = 'changeProfile'
export const FETCH_PROFILE = 'fetchProfile'
export const FETCH_STAFFS = 'fetchStaffs'
export const FETCH_CURRENT_SUPPORTS = 'fetchCurrentSupports'
export const STORE_PERMISSION_STAFF_SUPPORT =
  'storePermissionStaffSupportSeller'

/**
 * State
 */
export const state = {
  current: {},
  staffs: [],
  cuurentSupports: [],
}

/**
 * Actions
 */
export const actions = {
  /**
   *  Change password
   * @param commit
   * @param payload
   * @return {Promise<{success: object}>}
   */
  // eslint-disable-next-line
  async changePassword({ commit }, payload) {
    let result = { success: true }
    const response = await api.changePassword(payload)

    if (response && response.errorMessage) {
      result = { success: false, message: response.errorMessage }
    }

    return result
  },

  /**
   * Fetch profile
   * @param commit
   * @return {Promise<{success: object}>}
   */
  async fetchProfile({ commit }) {
    let result = { success: true }
    let response = await api.fetchProfile()

    if (response && response.errorMessage) {
      result = { success: false, message: response.errorMessage }
      response = {
        user: {},
      }
    }

    commit(FETCH_PROFILE, response.user)

    return result
  },

  /**
   *  Change profile
   * @param commit
   * @param payload
   * @return {Promise<{success: boolean}>}
   */
  async changeProfile({ commit }, payload) {
    let result = { success: true }
    const response = await api.changeProfile(payload)

    if (response && response.errorMessage) {
      result = { success: false, message: response.errorMessage }
    } else {
      commit(FETCH_PROFILE, response.user)
    }

    return result
  },

  /**
   * get users role support
   * @param commit
   * @param payload
   * @return {Promise<{success: boolean}>}
   */
  async fetchStaffs({ commit }) {
    let result = { success: true }
    let response = await api.fetchUsers({
      limit: 250,
      role: 'support',
      status: 'active',
    })

    if (response && response.errorMessage) {
      result = { success: false, message: response.errorMessage }
      response = {
        users: [],
      }
    }

    commit(FETCH_STAFFS, response.users)

    return result
  },

  /**
   * get users role support
   * @param commit
   * @param payload
   * @return {Promise<{success: boolean}>}
   */
  async fetchCurrentSupports({ commit }, payload) {
    let result = { success: true }
    let response = await api.fetchSupports(payload)

    if (response && response.errorMessage) {
      result = { success: false, message: response.errorMessage }
      response = {
        supports: [],
      }
    }

    commit(FETCH_CURRENT_SUPPORTS, response.supports)

    return result
  },

  /**
   * save permission staff support seller
   * @param commit
   * @param payload
   * @return {Promise<{success: boolean}>}
   */
  // eslint-disable-next-line
  async storePermissionStaffSupportSeller({ commit }, payload) {
    const response = await api.storePermissionStaffSupportSeller(payload)

    if (response && response.success === true) {
      return { success: true }
    }

    return {
      success: false,
      message: response.errorMessage || '',
    }
  },
}

/**
 * Mutations
 */
export const mutations = {
  [FETCH_PROFILE](state, payload) {
    state.current = payload
  },
  [FETCH_STAFFS](state, payload) {
    state.staffs = payload
  },
  [FETCH_CURRENT_SUPPORTS](state, payload) {
    state.cuurentSupports = payload
  },
}
