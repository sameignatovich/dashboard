export default [
  {
    path: '/',
    name: 'Statistics',
    component: () => import(/* webpackChunkName: "pages" */ '@/views/Pages/Statistics.vue'),
    meta: {
      requiresAuth: false,
    },
    children: [
      {
        path: '/',
        name: 'Statistics',
        component: () => import(/* webpackChunkName: "pages" */ '@/views/Pages/Statistics/Main.vue'),
      },
    ],
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "pages" */ '@/views/Pages/About.vue'),
    meta: {
      requiresAuth: false,
    },
  },
];
