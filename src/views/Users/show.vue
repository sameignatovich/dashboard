<template>
  <div class="row">
    <div class="col-md-3">
      <div v-if="user" class="card">
        <img :src="`https://via.placeholder.com/600?text=User+Avatar+${user.id}`" class="card-img-top" alt="Avatar">
        <div class="card-info m-2">
          <div class="text-center">
            <strong>{{ user.first_name }} {{ user.last_name }}</strong> |
            <i>@{{ user.username }}</i>
          </div>
          <hr/>
          <p><b>Email:</b> {{ user.email }}</p>
          <p><b>Phone:</b> {{ user.phone }}</p>
          <p><b>Address:</b> {{ user.address }}</p>
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
  },
  beforeMount() {
    this.$store.dispatch('users/fetchCurrentUser', this.userId);
    this.fetchUserPosts(this.userId);
  },
  watch: {
    post() {
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
