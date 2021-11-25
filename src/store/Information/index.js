import axios from '@/plugins/axios';

const informationModule = {
  namespaced: true,

  state() {
    return {
      info: {
        users: {
          users_count: '',
          last_user: {},
        },
        posts: {
          posts_count: '',
          last_post: {},
        },
      },
    };
  },
  mutations: {
    SET_INFO(state, info) {
      state.info = info;
    },
  },
  actions: {
    fetchInfo({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('/information/summary')
          .then((response) => {
            commit('SET_INFO', response.data);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    info: (state) => state.info,
  },
};

export default informationModule;
