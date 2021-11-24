import axios from '@/plugins/axios';

const postsModule = {
  namespaced: true,

  state() {
    return {
      posts: [],
      totalPostsCount: 0,
    };
  },
  mutations: {
    SET_POSTS(state, posts) {
      state.posts = posts;
    },
    SET_TOTAL_POSTS_COUNT(state, count) {
      state.totalPostsCount = count;
    },
    DELETE_POST(state, postId) {
      state.posts.splice(state.posts.findIndex((i) => i.id === postId), 1);
    },
  },
  actions: {
    fetchPosts({ commit }, { page, perPage }) {
      return new Promise((resolve, reject) => {
        axios.get('/posts', {
          params: {
            page,
            perPage,
          },
        })
          .then((response) => {
            commit('SET_POSTS', response.data.posts);
            commit('SET_TOTAL_POSTS_COUNT', response.data.totalPostsCount);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    deletePost({ commit, state }, postId) {
      return new Promise((resolve, reject) => {
        axios.delete(`/posts/${postId}`)
          .then((response) => {
            commit('DELETE_POST', postId);
            commit('SET_TOTAL_POSTS_COUNT', state.totalPostsCount - 1);
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
    totalPostsCount: (state) => state.totalPostsCount,
  },
};

export default postsModule;
