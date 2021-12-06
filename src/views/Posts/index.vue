<template>
  <h5 class="display-5 text-center">Posts</h5>
  <table-header  :item-name="`posts`"
                :table-items="posts"
                :total-items-count="postsCount"
                :items-per-page="perPage"
                :current-page="page"
                @change-page="changePage"
                @change-per-page-count="changePerPageCount" />
  <div class='table-responsive'>
    <table class='table table-striped table-hover caption-top'>
      <thead class="table-dark">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Published</th>
          <th scope="col">Author</th>
          <th scope="col">Comments</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <transition-group name="post">
          <tr v-for='post in posts' :key='post.id' class='post-item'>
            <td>
              <router-link  :to="`/posts/${post.id}`">
                {{ post.title }}
              </router-link>
            </td>
            <td>
              {{ $formatdate(post.created_at) }}
            </td>
            <td>
              <router-link :to="`/users/${post.author.user_id}`">
                {{ post.author.username }}
              </router-link>
            </td>
            <td>
              {{ post.comments_count }}
            </td>
            <td>
              <button type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#deletePost"
                      @click="postForDeletion = post"
                      class="btn bnt-sm btn-danger">
                <i class="bi bi-x-lg"></i>
              </button>
            </td>
          </tr>
        </transition-group>
      </tbody>
    </table>
  </div>

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
      postsCount: undefined,
      page: 1,
      perPage: 10,
      postForDeletion: {},
    };
  },
  methods: {
    fetchPosts() {
      return new Promise((resolve, reject) => {
        this.$http.get('/posts', {
          params: {
            page: this.page,
            perPage: this.perPage,
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
            this.totalPostsCount -= 1;

            this.$toast.success(`Post with id ${postId} deleted`);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    changePage(page) {
      this.page = page;
      this.fetchPosts();
    },
    changePerPageCount(count) {
      this.perPage = count;
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
