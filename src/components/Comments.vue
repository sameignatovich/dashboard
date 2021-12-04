<template>
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
          {{ formatDate(comment.created_at, 'dd.mm.yyyy "at" HH:MM') }}
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
  props: {
    comments: {
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
  a {
    text-decoration: none;
  }
</style>
