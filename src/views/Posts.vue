<template>
  <table class='table'>
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">UserID</th>
        <th scope="col">Title</th>
        <th scope="col">Body</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for='post in posts' :key='post.id'>
        <th scope="row">{{ post.id }}</th>
        <td>{{ post.userId }}</td>
        <td>{{ post.title }}</td>
        <td>{{ post.body }}</td>
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
  mounted() {
    this.$store.dispatch('posts/fetchPosts');
  },
};
</script>

<style scoped lang='scss'>
</style>
