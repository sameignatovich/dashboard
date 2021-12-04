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
</template>

<script>
import dateFormat from 'dateformat';

export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatDate(value, format) {
      return dateFormat(value, format);
    },
  },
};
</script>

<style scoped lang="scss">
</style>
