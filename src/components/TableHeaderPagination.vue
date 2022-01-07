<template>
  <nav aria-label="Posts pages navigation">
    <ul class="pagination">
      <li class="page-item" :class="isFirst ? 'disabled' : ''">
        <a class="page-link" href="#" @click.prevent="toFirstPage">
          <i class="bi bi-chevron-double-left"></i>
        </a>
      </li>
      <li class="page-item" :class="isFirst ? 'disabled' : ''">
        <a class="page-link" href="#" @click.prevent="toPreviousPage">
          <i class="bi bi-chevron-left"></i>
        </a>
      </li>

      <li v-for="page in pages"
          :key="page"
          class="page-item"
          :class="page == selectedPage ? 'active' : ''">
        <a class="page-link" href="#" @click.prevent="toPage(page)">
          {{ page }}
        </a>
      </li>

      <li class="page-item" :class="isLast ? 'disabled' : ''">
        <a class="page-link" href="#" @click="toNextPage">
          <i class="bi bi-chevron-right"></i>
        </a>
      </li>
      <li class="page-item" :class="isLast ? 'disabled' : ''">
        <a class="page-link" href="#" @click="toLastPage">
          <i class="bi bi-chevron-double-right"></i>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      selectedPage: this.currentPage,
    };
  },
  props: {
    maxVisiblePages: {
      type: Number,
      required: false,
      default: 3,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    isFirst() {
      return this.selectedPage === 1;
    },
    isLast() {
      if (this.totalPages === 0) {
        return true;
      }
      return this.selectedPage === this.totalPages;
    },
    startPage() {
      // When on the first page
      if (this.selectedPage === 1) {
        return 1;
      }
      // When on the last page
      if (this.totalPages < this.maxVisiblePages) {
        return 1;
      }
      if (this.selectedPage === this.totalPages) {
        return this.totalPages - this.maxVisiblePages + 1;
      }
      // When in between
      if ((this.selectedPage - Math.floor(this.maxVisiblePages / 2)) < 1) {
        return 1;
      }
      return this.selectedPage - Math.floor(this.maxVisiblePages / 2);
    },
    endPage() {
      if (this.totalPages === 0) {
        return 1;
      }
      if (this.totalPages < this.maxVisiblePages) {
        return this.totalPages;
      }
      return Math.min(this.startPage + this.maxVisiblePages - 1, this.totalPages);
    },
    pages() {
      const range = [];
      for (let i = this.startPage; i <= this.endPage; i += 1) {
        range.push(i);
      }
      return range;
    },
  },
  methods: {
    changeParams() {
      this.$router.push();
    },
    toFirstPage() {
      this.selectedPage = 1;
    },
    toPreviousPage() {
      this.selectedPage -= 1;
    },
    toPage(page) {
      if (page !== this.selectedPage) {
        this.selectedPage = page;
      }
    },
    toNextPage() {
      this.selectedPage += 1;
    },
    toLastPage() {
      this.selectedPage = this.totalPages;
    },
  },
  watch: {
    selectedPage(to) {
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          page: to,
        },
      });
    },
  },
};
</script>
