export const routes = [
  {
    path: '/tickets/_new',
    name: 'ticket-form',
    meta: {
      title: 'Ticket New',
    },
    component: () =>
      import(/* webpackChunkName: "ticket-list" */ './views/Form'),
  },
  {
    path: '/tickets',
    component: () =>
      import(/* webpackChunkName: "ticket-list" */ './views/components/Layout'),
    children: [
      {
        path: '',
        name: 'ticket-list',
        meta: {
          title: 'Tickets list',
        },
        component: () =>
          import(/* webpackChunkName: "ticket-list" */ './views/List'),
      },
      {
        path: '/tickets/:id',
        name: 'ticket-view',
        meta: {
          title: 'Ticket view',
        },
        component: () =>
          import(/* webpackChunkName: "ticket-list" */ './views/View'),
      },
    ],
  },
]
