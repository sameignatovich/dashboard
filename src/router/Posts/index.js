export default [
  {
    path: '/posts',
    name: 'Posts',
    component: () => import(/* webpackChunkName: "posts" */ '@/views/Posts/index.vue'),
  },
  {
    path: '/posts/:id',
    name: 'Post',
    component: () => import(/* webpackChunkName: "posts" */ '@/views/Posts/show.vue'),
  },
];
