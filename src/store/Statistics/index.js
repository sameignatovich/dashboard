import axios from '@/plugins/axios';

const statisticsModule = {
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
        comments: {
          comments_count: '',
          last_comment: {},
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
        axios.get('/statistics/summary')
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

export default statisticsModule;
