<template>
  <div class="wraper p-1">
    <vue-cropper
        v-if="url"
        ref="cropper"
        :src="url"
        @ready="updateCroppedImage"
        @cropend="updateCroppedImage"
        alt="Source Image"
        :aspectRatio=1
        :movable=false
        :scalable=false
        :zoomable=false></vue-cropper>
    <div v-else class="centered text-center">
      <h1><i class="bi bi-easel-fill"></i></h1>
      <p>Here you can crop image after file chose</p>
    </div>
  </div>
</template>

<script>
import VueCropper from 'vue-cropperjs';

export default {
  props: {
    url: {
      type: String,
      required: true,
    },
  },
  components: {
    VueCropper,
  },
  methods: {
    updateCroppedImage() {
      const canvas = this.$refs.cropper.getCroppedCanvas();
      this.$emit('update-cropped-canvas', canvas);
    },
  },
};
</script>

<style lang="scss">
  @import 'cropperjs/dist/cropper';

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
