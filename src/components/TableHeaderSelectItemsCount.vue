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
      required: true,
    },
    itemsNumbers: {
      type: Array,
      required: false,
      default: () => [5, 10, 25, 50],
    },
  },
  methods: {
    changeCount(perPage) {
      this.$emit('changePerPageCount', perPage);
    },
  },
  watch: {
    count(to) {
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          count: to,
        },
      });
    },
  },
};
</script>
