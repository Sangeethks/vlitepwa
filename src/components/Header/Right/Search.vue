<template>
  <div class="vlt-dark vlt-header-r-sec vlt-search">
    <form @submit.prevent="searchSubmitCB">
      <div class="vlt-input-group vlt-mtrl-group input-ico">
        <input type="search" required :style="{width}" @input="searchInputCB" v-model="query">
        <span class="ico-img">
          <img src="@/assets/icons/search.svg">
        </span>
        <span class="highlight"></span>
        <span class="bar"></span>
        <label>Search</label>
      </div>
    </form>
    <div class="results" v-show="showResults">
      <div class="box">
        <ul>
          <li v-for="result in results" :key="result.contentid" @click="hideResults">
            <router-link :to="{ name: 'Watch', params: { type: result.contenttype, id: result.contentid } }">{{result.title}}</router-link>
          </li>
        </ul>
      </div>
      <p class="mock">Search for "{{query}}"</p>
    </div>
    <div class="overlay" v-show="showResults" @click="hideResults"></div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Search',
  props: {
    width: {
      type: String
    }
  },
  data () {
    return {
      query: '',
      results: undefined,
      showResults: false
    }
  },
  methods: {
    ...mapActions([
      'actListContents'
    ]),
    searchInputCB () {
      let query = this.query;
      // console.log('[Search searchInputCB query]', query);

      if (query && query.length > 2) {
        let searchData = { query };

        this.actListContents(searchData).then(response => {
          // console.log('[Search searchInputCB response]', response);

          // If no items were there, result will come as null.
          if (!(response && response.length)) return;
          // Else render the list
          this.results = response;
          // Show the result list
          this.showResults = true;
        }).catch(error => {
          // console.log('[Search searchInputCB error]', error);
        });
      } else {
        this.hideResults();
        return;
      }
    },
    searchSubmitCB () {
      // If there is no minimum characters of 3, don't continue
      if (this.query.length < 3) return;

      // console.log('[Search searchSubmitCB]');

      // Hide the results
      this.hideResults();
      // Get the query
      let query = this.query;
      this.$router.push({ name: 'Search', query: { query } });
    },
    hideResults () {
      this.showResults = false;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~sass/modules/components';

.vlt-search {
  position: relative;
  .ico-img {
    img {
      position: relative;
      width: 15px;
      top: 5px;
    }
  }
  .results {
    position: absolute;
    left: 0;
    top: 100%;
    width: 100%;
    @extend .primary-bg.inverted;
    box-shadow: 0px 0px 6px #444;
    z-index: 998;
    .box {
      max-height: 180px;
      overflow-y: auto;
      position: relative;
      ul {
        padding: 2px 5px;
        li {
          border-bottom: 1px solid $clr-grey-light;
          &:last-child {
            border: 0;
          }
          a {
            padding: 8px 0;
            display: block;
            color: $clr-white-1;
          }
        }
      }
    }
    .mock {
      text-align: center;
      font-size: 11px;
      padding: 7px 0;
    }
  }
  .overlay {
    position: fixed;
    top: 78px;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 997;
    background-color: transparent;
  }
}
</style>
