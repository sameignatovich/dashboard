<template>
  <div class="shadow-lg p-3 bg-body rounded mb-3">
    <h2>
      <span v-if="loading"
            class="placeholder col-6 bg-secondary placeholder-wave rounded">
      </span>
      <span v-else>
        {{ post.title }}
      </span>
    </h2>
    <p v-if="loading" class="fw-normal">
      <span class="placeholder col-4 bg-secondary placeholder-wave rounded">
      </span>
    </p>
    <p v-else class="fw-normal">
      wrote by
      <router-link :to="`/users/${post.author.user_id}`">{{ post.author.username }}</router-link>
      <span class="fw-light ms-1">
        {{ $formatdate(post.created_at, '"at" HH:MM dd.mm.yyyy') }}
      </span>
    </p>
    <hr>
    <div v-if="loading" class='post-body'>
      <span v-for="index in 10" :key="index"
            class="placeholder col-9 bg-secondary placeholder-wave rounded">
      </span>
    </div>
    <div v-else class='post-body'>
      {{ post.text }}
    </div>
    <hr>
    <div v-if="loading" class='post-tags'>
      <span class="placeholder col-6 bg-primary placeholder-wave rounded">
      </span>
    </div>
    <div v-else class='post-tags'>
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
};
</script>

<style scoped lang="scss">
  .tag {
    text-decoration: none;
  }
</style>
