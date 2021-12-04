<template>
  <div class="shadow-lg p-3 bg-body rounded mb-3">
    <h2>
      {{ post.title }}
    </h2>
    <p class="fw-normal">
      wrote by
      <router-link :to="`/users/${post.author.user_id}`">{{ post.author.username }}</router-link>
      <span class="fw-light ms-1">
        {{ formatDate(post.created_at, '"at" HH:MM dd.mm.yyyy') }}
      </span>
    </p>
    <div class='post-body'>
      {{ post.text }}
    </div>
  </div>
  <comments :comments="comments" />
</template>

<script>
import dateFormat from 'dateformat';
import Comments from '@/components/Comments.vue';

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
    formatDate(value, format) {
      return dateFormat(value, format);
    },
  },
  watch: {
    post() {
      this.$title(this.post.title);
    },
  },
  components: {
    Comments,
  },
};
</script>

<style scoped lang='scss'>
</style>
