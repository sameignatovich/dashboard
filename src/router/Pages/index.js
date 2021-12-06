export default [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "pages" */ '@/views/Pages/Home.vue'),
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
