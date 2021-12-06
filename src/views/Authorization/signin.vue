<template>
  <div class="text-center" id="form-signin">
    <form class="form-signin" @submit.prevent="signin">
      <h3 class="mb-3 fw-normal">Authorization</h3>

      <label for="emailInput" class="visually-hidden">Email</label>
      <input  type="email"
              v-model="email"
              class="form-control"
              id="emailInput"
              placeholder="Email"
              required
              autofocus>
      <label for="passwordInput" class="visually-hidden">Password</label>
      <input  type="password"
              v-model="password"
              class="form-control"
              id="passwordInput"
              placeholder="Password"
              required>

      <button type="submit" class="w-100 btn btn-lg btn-primary">Submit</button>

      <!--<
      div class="additional-links pt-3 text-start">
        <ul>
          <li><router-link to="/signin/reset">Забыли пароль?</router-link></li>
          <li><router-link to="/signup">Регистрация</router-link></li>
        </ul>
      </div>
    -->
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  computed: {
    errorMessage() {
      return this.$store.getters['auth/errorMessage'];
    },
  },
  methods: {
    signin() {
      const signinData = {
        user: {
          email: this.email,
          password: this.password,
        },
      };

      this.$store.dispatch('auth/signin', signinData)
        .then(() => {
          if (this.$route.query.redirect != null) {
            this.$router.push(this.$route.query.redirect);
          } else {
            this.$router.push('/');
          }
          this.$toast.success('Authorization succesfull!');
        })
        .catch(() => {
          this.$toast.error(this.errorMessage);
          this.password = '';
        });
    },
  },
  beforeMount() {
    this.$title('Signin');
  },
};
</script>

<style scoped lang="scss">
  #form-signin {
    align-items: center;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    padding-top: 40px;
    padding-bottom: 40px;

    .form-signin {
      width: 100%;
      max-width: 375px;
      padding: 15px;
      margin: auto;

      .form-control {
        position: relative;
        box-sizing: border-box;
        height: auto;
        padding: 10px;
        font-size: 16px;
      }

      .form-control:focus {
        z-index: 2;
      }

      #emailInput {
        margin-bottom: -1px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
      }

      #passwordInput {
        margin-bottom: 10px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
      }
    }
  }
</style>
