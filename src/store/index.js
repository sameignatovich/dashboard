import { createStore } from 'vuex';
import postsModule from './Posts';
import usersModule from './Users';

export default createStore({
  strict: process.env.NODE_ENV !== 'production',

  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    posts: postsModule,
    users: usersModule,
  },
});
