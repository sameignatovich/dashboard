<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-secondary sticky-top">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">
        Dashboard
      </router-link>
      <button class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent" :key="$route.path">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class='nav-link'>
              <i class="bi bi-pie-chart-fill"></i>
              Statistics
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/posts" class='nav-link'>
              <i class="bi bi-stickies-fill"></i>
              Posts
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/users" class='nav-link'>
              <i class="bi bi-people-fill"></i>
              Users
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class='nav-link'>
              <i class="bi bi-info-square-fill"></i>
              About
            </router-link>
          </li>
        </ul>
        <navbar-user />
      </div>
    </div>
  </nav>
</template>

<script>
import NavbarUser from './NavbarUser.vue';

export default {
  components: {
    NavbarUser,
  },
};
</script>
