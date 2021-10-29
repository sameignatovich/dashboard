import axios from '@/plugins/axios';

const postsModule = {
  namespaced: true,

  state() {
    return {
      loaded: false,
      posts: [],
    };
  },
  mutations: {
    SET_LOADING(state, status) {
      state.loaded = status;
    },
    SET_POSTS(state, posts) {
      state.posts = posts;
    },
    DELETE_POST(state, postId) {
      state.posts.splice(state.posts.findIndex((i) => i.id === postId), 1);
    },
  },
  actions: {
    fetchPosts({ commit, state }) {
      return new Promise((resolve, reject) => {
        if (!state.loaded) {
          axios.get('/posts')
            .then((response) => {
              commit('SET_POSTS', response.data);
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
    deletePost({ commit }, postId) {
      commit('DELETE_POST', postId);
    },
  },
  getters: {
    posts: (state) => state.posts,
  },
};

export default postsModule;
