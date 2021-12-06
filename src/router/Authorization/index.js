export default [
  {
    path: '/signin',
    name: 'SignIn',
    component: () => import(/* webpackChunkName: "authorization" */ '@/views/Authorization/signin.vue'),
    meta: {
      requiresAuth: false,
    },
  },
];
