import axios from '@/plugins/axios';

const usersModule = {
  namespaced: true,

  state() {
    return {
      users: [],
      currentUser: {},
      totalUsersCount: 0,
    };
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users;
    },
    SET_CURRENT_USER(state, user) {
      state.currentUser = user;
    },
    SET_TOTAL_USERS_COUNT(state, count) {
      state.totalUsersCount = count;
    },
    DELETE_USER(state, userId) {
      state.users.splice(state.users.findIndex((i) => i.id === userId), 1);
    },
  },
  actions: {
    fetchUsers({ commit }, { page, perPage }) {
      return new Promise((resolve, reject) => {
        axios.get('/users', {
          params: {
            page,
            perPage,
          },
        })
          .then((response) => {
            commit('SET_USERS', response.data.users);
            commit('SET_TOTAL_USERS_COUNT', response.data.totalUsersCount);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    fetchCurrentUser({ commit }, userId) {
      return new Promise((resolve, reject) => {
        axios.get(`/users/${userId}`)
          .then((response) => {
            commit('SET_CURRENT_USER', response.data);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    deleteUser({ commit }, userId) {
      return new Promise((resolve, reject) => {
        axios.delete(`/users/${userId}`)
          .then((response) => {
            commit('DELETE_USER', userId);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    users: (state) => state.users,
    currentUser: (state) => state.currentUser,
    totalUsersCount: (state) => state.totalUsersCount,
  },
};

export default usersModule;
