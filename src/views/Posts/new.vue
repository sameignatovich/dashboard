<template>
  <h5 class="text-center display-5">New post</h5>
  <form @submit.prevent="createPost">
    <div class="mb-3">
      <label for="title" class="form-label">Title:</label>
      <input v-model="title" type="text" class="form-control" id="title">
    </div>
    <div class="mb-3">
      <label for="text" class="form-label">Text:</label>
      <textarea v-model="text" class="form-control" id="text" rows="5">
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
      title: null,
      text: null,
      tag: null,
      tags: [],
    };
  },
  methods: {
    addTag() {
      this.tags.push(this.tag);
      this.tag = null;
    },
    removeTag(index) {
      this.tags.splice(index, 1);
    },
    createPost() {
      return new Promise((resolve, reject) => {
        this.$http.post('/posts', {
          post: {
            title: this.title,
            text: this.text,
          },
          tags_list: this.tags,
        })
          .then((response) => {
            this.post = response.data;
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

<style scoped lang="scss">
  .remove-tag:hover {
    color: #fff;
    background-color: #dc3545;
    border-color: #dc3545;
  }
</style>
