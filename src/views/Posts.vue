<template>
  <table class='table'>
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">UserID</th>
        <th scope="col">Title</th>
        <th scope="col">Body</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for='post in posts' :key='post.id'>
        <th scope="row">{{ post.id }}</th>
        <td>{{ post.userId }}</td>
        <td>{{ post.title }}</td>
        <td>{{ post.body }}</td>
        <td>
          <button @click='deletePost(post.id)' class='btn bnt-sm btn-danger'>
            <i class="bi bi-x-lg"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
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
      this.$store.dispatch('posts/deletePost', postId);
    },
  },
  mounted() {
    this.$store.dispatch('posts/fetchPosts');
  },
};
</script>

<style scoped lang='scss'>
</style>
