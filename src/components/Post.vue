<template>
  <post-placeholder v-if="loading" />
  <div v-else class="shadow-lg p-3 bg-body rounded mb-3">
    <h2>
      {{ post.title }}
    </h2>
    <div class="d-flex justify-content-md-between">
      <p class="fw-normal">
        wrote by
        <router-link :to="`/users/${post.author.username}`">{{ post.author.username }}</router-link>
        <span class="fw-light ms-1">
          {{ $formatdate(post.created_at, '"at" HH:MM dd.mm.yyyy') }}
        </span>
      </p>
      <div class="fw-normal ms-1">
        <div :class="{ 'bg-dark': status === 'draft',
                       'bg-success': status === 'published',
                       'bg-secondary': status === 'hidden',
                       'bg-danger': status === 'blocked'}"
             class="badge rounded-pill">
          {{ capitalizeFirstLetter(status) }}
        </div>
      </div>
    </div>
    <hr>
    <div class='post-body' v-html="post.content">
    </div>
    <hr>
    <div class='post-tags'>
      <b>Tags:</b>
      <router-link v-for="tag in post.tags"
                   :key="tag.name"
                   :to="`/posts?tag=${tag.name}`"
                   class="m-1">
        #{{ tag.name }}
      </router-link>
    </div>
  </div>
</template>

<script>
import PostPlaceholder from '@/components/PostPlaceholder.vue';
import capitalizeFirstLetter from '@/mixins/capitalizeFirstLetter';

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
  computed: {
    status() {
      return this.post.status;
    },
  },
  components: {
    PostPlaceholder,
  },
  mixins: [
    capitalizeFirstLetter,
  ],
};
</script>
