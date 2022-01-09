<template>
  <h1 class="text-center">
    Account activity
  </h1>

  <div class="form-check mb-2 ms-2">
    <input v-model="filterActive"
           class="form-check-input"
           type="checkbox"
           id="flexCheck">
    <label class="form-check-label" for="flexCheck">
      Only active
    </label>
  </div>

  <div class="accordion" id="tokens-an">
    <div v-for="token in tokensList"
         :key="token.id"
         class="accordion-item">
      <h2 class="accordion-header" :id="`tn-${token.id}`">
        <button class="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                :data-bs-target="`#co-${token.id}`"
                aria-expanded="true"
                :aria-controls="`#co-${token.id}`">
          <span v-if="token.active">
            <i class="bi bi-check-circle-fill me-1 active-status"></i>
            <span class="me-1">Last activity: </span>
          </span>
          <span v-else>
            <i class="bi bi-stop-circle-fill me-1 inactive-status"></i>
            <span class="me-1">Inactive from: </span>
          </span>
            {{ $formatdate(token.updated_at) }}
          <span v-if="token.id == currentTokenId" class="ms-1">
            <b>(Current session)</b>
          </span>
        </button>
      </h2>
      <div :id="`co-${token.id}`"
           class="accordion-collapse collapse"
           :aria-labelledby="`tn-${token.id}`">
        <div class="accordion-body">
          <div class="row">
            <div class="col-lg-6">
              <b>OS: </b>
              {{ token.os }}
            </div>
            <div class="col-lg-6">
              <b>Device: </b>
              {{ token.device }}
            </div>
            <div class="col-lg-6">
              <b>Browser name: </b>
              {{ token.browser }}
            </div>
            <div class="col-lg-6">
              <b>Browser version: </b>
              {{ token.browser_version }}
            </div>
            <hr class="mt-3" />
            <div class="col-lg-4">
              <b>Signed in: </b>
              {{ $formatdate(token.created_at) }}
            </div>
            <div class="col-lg-4">
              <b>IP: </b>
              {{ token.ip }}
            </div>
            <div v-if="token.active && token.id != currentTokenId"
                 class="col-lg-4 text-end">
              <button @click="setTokenInactive(token.id)"
                      class="btn btn-sm btn-danger">
                End this session
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      filterActive: true,
      tokens: [],
    };
  },
  computed: {
    ...mapGetters({
      currentTokenId: 'user/tokenId',
    }),
    activeTokens() {
      return this.tokens.filter((element) => element.active);
    },
    tokensList() {
      if (this.filterActive) {
        return this.activeTokens;
      }
      return this.tokens;
    },
  },
  beforeMount() {
    this.$title('Account activity');
    this.fetchTokens();
  },
  methods: {
    fetchTokens() {
      this.$http.get('/tokens')
        .then((response) => {
          this.tokens = response.data.tokens;
        })
        .catch(() => {
          this.$toast.error('Error on sessions loading!');
        });
    },
    setTokenInactive(tokenId) {
      this.$http.delete(`/tokens/${tokenId}`)
        .then(() => {
          this.$toast.success('Session ended!');
          this.fetchTokens();
        })
        .catch(() => {
          this.$toast.error('Error on session ending!');
        });
    },
  },
};
</script>

<style scoped lang="scss">
  .active-status {
    color: green;
  }
  .inactive-status {
    color: gray;
  }
</style>
