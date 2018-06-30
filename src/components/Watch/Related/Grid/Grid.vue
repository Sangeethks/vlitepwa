<template>
  <div class="vlt-related-grid">
    <ContentGrid v-show="contents" :contents="contents"></ContentGrid>
    <div class="related-loader" v-show="showLoader">
      <img src="@/assets/icons/loader.svg">
    </div>
  </div>
</template>

<script>
import ContentGrid from '@/components/Slots/ContentGrid.vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { EventBus } from '@/main';
// import App from '@/mixins/App';

export default {
  name: 'WatchRelatedGrid',
  data () {
    return {
      // Value to this property will be set from renderRelatedGridEvent()
      content: undefined,
      // Used to render the grid contents. Filled after fetching data from API call
      contents: undefined,
      activeTab: undefined,
      showLoader: false
    }
  },
  components: {
    ContentGrid
  },
  created () {
    EventBus.$on('renderRelatedGridEvent', this.renderRelatedGridEvent);
  },
  methods: {
    ...mapActions([
      'actListContents'
    ]),
    renderRelatedGridEvent (tab, content) {
      // console.log('[Grid.vue -> renderRelatedGridEvent -> tab]', tab);
      // console.log('[Grid.vue -> renderRelatedGridEvent -> content]', content);

      // Show the loader
      this.showLoader = true;
      // Set the content to the data property
      this.content = content;
      // Conditioning the tab
      if (tab === 'LESSONS') {
        return this.fetchLessons();
      } else if (tab === 'RELATED') {
        return this.fetchRelated();
      }
    },
    fetchLessons () {
      // Get the content data from data property
      let content = this.content;
      // Get the contenttype
      let contenttype = content.contenttype;
      // Get the contentid for filtering the contents
      let contentid = content.contentid;
      // For getting lessons data, sereiesid is required.
      let seriesid;
      // Condition the contenttype to get the seriesid
      if (contenttype === 'COURSE') {
        seriesid = this.content.seriesid;
      } else if (contenttype === 'SERIES') {
        seriesid = this.content.contentid;
      }

      // Now fetch the contents
      this.actListContents({ seriesid }).then(response => {
        // console.log('[Grid -> fetchLessons -> response]', response);

        let contents;
        if (contenttype === 'COURSE') {
          contents = response.filter(content => content.contentid !== contentid);
        } else {
          contents = response;
        }
        // Set the contents to the data property to render the content cards
        this.contents = contents;

        // console.log('[Grid -> fetchLessons -> contents]', this.contents);

        // Hide the loader
        this.showLoader = false;
      }).catch(error => {
        // console.log('[Grid] fetchLessons error', error);
      });
    },
    fetchRelated () {
      // console.log('[Grid] fetchRelated');

      // Required parmeter = contenttype
      let contenttype = this.$route.params.type;
      let contentid = this.$route.params.id;

      // Setting this to empty initially. Otherwise previous contents
      // will still persists
      this.contents = undefined;
      this.actListContents({ contenttype }).then(response => {
        // console.log('[Grid ->  fetchLessons -> response]', response);

        // Hide the loader
        this.showLoader = false;

        // If no response comes back, or the response is empty, don't continue
        if (!response) return;

        this.contents = response.filter(item => {
          return item.contentid !== contentid;
        });
      }).catch(error => {
        // console.log('[Grid ->  fetchLessons -> error]', error);
      })
    },
    watchRouteCB () {
      this.showLoader = true;
    }
  },
  beforeDestroy() {
    EventBus.$off('renderRelatedGridEvent', this.renderRelatedGridEvent);
  }
}
</script>

<style lang="scss" scoped>
.vlt-related-grid {
  position: relative;
  .related-loader {
    position: absolute;
    text-align: center;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #fff;
    z-index: 9998;
    img {
      width: 60px;
    }
  }
}
</style>
