<template>
  <div class="shadow-lg p-3 bg-body rounded mb-3">
    <h4>Comments</h4>
    <div v-if="!loading">
      <div  v-for="comment in comments"
            :key="comment.id"
            class="m-1 p-1 border-start border-3 border-dark">
        <div class="comment-header">
          <router-link :to="`/users/${comment.author.username}`" class="fw-bold me-1">
            <img  :src='comment.author.avatar'
                  class="rounded"
                  height="32" />
            {{ comment.author.username }}
          </router-link>
          <span class="fw-light">
            {{ $formatdate(comment.created_at, 'dd.mm.yyyy "at" HH:MM') }}
          </span>
        </div>
        <div class="comment-body fw-normal" v-html="comment.content">
        </div>
      </div>
    </div>
    <comments-placeholder v-else />
  </div>
</template>

<script>
import CommentsPlaceholder from '@/components/CommentsPlaceholder.vue';

export default {
  props: {
    comments: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    CommentsPlaceholder,
  },
};
</script>
