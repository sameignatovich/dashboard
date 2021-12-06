import { createRouter, createWebHistory } from 'vue-router';
import Authorization from './Authorization';
import Users from './Users';
import Posts from './Posts';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Pages/Home.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/Pages/About.vue'),
  },
  ...Authorization,
  ...Users,
  ...Posts,
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: 'active',
  routes,
});

export default router;
