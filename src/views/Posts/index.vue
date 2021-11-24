<template>
  <div class='container'>
      <h5 class="display-5 text-center">List of posts</h5>
      <div class="row row-cols-auto">
        <div class="col">
          <Pagination :total-pages="totalPages"
                      :current-page="page"
                      @change-page="changePage" />
        </div>
        <div class="col">
          <SelectItemsCount @change-per-page-count="changeCount" />
        </div>
        <div class="col">
          <p class="mt-2">
            Total posts:
            {{ postsCount }}
          </p>
        </div>
      </div>
    <div class='table-responsive'>
      <table class='table table-striped table-hover caption-top'>
        <thead class="table-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">UserID</th>
            <th scope="col">Title</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <transition-group name="post">
            <tr v-for='post in posts' :key='post.id' class='post-item'>
              <th scope="row">{{ post.id }}</th>
              <td>{{ post.user_id }}</td>
              <td>{{ post.title }}</td>
              <td>
                <router-link  :to="`/posts/${post.id}`"
                              class='btn bnt-sm btn-primary'>
                  <i class="bi bi-eye-fill"></i>
                </router-link>
              </td>
              <td>
                <button @click="deletePost(post.id)"
                        class='btn bnt-sm btn-danger'>
                  <i class="bi bi-x-lg"></i>
                </button>
              </td>
            </tr>
          </transition-group>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';
import SelectItemsCount from '@/components/SelectItemsCount.vue';

export default {
  data() {
    return {
      page: 1,
      perPage: 10,
    };
  },
  computed: {
    posts() {
      return this.$store.getters['posts/posts'];
    },
    postsCount() {
      return this.$store.getters['posts/totalPostsCount'];
    },
    totalPages() {
      return Math.ceil(this.postsCount / this.perPage);
    },
    showPages() {
      const range = [];

      for (let i = this.startPage; i <= this.endPage; i += 1) {
        range.push({
          id: i,
          isDisabled: i === this.page,
        });
      }

      return range;
    },
  },
  methods: {
    fetchPosts() {
      this.$store.dispatch('posts/fetchPosts', {
        page: this.page,
        perPage: this.perPage,
      });
    },
    deletePost(postId) {
      this.$store.dispatch('posts/deletePost', postId)
        .then(() => this.$toast.success(`Post with id ${postId} deleted`));
    },
    changePage(page) {
      this.page = page;
      this.fetchPosts();
    },
    changeCount(count) {
      this.perPage = count;
      this.fetchPosts();
    },
  },
  beforeMount() {
    this.fetchPosts();
  },
  components: {
    Pagination,
    SelectItemsCount,
  },
};
</script>

<style scoped lang='scss'>
.post-enter-active,
.post-leave-active {
  transition: all 1s ease;
}
.post-enter-from,
.post-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
