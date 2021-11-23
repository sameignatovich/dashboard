<template>
  <div class="container">
    <div class="row mt-3">
      <div class="col-md-3">
        <div class="card">
          <img :src="`https://via.placeholder.com/600?text=User+Avatar+${user.id}`" class="card-img-top" alt="Avatar">
          <div class="card-info m-2">
            <div class="text-center">
              <strong>{{ user.name }}</strong> |
              <i>@{{ user.username }}</i>
            </div>
            <hr/>
            <p><b>Company:</b> {{ user.company.name }}</p>
            <hr/>
            <p><b>Website:</b> {{ user.website }}</p>
            <p><b>Email:</b> {{ user.email }}</p>
            <p><b>Phone:</b> {{ user.phone }}</p>
            <p><b>Address:</b> {{ ` ${user.address.street},
                                    ${user.address.suite},
                                    ${user.address.city},
                                    ${user.address.zipcode}` }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-9">
        Some info will be here soon...
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
    };
  },
  computed: {
    userId() {
      return this.$route.params.id;
    },
  },
  methods: {
    fetchUser(userId) {
      return new Promise((resolve, reject) => {
        this.$http.get(`/users/${userId}`)
          .then((response) => {
            this.user = response.data;
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  beforeMount() {
    this.fetchUser(this.userId);
  },
};
</script>

<style scoped lang='scss'>
  .card {
    p {
      margin-bottom: 0.2rem;
    }
  }
</style>
