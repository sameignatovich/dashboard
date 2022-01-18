export default [
  {
    path: '/statistics',
    name: 'Statistics',
    component: () => import(/* webpackChunkName: "pages" */ '@/views/Pages/Statistics.vue'),
    meta: {
      requiresAuth: false,
    },
    children: [
      {
        path: 'main',
        name: 'Main statistics',
        component: () => import(/* webpackChunkName: "pages" */ '@/views/Pages/Statistics/Main.vue'),
      },
      {
        path: 'devices',
        name: 'Devices statistics',
        component: () => import(/* webpackChunkName: "pages" */ '@/views/Pages/Statistics/Devices.vue'),
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
