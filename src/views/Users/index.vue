<template>
  <div class='container'>
    <div class='table-responsive'>
      <table class='table table-striped table-hover caption-top'>
        <thead class="table-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Username</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <caption>List of users</caption>
        <tbody>
          <transition-group name="user">
            <tr v-for='user in users' :key='user.id'>
              <th scope="row">{{ user.id }}</th>
              <td>{{ user.name }}</td>
              <td>{{ user.username }}</td>
              <td>
                <router-link  :to="`/users/${user.id}`"
                              class='btn bnt-sm btn-primary'>
                  <i class="bi bi-eye-fill"></i>
                </router-link>
              </td>
              <td>
                <button @click="deleteUser(user.id)"
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
export default {
  computed: {
    users() {
      return this.$store.getters['users/users'];
    },
  },
  methods: {
    deleteUser(userId) {
      this.$store.dispatch('users/deleteUser', userId)
        .then(() => this.$toast.success(`User with id ${userId} deleted`));
    },
  },
  beforeMount() {
    this.$store.dispatch('users/fetchUsers');
  },
};
</script>

<style scoped lang='scss'>
.user-enter-active,
.user-leave-active {
  transition: all 1s ease;
}
.user-enter-from,
.user-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
