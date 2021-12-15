<template>
  <div  v-for="index in 3"
        :key="index"
        class="m-1 p-1 border-start border-3 border-dark">
    <div class="comment-header">
        <img class="placeholder bg-secondary placeholder-wave rounded me-1"
             height="32" width="32" />
        <span class="placeholder col-1 bg-secondary placeholder-wave rounded me-1"></span>
      <span class="fw-light">
        <span class="placeholder col-2 bg-secondary placeholder-wave rounded" height="32"></span>
      </span>
    </div>
    <div class="comment-body fw-normal">
      <div v-for="index in 2" :key="index"
            class="placeholder col-7 bg-secondary placeholder-wave rounded">
      </div>
    </div>
  </div>
</template>

<script>
</script>
