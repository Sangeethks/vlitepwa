<template>
  <div class="vlt-pbc-player" id="vlt-pbc-player">
    <div class="container">
      <div class="row">
        <div id="vlite-player"></div>
      </div>
    </div>

    <transition name="popup-animate">
      <MCQ v-show="showMCQ"></MCQ>
    </transition>
  </div>
</template>

<script>
import firebase from 'firebase';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { vLivePlayer, vLivePlaylistItem } from 'vp/vLiveWebPlayer.js';
import App from '@/mixins/App';
import Content from '@/mixins/Content';
import Utility from '@/mixins/Utility';
import { EventBus } from '@/main';
const MCQ = () => import(/* webpackChunkName: "Watch-MCQ" */ '@/components/Watch/MCQ/MCQ.vue');

export default {
  name: 'WatchPlayer',
  data () {
    return {
      content: undefined,
      contentid: undefined,
      contenttype: undefined,
      playlist: undefined,
      player: undefined,
      progress: 0,
      duration: 0,
      currentPlayItem: undefined,
      // A flag to determine whether the content data is added to firebase or not.
      // Used in :
      // addContentToFire()
      // videoContentLoadedCB()
      isAddedToFire: false,
      showMCQ: false,
      hasMCQ: false
    }
  },
  computed: {
    ...mapGetters([
      'AppUser',
      'platform',
      'vendorid',
      'subscriberid'
    ])
  },
  created () {
    // console.log('[Player.vue -> created]');

    // This mutation will take the local storage data and save it to the store, with which we can access the data like AppUser, AppConfig etc..
    this.CommitUserStore();
    // Event coming from Playback.vue. Listen to this to get the content data
    EventBus.$on('renderPlayerEvent', this.renderPlayerCB);
    // Event coming from MCQ.vue. Listen to this to toggle MCQ Popup
    EventBus.$on('togglePopupMCQEvent', this.togglePopupMCQCB);
    // Event coming from MCQ.vue. Listen to this to manage MCQ Poppu Events
    EventBus.$on('popupMCQSubmitEvent', this.popupMCQSubmitCB);
    // Event coming from MCQ.vue. Listen to this to manage MCQ Poppu Events
    EventBus.$on('popupMCQSkipEvent', this.popupMCQSkipCB);
    // Event coming from MCQ.vue. Listen to this to manage MCQ Poppu Events
    EventBus.$on('nextMCQPopupEvent', this.nextMCQPopupCB);
  },
  methods: {
    ...mapMutations([
      'CommitUserStore',
      'CommitConfigStore'
    ]),
    ...mapActions([
      'actListContents'
    ]),
    renderPlayerCB (content) {
      // console.log('[Player.vue -> content]', content);

      // Set the content to the data property
      this.content = content;
      // Get the contenttype && contentid
      this.contenttype = content.contenttype;
      this.contentid = content.contentid;
      // Now fetch the playlist
      this.getPlaylist();
    },
    getPlaylist () {
      // console.log('[Player.vue -> getPlaylist -> contenttype]', this.contenttype);

      // Get the content data from the data property
      let content = this.content;

      let params;
      let seriesid;
      let contenttype = this.contenttype;
      let streamcodec = 'DASH';
      let paging = 'NO';
      switch (this.contenttype) {
        case 'SERIES':
          seriesid = content.contentid;
          params = { seriesid, streamcodec, paging };
          this.fetchPlaylist(params);
          break;
        case 'COURSE':
          seriesid = content.seriesid;
          params = { seriesid, streamcodec, contenttype, paging };
          this.fetchPlaylist(params);
          break;
        default:
          this.getContentPlaylist();
      }
    },
    getContentPlaylist () {
      this.actListContents({
        contenttype: this.contenttype,
        streamcodec: 'DASH'
      }).then(response => {
        // console.log('[Player.vue -> getContentPlaylist -> response]', response);

        // Get the current content index from the response
        let contentIndex = response.findIndex(content => content.contentid === this.contentid);

        let spliceRightResponse = response.splice(contentIndex);
        let spliceLeftResponse = response.splice(0, contentIndex);

        let playlist = [...spliceRightResponse, ...spliceLeftResponse];
        // Assign to playlist data property
        this.playlist = playlist;

        // Creating playlist using vLivePlayer instance
        let playerPlaylist = [];
        for (var i in playlist) {
          let content = playlist[i];

          playerPlaylist.push(new vLivePlaylistItem({
            contentid: content.contentid,
            title: content.title,
            source: [content.contentlink],
            description: content.description,
            poster: content.poster,
            thumbnail: content.poster
          }));
        }

        // Now create the player
        this.renderPlayer(playerPlaylist);
        // Hide the loader
        this.toggleLoader(false);
      }).catch(error => {
        // console.log('[Grid] fetchLessons error', error);

        // Hide the loader
        this.toggleLoader(false, 'Player.vue -> getContentPlaylist');
      });
    },
    fetchPlaylist (params) {
      this.actListContents(params).then(response => {
        // console.log('[Player.vue -> fetchPlaylist -> response]', response);

        // If there is no items return
        if (!(response && response.length)) return;
        // For different contenttypes
        if (this.contenttype === 'COURSE') {
          let contentIndex = response.findIndex(content => content.contentid === this.contentid);

          let spliceRightResponse = response.splice(contentIndex);
          let spliceLeftResponse = response.splice(0, contentIndex);

          let playlist = [...spliceRightResponse, ...spliceLeftResponse];
          // Assign to playlist data property
          this.playlist = playlist;
        } else {
          // Assign to playlist data property
          this.playlist = response;
        }

        // Create the playlist
        let playerPlaylist = [];
        for (var i in this.playlist) {
          let content = this.playlist[i];

          playerPlaylist.push(new vLivePlaylistItem({
            contentId: content.contentid,
            title: content.title,
            source: [content.contentlink],
            description: content.description,
            poster: content.poster,
            thumbnail: content.poster
          }));
        }

        // console.log('[Player.vue -> fetchPlaylist -> playerPlaylist]', playerPlaylist);

        // Now create the player
        this.renderPlayer(playerPlaylist);
        // Hide the loader
        this.toggleLoader(false);
      }).catch(error => {
        // console.log('[Player getSeriesPlaylist error]', error);

        // Hide the loader
        this.toggleLoader(false);
      });
    },
    routeChangeCB () {
      // Recreate the player on route change with the new content
      this.initPlayer();
      // Update data to firebase
      this.updateDataOnFire();
    },
    initPlayer () {
      // Save the media information

      // Fetch the playlist
      this.fetchPlaylist();
    },
    getSeriesPlaylist () {
      this.actListContents({
        seriesid: this.contentid,
        streamcodec: 'DASH',
        paging: 'NO'
      }).then(response => {
        // If there is no items return
        if (!response || !response.length) return;
        // Assign to playlist data property
        this.playlist = response;
        // Create the playlist
        let playerPlaylist = [];
        for (var i in response) {
          let content = response[i];

          playerPlaylist.push(new vLivePlaylistItem({
            contentid: content.contentid,
            title: content.title,
            source: [content.contentlink],
            description: content.description,
            poster: content.poster,
            thumbnail: content.poster
          }));
        }

        // Now create the player
        this.renderPlayer(playerPlaylist);
      }).catch(error => {
        // console.log('[Player getSeriesPlaylist error]', error);
      });
    },
    renderPlayer (playlist) {
      // Check whether player instance is present or not. If yes, it means the player is already initialized.
      if (this.player) {
        this.player.playlist = playlist;
      } else {
        // Player is not initalized
        // Initialize the player
        this.player = new vLivePlayer({'container': 'vlite-player'}, playlist);
        // Now register the player events
        this.registerPlayerEvents();
      }
    },
    registerPlayerEvents () {
      // Setting up the events
      this.player.registerEvent('ready', this.videoReadyCB);
      this.player.registerEvent('playerready', this.videoPlayerReadyCB);
      this.player.registerEvent('loadstart', this.videoLoadStartCB);
      this.player.registerEvent('unloadstart', this.videoUnloadStartCB);
      this.player.registerEvent('contentplay', this.videoPlayContentCB);
      this.player.registerEvent('contentpause', this.videoPauseContentCB);
      this.player.registerEvent('contentrewind', this.videoRewindContentCB);
      this.player.registerEvent('contentforward', this.videoForwardContentCB);
      this.player.registerEvent('contentended', this.videoContentEndedCB);
      this.player.registerEvent('contentloaded', this.videoContentLoadedCB);
      this.player.registerEvent('contentprogress', this.videoContentProgressCB);
      this.player.registerEvent('contentseeking', this.videoContentSeekingCB);
      this.player.registerEvent('contentseeked', this.videoContentSeekedCB);
      this.player.registerEvent('playlistended', this.videoPlaylistEndedCB);
      this.player.registerEvent('error', this.videoErrorCB);
    },
    // Player Events
    videoReadyCB () {
      // console.log('[videoReadyCB]');
    },
    videoPlayerReadyCB () {
      // console.log('[videoPlayerReadyCB]');
    },
    videoLoadStartCB () {
      // console.log('[videoLoadStartCB]');
      this.scrollPageToTop();
    },
    videoUnloadStartCB () {
      // console.log('[videoUnloadStartCB]');

      // // Set this data property to undefined once the unload starts. This property maintins the state for the player which tells whether the new video has been loaded or not
      // this.currentPlayItem = undefined;
      // Update the firebase data
      this.updateDataOnFire();
    },
    videoPlayContentCB () {
      // console.log('[videoPlayContentCB]');

      // If user data not present, don't continue
      // Adding data to firebase requires user data. Also check for the flag isAddedToFire to determine the data is not already added.
      if (!this.AppUser || this.isAddedToFire) return;
      // Set the current playing content to currentPlayItem data property which can be used to update data to firebase when exiting the player or player ends.
      // Get the play index
      let playIndex = this.player.playHeadIndex;
      // Get the content at the index
      this.currentPlayItem = this.playlist[playIndex];

      // console.log('[videoPlayContentCB currentPlayItem]', this.currentPlayItem);

      // If content type is series, then add series data first and then add the episode data else add the content data under firebase content node. The addDataToFire() method will also handle incrementing views count for the subscriber
      this.addDataToFire();
      // Send Analytics data to vLiveWebSdk
      this.vLiveAnalyticsContentViews();
      // Process For MCQ
      this.assertHasMCQ();
    },
    videoPauseContentCB () {
      // console.log('[videoPauseContentCB]');
    },
    videoRewindContentCB () {
      // console.log('[videoRewindContentCB]');
    },
    videoForwardContentCB () {
      // console.log('[videoForwardContentCB]');
    },
    videoContentLoadedCB (data) {
      // console.log('[videoContentLoadedCB data]', data);

      /**
      * From data we will get
      * contentid, duration
      */
      // Set the duration data property
      this.duration = data.duration;
      // Change the data property state to false to notify that the content has been changed and the data is not send to firebase. This data property is set to true on addContentToFire() method when the content starts playing for first time.
      this.isAddedToFire = false;
    },
    videoContentEndedCB () {
      // console.log('[Player.vue -> videoContentEndedCB]');

      this.completeDataOnFire();
      // Determine whether to show or hide the MCQ Popup
      this.assertShowMCQ();
    },
    videoContentProgressCB (progress) {
      // console.log('[videoContentProgressCB progress]', progress);

      // Set the data property
      this.progress = progress;
    },
    videoContentSeekingCB (data) {
      // console.log('[videoContentSeekingCB data]', data);
    },
    videoContentSeekedCB (data) {
      // console.log('[videoContentSeekedCB data]', data);
    },
    videoPlaylistEndedCB () {
      // console.log('[videoPlaylistEndedCB]');
    },
    videoErrorCB (event) {
      // console.log('[videoErrorCB event]', event);
    },
    // Component methods
    addDataToFire () {
      // console.log('[Player.vue -> addDataToFire]');

      // Make this data property to true to not send the firebase data multiple times when the play event was happening
      this.isAddedToFire = true;
      // Defined in Mixin Content.js This method will increment number of views for each content play for a particular subscriber under the node `${vendorid}/subscriber/${subscriberid}/views`
      this.incrementViewsOnFire();
      // Get the episode data
      let episode = this.currentPlayItem;
      // Get episode data
      let episodeData = { duration: this.duration };

      // console.log('[Player.vue -> addDataToFire -> episode]', episode);

      // Check whether episode is part of a series or not
      if ('seriesid' in episode) {
        // This mutation will take data from AppConfig local storage and save to the store
        this.CommitConfigStore();
        // Sending Course Completion Status to vLiveWebSdk
        if (this.platform === 'MOOC') this.vLiveAnalyticsCourseCompletion();

        // Get the series
        let series = this.content;
        // Defined in Content.js Mixin. Used to add series to firebase based on platform.
        this.setSeriesOnFire(series, () => {
          // Defined in Content.js Mixin. Episode data will be added as a callback to setSeriesOnFire()
          this.setEpisodeOnFire(episode, series, episodeData);
        });
      } else {
        this.setContenOnFire(episode);
      }
    },
    // Method will be invoked from routeChangeCB() && videoUnloadStartCB()
    updateDataOnFire () {
      // console.log('[Player -> updateDataOnFire]');

      // Get the current episode
      let episode = this.currentPlayItem;

      // console.log('[Player -> updateDataOnFire -> episode]', episode);

      // If no episode data, return
      if (!episode) return;
      let duration = this.duration;
      let watchedduration = this.progress.position;

      // console.log('[Player -> updateDataOnFire -> duration]', duration);
      // console.log('[Player -> updateDataOnFire -> watchedduration]', watchedduration);

      // If no duration or watchedduration, don't continue
      if (!(duration && watchedduration)) return;

      // Defined in Mixin Content.js This method will add watching seconds for a particular subscriber under `${vendorid}/subscriber/${subscriberid}/${year}/${month}/watchingseconds`
      this.updateWatchingsecondsOnFire(watchedduration);

      // If left offset, which means, if watchedduration is less than 10, don't continue
      if (watchedduration < 10) return;
      // If right offset is less than 10, don't continue
      if ((duration - watchedduration) < 10) return;

      // Define the data to be added to firebase
      let data = { watchedduration };

      // console.log('[Player -> updateDataOnFire -> data]', data);

      // Defined in Mixin Content.js. Will update the episode data
      this.updateEpisodeOnFire(episode, data);
    },
    completeDataOnFire () {
      // console.log('[Player.vue -> completeDataOnFire]');

      // Get the current episode
      let episode = this.currentPlayItem;

      // console.log('[Player -> completeDataOnFire -> episode]', episode);

      // If no episode data, return
      if (!episode) return;

      // Get watchedduration
      let watchedduration = this.progress.position;
      // Defined in Mixin Content.js This method will add watching seconds for a particular subscriber under `${vendorid}/subscriber/${subscriberid}/${year}/${month}/watchingseconds`
      this.updateWatchingsecondsOnFire(watchedduration);

      // Define the data to be added to firebase. this.getDateTime() -> defined in Utility.js Mixin
      let data = { watchedduration: null, status: 'COMPLETED', enddate: this.getDateTime() };
      // Defined in Mixin Content.js. Will mark the episode as complete
      this.completeEpisodeOnFire(episode, data);
    },
    getPlaylistItem (index) {
      // console.log('[getPlaylistItem index]', index);
      // console.log('[getPlaylistItem playlist]', this.playlist);

      return this.playlist[index];
    },
    // vLiveWebSdk Analytics Event
    vLiveAnalyticsContentViews () {
      // If not able to get vLiveWebSdk instance, return
      if (!window.vLiveWebSdk) return;
      // Get the episode data
      let episode = this.currentPlayItem;
      // Define the Analytics data
      let data = {
        EVENT_CATEGORY: 'CONTENT',
        EVENT: 'contentview',
        ContentID: episode.contentid,
        ViewCount: 1
      }
      // Push Data to SDK
      window.vLiveWebSdk.put(data);
    },
    vLiveAnalyticsCourseCompletion () {
      // console.log('[Player.vue -> vLiveAnalyticsCourseCompletion]');

      // If not able to get vLiveWebSdk instance, return
      if (!window.vLiveWebSdk) return;

      // This mutation will take data from AppConfig local storage and save to the store
      this.CommitConfigStore();
      // This mutation will take data from AppUser local storage and save to the store
      this.CommitUserStore();

      // Both vendorid & subscriberid are mandatory. So if it is not there, don't continue
      if (!(this.vendorid && this.subscriberid)) return;

      // console.log('[Player.vue -> vLiveAnalyticsCourseCompletion -> this.content]', this.content);

      if (!this.content) return;
      // Get the series from content
      let series = this.content;

      // Before Sending analytics data, we need to check in firebase, whether the course is already added or not. If yes, we need to send the course 'COMPLETED' status, else send the course as 'INPROGRESS' state
      // let firePath = `${this.vendorid}/subscriber/${this.subscriberid}/courses/${this.level}/${series.contentid}`;
      let firePath = `${this.vendorid}/subscriber/${this.subscriberid}/series/${series.contentid}`;
      // Checking firebase
      firebase.database().ref(firePath).once('value').then(snapshot => {
        // console.log('[Player.vue -> vLiveAnalyticsCourseCompletion -> value]', snapshot.val());

        // Defining Analytics data
        let data = {
          EVENT_CATEGORY: 'CONTENT',
          EVENT: 'courseprogress',
          ContentID: series.contentid,
        }

        let seriesData = snapshot.val();
        if (seriesData) {

        } else {
          data.StartData = this.getDateTime();
          data.EndDate = null;
          data.status = 'INPROGRESS';
          data.progress = `1/${series.episodecount}`;
        }

        // Push Data to SDK
        window.vLiveWebSdk.put(data);
      });
    },
    assertHasMCQ () {
      // To get the platform data
      this.CommitConfigStore();
      if (!this.platform || this.platform !== 'MOOC') return;

      // console.log('[Player.vue -> assertHasMCQ -> currentPlayItem]', this.currentPlayItem);

      // Check if questionnaire present or not
      if (this.currentPlayItem.questionnaire === 'YES') {
        // Freeze the playback at the video end to show MCQ Popup
        this.player.freezeContinuousPlay();
        // Add flag to let know the content has MCQ Available
        return this.hasMCQ = true;
      }
      this.hasMCQ = false;
    },
    assertShowMCQ () {
      this.CommitConfigStore();
      if (!this.platform || this.platform !== 'MOOC' || !this.hasMCQ) return;

      // Show the MCQ popup if has mcq enabled for the content
      this.togglePopupMCQCB(true);
      // Emit an event to MCQ.vue to let know that the data to be fetched is for this particular content
      EventBus.$emit('popupMCQFetchEvent', this.currentPlayItem);
    },
    togglePopupMCQCB (state) {
      this.showMCQ = state;
    },
    popupMCQSubmitCB (state) {
      // console.log('[Player.vue -> popupMCQSubmitCB -> state]', state);

      this.togglePopupMCQCB(false);
      this.player.thawContinuousPlay();
    },
    popupMCQSkipCB (state) {
      // console.log('[Player.vue -> popupMCQSkipCB -> state]', state);

    },
    nextMCQPopupCB (state) {
      this.togglePopupMCQCB(false);
      this.player.thawContinuousPlay();
    },
    // Invoked in videoLoadStartCB()
    scrollPageToTop () {
      let element = document.getElementById('vlt-pbc-player');
      if (!element) return;
      // Scroll to the element
      this.$scrollTo(element, 500);
    }
  },
  components: {
    MCQ
  },
  beforeDestroy () {
    // Destroy the event from EventBus from Playback.vue
    EventBus.$off('renderPlayerEvent', this.renderPlayerCB);
    EventBus.$off('togglePopupMCQEvent', this.togglePopupMCQCB);
    EventBus.$off('popupMCQSubmitEvent', this.popupMCQSubmitCB);
    EventBus.$off('popupMCQSkipEvent', this.popupMCQSkipCB);

    // Call this method which is defined above. Usually this method will fire when the player unloads one content and before loading the next one. We can use this method to update data to firebase when the user exists from the player page. ie either going back to some other pages or refresh happens
    this.videoUnloadStartCB();
    // This method is a part of player instance with which we destroy and unload the current player when the user exit out of player page as a part of redirection or some other cases. Earlier we had the problem of player playing in the background even after exiting the player page. This method is used to solve that issue.
    this.player && this.player.unloadPlayer();
  },
  mixins: [ App, Content, Utility ]
}
</script>

<style lang="scss">
.vlt-pbc-player {
  position: relative;
}
</style>
