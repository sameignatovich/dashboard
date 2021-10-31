import { createRouter, createWebHistory } from 'vue-router';
import Posts from './Posts/index';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    meta: {
      title: 'Home',
    },
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import(/* webpackChunkName: "users" */ '../views/Users/index.vue'),
    meta: {
      title: 'Users',
    },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      title: 'About',
    },
  },
  ...Posts,
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: 'active',
  routes,
});

router.beforeEach((to) => {
  const pageTitle = to.meta.title || 'Page';
  document.title = `${pageTitle} | Dashboard`;

  return true;
});

export default router;
