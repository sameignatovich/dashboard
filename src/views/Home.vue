<template>
  <div class="home">
    <div class="row">
      <div class="col-md-6">
        <img alt="Vue logo" src="@/assets/images/logo.png">
        <h1>Homepage</h1>
      </div>
      <div class="col-md-6">
        <div class="shadow-lg p-3 mb-3 bg-body rounded">
          <div class="row align-items-center">
            <div class="col-md-4">
              <i class="bi bi-people-fill"></i>
            </div>
            <div class="col-md-4">
              <b>Users count</b>
              <br/>
              {{ info.users.users_count }}
            </div>
            <div class="col-md-4">
              <b>Last user</b>
              <br/>
              {{ fullname }}
              <br/>
              ({{ formatDate(info.users.last_user.created_at) }})
            </div>
          </div>
        </div>
        <div class="shadow-lg p-3 mb-3 bg-body rounded">
          <div class="row align-items-center">
            <div class="col-md-4">
              <i class="bi bi-stickies-fill"></i>
            </div>
            <div class="col-md-4">
              <b>Posts count</b>
              <br/>
              {{ info.posts.posts_count }}
            </div>
            <div class="col-md-4">
              <b>Last post</b>
              <br/>
              {{ info.posts.last_post.title }}
              <br/>
              ({{ formatDate(info.posts.last_post.created_at) }})
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dateFormat from 'dateformat';

export default {
  computed: {
    info() {
      return this.$store.getters['info/info'];
    },
    fullname() {
      return `${this.info.users.last_user.first_name} ${this.info.users.last_user.last_name}`;
    },
  },
  beforeMount() {
    this.$title('Home');
    this.$store.dispatch('info/fetchInfo');
  },
  methods: {
    formatDate(value) {
      return dateFormat(value, 'hh:MM dd.mm.yyyy');
    },
  },
};
</script>

<style scoped lang="scss">
  .home {
    text-align: center;

    .bi {
      font-size: 4rem;
    }
  }
</style>
