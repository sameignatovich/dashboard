<template>
  <div class="row">
    <div class="col-sm-3">
      <nav class="nav nav-pills flex-column mb-3">
        <router-link to="/settings/profile" class="nav-link">
          Profile data
        </router-link>
        <router-link to="/settings/avatar" class="nav-link">
          Avatar
        </router-link>
        <router-link to="/settings/password" class="nav-link">
          Password
        </router-link>
        <router-link to="/settings/activity" class="nav-link">
          Account activity
        </router-link>
      </nav>
    </div>
    <div class="col-sm-9">
      <router-view />
    </div>
  </div>

</template>

<script>
export default {
  beforeMount() {
    this.$title('Settings');
  },
};
</script>
