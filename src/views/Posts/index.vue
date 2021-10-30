<template>
  <div class='container'>
    <div class='table-responsive'>
      <table class='table table-striped table-hover caption-top'>
        <thead class="table-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">UserID</th>
            <th scope="col">Title</th>
            <th scope="col">Body</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <caption>List of users</caption>
        <tbody>
          <transition-group name="post">
            <PostRow  v-for='post in posts'
                      :key='post.id'
                      :post='post'
                      class='post-item'
                      @deletePost='deletePost(post.id)' />
          </transition-group>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import PostRow from './components/post-row.vue';

export default {
  computed: {
    posts() {
      return this.$store.getters['posts/posts'];
    },
  },
  methods: {
    deletePost(postId) {
      this.$store.dispatch('posts/deletePost', postId)
        .then(() => this.$toast.success(`Post with id ${postId} deleted successful`));
    },
  },
  beforeMount() {
    this.$store.dispatch('posts/fetchPosts');
  },
  components: {
    PostRow,
  },
};
</script>

<style scoped lang='scss'>
.post-enter-active,
.post-leave-active {
  transition: all 1s ease;
}
.post-enter-from,
.post-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
