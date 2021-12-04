<template>
  <div class="row">
    <div class="col-md-3">
      <div v-if="user" class="card">
        <img :src="user.avatar" class="card-img-top" alt="Avatar">
        <div class="card-info m-2">
          <div class="text-center">
            <strong>{{ userFullName }}</strong> |
            <i>@{{ user.username }}</i>
          </div>
          <hr/>
          <p><b>Email:</b> {{ user.email }}</p>
          <p><b>Phone:</b> {{ user.phone }}</p>
          <p><b>Address:</b> {{ user.address }}</p>
          <hr/>
          <p><b>Updated:</b> {{ formatDate(user.updated_at) }}</p>
          <p><b>Created:</b> {{ formatDate(user.created_at) }}</p>
        </div>
      </div>
    </div>
    <div class="col-md-9">
      <h5 class="display-5 text-center">Posts</h5>
      <table class="table">
        <tbody>
          <tr v-for="post in posts"
              :key="post.id">
            <th>
              <router-link :to="`/posts/${post.id}`">
                #{{ post.id }}
              </router-link>
            </th>
            <td>
              <strong>
                {{ post.title }}
              </strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import dateFormat from 'dateformat';

export default {
  data() {
    return {
      posts: [],
    };
  },
  computed: {
    userId() {
      return this.$route.params.id;
    },
    user() {
      return this.$store.getters['users/currentUser'];
    },
    userFullName() {
      return `${this.user.first_name} ${this.user.last_name}`;
    },
  },
  methods: {
    fetchUserPosts(userId) {
      return new Promise((resolve, reject) => {
        this.$http.get(`/users/${userId}/posts`)
          .then((response) => {
            this.posts = response.data;
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    formatDate(value) {
      return dateFormat(value, 'HH:MM dd.mm.yyyy');
    },
  },
  beforeMount() {
    this.$store.dispatch('users/fetchCurrentUser', this.userId);
    this.fetchUserPosts(this.userId);
  },
  watch: {
    user() {
      this.$title(`@${this.user.username}`);
    },
  },
};
</script>

<style scoped lang='scss'>
  .card {
    p {
      margin-bottom: 0.2rem;
    }
  }
</style>
