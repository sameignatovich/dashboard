<template>
  <tr>
    <th scope="row">{{ user.id }}</th>
    <td>{{ user.name }}</td>
    <td>{{ user.username }}</td>
    <td>{{ user.email }}</td>
    <td>{{ user.phone }}</td>
    <td>
      <button @click="$emit('deleteUser')"
              class='btn bnt-sm btn-danger'>
        <i class="bi bi-x-lg"></i>
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  props: [
    'user',
  ],
};
</script>

<style scoped lang='scss'>
</style>
