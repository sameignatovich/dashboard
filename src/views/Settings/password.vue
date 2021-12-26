<template>
  <h1 class="text-center">
    Change password
  </h1>
  <form @submit.prevent="updatePassword">
    <div class="row mb-5">
      <label for="fullnameInput" class="col-sm-3 col-form-label">Current password</label>
      <div class="col-sm-9">
        <input v-model="user.old_password"
               type="password"
               class="form-control"
               :class="{'is-invalid': errors.old_password}">
        <div class="invalid-feedback">
          <ul>
            <li v-for="inputError in errors.old_password" :key="inputError">
              {{ inputError }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="row mb-3">
      <label for="fullnameInput" class="col-sm-3 col-form-label">New password</label>
      <div class="col-sm-9">
        <input v-model="user.password"
               type="password"
               class="form-control">
      </div>
    </div>
    <div class="row mb-3">
      <label for="fullnameInput" class="col-sm-3 col-form-label">Confirm new password</label>
      <div class="col-sm-9">
        <input v-model="user.password_confirmation"
               type="password"
               class="form-control"
               :class="{'is-invalid': errors.password_confirmation}">
        <div class="invalid-feedback">
          <ul>
            <li v-for="inputError in errors.password_confirmation" :key="inputError">
              {{ inputError }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-sm-9 offset-sm-3">
        <button type="submit" class="btn btn-primary">Change password</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      user: {
        old_password: null,
        password: null,
        password_confirmation: null,
      },
      errors: {},
    };
  },
  beforeMount() {
    this.$title('Change password');
  },
  methods: {
    updatePassword() {
      this.errors = {};

      this.$store.dispatch('user/updatePassword', this.user)
        .then(() => {
          this.$toast.success('Password changed!');
        })
        .catch((error) => {
          this.errors = error.response.data;
          this.$toast.error('Error during password change!');
        });
    },
  },
};
</script>
