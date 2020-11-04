import { lazyLoadView, noAuthRequired } from '@core/router/helpers'

export const routes = [
  {
    path: '/sign-in',
    name: 'sign-in',
    meta: {
      title: 'Sign In',
      layout: 'full-page',
      class: 'page-login-v3',
      ...noAuthRequired(),
    },
    component: () =>
      lazyLoadView(
        import(/* webpackChunkName: "sign-in" */ './views/SignIn.vue')
      ),
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    meta: {
      title: 'Sign Up',
      layout: 'full-page',
      class: 'page-login-v3',
      ...noAuthRequired(),
    },
    component: () =>
      lazyLoadView(
        import(/* webpackChunkName: "sign-up" */ './views/SignUp.vue')
      ),
  },
  {
    path: '/forgot',
    name: 'forgot',
    meta: {
      title: 'Forgot',
      layout: 'full-page',
      class: 'page-login-v3',
      ...noAuthRequired(),
    },
    component: () =>
      lazyLoadView(
        import(/* webpackChunkName: "forgot" */ './views/Forgot.vue')
      ),
  },
]
