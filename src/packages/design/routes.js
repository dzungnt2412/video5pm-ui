import { noAuthRequired } from '@core/router/helpers'
export const routes = [
  {
    path: '/design',
    name: 'design-list',
    meta: {
      title: 'Manage design',
      ...noAuthRequired(),
    },
    component: () =>
      import(/* webpackChunkName: "design-list" */ './views/List'),
  },
  {
    path: '/design/:id/edit',
    name: 'design-edit',
    meta: {
      title: 'Edit design',
      ...noAuthRequired(),
    },
    component: () =>
      import(/* webpackChunkName: "design-edit" */ './views/Form'),
  },
]
