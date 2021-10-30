import axios from '@/plugins/axios';

const usersModule = {
  namespaced: true,

  state() {
    return {
      loaded: false,
      users: [],
    };
  },
  mutations: {
    SET_LOADING(state, status) {
      state.loaded = status;
    },
    SET_USERS(state, users) {
      state.users = users;
    },
    DELETE_USER(state, userId) {
      state.users.splice(state.users.findIndex((i) => i.id === userId), 1);
    },
  },
  actions: {
    fetchUsers({ commit, state }) {
      return new Promise((resolve, reject) => {
        if (!state.loaded) {
          axios.get('/users')
            .then((response) => {
              commit('SET_USERS', response.data);
              commit('SET_LOADING', true);
              resolve(response);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          resolve();
        }
      });
    },
    deleteUser({ commit }, userId) {
      commit('DELETE_USER', userId);
    },
  },
  getters: {
    users: (state) => state.users,
  },
};

export default usersModule;
