export const routes = [
  {
    path: '/create-video',
    name: 'create-video',
    meta: {
      title: 'Create Video',
    },
    component: () =>
      import(/* webpackChunkName: "containers" */ './views/CreateVideo'),
  },
  {
    path: '/edit-video',
    name: 'edit-video',
    meta: {
      title: 'Edit Video',
    },
    component: () =>
      import(/* webpackChunkName: "containers" */ './views/EditVideo'),
  },
]
