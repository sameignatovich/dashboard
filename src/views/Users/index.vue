<template>
  <div class='container'>
    <div class='table-responsive'>
      <table class='table table-striped table-hover caption-top'>
        <thead class="table-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <caption>List of users</caption>
        <tbody>
          <transition-group name="user">
            <UserRow  v-for='user in users'
                      :key='user.id'
                      :user='user'
                      class='user-item'
                      @deleteUser='deleteUser(user.id)' />
          </transition-group>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import UserRow from './components/user-row.vue';

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
  components: {
    UserRow,
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
