<template>
  <div class="shadow-lg p-3 bg-body rounded mb-3">
    <post-placeholder v-if="loading" />
    <div v-else class="post">
      <div class="row">
        <div class="col-md-1 d-flex align-items-center justify-content-center">
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
                        @click="$emit('post:delete')"
                        class="dropdown-item">
                  <i class="bi bi-x-lg"></i>
                  Delete
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-11">
          <h2>
            {{ post.title }}
          </h2>
          <div class="d-flex justify-content-md-between">
            <p class="fw-normal">
              wrote by
              <router-link :to="`/users/${post.author.username}`">
                {{ post.author.username }}
              </router-link>
              <span class="fw-light ms-1">
                {{ $formatdate(post.created_at, '"at" HH:MM dd.mm.yyyy') }}
              </span>
            </p>
            <div class="fw-normal ms-1">
              <div :class="{ 'bg-dark': status === 'draft',
                             'bg-success': status === 'published',
                             'bg-secondary': status === 'hidden',
                             'bg-danger': status === 'blocked'}"
                   class="badge rounded-pill">
                {{ capitalizeFirstLetter(status) }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr>
      <div class='post-body' v-html="post.content">
      </div>
      <hr>
      <div class='post-tags'>
        <b>Tags:</b>
        <router-link v-for="tag in post.tags"
                     :key="tag.name"
                     :to="`/posts?tag=${tag.name}`"
                     class="m-1">
          #{{ tag.name }}
        </router-link>
      </div>
    </div>
  </div>

  <modal-dialogue title='Remove post?'
                  body='You sure want to delete this post'
                  :itemName="post.name"
                  acceptButton='Delete'
                  acceptButtonClass='btn-danger'
                  @accept-event="emitPostDelete"
                  id="deletePost">
  </modal-dialogue>
</template>

<script>
import PostPlaceholder from '@/components/PostPlaceholder.vue';
import capitalizeFirstLetter from '@/mixins/capitalizeFirstLetter';

export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  emits: [
    'post:delete',
  ],
  computed: {
    status() {
      return this.post.status;
    },
  },
  methods: {
    emitPostDelete() {
      this.$emit('post:delete');
    },
  },
  components: {
    PostPlaceholder,
  },
  mixins: [
    capitalizeFirstLetter,
  ],
};
</script>
