import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';
import Pages from './Pages';
import Authorization from './Authorization';
import Users from './Users';
import Posts from './Posts';

const routes = [
  ...Pages,
  ...Authorization,
  ...Users,
  ...Posts,
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: 'active',
  routes,
});

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !store.getters['auth/isAuthorized']) {
    return {
      path: '/signin',
      query: { redirect: to.fullPath },
    };
  }
  return true;
});

export default router;
