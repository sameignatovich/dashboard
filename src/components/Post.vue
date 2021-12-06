<template>
  <div class="shadow-lg p-3 bg-body rounded mb-3">
    <h2>
      {{ post.title }}
    </h2>
    <p class="fw-normal">
      wrote by
      <router-link :to="`/users/${post.author.user_id}`">{{ post.author.username }}</router-link>
      <span class="fw-light ms-1">
        {{ $formatdate(post.created_at, '"at" HH:MM dd.mm.yyyy') }}
      </span>
    </p>
    <div class='post-body'>
      {{ post.text }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
</style>
