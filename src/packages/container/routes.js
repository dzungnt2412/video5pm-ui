export const routes = [
  {
    path: '/delivery-orders',
    name: 'container-list',
    meta: {
      title: 'Manage delivery order',
    },
    component: () =>
      import(/* webpackChunkName: "containers" */ './views/ContainerList'),
  },
  {
    path: '/delivery-orders/:id',
    name: 'container-view',
    meta: {
      title: 'View delivery order detail',
    },
    component: () =>
      import(/* webpackChunkName: "container" */ './views/ContainerView'),
  },
  {
    path: '/orders',
    name: 'order-list',
    meta: {
      title: 'Manage orders',
    },
    component: () =>
      import(/* webpackChunkName: "orders" */ './views/OrderList'),
  },
  {
    path: '/orders/:id',
    name: 'order-view',
    meta: {
      title: 'View order detail',
    },
    component: () =>
      import(/* webpackChunkName: "order" */ './views/OrderView'),
  },
]
