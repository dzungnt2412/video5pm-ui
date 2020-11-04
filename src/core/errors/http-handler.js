import EventBus from '@core/helpers/event'
import { HTTP_STATUS_TOKEN_EXPIRED } from '@core/constants/http'
import { TOKEN_EXPIRED } from '@core/constants/event'
import AuthService from '@core/services/auth'
class HttpErrorHandler {
  static handle(response) {
    if (response.status === HTTP_STATUS_TOKEN_EXPIRED) {
      EventBus.$emit(TOKEN_EXPIRED)
      if (AuthService.isAuthenticated()) {
        window.localStorage.clear()
        window.location.replace('/sign-in')
      }
    }
  }
}

export default HttpErrorHandler
