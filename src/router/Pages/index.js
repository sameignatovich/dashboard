export default [
  {
    path: '/',
    name: 'Statistics',
    component: () => import(/* webpackChunkName: "pages" */ '@/views/Pages/Statistics.vue'),
    meta: {
      requiresAuth: false,
    },
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
