/* eslint-disable */
export const routes = [
  {
    path: '/change-profile',
    name: 'change-profile',
    meta: {
      title: 'Change profile',
    },
    component: () =>
      import(/* webpackChunkName: "change-user-profile" */ './views/ChangeProfile.vue'),
  },
  {
    path: '/change-password',
    name: 'change-password',
    meta: {
      title: 'Change password',
    },
    component: () =>
      import(/* webpackChunkName: "change-user-password" */ './views/ChangePassword.vue'),
  },
  {
    path: '/top-event',
    name: 'user-event',
    meta: {
      title: 'Contest Rank Point',
    },
    component: () =>
      import(/* webpackChunkName: "user-list" */ './views/Top.vue'),
  },
]
