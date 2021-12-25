export default [
  {
    path: '/settings/profile',
    name: 'Edit Profile',
    component: () => import(/* webpackChunkName: "settings" */ '@/views/Settings/profile.vue'),
    meta: {
      requiresAuth: true,
    },
  },
];
