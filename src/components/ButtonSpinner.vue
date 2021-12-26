<template>
  <button type="submit"
          class="btn"
          :class="[classNames]"
          :disabled="loading">
    <span v-if="!loading">
      {{ text }}
    </span>
    <span v-else>
      <span v-if="loading"
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"></span>
      {{ waitingText }}
    </span>
  </button>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    waitingText: {
      type: String,
      required: false,
      default: 'Loading...',
    },
    classNames: {
      type: String,
      required: false,
      default: 'btn-primary',
    },
  },
};
</script>
