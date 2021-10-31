<template>
  <tr>
    <th scope="row">{{ post.id }}</th>
    <td>{{ post.userId }}</td>
    <td>{{ post.title }}</td>
    <td>
      <router-link  :to="`/posts/${post.id}`"
                    class='btn bnt-sm btn-primary'>
        <i class="bi bi-eye-fill"></i>
      </router-link>
    </td>
    <td>
      <button @click="$emit('deletePost')"
              class='btn bnt-sm btn-danger'>
        <i class="bi bi-x-lg"></i>
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  props: [
    'post',
  ],
};
</script>

<style scoped lang='scss'>
</style>
