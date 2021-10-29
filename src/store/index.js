import { createStore } from 'vuex';
import postsModule from './Posts';

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
  },
});
