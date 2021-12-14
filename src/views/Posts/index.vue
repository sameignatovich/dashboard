<template>
  <h5 class="display-5 text-center">Posts</h5>
  <table-header  :item-name="`posts`"
                :table-items="posts"
                :total-items-count="postsCount"
                :items-per-page="query_params.perPage"
                :current-page="query_params.page"
                @change-page="changePage"
                @change-per-page-count="changePerPageCount" />
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
        <router-link :to="`/users/${post.author.user_id}`">
          {{ post.author.username }}
        </router-link>
        |
        <i class="bi bi-chat-left-text-fill"></i>
        {{ post.comments_count }}
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
        page: 1,
        perPage: 10,
        tag: null,
        user_id: null,
      },
      postForDeletion: {},
    };
  },
  methods: {
    fetchPosts() {
      return new Promise((resolve, reject) => {
        this.$http.get('/posts', {
          params: {
            page: this.query_params.page,
            perPage: this.query_params.perPage,
            tag: this.query_params.tag,
            user_id: this.query_params.user_id,
          },
        })
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
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    changePage(page) {
      this.query_params.page = page;
      this.$route.query.page = page;
      this.fetchPosts();
    },
    changePerPageCount(count) {
      this.query_params.perPage = count;
      this.query_params.page = 1;
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

  a {
    text-decoration: none;
  }
</style>
