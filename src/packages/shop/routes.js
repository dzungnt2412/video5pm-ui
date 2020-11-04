export const routes = [
  {
    path: '/shops/select',
    name: 'shop-select',
    meta: {
      title: 'Select a shop',
      layout: 'full-page',
      class: 'page-login-v3',
    },
    component: () =>
      import(/* webpackChunkName: "shop-select" */ './views/Select'),
  },
  {
    path: '/shops/add',
    name: 'shop-add',
    meta: {
      title: 'Add _new shop',
      layout: 'full-page',
      class: 'page-login-v3',
    },
    component: () => import(/* webpackChunkName: "shop-add" */ './views/Add'),
  },
  {
    path: '/shops/edit/:id',
    name: 'shop-edit',
    meta: {
      title: 'Update shop',
    },
    component: () => import(/* webpackChunkName: "shop-edit" */ './views/Form'),
  },
  {
    path: '/shops',
    name: 'shop-list',
    meta: {
      title: 'Manage shops',
    },
    component: () => import(/* webpackChunkName: "shop-list" */ './views/List'),
  },
]
