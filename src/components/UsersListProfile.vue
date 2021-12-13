<template>
  <router-link :to="`/users/${user.id}`">
    <div class="card text-center">
      <img :src="user.avatar" class="card-img-top" alt="Avatar">
      <div class="card-body">
        <h6 class="card-title">
            {{ user.username }}
        </h6>
        <hr class="p-0" />
        <p class="card-text">
          Role:
          {{ user.role }}
        </p>
        <button type="button"
                data-bs-toggle="modal"
                data-bs-target="#deleteUser"
                @click.prevent="$emit('deleteUser')"
                class="btn btn-outline-danger btn-sm">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
  a {
    text-decoration: none;
    color: black;
  }
</style>
