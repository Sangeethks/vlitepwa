<template>
  <div class="container">
    <div class="row">
      <div class="vlt-pbc-details" v-if="content">
        <div class="head">
          <h3 v-if="content.title">{{content.title}}</h3>
        </div>
        <div class="misc">
          <div class="left">
            <div class="tags" v-if="content.tags && content.tags.length">
              <ul class="vlt-tags dark">
                <li v-for="(tag, i) in tags" :key="i">
                  <router-link :to="{ name: 'Tags', params: { type: tag.type, name: tag.name } }" class="tag-link">
                    {{tag.name}}
                  </router-link>
                </li>
              </ul>
            </div>
            <p class="cmpl-date" v-if="enddate">You completed this course on {{enddate}}</p>
            <p class="descr" v-if="content.description">{{content.description}}</p>
          </div>
          <div class="right">
            <div class="misc-r-btns">
              <button type="button" class="vlt-btn-ico dark" v-show="showWatchlistIco">
                <img :src="watchlistIco" @click="toggleWatchlistCB($event, content)" :id="`watchlist-ico-${content.contentid}`" :data-action="watchlistAction">
              </button>
              <!-- Share component -->
              <Share class="misc-share" :content="content"></Share>
            </div>

            <p>{{content.credits}} Credits</p>
            <p>{{content.numviews}} Views</p>
          </div>
          <div class="clearfix"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Share from '@/components/Slots/Share.vue';
import firebase from 'firebase';
import { mapGetters, mapMutations } from 'vuex';
import Content from '@/mixins/Content';
import { EventBus } from '@/main';

export default {
  name: 'WatchDetails',
  data () {
    return {
      content: undefined,
      watchlistIco: null,
      watchlistAction: null,
      showWatchlistIco: false,
      contentid: undefined,
      contenttype: undefined,
      enddate: undefined,
      tags: undefined,
      addToWatchlistIco: require('@/assets/icons/playlist-add.svg'),
      removeFromWatchlistIco: require('@/assets/icons/playlist-added.svg')
    }
  },
  computed: {
    ...mapGetters([
      'vendorid',
      'subscriberid',
      'platform',
      'level'
    ])
  },
  components: {
    Share
  },
  created () {
    EventBus.$on('renderDetailsEvent', this.renderDetailsCB);
  },
  methods: {
    ...mapMutations([
      'CommitConfigStore',
      'CommitUserStore'
    ]),
    listenToFirebase () {
      // console.log('[Details.vue -> listenToFirebase]');

      if (!this.content) return;
      let contenttype = this.content.contenttype;
      let contentid = this.content.contentid;

      this.CommitConfigStore();
      if (!this.vendorid) return;

      this.CommitUserStore();

      let FIREPATH = `${this.vendorid}/subscriber/${this.subscriberid}`;
      if (this.platform === 'MOOC') {
        FIREPATH += `/courses/${this.level}/${contentid}`;
      } else if (this.platform === 'LITE') {

      }
      firebase.database().ref(FIREPATH).child('status').on('value', (snapshot) => {
        // Get the status
        let status = snapshot.val();
        // Check if status is completed or not
        if (status === 'COMPLETED') {
          firebase.database().ref(FIREPATH).child('enddate').on('value', snapshot => {
            if (snapshot.val()) this.enddate = snapshot.val();
          });
        }
      });
    },
    renderDetailsCB (content) {
      // console.log('[Details.vue -> renderDetailsCB]');
      // console.log('[Details.vue -> renderDetailsCB -> content]', content);

      // If no content data, return
      if (!content) return;
      // Set the content to the data property
      this.content = content;
      // Push tags from content to tag data property
      this.tags = [];
      // Get the tag property from content
      let contentTags = this.content.tags;
      for (var i in contentTags) {
        this.tags.push({ name: contentTags[i], type: 'tag' });
      }
      // Push year to tags from content
      if (this.content.year) this.tags.push({ name: this.content.year, type: 'year' });

      // console.log('[Details.vue -> renderDetailsCB -> tags]', this.tags);

      // Fetch the watchlist state from firebase.
      this.fetchWatchlistState();
      // Listens to firebase
      this.listenToFirebase();
    },
    fetchWatchlistState () {
      // Takes data from local storage and save to store
      this.CommitUserStore();
      // If no Subscriber data, return.
      if (!this.subscriberid) return;
      // Show the watchlist button if user exists
      this.showWatchlistIco = true;

      // console.log('[Details.vue -> fetchWatchlistState -> content]', this.content);

      let path = `${this.vendorid}/subscriber/${this.subscriberid}/watchlist/`;
      // Condition the contenttype
      if (this.content.contenttype === 'SERIES') {
        path += `${this.level}/${this.content.contentid}`
      }

      firebase.database().ref(path).on('value', snapshot => {
        let state = snapshot.val();

        if (state) {
          this.watchlistIco = this.removeFromWatchlistIco;
          this.watchlistAction = 'remove';
        } else {
          this.watchlistIco = this.addToWatchlistIco;
          this.watchlistAction = 'add';
        }
      });
    },
    toggleWatchlistCB (event, content) {
      // console.log('[Details toggleWatchlistCB target ]', event.target.getAttribute('data-action'));

      let action = event.target.getAttribute('data-action');
      if (action === 'add') {
        // Defined in Content.js Mixin
        this.addToFireWatchlist(content);
      } else {
        // Defined in Content.js Mixin
        this.removeFromFireWatchlist(content);
      }
    }
  },
  beforeDestroy () {
    EventBus.$off('renderDetailsEvent', this.renderDetailsCB);
  },
  mixins: [ Content ]
}
</script>

<style lang="scss" scoped>
@import '~sass/modules/components';

.vlt-pbc-details {
  margin: 20px 0;
  .head {
    margin-bottom: 30px;
    h3 {
      text-transform: uppercase;
      font-weight: 600;
    }
  }

  .misc {
    .left, .right {
      float: left;
    }
    .left {
      width: 70%;
      .tags {
        margin-bottom: 20px;
      }
      .cmpl-date {
        color: $clr-grey-light;
      }
      .descr {
        margin-top: 10px;
      }
    }
    .right {
      width: 30%;
      text-align: right;
      .misc-r-btns {
        margin-bottom: 10px;
        .misc-share {
          display: inline-block;
          margin-left: 15px;
        }
        button {
          margin-left: 15px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
