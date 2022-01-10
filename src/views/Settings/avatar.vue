<template>
  <h1 class="text-center">
    Change avatar
  </h1>
  <div class="row text-secondary">
    <div class="col-md-5">
      <rounded-block>
        <file-input v-model="url" :uploading="uploading" />
      </rounded-block>
    </div>
    <div class="col-md-2 actions">
      <actions-block v-show="attachmentReady"
                     :uploading="uploading"
                     :uploaded="uploaded"
                     @start-uploading="uploadAvatar" />
    </div>
    <div class="col-md-5">
      <rounded-block>
        <file-preview :url='url'
                      @update-cropped-canvas="updateCroppedCanvas" />
      </rounded-block>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import RoundedBlock from '@/components/Settings/Avatar/RoundedBlock.vue';
import FileInput from '@/components/Settings/Avatar/FileInput.vue';
import FilePreview from '@/components/Settings/Avatar/FilePreview.vue';
import ActionsBlock from '@/components/Settings/Avatar/ActionsBlock.vue';

export default {
  data() {
    return {
      url: '',
      croppedCanvas: null,
      uploading: false,
      uploaded: false,
    };
  },
  computed: {
    attachmentReady() {
      return !!this.url;
    },
  },
  methods: {
    previewAvatar(event) {
      const file = event.target.files[0];
      this.url = URL.createObjectURL(file);
    },
    updateCroppedCanvas(canvas) {
      this.croppedCanvas = canvas;
      this.uploaded = false;
    },
    uploadAvatar() {
      this.croppedCanvas.toBlob((blob) => {
        const formData = new FormData();
        formData.append('user[avatar]', blob);

        this.uploading = true;

        this.updateAvatar(formData)
          .then(() => {
            this.uploaded = true;
            this.$toast.success('Avatar successfully updated!');
          })
          .catch(() => {
            this.$toast.error('Error during avatar updating!');
          })
          .then(() => {
            this.uploading = false;
          });
      }, 'image/png');
    },
    ...mapActions({
      updateAvatar: 'user/updateAvatar',
    }),
  },
  beforeMount() {
    this.$title('Change avatar');
  },
  components: {
    RoundedBlock,
    FileInput,
    FilePreview,
    ActionsBlock,
  },
};
</script>

<style scoped lang="scss">
  .actions {
    margin: 1rem auto 1rem;
  }
</style>
