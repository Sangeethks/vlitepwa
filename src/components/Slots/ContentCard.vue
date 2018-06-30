<template>
  <div class="content-card" v-if="content && content.contentid" ref="contentCard">
    <div class="slick-image" ref="slickImage">
      <img :src="content.poster" style="width: 100%">
    </div>
    <div class="duration" v-if="parseInt(content.duration)">
      <p>{{parseDuration(content.duration)}}</p>
    </div>
    <div class="content">
      <h6 v-if="content.title">{{content.title}}</h6>
      <div class="tags">
        <ul>
          <li class="tag-episode" v-if="content.match">Match {{content.match}}%</li>
          <li class="tag-views">{{content.numviews}} Views</li>
          <li class="tag-green" v-if="content.credits">{{content.credits}} credits</li>
          <li class="tag-views" v-if="content.lesssonCount">{{content.lesssonCount}} Lessons</li>
        </ul>
        <div class="playlist-btn" v-show="showWatchlistIco">
          <img :src="watchlistIco" @click="toggleWatchlistCB($event, content)" :id="`watchlist-ico-${content.contentid}`" :data-action="watchlistAction">
        </div>
        <div class="clearfix"></div>
      </div>
      <div class="progress" v-show="progress !== 0">
        <div class="progress-percent" :id="`progress-${content.contentid}`" :style="{width: progress + '%'}"></div>
      </div>
    </div>
    <router-link :to="getRouterPath(content)">
      <div class="play">
        <img src="@/assets/icons/play.svg" class="ico-play">
        <img src="@/assets/icons/play-hover.svg" class="ico-play-hover">
      </div>
    </router-link>
    <div class="watched" v-show="showWatched">
      <div class="watched">
        <img src="@/assets/icons/completed.svg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import Utility from '@/mixins/Utility';
import { mapGetters, mapMutations } from 'vuex';
import snackbar from 'node-snackbar';
import { EventBus } from '@/main';
import 'nm/node-snackbar/dist/snackbar.css';

export default {
  props: {
    content: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      showWatchlistIco: false,
      watchlistIco: null,
      watchlistAction: null,
      progress: 0,
      showWatched: false,
      addIco: require('@/assets/icons/add.svg'),
      removeIco: require('@/assets/icons/remove.svg')
    }
  },
  computed: {
    ...mapGetters([
      'vendorid',
      'subscriberid',
    ])
  },
  created () {
    EventBus.$on('AppUserChangeEvent', this.AppUserChangeCB);
  },
  mounted () {
    this.renderCardAspect();
  },
  methods: {
    ...mapMutations([
      'CommitUserStore',
      'CommitVendorStore'
    ]),
    initFireData () {
      // console.log('[ContentCard initFireData subscriberid]', this.subscriberid);

      // If Userdata is not there, don't fetch anything from firebase. As fetching from firebase requires subscriberid
      if (!this.subscriberid) return;
      // User data exists, so show the watchlist ico
      this.showWatchlistIco = true;
      // Get the contentid of each content to fetch the specific information from firebase
      let contentid = this.content.contentid;

      // Get the watchlist data
      this.getFireWatchlist(contentid);
      // Get the progress data
      this.getFireProgress(contentid);
    },
    getFireWatchlist (contentid) {
      // Create the firebase paths to fetch the data
      let path = `${this.vendorid}/subscriber/${this.subscriberid}/watchlist/${contentid}`;

      firebase.database().ref(path).on('value', snapshot => {
        // Get the value
        let value = snapshot.val();
        // Get the watchlist button element
        let watchlistBtn = document.getElementById(`watchlist-ico-${contentid}`);
        // If element doesnot exists, there is no point of coninuing. So exit out.
        if (!watchlistBtn) return;
        // If value is null, which means the item is not in the watchlist. So make the button image as add to watchlist.
        if (value === null) {
          this.watchlistIco = this.addIco;
          this.watchlistAction = 'add';
        } else {
          this.watchlistIco = this.removeIco;
          this.watchlistAction = 'remove';
        }
      });
    },
    // Get the progress data
    getFireProgress (contentid) {
      // Create the firebase paths to fetch the data
      let path = `${this.vendorid}/subscriber/${this.subscriberid}/content/${contentid}`;

      firebase.database().ref(path).on('value', snapshot => {
        // Get the value
        let value = snapshot.val();
        // If no value, return
        if (!value) return;
        // Get the watchedduration and duration to calculate the progress
        let duration = value.duration ? value.duration : false;
        let watchedduration = value.watchedduration ? value.watchedduration : false;
        // If either duration or watchedduration doesnot exists, return
        if (!duration || !watchedduration) return;
        // Calculate progress
        let progress = (watchedduration / duration) * 100;
        // If progress is 100% set the data attribute showWatched to true, to show the icon
        this.showWatched = progress >= 100 ? true : false;
        // Finally assign the data property to render progress
        this.progress = progress;
      });
    },
    getRouterPath (content) {
      return { name: 'Watch', params: { type: content.contenttype, id: content.contentid } }
    },
    toggleWatchlistCB (event, content) {
      // console.log('[ContentCard toggleWatchlistCB]');

      // Get the action on the element. Based on this action, we will determine whether to add or remove the item from watchlist
      let action = event.target.getAttribute('data-action');
      // Deviate tthe conditions
      if (action === 'add') {
        this.addToWatchlistCB(content);
      } else {
        this.removeFromWatchlistCB(content);
      }
    },
    addToWatchlistCB (content) {
      let path = `${this.vendorid}/subscriber/${this.subscriberid}/watchlist/${content.contentid}`;

      let data = {
        category: content.category,
        contentid: content.contentid,
        contenttitle: content.title,
        contenttype: content.contenttype,
        duration: content.duration,
        poster: content.poster,
        subscriberid,
        tags: content.tags,
        timestamp: new Date().getTime(),
      }
      // Set the data
      firebase.database().ref(path).set(data);

      // Show Added to watchlist snackbar
      snackbar.show({ text: 'Added to watchlist', pos: 'bottom-center', showAction: true });
    },
    removeFromWatchlistCB (content) {
      let path = `${this.vendorid}/subscriber/${this.subscriberid}/watchlist/${content.contentid}`;
      // Set the data to null which will delete the node
      firebase.database().ref(path).set(null);

      // Show Added to watchlist snackbar
      snackbar.show({ text: 'Removed form watchlist', pos: 'bottom-center', showAction: true });
    },
    renderCardAspect () {
      let card = this.$refs.contentCard;
      card.style.height = Math.round(card.offsetWidth / (16/9)) + 'px';
    },
    AppUserChangeCB () {
      // Now commit the data from local storage to store. We need to make the commit here. If we do it in any other methods, it will fire multiple times which we don't want to do. It will cause performance issue.
      this.CommitUserStore();
      this.CommitVendorStore();
      // Now fetch data from firebase
      this.initFireData();
    }
  },
  mixins: [ Utility ]
}
</script>

<style lang="scss" scoped>
</style>
