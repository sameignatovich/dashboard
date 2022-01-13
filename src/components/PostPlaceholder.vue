<template>
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
  <span v-for="index in 5" :key="index"
        class="placeholder col-1 bg-secondary placeholder-wave rounded me-1">
  </span>
</template>

<script>
</script>
