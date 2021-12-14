export default [
  {
    path: '/posts',
    name: 'Posts',
    component: () => import(/* webpackChunkName: "posts" */ '@/views/Posts/index.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/posts/new',
    name: 'New Post',
    component: () => import(/* webpackChunkName: "posts" */ '@/views/Posts/new.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/posts/:id',
    name: 'Post',
    component: () => import(/* webpackChunkName: "posts" */ '@/views/Posts/show.vue'),
    meta: {
      requiresAuth: true,
    },
  },
];
