<template>
  <div class="vlt-search">
    <HeaderDark></HeaderDark>
    <div class="search-contain">
      <div class="container">
        <ContentGrid v-if="results" :contents="results"></ContentGrid>
        <div class="no-results" v-else>
          <h4>"No Results Found"</h4>
        </div>
      </div>
    </div>
    <FooterStretched></FooterStretched>
  </div>
</template>

<script>
import HeaderDark from '@/components/Header/Dark/HeaderDark.vue';
import FooterStretched from '@/components/Footer/FooterStretched.vue'
import ContentGrid from '@/components/Slots/ContentGrid.vue'
import App from '@/mixins/App';
import { mapActions } from 'vuex';

export default {
  name: 'SearchResults',
  data () {
    return {
      results: undefined
    }
  },
  components: {
    HeaderDark,
    FooterStretched,
    ContentGrid
  },
  watch: {
    '$route' (to, from) {
      this.initSearch();
    }
  },
  mounted () {
    this.initSearch();
  },
  methods: {
    ...mapActions([
      'actListContents'
    ]),
    initSearch () {
      let query = this.$route.query.query;
      // console.log('[Search initSearch query]', query);

      this.actListContents({ query }).then(response => {
        // console.log('[Search searchInputCB response]', response);

        // Hide the loader
        this.toggleLoader(false);
        // If no items were there, result will come as null.
        if (!(response && response.length)) return this.results = null;
        // Else render the list
        this.results = response;
      }).catch(error => {
        // console.log('[Search searchInputCB error]', error);
      });
    }
  },
  mixins: [ App ]
}
</script>

<style lang="scss" scoped>
.search-contain {
  margin: 6em 0 10em;
}
.no-results {
  text-align: center;
}
</style>
