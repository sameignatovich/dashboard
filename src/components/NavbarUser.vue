<template>
  <ul class="navbar-nav mb-2 mb-lg-0">
    <li v-if="!authorized" class="nav-item">
      <router-link to="/signin" class='nav-link'>
        <i class="bi bi-lock-fill"></i>
        Sign in
      </router-link>
    </li>
    <li v-else class="nav-item">
      <router-link to="/signout" class='nav-link'>
        Sign out
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  computed: {
    authorized() {
      return this.$store.getters['auth/isAuthorized'];
    },
  },
};
</script>

<style scoped lang='scss'>
</style>
