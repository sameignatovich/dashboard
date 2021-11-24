<template>
  <div class='container'>
    <div class='table-responsive'>
      <table class='table table-striped table-hover caption-top'>
        <thead class="table-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">UserID</th>
            <th scope="col">Title</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <caption>List of users</caption>
        <tbody>
          <transition-group name="post">
            <tr v-for='post in posts' :key='post.id' class='post-item'>
              <th scope="row">{{ post.id }}</th>
              <td>{{ post.user_id }}</td>
              <td>{{ post.title }}</td>
              <td>
                <router-link  :to="`/posts/${post.id}`"
                              class='btn bnt-sm btn-primary'>
                  <i class="bi bi-eye-fill"></i>
                </router-link>
              </td>
              <td>
                <button @click="deletePost(post.id)"
                        class='btn bnt-sm btn-danger'>
                  <i class="bi bi-x-lg"></i>
                </button>
              </td>
            </tr>
          </transition-group>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    posts() {
      return this.$store.getters['posts/posts'];
    },
  },
  methods: {
    deletePost(postId) {
      this.$store.dispatch('posts/deletePost', postId)
        .then(() => this.$toast.success(`Post with id ${postId} deleted`));
    },
  },
  beforeMount() {
    this.$store.dispatch('posts/fetchPosts');
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
