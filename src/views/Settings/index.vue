<template>
  <div class="row">
    <div class="col-md-2">
      <nav class="nav nav-pills flex-column">
        <router-link to="/settings/profile" class="nav-link">
          Profile data
        </router-link>
        <router-link to="/settings/avatar" class="nav-link">
          Avatar
        </router-link>
        <router-link to="/settings/password" class="nav-link">
          Password
        </router-link>
      </nav>
    </div>
    <div class="col-md-10">
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
