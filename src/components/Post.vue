<template>
  <post-placeholder v-if="loading" />
  <div v-else class="shadow-lg p-3 bg-body rounded mb-3">
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
    <hr>
    <div class='post-body'>
      {{ post.text }}
    </div>
    <hr>
    <div class='post-tags'>
      <b>Tags:</b>
      <router-link v-for="tag in post.tags"
                   :key="tag.name"
                   :to="`/posts?tag=${tag.name}`"
                   class="m-1 tag">
        #{{ tag.name }}
      </router-link>
    </div>
  </div>
</template>

<script>
import PostPlaceholder from '@/components/PostPlaceholder.vue';

export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    PostPlaceholder,
  },
};
</script>

<style scoped lang="scss">
  .tag {
    text-decoration: none;
  }
</style>
