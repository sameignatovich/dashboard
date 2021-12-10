<template>
 <h5 class="display-5 text-center">Users</h5>
  <TableHeader  :item-name="`users`"
                :total-items-count="usersCount"
                :items-per-page="perPage"
                :current-page="page"
                @change-page="changePage"
                @change-per-page-count="changePerPageCount" />
  <div class='table-responsive'>
    <table class='table table-striped table-hover caption-top'>
      <thead class="table-dark">
        <tr>
          <th></th>
          <th scope="col">Username</th>
          <th scope="col">Role</th>
          <th scope="col">Created at</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <transition-group name="user">
          <tr v-for='user in users' :key='user.id'>
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
              {{ user.role }}
            </td>
            <td>
              {{ $formatdate(user.created_at, 'HH:MM dd.mm.yyyy') }}
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
      users: [],
      usersCount: 0,
      page: 1,
      perPage: 10,
      userForDeletion: {},
    };
  },
  methods: {
    fetchUsers() {
      return new Promise((resolve, reject) => {
        this.$http.get('/users', {
          params: {
            page: this.page,
            perPage: this.perPage,
          },
        })
          .then((response) => {
            this.users = response.data.users;
            this.usersCount = response.data.totalUsersCount;
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    deleteUser(userId) {
      return new Promise((resolve, reject) => {
        this.$http.delete(`/users/${userId}`)
          .then((response) => {
            this.users.splice(this.users.findIndex((i) => i.id === userId), 1);
            this.$toast.success(`User with id ${userId} deleted`);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
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
