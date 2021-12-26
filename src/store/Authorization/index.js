import axios from '@/plugins/axios';

const authorizationModule = {
  namespaced: true,

  state() {
    return {
      token: null,
      user: {
        id: null,
        full_name: null,
        username: null,
        email: null,
        avatar: null,
        role: null,
      },
      errorMessage: null,
    };
  },
  mutations: {
    SET_TOKEN(state, token) {
      localStorage.setItem('token', token);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      state.token = token;
    },
    DELETE_TOKEN(state) {
      localStorage.removeItem('token');
      axios.defaults.headers.common.Authorization = null;
      state.token = null;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    SET_ERROR(state, errorMessage) {
      state.errorMessage = errorMessage;
    },
  },
  actions: {
    autologin({ commit }, token) {
      commit('SET_TOKEN', token);

      return new Promise((resolve, reject) => {
        axios.post('/autologin.json')
          .then((response) => {
            commit('SET_USER', response.data);
            resolve(response);
          })
          .catch((error) => {
            commit('DELETE_TOKEN');
            reject(error);
          });
      });
    },
    signin({ commit }, userData) {
      return new Promise((resolve, reject) => {
        axios.post('/signin.json', userData)
          .then((response) => {
            commit('SET_TOKEN', response.data.token);
            commit('SET_USER', response.data.user);
            resolve(response);
          })
          .catch((error) => {
            commit('SET_ERROR', error.response.data.message);
            reject(error);
          });
      });
    },
    signout({ commit }) {
      return new Promise((resolve, reject) => {
        axios.delete('/signout.json')
          .then((response) => {
            if (response.data.signout) {
              commit('DELETE_TOKEN');
              commit('SET_USER', {});

              resolve(response);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    updateProfile({ commit }, profileData) {
      return new Promise((resolve, reject) => {
        axios.put('/current/profile', profileData)
          .then((response) => {
            commit('SET_USER', response.data);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    token: (state) => state.token,
    tokenId: (state) => JSON.parse(atob(state.token.split('.')[1])).data,
    user: (state) => state.user,
    errorMessage: (state) => state.errorMessage,
    isAuthorized: (state) => !!state.token,
  },
};

export default authorizationModule;
