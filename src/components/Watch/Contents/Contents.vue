<template>
  <div class="container">
    <div class="row">
      <div class="vlt-pbc-contents" v-if="content">
        <div class="cnt-tab">
          <ul v-once>
            <li v-for="(tab, i) in tabs" @click="renderContents(tab.name)" v-show="true" :class="isClassActive(tab.name)">{{tab.name}} <span v-if="tab.count">({{tab.count}})</span></li>

            <!-- <li @click="renderContents('LESSONS')" v-show="isShowTab('LESSONS')" :class="isClassActive('LESSONS')">Lessons(24)</li>
            <li @click="renderContents('RELATED')" v-show="isShowTab('RELATED')" :class="isClassActive('RELATED')">Related</li> -->
          </ul>
        </div>

        <ContentGrid :contents="contents"></ContentGrid>
      </div>
    </div>
  </div>
</template>

<script>
// The grid data json
// import GridContents from './grid-contents.json'
// Component
import ContentGrid from '@/components/Slots/ContentGrid.vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'PlaybackContents',
  props: {
    content: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      activeTab: undefined,
      contents: undefined,
      tabs: [{
        name: 'Lessons',
        count: 24
      }, {
        name: 'Related',
        count: 0
      }]
    }
  },
  components: {
    ContentGrid
  },
  watch: {
    content () {
      this.initContents();
    }
  },
  created () {
    // console.log('[Watch Contents] created');
    this.initContents();
  },
  mounted () {
    // console.log('[Watch Contents] mounted');
  },
  methods: {
    ...mapActions([
      'actListContents'
    ]),
    initContents () {
      // console.log('[Watch Contents] initContents');

      if (!this.content) return;

      let contenttype = this.content.contenttype;
      let contentid = this.content.contentid;

      // console.log('[Watch Contents] initContents contenttype', contenttype);
      // console.log('[Watch Contents] initContents contentid', contentid);

      this.actListContents({ contenttype }).then(response => {
        // console.log('[Watch Contents] initContents response', response);

        let contents = response.filter(content => {
          return content.contentid !== contentid
        });
        // console.log('[Watch Contents] initContents contents', contents);

        // Assign to data property which will eventually pass to the ContentGrid component
        this.contents = contents;
      }).catch(error => {
        // console.log('[Watch Contents] initContents error', error);
      })
    },
    renderContents (tab) {
      // console.log('[Watch Contents] renderContents tab', tab);
    },
    isShowTab (tab) {
      if (!this.content) return;
      // console.log('[Watch Contents] isShowTab');

      tab = tab.toUpperCase();

      // console.log('[Watch Contents] isShowTab tab', tab);

      let contenttype = this.content.contenttype;
      let contentid = this.content.contentid;

      if (tab === 'LESSONS') {
        if (contenttype === 'SERIES') {
          this.activeTab = 'LESSONS';
          return true;
        }
        this.activeTab = 'RELATED';
        return false;
      }

      if (tab === 'RELATED') {
        this.activeTab = 'RELATED';
        return true;
      }
    },
    isClassActive (tab) {
      // console.log('[Watch Contents] isClassActive tab', tab);
      // console.log('[Watch Contents] isClassActive activeTab', this.activeTab);
      return tab == this.activeTab ? 'active' : '';
    }
  }
}
</script>

<style lang="scss">
@import '~sass/modules/variables';
@import '~sass/modules/content-card';

.vlt-pbc-contents {
  margin: 20px 70px 200px;
}

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
      color: $clr-border-grey;
      cursor: pointer;
      &.active {
        color: $clr-grey-dark;
        border-color: $clr-grey-dark;
      }
    }
  }
}

// Content card

</style>
