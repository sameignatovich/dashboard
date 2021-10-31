<template>
  <div class='container'>
    <div class="shadow-lg p-3 mb-5 bg-body rounded">
      <h2>
        {{ post.title }}
      </h2>
      <p>
        <small>
          wrote by user
          <b>{{ post.userId }}</b>
        </small>
      </p>
      <div class='post-body'>
        {{ post.body }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {},
    };
  },
  computed: {
    postId() {
      return this.$route.params.id;
    },
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
  beforeMount() {
    this.fetchPost(this.postId);
  },
};
</script>

<style scoped lang='scss'>
</style>
