<template>
  <div class="shadow-lg p-3 bg-body rounded mb-3">
    <h2>
      <span class="placeholder col-6 bg-secondary placeholder-wave rounded">
      </span>
    </h2>
      <span class="placeholder col-3 bg-secondary placeholder-wave rounded">
      </span>
    <hr>
    <div class='post-body'>
      <span v-for="index in 10" :key="index"
            class="placeholder col-12 bg-secondary placeholder-wave rounded">
      </span>
    </div>
    <hr>
    <span class="placeholder col-4 bg-secondary placeholder-wave rounded">
    </span>
  </div>
</template>

<script>
</script>
