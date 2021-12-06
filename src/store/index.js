import { createStore } from 'vuex';
import authorizationModule from './Authorization';
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
    auth: authorizationModule,
  },
});
