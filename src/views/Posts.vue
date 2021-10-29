<template>
  <table class='table'>
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">User</th>
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
  data: () => ({
    posts: [],
  }),
  mounted() {
    this.$http.get('/posts')
      .then((response) => {
        this.posts = response.data;
      });
  },
};
</script>

<style scoped lang='scss'>
</style>
