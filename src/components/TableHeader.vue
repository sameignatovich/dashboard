<template>
  <div class="row row-cols-auto justify-content-center">
    <div class="col">
      <TableHeaderPagination :total-pages="totalPages"
                             :current-page="currentPage" />
    </div>
    <div class="col">
      <TableHeaderSelectItemsCount :current-count="currentCount" />
    </div>
    <div class="col">
      <TableHeaderItemsCounter :counting-items="itemName"
                    :items-counter="totalItemsCount"
                    class="mt-2" />
    </div>
  </div>
</template>

<script>
import TableHeaderPagination from '@/components/TableHeaderPagination.vue';
import TableHeaderSelectItemsCount from '@/components/TableHeaderSelectItemsCount.vue';
import TableHeaderItemsCounter from '@/components/TableHeaderItemsCounter.vue';

export default {
  props: {
    itemName: {
      type: String,
      required: false,
      default: 'items',
    },
    totalItemsCount: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    currentCount: {
      type: Number,
      required: true,
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItemsCount / this.currentCount);
    },
  },
  components: {
    TableHeaderPagination,
    TableHeaderSelectItemsCount,
    TableHeaderItemsCounter,
  },
};
</script>
