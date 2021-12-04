<template>
 <h5 class="display-5 text-center">Users</h5>
  <TableHeader  :item-name="`users`"
                :table-items="users"
                :total-items-count="usersCount"
                :items-per-page="perPage"
                :current-page="page"
                @change-page="changePage"
                @change-per-page-count="changePerPageCount" />
  <div class='table-responsive'>
    <table class='table table-striped table-hover caption-top'>
      <thead class="table-dark">
        <tr>
          <th scope="col">#</th>
          <th></th>
          <th scope="col">Username</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <transition-group name="user">
          <tr v-for='user in users' :key='user.id'>
            <th scope="row">{{ user.id }}</th>
            <td>
              <img  :src="user.avatar"
                    height="41.5"
                    class="rounded-circle" />
            </td>
            <td>
              <router-link :to="`/users/${user.id}`">
                {{ user.username }}
              </router-link>
            </td>
            <td>
              <button type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteUser"
                      @click="userForDeletion = user"
                      class="btn bnt-sm btn-danger">
                <i class="bi bi-x-lg"></i>
              </button>
            </td>
          </tr>
        </transition-group>
      </tbody>
    </table>
  </div>

  <modal-dialogue title='Remove user?'
                  body='You sure want to delete this user?
                        All content of this user also will be affected'
                  :itemName='userForDeletion.username'
                  acceptButton='Delete'
                  acceptButtonClass='btn-danger'
                  @accept-event="deleteUser(userForDeletion.id)"
                  @cancel-event="userForDeletion = {}"
                  id="deleteUser">
  </modal-dialogue>
</template>

<script>
import TableHeader from '@/components/TableHeader.vue';

export default {
  data() {
    return {
      page: 1,
      perPage: 10,
      userForDeletion: {},
    };
  },
  computed: {
    users() {
      return this.$store.getters['users/users'];
    },
    usersCount() {
      return this.$store.getters['users/totalUsersCount'];
    },
  },
  methods: {
    fetchUsers() {
      this.$store.dispatch('users/fetchUsers', {
        page: this.page,
        perPage: this.perPage,
      });
    },
    deleteUser(userId) {
      this.$store.dispatch('users/deleteUser', userId)
        .then(() => this.$toast.success(`User with id ${userId} deleted`));
    },
    changePage(page) {
      this.page = page;
      this.fetchUsers();
    },
    changePerPageCount(count) {
      this.perPage = count;
      this.fetchUsers();
    },
  },
  beforeMount() {
    this.$title('Users');
    this.fetchUsers();
  },
  components: {
    TableHeader,
  },
};
</script>

<style scoped lang='scss'>
.user-enter-active,
.user-leave-active {
  transition: all .5s ease;
}
.user-enter-from,
.user-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
