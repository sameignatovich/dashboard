<template>
  <div class="shadow-lg p-3 bg-body rounded mb-3">
    <h4>Comments</h4>
    <div  v-for="comment in comments"
          :key="comment.id"
          class="m-1 p-1 border-start border-3 border-dark">
      <div class="comment-header">
        <router-link :to="`/users/${comment.author.user_id}`" class="fw-bold me-1">
          <img  :src='comment.author.avatar'
                class="rounded"
                height="32" />
          {{ comment.author.username }}
        </router-link>
        <span class="fw-light">
          {{ $formatdate(comment.created_at, 'dd.mm.yyyy "at" HH:MM') }}
        </span>
      </div>
      <div class="comment-body fw-normal">
        {{ comment.body }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      comments: [],
    };
  },
  props: {
    postId: {
      type: String,
      required: true,
    },
  },
  methods: {
    fetchComments(postId) {
      return new Promise((resolve, reject) => {
        this.$http.get(`/posts/${postId}/comments`)
          .then((response) => {
            this.comments = response.data;
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  beforeMount() {
    this.fetchComments(this.postId);
  },
};
</script>

<style scoped lang="scss">
  a {
    text-decoration: none;
  }
</style>
