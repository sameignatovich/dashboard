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
      },
      {
        path: '/settings/avatar',
        name: 'Change avatar',
        component: () => import(/* webpackChunkName: "settings" */ '@/views/Settings/avatar.vue'),
      },
      {
        path: '/settings/password',
        name: 'Change password',
        component: () => import(/* webpackChunkName: "settings" */ '@/views/Settings/password.vue'),
      },
      {
        path: '/settings/activity',
        name: 'Account activity',
        component: () => import(/* webpackChunkName: "settings" */ '@/views/Settings/activity.vue'),
      },
    ],
  },
];
