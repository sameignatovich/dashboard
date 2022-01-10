<template>
  <div class="wraper">
    <div class="centered text-center">
      <div :class="{uploading}">
        <h1><i class="bi bi-arrow-repeat"></i></h1>
      </div>
      <button @click="startUploading"
              :disabled="uploading || uploaded"
              class="btn btn-sm"
              :class="[uploaded ? 'btn-success' : 'btn-primary']">
        <span v-if="uploaded">
          Uploaded!
        </span>
        <span v-else-if="!uploading">
          Upload
        </span>
        <span v-else>
          Uploading...
        </span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    uploading: {
      type: Boolean,
      required: true,
    },
    uploaded: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    startUploading() {
      this.$emit('start-uploading');
    },
  },
};
</script>

<style scoped lang="scss">
  .uploading {
    animation: linear infinite 1.5s spinny;
  }

  @keyframes spinny {
    to { transform: rotate(360deg); }
  }

  .wraper {
    position: relative;
    height: 100%;
    width: 100%;
  }

  .centered {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
</style>
