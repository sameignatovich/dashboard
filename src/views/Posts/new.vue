<template>
  <h5 class="text-center display-5">New post</h5>
    <div class="row mb-3">
      <label for="title" class="col-md-2 col-form-label">
        Title
      </label>
      <div class="col-md-10">
        <input v-model="post.title"
               type="text"
               class="form-control"
               :class="{'is-invalid': errors.title}"
               required>
        <div class="invalid-feedback">
          <ul>
            <li v-for="inputError in errors.title" :key="inputError">
              {{ inputError }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="row mb-3">
      <label for="text" class="col-md-2 col-form-label">
        Text
      </label>
      <div class="col-md-10">
        <textarea v-model="post.content"
                  class="form-control"
                  :class="{'is-invalid': errors.content}"
                  rows="5"
                  required>
        </textarea>
        <div class="invalid-feedback">
          <ul>
            <li v-for="inputError in errors.content" :key="inputError">
              {{ inputError }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="row mb-3">
      <label for="tag" class="col-md-2 col-form-label">
        Tags
      </label>
      <div class="col-md-10">
        <div class="input-group mb-2">
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
        <button v-for="(tag, index) in post.tags_list"
                :key="tag"
                @click="removeTag(index)"
                type="button"
                class="btn btn-sm btn-secondary m-1 remove-tag">
          #{{ tag }}
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
      errors: {},
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
      this.errors = {};
      this.loading = true;

      return new Promise((resolve, reject) => {
        this.$http.post('/posts', { post: this.post })
          .then((response) => {
            this.$router.push(`/posts/${response.data.id}`);
            this.$toast.success('Post created!');
            resolve(response);
          })
          .catch((error) => {
            this.errors = error.response.data;
            this.$toast.error('Error during post creation!');
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
