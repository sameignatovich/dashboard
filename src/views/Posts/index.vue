<template>
  <h5 class="display-5 text-center">
    Posts
    <span v-if="$route.query.username">
      {{ `of user ${$route.query.username}` }}
    </span>
        <span v-if="$route.query.tag">
      {{ `with tag #${$route.query.tag}` }}
    </span>
  </h5>
  <table-header item-name="posts"
                :total-items-count="postsCount"
                :current-page="+$route.query.page || 1"
                :current-count="+$route.query.count || 10" />

  <router-link to="/posts/new" class="btn btn-success m-2">
    <i class="bi bi-plus-lg"></i>
    Create post
  </router-link>

  <transition-group name="post">
    <div v-for='post in posts'
         :key='post.id'
         class="shadow p-3 mb-3 bg-body rounded post-item row">
      <div class="col-sm-1 d-flex align-items-center justify-content-center">
        <div class="btn-group post-actions" role="group">
          <button :id="`post-actions-${post.id}`"
                  type="button"
                  class="btn btn-light dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false">
            <i class="bi bi-list"></i>
          </button>
          <ul class="dropdown-menu"
              :aria-labelledby="`post-actions-${post.id}`">
            <li>
              <button type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#deletePost"
                      @click="postForDeletion = post"
                      class="dropdown-item">
                <i class="bi bi-x-lg"></i>
                Delete
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-sm-11">
        <div class="d-flex">
          <h5>
            <router-link  :to="`/posts/${post.id}`">
              {{ post.title }}
            </router-link>
          </h5>
        </div>
        <div>
          <span :class="{ 'bg-dark': post.status === 'draft',
                          'bg-success': post.status === 'published',
                          'bg-secondary': post.status === 'hidden',
                          'bg-danger': post.status === 'blocked'}"
               class="badge rounded-pill">
            {{ capitalizeFirstLetter(post.status) }}
          </span>
          {{ $formatdate(post.created_at) }}
          |
          <i class="bi bi-chat-left-text-fill"></i>
          {{ post.comments_count }}
          |
          <router-link :to="`/users/${post.author.username}`">
            {{ post.author.username }}
          </router-link>
        </div>
      </div>
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
import capitalizeFirstLetter from '@/mixins/capitalizeFirstLetter';
import fullPathResolution from '@/mixins/fullPathResolution';

export default {
  data() {
    return {
      posts: [],
      postsCount: 0,
      postForDeletion: {},
    };
  },
  methods: {
    fetchPosts() {
      return new Promise((resolve, reject) => {
        this.$http.get('/posts', { params: this.$route.query })
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
  },
  beforeMount() {
    this.$title('Posts');
    this.fetchPosts();
  },
  components: {
    TableHeader,
  },
  watch: {
    fullPath() {
      this.fetchPosts();
    },
  },
  mixins: [
    fullPathResolution,
    capitalizeFirstLetter,
  ],
};
</script>

<style scoped lang='scss'>
  .post-item .post-actions{
    visibility: hidden;
  }

  .post-item:hover .post-actions{
    visibility: visible;
  }

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
