<template>
  <h1 class="text-center">
    Edit User
  </h1>
  <form>
    <div class="row mb-3">
      <label for="fullnameInput" class="col-sm-2 col-form-label">Full name</label>
      <div class="col-sm-10">
        <input type="string" class="form-control" id="fullnameInput">
      </div>
    </div>
    <div class="row mb-3">
      <label for="usernameInput" class="col-sm-2 col-form-label">Username</label>
      <div class="col-sm-10">
        <input type="string" class="form-control" id="usernameInput">
      </div>
    </div>
    <div class="row mb-3">
      <label for="emailInput" class="col-sm-2 col-form-label">Email</label>
      <div class="col-sm-10">
        <input type="email" class="form-control" id="emailInput">
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-sm-10 offset-sm-2">
        <button type="submit" class="btn btn-primary">Update profile</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  beforeMount() {
    this.$title('Edit profile');
  },
};
</script>
