import { createStore } from 'vuex';
import userModule from './User';
import statisticsModule from './Statistics';

export default createStore({
  strict: process.env.NODE_ENV !== 'production',

  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    statistics: statisticsModule,
    user: userModule,
  },
});
