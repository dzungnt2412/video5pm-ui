import http from '@core/services/http'

export default {
  /**
   * Sign up
   * @param payload
   * @return {*}
   */
  signIn(payload) {
    let formData = new FormData()
    formData.append('username', payload.username)
    formData.append('password', payload.password)

    return http.post('/auth', formData )
  },

  /**
   * Sign up
   * @param payload
   * @return {*}
   */
  signUp(payload) {
    return http.post('/auth/sign-up/v2', {
      user: payload.user,
      shop_name: payload.shop_name,
    })
  },
  forgot(payload) {
    return http.post('/auth/forgot-password/v2', payload)
  },
  resetPass(payload) {
    return http.post('/auth/reset-password/v2', payload)
  },
  verifyEmail(payload) {
    return http.post('/auth/verify-email/v2', payload)
  },
  resendEmail(payload) {
    return http.post('/auth/resend-email/v2', payload)
  },
}
