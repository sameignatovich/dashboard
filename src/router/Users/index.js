export default [
  {
    path: '/users',
    name: 'Users',
    component: () => import(/* webpackChunkName: "users" */ '@/views/Users/index.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/users/:username',
    name: 'User',
    component: () => import(/* webpackChunkName: "users" */ '@/views/Users/show.vue'),
    meta: {
      requiresAuth: true,
    },
  },
];
