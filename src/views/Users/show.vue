<template>
  <div class="row">
    <div class="col-md-3">
      <div v-if="user" class="card">
        <img :src="user.avatar" class="card-img-top" alt="Avatar">
        <div class="card-info m-2">
          <div class="text-center">
            <strong>{{ user.full_name }}</strong><br/>
            <i>@{{ user.username }}</i>
          </div>
          <hr/>
          <p>
            <i class="bi bi-envelope-fill"></i>
            {{ user.email }}
          </p>
          <hr/>
          <p>
            <b>Updated:</b>
            {{ $formatdate(user.updated_at, 'HH:MM dd.mm.yyyy') }}
          </p>
          <p>
            <b>Created:</b>
            {{ $formatdate(user.created_at, 'HH:MM dd.mm.yyyy') }}
          </p>
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
export default {
  data() {
    return {
      user: {},
      posts: [],
    };
  },
  computed: {
    username() {
      return this.$route.params.username;
    },
  },
  methods: {
    fetchUser(username) {
      return new Promise((resolve, reject) => {
        this.$http.get(`/users/${username}`)
          .then((response) => {
            this.user = response.data;
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    fetchUserPosts(username) {
      return new Promise((resolve, reject) => {
        this.$http.get(`/posts?username=${username}`)
          .then((response) => {
            this.posts = response.data.posts;
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  beforeMount() {
    this.fetchUser(this.username);
    this.fetchUserPosts(this.username);
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
