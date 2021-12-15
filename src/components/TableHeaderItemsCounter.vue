<template>
  <p>
    Total {{ countingItems }}:
    {{ itemsCounter }}
  </p>
</template>

<script>
export default {
  props: {
    countingItems: {
      type: String,
      required: false,
      default: 'items',
    },
    itemsCounter: {
      type: Number,
      required: true,
    },
  },
};
</script>
