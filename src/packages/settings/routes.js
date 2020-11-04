// TODO: uncomment me

import { lazyLoadView } from '@core/router/helpers'

export const routes = [
  {
    path: '/settings',
    name: 'settings',
    meta: {
      title: 'Settings',
    },
    component: () =>
      lazyLoadView(import(/* webpackChunkName: "dashboard" */ './views/Index')),
  },
  {
    path: '/settings/general',
    name: 'general',
    meta: {
      title: 'General setting',
    },
    component: () =>
      lazyLoadView(
        import(/* webpackChunkName: "dashboard" */ './views/GeneralSetting')
      ),
  },
]
