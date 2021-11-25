import { createStore } from 'vuex';
import informationModule from './Information';
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
    info: informationModule,
    posts: postsModule,
    users: usersModule,
  },
});
