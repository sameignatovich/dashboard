import { createStore } from 'vuex';
import informationModule from './Information';

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
  },
});
