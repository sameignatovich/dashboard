import axios from '@/plugins/axios';

const postsModule = {
  namespaced: true,

  state() {
    return {
      posts: [],
      currentPost: {
        id: undefined,
        title: undefined,
        text: undefined,
        created_at: undefined,
        updated_at: undefined,
        author: {
          user_id: undefined,
          username: undefined,
        },
      },
      currentPostComments: [],
      totalPostsCount: 0,
    };
  },
  mutations: {
    SET_POSTS(state, posts) {
      state.posts = posts;
    },
    SET_CURRENT_POST(state, post) {
      state.currentPost = post;
    },
    SET_CURRENT_POST_COMMENTS(state, comments) {
      state.currentPostComments = comments;
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
    fetchCurrentPost({ commit }, postId) {
      return new Promise((resolve, reject) => {
        axios.get(`/posts/${postId}`)
          .then((response) => {
            commit('SET_CURRENT_POST', response.data.post);
            commit('SET_CURRENT_POST_COMMENTS', response.data.comments);
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
    currentPost: (state) => state.currentPost,
    currentPostComments: (state) => state.currentPostComments,
    totalPostsCount: (state) => state.totalPostsCount,
  },
};

export default postsModule;
