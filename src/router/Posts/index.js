export default [
  {
    path: '/posts',
    name: 'Posts',
    component: () => import(/* webpackChunkName: "posts" */ '@/views/Posts/index.vue'),
    meta: {
      title: 'Posts',
    },
  },
  {
    path: '/posts/:id',
    name: 'Post',
    component: () => import(/* webpackChunkName: "posts" */ '@/views/Posts/show.vue'),
    meta: {
      title: 'Downloading...',
    },
  },
];
