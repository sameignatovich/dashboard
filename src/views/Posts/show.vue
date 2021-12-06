<template>
  <post :post="post" />
  <comments :postId="postId" />
</template>

<script>
import Post from '@/components/Post.vue';
import Comments from '@/components/Comments.vue';

export default {
  data() {
    return {
      post: undefined,
    };
  },
  computed: {
    postId() {
      return this.$route.params.id;
    },
  },
  beforeMount() {
    this.fetchPost(this.postId);
  },
  methods: {
    fetchPost(postId) {
      return new Promise((resolve, reject) => {
        this.$http.get(`/posts/${postId}`)
          .then((response) => {
            this.post = response.data;
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

<style scoped lang='scss'>
</style>
