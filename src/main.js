import Vue from 'vue'
import VeeValidate from 'vee-validate'
import Notifications from 'vue-notification'
import VueClipboard from 'vue-clipboard2'
import VueCarousel from 'vue-carousel'
import App from './App.vue'
import MainPlugin from './plugins/main'
// import DashboardPlugin from './material-dashboard'
import * as filters from './core/helpers/filters'
import initGlobalDirectives from '@core/vue/directives'
import router from './core/router'
import store from './core/store'
import '../uikit'
import validationMessagesVi from 'vee-validate/dist/locale/vi'

Vue.use(VueClipboard)
Vue.use(VeeValidate, { locale: 'vi', dictionary: { vi: validationMessagesVi } })
Vue.use(Notifications)
Vue.use(MainPlugin)
Vue.use(VueCarousel)
// Vue.use(DashboardPlugin)
initGlobalDirectives()

VeeValidate.Validator.extend('username', {
  getMessage: () => `Tài khoản chỉ chứa số và chữ cái`,
  validate: (value) => {
    const regex = new RegExp(/^[a-zA-Z0-9]{4,36}$/)
    return regex.test(value)
  },
})
VeeValidate.Validator.extend('phone', {
  getMessage: () =>
    `Nhập số điện thoại từ 10 đến 11 chữ số, bắt đầu bằng 0,84 hoặc +84`,
  validate: (value) => {
    const regex = new RegExp(/^(0|84|\+84)([0-9]{9})$/)
    return regex.test(value)
  },
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')

// Register global utility filters.
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})
