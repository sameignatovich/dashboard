<template>
  <h1 class="text-center">
    Change password
  </h1>
  <form @submit.prevent="newPassword">
    <div class="row mb-5">
      <label for="fullnameInput" class="col-sm-3 col-form-label">Current password</label>
      <div class="col-sm-9">
        <input v-model="user.old_password"
               type="password"
               class="form-control"
               :class="{'is-invalid': errors.old_password}"
               required>
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
               class="form-control"
               required>
      </div>
    </div>
    <div class="row mb-3">
      <label for="fullnameInput" class="col-sm-3 col-form-label">Confirm new password</label>
      <div class="col-sm-9">
        <input v-model="user.password_confirmation"
               type="password"
               class="form-control"
               :class="{'is-invalid': errors.password_confirmation}"
               required>
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
        <button-spinner :loading="loading"
                        text="Change password"
                        type="submit" />
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex';
import ButtonSpinner from '@/components/ButtonSpinner.vue';

export default {
  data() {
    return {
      user: {},
      loading: false,
      errors: {},
    };
  },
  beforeMount() {
    this.$title('Change password');
  },
  methods: {
    newPassword() {
      this.errors = {};
      this.loading = true;

      this.updatePassword(this.user)
        .then(() => {
          this.$toast.success('Password changed!');
        })
        .catch((error) => {
          this.errors = error.response.data;
          this.$toast.error('Error during password change!');
        })
        .then(() => {
          this.loading = false;
        });
    },
    ...mapActions({
      updatePassword: 'user/updatePassword',
    }),
  },
  components: {
    ButtonSpinner,
  },
};
</script>
