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
              {{ info.users.last_user.username }}
              <br/>
              ({{ $formatdate(info.users.last_user.created_at, 'HH:MM dd.mm.yyyy') }})
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
              ({{ $formatdate(info.posts.last_post.created_at, 'HH:MM dd.mm.yyyy') }})
            </div>
          </div>
        </div>
        <div class="shadow-lg p-3 mb-3 bg-body rounded">
          <div class="row align-items-center">
            <div class="col-md-4">
              <i class="bi bi-chat-left-text-fill"></i>
            </div>
            <div class="col-md-4">
              <b>Comments count</b>
              <br/>
              {{ info.comments.comments_count }}
            </div>
            <div class="col-md-4">
              <b>Last comment</b>
              <br/>
              {{ info.comments.last_comment.body }}
              <br/>
              ({{ $formatdate(info.comments.last_comment.created_at, 'HH:MM dd.mm.yyyy') }})
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    info() {
      return this.$store.getters['info/info'];
    },
  },
  beforeMount() {
    this.$title('Home');
    this.$store.dispatch('info/fetchInfo');
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
