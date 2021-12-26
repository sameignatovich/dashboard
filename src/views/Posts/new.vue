<template>
  <h5 class="text-center display-5">New post</h5>
    <div class="mb-3">
      <label for="title" class="form-label">Title:</label>
      <input v-model="post.title" type="text" class="form-control" id="title">
    </div>
    <div class="mb-3">
      <label for="text" class="form-label">Text:</label>
      <textarea v-model="post.text" class="form-control" id="text" rows="5">
      </textarea>
    </div>
    <div class="mb-3">
      <label for="tag" class="form-label">Tags:</label>
      <button v-for="(tag, index) in post.tags_list"
              :key="tag"
              @click="removeTag(index)"
              type="button"
              class="btn btn-sm btn-secondary m-1 remove-tag">
        #{{ tag }}
      </button>
      <div class="input-group">
        <input v-model="tag"
               @keyup.enter="addTag"
               type="text"
               class="form-control">
        <button @click="addTag"
                class="btn btn-outline-secondary"
                type="button" >
          Add Tag
        </button>
      </div>
    </div>
    <button-spinner @click="createPost"
                    :loading="loading"
                    text="Post"
                    waitingText="Posting..." />
</template>

<script>
import ButtonSpinner from '@/components/ButtonSpinner.vue';

export default {
  data() {
    return {
      post: {
        title: null,
        text: null,
        tags_list: [],
      },
      tag: null,
      loading: false,
    };
  },
  methods: {
    addTag() {
      this.post.tags_list.push(this.tag);
      this.tag = null;
    },
    removeTag(index) {
      this.post.tags_list.splice(index, 1);
    },
    createPost() {
      this.loading = true;

      return new Promise((resolve, reject) => {
        this.$http.post('/posts', { post: this.post })
          .then((response) => {
            this.$router.push(`/posts/${response.data.id}`);
            this.$toast.success('Post created');
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          })
          .then(() => {
            this.loading = false;
          });
      });
    },
  },
  beforeMount() {
    this.$title('New post');
  },
  components: {
    ButtonSpinner,
  },
};
</script>

<style scoped lang='scss'>
  .remove-tag:hover {
    color: #fff;
    background-color: #dc3545;
    border-color: #dc3545;
  }
</style>
