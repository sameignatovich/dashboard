<template>
  <ul class="navbar-nav mb-2 mb-lg-0">
    <li v-if="!authorized" class="nav-item">
      <router-link to="/signin" class='nav-link'>
        <i class="bi bi-lock-fill"></i>
        Sign in
      </router-link>
    </li>
    <li v-else class="nav-item">
      <button @click="signout"
              class="btn nav-link">
        <i class="bi bi-box-arrow-left"></i>
        Sign out
      </button>
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
  methods: {
    signout() {
      this.$store.dispatch('auth/signout')
        .then(() => {
          this.$router.push('/');
        });
    },
  },
};
</script>

<style scoped lang='scss'>
</style>
