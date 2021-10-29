import axios from '@/config/axios';

const postsModule = {
  namespaced: true,

  state() {
    return {
      posts: [],
    };
  },
  mutations: {
    SET_POSTS(state, posts) {
      state.posts = posts;
    },
    DELETE_POST(state, postId) {
      state.post.splice(state.posts.findIndex((i) => i.id === postId), 1);
    },
  },
  actions: {
    fetchPosts({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get('/posts')
          .then((response) => {
            commit('SET_POSTS', response.data);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    deletePost({ commit }, postId) {
      return new Promise((resolve, reject) => {
        commit('DELETE_POST', postId)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    posts: (state) => state.posts,
  },
};

export default postsModule;
