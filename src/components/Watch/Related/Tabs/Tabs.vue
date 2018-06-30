<template>
  <div class="cnt-tab" v-if="tabs">
    <ul>
      <li v-for="(tab, i) in tabs" :key="i" @click="tabClickCB(tab.name.toUpperCase())" :class="isClassActive(tab.name)">{{tab.name}} <span v-if="false">({{tab.count}})</span></li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { EventBus } from '@/main';

export default {
  name: 'WatchRelatedTabs',
  data () {
    return {
      tabs: undefined,
      content: undefined,
      tabsArray: [{
        name: 'Lessons',
        count: 0
      }, {
        name: 'Related',
        count: false
      }],
      activeTab: 'RELATED'
    }
  },
  created () {
    EventBus.$on('renderRelatedEvent', this.renderPlaybackRelatedCB);
  },
  methods: {
    renderPlaybackRelatedCB (content) {
      // console.log('[Tabs.vue -> renderPlaybackRelatedCB]', content);

      // Firstly initialize the tabs data property to null
      this.tabs = null;

      // If no content data, dont continue
      if (!content) return;
      // Set the content to data property
      this.content = content;
      // Get content meta data
      let contenttype = content.contenttype;
      let contentid = content.contentid;

      if (contenttype === 'SERIES') {
        // Mutate the tabsArray data property
        let tabs = [...this.tabsArray];
        // Get the lessons tab object
        let lessonsTab = tabs[0];
        // Set the count of number of lessons
        lessonsTab.count = content.episodecount;
        // Finally set the tabs to the data property
        this.tabs = tabs;
        // Then set the active tab
        this.activeTab = 'LESSONS';
      } else if (contenttype === 'COURSE') {
        // Mutate the tabsArray data property
        let tabs = [...this.tabsArray];
        // For contenttype 'COURSE', don't need to show the related tab. So get rid of it.
        tabs = tabs.filter(tab => tab.name !== 'Related');
        // Finally set the tabs to the data property
        this.tabs = tabs;
        // Then set the active tab
        this.activeTab = 'LESSONS';
      }

      this.fetchRelated();
    },
    tabClickCB (tab) {
      this.activeTab = tab;
      // Fetch the contents
      this.fetchRelated();
    },
    fetchRelated () {
      // Inorder to fetch the lessons or episodes or related contents, we need to pass the active tab name and the content to the Grid.vue component through an event bus
      // Convert the tab to uppercase
      let tab = this.activeTab.toUpperCase();
      // Emit an event, which will be used in Grid.vue to render Related grid contents
      EventBus.$emit('renderRelatedGridEvent', tab, this.content);
    },
    isClassActive(tab) {
      // console.log('[Watch Tabs] isClassActive tab', tab);

      // Tab string value will come in lowercase. So convert it into
      // uppercase to match with any value
      return tab.toUpperCase() === this.activeTab ? 'active' : '';
    }
  },
  beforeDestroy () {
    EventBus.$off('renderRelatedEvent', this.renderPlaybackRelatedCB);
  }
}
</script>

<style lang="scss" scoped>
@import '~sass/modules/variables';

$br-thick: 2px;
.cnt-tab {
  border-bottom: $br-thick solid $clr-border-grey;
  margin-bottom: 30px;
  ul {
    position: relative;
    top: $br-thick;
    li {
      display: inline-block;
      padding: 15px;
      border-bottom: $br-thick solid transparent;
      color: $clr-grey-light;
      cursor: pointer;
      &.active {
        color: $clr-grey-dark;
        border-color: $clr-grey-dark;
      }
    }
  }
}
</style>
