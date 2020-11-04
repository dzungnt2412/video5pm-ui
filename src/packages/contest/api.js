import http from '@core/services/http'

export default {
  /**
   * Fetch users with top points
   */
  fetchUsersTopPoints() {
    return http.get('/users/top-points')
  },
  /**
   * Fetch user point
   */
  fetchUserPoint() {
    return http.get(`/contest/user-point`)
  },
}
