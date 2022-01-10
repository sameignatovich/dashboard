<template>
  <div class="form-wraper radius">
    <div v-if="!modelValue" class="centered text-center">
      <h1><i class="bi bi-upload"></i></h1>
      <p>Choose file</p>
    </div>
    <div v-else>
      <img :src="modelValue"
           class="img-fluid attachment-preview fill radius"
           :class="{uploading}" />
      <button v-show="!uploading"
              @click="removeAttachment"
              class="btn btn-sm btn-danger rounded-circle btn-remove">
        <i class="bi bi-x-lg"></i>
      </button>
    </div>
    <input class="attachment-input fill"
           id="formFileLg"
           type="file"
           :disabled="uploading"
           @change="setAttachment">
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    uploading: {
      type: Boolean,
      required: true,
    },
  },
  emits: [
    'update:modelValue',
  ],
  methods: {
    setAttachment(event) {
      const fileUrl = URL.createObjectURL(event.target.files[0]);
      this.$emit('update:modelValue', fileUrl);
    },
    removeAttachment() {
      this.$emit('update:modelValue', null);
    },
  },
};
</script>

<style scoped lang="scss">
  .form-wraper {
    position: relative;
    height: 100%;
    width: 100%;
    border: 2px dashed #dee2e6;

    .btn-remove {
      position: absolute;
      top: .5rem;
      right: .5rem;
      opacity: 0.7;
      z-index: 10;
    }
    .attachment-input {
      opacity: 0;
      cursor: pointer;
    }
  }

  .uploading {
    opacity: 0.7;
  }

  .radius {
    border-radius: .5rem !important;
  }

  .fill {
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    outline: none;
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
