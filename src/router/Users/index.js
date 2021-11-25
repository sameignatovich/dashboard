export default [
  {
    path: '/users',
    name: 'Users',
    component: () => import(/* webpackChunkName: "users" */ '@/views/Users/index.vue'),
  },
  {
    path: '/users/:id',
    name: 'User',
    component: () => import(/* webpackChunkName: "users" */ '@/views/Users/show.vue'),
  },
];
