<template>
  <h5 class="text-center display-5">New post</h5>
  <form @submit.prevent="createPost">
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
      <button v-for="(tag, index) in tags"
              :key="tag"
              @click="removeTag(index)"
              type="button"
              class="btn btn-sm btn-secondary m-1 remove-tag">
        #{{ tag }}
      </button>
      <div class="input-group">
        <input v-model="tag" id="tag" type="text" class="form-control" aria-describedby="tag">
        <button @click.prevent="addTag"
                class="btn btn-outline-secondary"
                type="button"
                id="tag">
          Add Tag
        </button>
      </div>
    </div>
    <button type="submit" class="btn btn-primary">Create</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: null,
        text: null,
        tags_list: [],
      },
      tag: null,
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
      return new Promise((resolve, reject) => {
        this.$http.post('/posts', { post: this.post })
          .then((response) => {
            this.$router.push(`/posts/${response.data.id}`);
            this.$toast.success('Post created');
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  beforeMount() {
    this.$title('New post');
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
