<template>
  <h5 class="display-5 text-center">
    Posts
    <span v-if="query_params.username">
      {{ `of user ${query_params.username}` }}
    </span>
        <span v-if="query_params.tag">
      {{ `with tag #${query_params.tag}` }}
    </span>
  </h5>
  <table-header  :item-name="`posts`"
                :table-items="posts"
                :total-items-count="postsCount"
                :items-per-page="query_params.perPage"
                :current-page="query_params.page"
                @change-page="changePage"
                @change-per-page-count="changePerPageCount" />

  <router-link to="/posts/new" class="btn btn-success m-2">
    <i class="bi bi-plus-lg"></i>
    Create post
  </router-link>

  <transition-group name="post">
    <div v-for='post in posts'
         :key='post.id'
         class="shadow p-3 mb-3 bg-body rounded post-item">
      <h5>
        <router-link  :to="`/posts/${post.id}`">
          {{ post.title }}
        </router-link>
      </h5>
      <div>
        {{ $formatdate(post.created_at) }}
        |
        <i class="bi bi-chat-left-text-fill"></i>
        {{ post.comments_count }}
        |
        <router-link :to="`/users/${post.author.user_id}`">
          {{ post.author.username }}
        </router-link>
      </div>

      <button type="button"
              data-bs-toggle="modal"
              data-bs-target="#deletePost"
              @click="postForDeletion = post"
              class="btn btn-sm btn-danger mt-1">
        <i class="bi bi-x-lg"></i>
      </button>
    </div>
  </transition-group>

  <modal-dialogue title='Remove post?'
                  body='You sure want to delete this post'
                  :itemName='postForDeletion.title'
                  acceptButton='Delete'
                  acceptButtonClass='btn-danger'
                  @accept-event="deletePost(postForDeletion.id)"
                  @cancel-event="postForDeletion = {}"
                  id="deletePost">
  </modal-dialogue>
</template>

<script>
import TableHeader from '@/components/TableHeader.vue';

export default {
  data() {
    return {
      posts: [],
      postsCount: 0,
      query_params: {
        page: +this.$route.query.page || 1,
        perPage: +this.$route.query.perPage || 10,
        username: this.$route.query.username,
        tag: this.$route.query.tag,
      },
      postForDeletion: {},
    };
  },
  methods: {
    fetchPosts() {
      return new Promise((resolve, reject) => {
        this.$http.get('/posts', { params: this.query_params })
          .then((response) => {
            this.posts = response.data.posts;
            this.postsCount = response.data.totalPostsCount;
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    deletePost(postId) {
      return new Promise((resolve, reject) => {
        this.$http.delete(`/posts/${postId}`)
          .then((response) => {
            this.posts.splice(this.posts.findIndex((i) => i.id === postId), 1);
            this.postsCount -= 1;
            this.$toast.success(`Post with id ${postId} deleted`);
            this.fetchPosts();
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    changePage(page) {
      this.query_params.page = page;
      this.$router.push({ path: '/posts', query: this.query_params });
      this.fetchPosts();
    },
    changePerPageCount(count) {
      this.query_params.perPage = count;
      this.query_params.page = 1;
      this.$router.push({ path: '/posts', query: this.query_params });
      this.fetchPosts();
    },
  },
  beforeMount() {
    this.$title('Posts');
    this.fetchPosts();
  },
  components: {
    TableHeader,
  },
};
</script>

<style scoped lang='scss'>
  .post-enter-active,
  .post-leave-active {
    transition: all .5s ease;
  }

  .post-enter-from,
  .post-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }
</style>
