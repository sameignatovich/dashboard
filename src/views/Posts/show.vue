<template>
  <div class="shadow-lg p-3 bg-body rounded">
    <h2>
      {{ post.title }}
    </h2>
    <p>
      <small>
        wrote by user
        <router-link :to="`/users/${post.user_id}`">{{ post.user_id }}</router-link>
      </small>
    </p>
    <div class='post-body'>
      {{ post.text }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
  },
  computed: {
    postId() {
      return this.$route.params.id;
    },
    post() {
      return this.$store.getters['posts/currentPost'];
    },
  },
  beforeMount() {
    this.$store.dispatch('posts/fetchCurrentPost', this.postId);
  },
  watch: {
    post() {
      this.$title(this.post.title);
    },
  },
};
</script>

<style scoped lang='scss'>
</style>
