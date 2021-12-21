<template>
  <ul class="navbar-nav mb-2 mb-lg-0">
    <li v-if="!authorized" class="nav-item">
      <router-link to="/signin" class='nav-link'>
        <i class="bi bi-lock-fill"></i>
        Sign in
      </router-link>
    </li>
    <li v-else class="nav-item dropdown">
      <a  href="#"
          class="nav-link dropdown-toggle"
          id="navbarDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false" >
        <img :src="user.avatar" height="30" class="rounded-circle" />
        {{ user.full_name }}
      </a>
      <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
        <li>
          <router-link :to="`/users/${user.username}`"
                       class="dropdown-item">
            <i class="bi bi-person-circle"></i>
            Profile
          </router-link>
        </li>
        <li><hr class="dropdown-divider"></li>
        <li>
          <button @click="signout"
                  class="dropdown-item">
            <i class="bi bi-box-arrow-left"></i>
            Sign out
          </button>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {
  computed: {
    authorized() {
      return this.$store.getters['auth/isAuthorized'];
    },
    user() {
      return this.$store.getters['auth/user'];
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
