export const routes = [
  {
    path: '/design',
    name: 'design-list',
    meta: {
      title: 'Manage design',
    },
    component: () =>
      import(/* webpackChunkName: "design-list" */ './views/List'),
  },
  {
    path: '/design/:id/edit',
    name: 'design-edit',
    meta: {
      title: 'Edit design',
    },
    component: () =>
      import(/* webpackChunkName: "design-edit" */ './views/Form'),
  },
]
