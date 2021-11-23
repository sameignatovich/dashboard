import { createRouter, createWebHistory } from 'vue-router';
import Users from './Users/index';
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
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      title: 'About',
    },
  },
  ...Users,
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
