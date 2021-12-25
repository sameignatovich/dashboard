export default [
  {
    path: '/settings',
    name: 'Settings',
    component: () => import(/* webpackChunkName: "settings" */ '@/views/Settings/index.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '/settings/profile',
        name: 'Edit profile',
        component: () => import(/* webpackChunkName: "settings" */ '@/views/Settings/profile.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/settings/avatar',
        name: 'Change avatar',
        component: () => import(/* webpackChunkName: "settings" */ '@/views/Settings/avatar.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/settings/password',
        name: 'Change password',
        component: () => import(/* webpackChunkName: "settings" */ '@/views/Settings/password.vue'),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
];
