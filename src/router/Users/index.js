export default [
  {
    path: '/users',
    name: 'Users',
    component: () => import(/* webpackChunkName: "users" */ '@/views/Users/index.vue'),
    meta: {
      title: 'Users',
    },
  },
];
