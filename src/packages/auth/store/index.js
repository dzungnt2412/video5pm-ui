import { ROLE_SELLER } from '@core/constants'
import api from '../api'
import AuthService from '@core/services/auth'
import Affiliate from '@core/helpers/affiliate'

/**
 * Type
 */
export const AUTHENTICATE = 'authenticate'
export const GET_USER = 'getUser'

/**
 * State
 */
export const state = {
  user: {},
}

/**
 * Actions
 */
export const actions = {
  /**
   * Init
   * @param commit
   */
  init({ commit }) {
    AuthService.init()

    if (AuthService.isAuthenticated()) {
      handleAuthenticated(commit, Object.assign({}, AuthService.user))
    }
  },

  /**
   * Sign in
   * @param commit
   * @param payload
   * @returns {Promise<{success: boolean}>}
   */
  async signIn({ commit }, payload) {
    let response

    response = await api.signIn(payload)

    if (response && response.access_token) {
      const data = Object.assign({}, response.user, {
        access_token: response.access_token,
      })
      handleAuthenticated(commit, transformerAuthenticate(data))

      return {
        success: true,
        permission: data.role === ROLE_SELLER,
      }
    }

    return {
      success: false,
      message: response.errorMessage || '',
    }
  },

  /**
   * Sign up
   * @param commit
   * @param payload
   * @returns {Promise<{success: boolean}>}
   */
  // eslint-disable-next-line
  async signUp({ commit }, payload) {
    if (Affiliate.hasRef()) {
      payload.user_referring_code = Affiliate.getRef()
    }

    payload.username = payload.username.toLowerCase()
    const response = await api.signUp(payload)

    if (response && response.user && response.user.id) {
      return {
        success: true,
      }
    }

    return response
  },

  /**
   * Sign out
   * @param commit
   */
  signOut({ commit }) {
    AuthService.set({})
    commit(AUTHENTICATE, {})
    AuthService.clear()
  },
}

/**
 * Mutations
 */
export const mutations = {
  [AUTHENTICATE](state, payload) {
    state.user = payload
  },
}

/**
 * Getters
 */
export const getters = {
  [GET_USER](state) {
    if (state.user && state.user.id) {
      return Object.assign({}, state.user)
    }

    return { id: 0 }
  },
  currentRole(state) {
    return state.user.role
  },
  isSeller(state) {
    return state.user.role === ROLE_SELLER
  },
}

/**
 * Handle after authenticated
 * @param commit
 * @param payload
 */
const handleAuthenticated = (commit, payload) => {
  if (payload.role !== ROLE_SELLER) {
    return
  }

  AuthService.set(payload)
  commit(AUTHENTICATE, payload)
}

/**
 * transformer authenticate data to storage
 * @param response
 * @return {{name: *, id: *, avatar: *, accessToken: *, email: *}}
 */
const transformerAuthenticate = (response) => {
  return {
    id: response.id,
    accessToken: response.access_token,
    email: response.email,
    username: response.username,
    role: response.role,
    canReferent: response.can_refer,
    refCode: response.ref_code || '',
  }
}
