<template>
 <h5 class="display-5 text-center">Users</h5>
  <TableHeader  item-name="users"
                :total-items-count="usersCount"
                :current-page="+$route.query.page || 1"
                :current-count="+$route.query.count || 10" />

  <div class="row
              row-cols-sm-1
              row-cols-md-3
              row-cols-lg-5
              g-2">
    <transition-group name="user">
      <div  v-for="user in users"
            :key="user.id"
            class="col">
        <users-list-profile :user="user"
                            @delete-user="setUserForDeletion(user)" />
      </div>
    </transition-group>
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
import UsersListProfile from '@/components/UsersListProfile.vue';
import fullPathResolution from '@/mixins/fullPathResolution';

export default {
  data() {
    return {
      users: [],
      usersCount: 0,
      userForDeletion: {},
    };
  },
  methods: {
    fetchUsers() {
      return new Promise((resolve, reject) => {
        this.$http.get('/users', { params: this.$route.query })
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
    setUserForDeletion(user) {
      this.userForDeletion = user;
    },
    deleteUser(userId) {
      return new Promise((resolve, reject) => {
        this.$http.delete(`/users/${userId}`)
          .then((response) => {
            this.users.splice(this.users.findIndex((i) => i.id === userId), 1);
            this.$toast.success(`User with id ${userId} deleted`);
            this.fetchUsers();
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  beforeMount() {
    this.$title('Users');
    this.fetchUsers();
  },
  components: {
    TableHeader,
    UsersListProfile,
  },
  watch: {
    fullPath() {
      this.fetchUsers();
    },
  },
  mixins: [
    fullPathResolution,
  ],
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
