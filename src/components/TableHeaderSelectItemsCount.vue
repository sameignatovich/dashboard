<template>
  <select v-model="count"
          @change="changeCount($event.target.value)"
          class="form-select"
          aria-label=".form-select-sm">
    <option disabled>Select per-page count</option>
    <option v-for="number in itemsNumbers" :key='number'>
      {{ number }}
    </option>
  </select>
</template>

<script>
export default {
  data() {
    return {
      count: this.currentCount,
    };
  },
  props: {
    currentCount: {
      type: Number,
      required: false,
      default: 10,
    },
    itemsNumbers: {
      type: Array,
      required: false,
      default: () => [5, 10, 25, 50, 100],
    },
  },
  methods: {
    changeCount(perPage) {
      this.$emit('changePerPageCount', perPage);
    },
  },
};
</script>

<style scoped lang="scss">
</style>
