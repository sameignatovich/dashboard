<template>
  <h1 class="text-center">
    Edit User
  </h1>
  <form @submit.prevent="updateProfile">
    <div class="row mb-3">
      <label for="fullnameInput" class="col-sm-2 col-form-label">Full name</label>
      <div class="col-sm-10">
        <input :value="storedUser.full_name"
               @input="user.full_name = $event.target.value"
               type="text"
               class="form-control"
               id="fullnameInput">
      </div>
    </div>
    <div class="row mb-3">
      <label for="usernameInput" class="col-sm-2 col-form-label">Username</label>
      <div class="col-sm-10">
        <input :value="storedUser.username"
               @input="user.username = $event.target.value"
               type="text"
               class="form-control"
               id="usernameInput">
      </div>
    </div>
    <div class="row mb-3">
      <label for="emailInput" class="col-sm-2 col-form-label">Email</label>
      <div class="col-sm-10">
        <input :value="storedUser.obfuscated_email"
               @input="user.email = $event.target.value"
               type="email"
               class="form-control"
               id="emailInput">
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
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      user: {},
    };
  },
  computed: {
    ...mapGetters({
      storedUser: 'auth/user',
    }),
  },
  beforeMount() {
    this.$title('Edit profile');
  },
  methods: {
    updateProfile() {
      this.$store.dispatch('auth/updateProfile', this.user)
        .then(() => {
          this.$toast.success('Profile updated!');
        })
        .catch(() => {
          this.$toast.error('Error during profile update');
        });
    },
  },
};
</script>
