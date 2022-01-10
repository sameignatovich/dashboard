<template>
  <h1 class="text-center">
    Edit profile
  </h1>
  <form @submit.prevent="newProfile">
    <div class="row mb-3">
      <label for="fullnameInput" class="col-sm-2 col-form-label">Full name</label>
      <div class="col-sm-10">
        <input :value="storedUser.full_name"
               @input="user.full_name = $event.target.value"
               type="text"
               class="form-control"
               :class="{'is-invalid': errors.full_name}"
               id="fullnameInput">
        <div class="invalid-feedback">
          <ul>
            <li v-for="inputError in errors.full_name" :key="inputError">
              {{ inputError }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="row mb-3">
      <label for="usernameInput" class="col-sm-2 col-form-label">Username</label>
      <div class="col-sm-10">
        <input :value="storedUser.username"
               type="text"
               class="form-control"
               id="usernameInput"
               disabled>
        <div id="usernameHelp" class="form-text">
          Username can be changed only through support
        </div>
      </div>
    </div>
    <div class="row mb-3">
      <label for="emailInput" class="col-sm-2 col-form-label">Email</label>
      <div class="col-sm-10">
        <input :value="storedUser.email"
               @input="user.email = $event.target.value"
               type="email"
               class="form-control"
               :class="{'is-invalid': errors.email}"
               id="emailInput">
        <div class="invalid-feedback">
          <ul>
            <li v-for="inputError in errors.email" :key="inputError">
              {{ inputError }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-sm-10 offset-sm-2">
        <button-spinner :loading="loading"
                        text="Update Profile" />
      </div>
    </div>
  </form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ButtonSpinner from '@/components/ButtonSpinner.vue';

export default {
  data() {
    return {
      user: {},
      loading: false,
      errors: {},
    };
  },
  computed: mapGetters({
    storedUser: 'user/user',
  }),
  beforeMount() {
    this.$title('Edit profile');
  },
  methods: {
    newProfile() {
      this.errors = {};
      this.loading = true;

      this.updateProfile(this.user)
        .then(() => {
          this.$toast.success('Profile updated!');
        })
        .catch((error) => {
          this.errors = error.response.data;
          this.$toast.error('Error during profile update!');
        })
        .then(() => {
          this.loading = false;
        });
    },
    ...mapActions({
      updateProfile: 'user/updateProfile',
    }),
  },
  components: {
    ButtonSpinner,
  },
};
</script>
