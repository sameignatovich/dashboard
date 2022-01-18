import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';
import Pages from './Pages';
import Authorization from './Authorization';
import Users from './Users';
import Posts from './Posts';
import Settings from './Settings';

const routes = [
  {
    path: '/',
    redirect: '/statistics/main',
  },
  ...Pages,
  ...Authorization,
  ...Users,
  ...Posts,
  ...Settings,
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: 'active',
  routes,
});

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !store.getters['user/isAuthorized']) {
    return {
      path: '/signin',
      query: { redirect: to.fullPath },
    };
  }
  return true;
});

export default router;
