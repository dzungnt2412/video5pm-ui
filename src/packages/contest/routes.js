export const routes = [
  {
    path: '/contest',
    name: 'contest',
    meta: {
      title: 'Contest',
    },
    component: () => import(/* webpackChunkName: "contest" */ './views/Index'),
  },
]
