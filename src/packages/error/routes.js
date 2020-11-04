import { lazyLoadView, noAuthRequired } from '@core/router/helpers'

export const routes = [
  {
    path: '*',
    name: 'page-not-found',
    meta: {
      title: 'Page not found',
      layout: 'full-page',
      class: 'page-error',
      ...noAuthRequired(),
    },
    component: () =>
      lazyLoadView(
        import(
          /* webpackChunkName: "page-not-found" */ './views/PageNotFound.vue'
        )
      ),
  },
]
