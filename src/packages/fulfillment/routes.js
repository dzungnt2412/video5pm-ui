export const routes = [
  {
    path: '/fulfillments',
    name: 'fulfillments',
    meta: {
      title: 'Manage Fulfillments',
    },
    component: () =>
      import(/* webpackChunkName: "design-list" */ './views/List'),
  },
]
