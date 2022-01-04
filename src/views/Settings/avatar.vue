<template>
  <h1 class="text-center">
    Change avatar
  </h1>
  <div class='mb-1 row'>
    <div class="col-md-6">
      <input  @change="previewAvatar"
              type='file'
              class=''
              id='avatar-button'
              accept='image/png, image/jpeg' />
      <label for="avatar-button" class='btn btn-info'>
          <i class="bi bi-card-image"></i>
          Choose image
      </label>
    </div>
    <div class="col-md-6">
      <vue-cropper
        v-if="url"
        ref="cropper"
        :src="url"
        alt="Source Image"
        :aspectRatio=1
        :movable=false
        :scalable=false
        :zoomable=false
      >
      </vue-cropper>
    </div>
    <button v-if="url"
            @click="uploadAvatar"
            class='mt-2 btn btn-primary' >
      <i class="bi bi-upload"></i>
      Save Avatar
    </button>
  </div>
</template>

<script>
import VueCropper from 'vue-cropperjs';

export default {
  data() {
    return {
      url: null,
    };
  },
  methods: {
    previewAvatar(event) {
      const file = event.target.files[0];
      this.url = URL.createObjectURL(file);
    },
    uploadAvatar() {
      this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {
        const formData = new FormData();
        formData.append('user[avatar]', blob);

        this.$store.dispatch('user/updateAvatar', formData)
          .then(() => {
            this.$toast.success('Avatar successfully updated!');
          })
          .catch(() => {
            this.$toast.error('Error during avatar updating!');
          });
      }, 'image/png');
    },
  },
  beforeMount() {
    this.$title('Change avatar');
  },
  components: {
    VueCropper,
  },
};
</script>

<style lang="scss">
  @import 'cropperjs/dist/cropper';

  #avatar-button {
    width: .1px;
    height: .1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }
</style>
