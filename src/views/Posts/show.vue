<template>
  <div class="shadow-lg p-3 bg-body rounded mb-3">
    <h2>
      {{ post.title }}
    </h2>
    <p>
      <small>
        wrote by
        <router-link :to="`/users/${post.author.user_id}`">{{ post.author.username }}</router-link>
      </small>
    </p>
    <div class='post-body'>
      {{ post.text }}
    </div>
  </div>
  <div class="shadow-lg p-3 bg-body rounded mb-3">
    <h4>Comments</h4>
    <div  v-for="comment in comments"
          :key="comment.id"
          class="m-1 p-1 border-start border-3 border-dark">
      <div class="comment-header">
        <router-link :to="`/users/${comment.author.user_id}`" class="fw-bold me-1">
          <img  :src='comment.author.avatar'
                class="rounded-circle"
                height="32" />
          {{ comment.author.username }}
        </router-link>
        <span class="fw-light">
          {{ formatDate(comment.created_at) }}
        </span>
      </div>
      <div class="comment-body fw-normal">
        {{ comment.body }}
      </div>
    </div>
  </div>
</template>

<script>
import dateFormat from 'dateformat';

export default {
  computed: {
    postId() {
      return this.$route.params.id;
    },
    post() {
      return this.$store.getters['posts/currentPost'];
    },
    comments() {
      return this.$store.getters['posts/currentPostComments'];
    },
  },
  beforeMount() {
    this.$store.dispatch('posts/fetchCurrentPost', this.postId);
  },
  methods: {
    formatDate(value) {
      return dateFormat(value, 'dd.mm.yyyy "at" HH:MM');
    },
  },
  watch: {
    post() {
      this.$title(this.post.title);
    },
  },
};
</script>

<style scoped lang='scss'>
  a {
    text-decoration: none;
  }
</style>
