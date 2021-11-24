<template>
  <div class="row row-cols-auto">
    <div class="col">
      <Pagination :total-pages="totalPages"
                  :current-page="currentPage"
                  @change-page="changePage" />
    </div>
    <div class="col">
      <SelectItemsCount @change-per-page-count="changePerPageCount" />
    </div>
    <div class="col">
      <ItemsCounter :counting-items="itemName"
                    :items-counter="totalItemsCount"
                    class="mt-2" />
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';
import SelectItemsCount from '@/components/SelectItemsCount.vue';
import ItemsCounter from '@/components/ItemsCounter.vue';

export default {
  props: {
    itemName: {
      type: String,
      required: false,
      default: 'items',
    },
    tableItems: {
      type: Array,
      required: true,
    },
    totalItemsCount: {
      type: Number,
      required: false,
    },
    itemsPerPage: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItemsCount / this.itemsPerPage);
    },
  },
  methods: {
    changePage(page) {
      this.$emit('changePage', page);
    },
    changePerPageCount(count) {
      this.$emit('changePerPageCount', count);
    },
  },
  components: {
    Pagination,
    SelectItemsCount,
    ItemsCounter,
  },
};
</script>

<style scoped lang="scss">
</style>
