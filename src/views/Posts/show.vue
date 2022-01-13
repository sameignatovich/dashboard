<template>
  <post :post="post"
        :loading="postLoading"
        @post:delete="deletePost" />
  <comments :comments="comments" :loading="commentsLoading" />
</template>

<script>
import Post from '@/components/Post.vue';
import Comments from '@/components/Comments.vue';

export default {
  data() {
    return {
      post: {
        author: {},
        tags: [],
      },
      comments: [],
      postLoading: true,
      commentsLoading: true,
    };
  },
  computed: {
    postId() {
      return this.$route.params.id;
    },
  },
  beforeMount() {
    this.fetchPost(this.postId);
    this.fetchComments(this.postId);
  },
  methods: {
    fetchPost(postId) {
      return new Promise((resolve, reject) => {
        this.$http.get(`/posts/${postId}`)
          .then((response) => {
            this.post = response.data;
            resolve(response);
            this.postLoading = false;
          })
          .catch((error) => {
            reject(error);
            this.postLoading = false;
          });
      });
    },
    fetchComments(postId) {
      return new Promise((resolve, reject) => {
        this.$http.get(`/posts/${postId}/comments`)
          .then((response) => {
            this.comments = response.data;
            resolve(response);
            this.commentsLoading = false;
          })
          .catch((error) => {
            reject(error);
            this.commentsLoading = false;
          });
      });
    },
    deletePost() {
      return new Promise((resolve, reject) => {
        this.$http.delete(`/posts/${this.post.id}`)
          .then((response) => {
            this.$toast.success('Post deleted!');
            this.$router.push('/posts');
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  watch: {
    post() {
      this.$title(this.post.title);
    },
  },
  components: {
    Post,
    Comments,
  },
};
</script>
