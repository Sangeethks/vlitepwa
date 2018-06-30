import firebase from 'firebase';
import Utility from '@/mixins/Utility';
import { mapGetters, mapMutations } from 'vuex';
import snackbar from 'node-snackbar';

const Content = {
  computed: {
    ...mapGetters([
      'vendorid',
      'subscriberid',
      'platform',
      'level',
      'AppVendor',
      'level'
    ])
  },
  methods: {
    ...mapMutations([
      'CommitConfigStore',
      'CommitUserStore'
    ]),
    setSeriesOnFire (series, callback = null) {
      // console.log('[Mixin Content.js -> setSeriesOnFire -> series]', series);

      if (callback) callback();

      // This mutation will take data from AppConfig local storage and save to the store
      this.CommitConfigStore();
      // This mutation will take data from AppUser local storage and save to the store
      this.CommitUserStore();

      // Both vendorid & subscriberid are mandatory. So if it is not there, don't continue
      if (!(this.vendorid && this.subscriberid)) return;
      // Condition using platform
      let path = `${this.vendorid}/subscriber/${this.subscriberid}/`;
      let contentid = series.contentid;

      if (this.platform === 'MOOC') {
        // Append the path
        path += `courses/${this.level}/${contentid}`;
      } else {
        // Append the path
        path += `series/${contentid}`;
      }

      // console.log('[setSeriesOnFire -> path]', path);

      // Check whether data is already added or not
      this.checkFireDataExists(path).then(state => {
        // console.log('[setSeriesOnFire -> checkFireDataExists -> state]', state);

        // State true means the data is already added, so no need to add it again
        if (state) {
          if (callback) return callback();
        }

        // If not already added, add it
        let data = {
          category: series.category ? series.category : '',
          contentstatus: 'ACTIVE',
          contenttitle: series.title ? series.title : '',
          contenttype: series.contenttype ? series.contenttype : '',
          episodecount: series.episodecount ? series.episodecount : '',
          poster: series.poster ? series.poster : '',
          tags: series.tags ? series.tags : '',
          startdate: this.getDateTime(),
          status: 'INPROGRESS',
          subscriberid: this.subscriberid
        };

        // console.log('[setSeriesOnFire -> data]', data);

        // Now save to firebase
        firebase.database().ref(path).set(data).then(() => {
          if (callback) callback();
        });
      });
    },
    setEpisodeOnFire (episode, series, episodeData = null) {
      // This mutation will take data from AppConfig local storage and save to the store
      this.CommitConfigStore();
      // This mutation will take data from AppUser local storage and save to the store
      this.CommitUserStore();

      // Both vendorid & subscriberid are mandatory. So if it is not there, don't continue
      if (!(this.vendorid && this.subscriberid)) return;
      // Episode data is store under series node.
      // Get the series id
      let seriesid = series.contentid;
      // Get episode id
      let episodeid = episode.contentid;
      // Creating the firebase path
      let path = `${this.vendorid}/subscriber/${this.subscriberid}/`;
      let contentid = series.contentid;

      if (this.platform === 'MOOC') {
        // Define the path
        path += `courses/${this.level}/${seriesid}/lesson/${episodeid}`;
      } else {
        // Define the path
        path += `series/${seriesid}/episode/${episodeid}`;
      }

      // console.log('[setEpisodeOnFire -> path]', path);

      // Check whether data is already added or not
      this.checkFireDataExists(path).then(state => {
        // console.log('[setEpisodeOnFire -> checkFireDataExists -> state]', state);

        // State true means the data is already added, so no need to add it again
        if (state) return;

        // If not added, add it
        let data = {
          category: episode.category ? episode.category : null,
          contentstatus: 'ACTIVE',
          contenttitle: episode.title ? episode.title : null,
          contenttype: episode.contenttype ? episode.contenttype : null,
          episodenum: episode.episodenum ? episode.episodenum : null,
          poster: episode.poster ? episode.poster : null,
          status: 'INPROGRESS',
          subscriberid: this.subscriberid,
          /**
          * The followind parameters will be added from episodeData
          * duration
          */
          ...episodeData
        };

        // console.log('[setEpisodeOnFire -> data]', data);

        // Finally save the data to firebase
        firebase.database().ref(path).set(data);
      });
    },
    setContenOnFire (content) {
      // If content data is not there, what's the point of continuing
      if (!content) return;
      // This mutation will take data from AppConfig local storage and save to the store
      this.CommitConfigStore();
      // This mutation will take data from AppUser local storage and save to the store
      this.CommitUserStore();
      // Both vendorid & subscriberid are mandatory. So if it is not there, don't continue
      if (!(this.vendorid && this.subscriberid)) return;

      // Create the path to which the firebase data to be sent
      let path = `${this.vendorid}/subscriber/${this.subscriberid}/content/${content.contentid}`;

      // Need to check if data already exists. If yes don't send anything
      this.checkFireDataExists(path).then(state => {
        // console.log('[Mixin Content checkFireDataExists state]', state);

        // State true means the data alreay ther in firebase && we dont need to send anything to firebase
        if (state) return;

        // console.log('[Mixin Content checkFireDataExists state]', state);

        let data = {
          category: content && content.category ? content.category : '',
          contentstatus: 'ACTIVE',
          contenttitle: content && content.title ? content.title : '',
          contenttype: content && content.contenttype ? content.contenttype : '',
          duration: content && content.duration ? content.duration : '',
          poster: content && content.poster ? content.poster : '',
          // getDateTime() is defined in Mixin Utility
          startdate: this.getDateTime(),
          status: 'INPROGRESS',
          subscriberid: this.subscriberid,
          tags: content && content.tags ? content.tags : ''
        }
        // Now save to firebase
        firebase.database().ref(path).set(data);
      });
    },
    updateEpisodeOnFire (episode, data = null) {
      // This mutation will take data from AppConfig local storage and save to the store
      this.CommitConfigStore();
      // This mutation will take data from AppUser local storage and save to the store
      this.CommitUserStore();
      // Both vendorid & subscriberid are mandatory. So if it is not there, don't continue
      if (!(this.vendorid && this.subscriberid)) return;
      // Condition using platform
      let path = `${this.vendorid}/subscriber/${this.subscriberid}`;

      // Get the contenttype
      let contenttype = episode.contenttype;
      // Get the contentid
      let contentid = episode.contentid;
      // Check whether episode is part of a series or not
      if ('seriesid' in episode) {
        // Get the seriesid
        let seriesid = episode.seriesid;
        // Differentiate using the platform
        if (this.platform === 'MOOC') {
          // Append the path
          path += `/courses/${this.level}/${seriesid}/lesson/${contentid}`;
        } else {
          // Append the path
          path += `/series/${seriesid}/episode/${contentid}`;
        }
      } else {
        path += `/content/${contentid}`
      }

      // console.log('[updateEpisodeOnFire -> checkFireDataExists -> path]', path);

      // Need to check the path already exist or not. Path not exists means the content data is not added before. So we cant update the data. Inorder to update, the data should be present.
      this.checkFireDataExists(path).then(state => {
        // console.log('[updateEpisodeOnFire -> checkFireDataExists -> state]', state);

        // If path doesnot exists, dont't continue. Because dat should be there
        if (!state) return;
        firebase.database().ref(path).update(data);
      });
    },
    updateContentOnFire (content, data) {
      // This mutation will take data from AppConfig local storage and save to the store
      this.CommitConfigStore();
      // This mutation will take data from AppUser local storage and save to the store
      this.CommitUserStore();
      // Both vendorid & subscriberid are mandatory. So if it is not there, don't continue
      if (!(this.vendorid && this.subscriberid)) return;
      // Get episode id
      let contentid = content.contentid;

      // Define the path
      let path = `${this.vendorid}/subscriber/${this.subscriberid}/content/${contentid}`;
      // Need to check the path already exist or not. Path not exists means the content data is not added before. So we cant update the data. Inorder to update, the data should be present.
      this.checkFireDataExists(path).then(state => {
        // console.log('[updateEpisodeOnFire state]', state);

        // If path doesnot exists
        if (!state) return;

        firebase.database().ref(path).update(data);
      });
    },
    completeEpisodeOnFire (episode, data) {
      // console.log('[completeEpisodeOnFire -> episode]', episode);

      // This mutation will take data from AppConfig local storage and save to the store
      this.CommitConfigStore();
      // This mutation will take data from AppUser local storage and save to the store
      this.CommitUserStore();
      // Both vendorid & subscriberid are mandatory. So if it is not there, don't continue
      if (!(this.vendorid && this.subscriberid)) return;
      // Define firebase base path
      let basePath = `${this.vendorid}/subscriber/${this.subscriberid}`;
      // Define firebase path
      let path = '';
      // Define series path
      let seriesPath = '';
      // Get the contenttype
      let contenttype = episode.contenttype;
      // Get the contentid
      let contentid = episode.contentid;

      // console.log('[completeEpisodeOnFire -> contenttype]', contenttype);

      // Define the callback to be executed after the episode has been marked as 'COMPLETED'
      // Condition the contenttype
      if (contenttype === 'COURSE' || 'seriesid' in episode) {
        // Get the seriesid
        let seriesid = episode.seriesid;
        // Check for platform data
        if (!this.platform) return;
        // Differentiate Platform
        if (this.platform === 'MOOC') {
          // Append the path
          path = `${basePath}/courses/${this.level}/${seriesid}/lesson/${contentid}`;
          // Append the course path
          seriesPath = `${basePath}/courses/${this.level}/${seriesid}`;
        } else if (this.platform === 'LITE') {
          // Define path
          path = `${basePath}/series/${seriesid}/episode/${contentid}`;
          // Append the series path
          seriesPath = `${basePath}/series/${seriesid}`;
        }

        // console.log('[completeEpisodeOnFire -> path]', path);

        // Need to check the path already exist or not. Path not exists means the content data is not added before. So we cant update the data. Inorder to update, the data should be present.
        this.checkFireDataExists(path).then(state => {
          // console.log('[completeEpisodeOnFire -> checkFireDataExists -> state]', state);

          // If path doesnot exists, dont't continue. Because dat should be there
          if (!state) return;
          // Update data to firebase
          firebase.database().ref(path).update(data).then(() => {
            this.checkSeriesStateOnFire(seriesPath);
          });
        });
      } else {
        path = `${basePath}/content/${contentid}`;
        // Need to check the path already exist or not. Path not exists means the content data is not added before. So we cant update the data. Inorder to update, the data should be present.
        this.checkFireDataExists(path).then(state => {
          // console.log('[completeEpisodeOnFire -> checkFireDataExists -> state]', state);

          // If path doesnot exists, dont't continue. Because dat should be there
          if (!state) return;
          // Update data to firebase
          firebase.database().ref(path).update(data);
        });
      }
    },
    checkSeriesStateOnFire (path) {
      // console.log('[checkSeriesStateOnFire -> path]', path);

      this.checkFireDataExists(path).then(state => {
        // If path doesnot exists, don't continue
        if (!state) return;
        // Define episode count path
        let episodeCountPath = `${path}/episodecount`;
        // Get series episode count.
        firebase.database().ref(episodeCountPath).once('value').then(snapshot => {
          // console.log('[checkSeriesStateOnFire -> episodecount]', snapshot.val());

          // Get the episode count
          let episodecount = snapshot.val();
          // Define episode path
          let episodePath;
          // Differentiate platform
          if (this.platform === 'MOOC') {
            episodePath = `${path}/lesson`;
          } else if (this.platform === 'LITE') {
            episodePath = `${path}/episode`;
          }
          // If not able to get episode path, return
          if (!episodePath) return;
          // Get the lessons
          firebase.database().ref(episodePath).once('value').then(snapshot => {
            // Get the lessons
            let lessons = snapshot.val();
            // Get lesson length
            let lessonsCount = Object.keys(lessons).length;
            // Check episodecount and lessons count are equal. If not, don't continue. Inorder to mark the series as complete, those values should match
            if (episodecount !== lessonsCount) return;
            // And if it is equal, then check for lessons with complete state by looping through
            let completed = snapshot.forEach(snap => {
              return snap.val().status == 'COMPLETED';
            });

            // If completed returns true, which means the series is completed. So update the series to 'COMPLETED' state
            let data = { status: 'COMPLETED', enddate: this.getDateTime() };
            // Update firebase
            firebase.database().ref(path).update(data);
          });
        });
      });
    },
    addToFireWatchlist (content) {
      // This mutation will take data from AppConfig local storage and save to the store
      this.CommitConfigStore();
      // This mutation will take data from AppUser local storage and save to the store
      this.CommitUserStore();
      // If no subscriber data, return
      if (!this.subscriberid) return;

      // Define the path to add to watchlist
      let path = `${this.vendorid}/subscriber/${this.subscriberid}/watchlist/`;
      // Condition the content type
      if (content.contenttype === 'SERIES' || content.contenttype === 'COURSE') {
        path += `${this.level}/${content.contentid}`
      }

      let data = {
        category: content.category,
        contentid: content.contentid,
        contenttitle: content.title,
        contenttype: content.contenttype,
        duration: content.duration,
        poster: content.poster,
        subscriberid: this.subscriberid,
        tags: content.tags,
        timestamp: new Date().getTime(),
      }

      // Push data to firebase
      firebase.database().ref(path).set(data);
      // Show the snackbar message
      snackbar.show({ text: 'Added to watchlist', pos: 'bottom-center' });
    },
    removeFromFireWatchlist (content) {
      // console.log('[Mixin Content.js -> removeFromFireWatchlist -> content]', content);

      // This mutation will take data from AppConfig local storage and save to the store
      this.CommitConfigStore();
      // This mutation will take data from AppUser local storage and save to the store
      this.CommitUserStore();
      // If no subscriber data, return
      if (!this.subscriberid) return;

      // Define the path to add to watchlist
      let path = `${this.vendorid}/subscriber/${this.subscriberid}/watchlist/`;
      // Condition the content type
      if (content.contenttype === 'SERIES') {
        path += `${this.level}/${content.contentid}`
      }

      // console.log('[Mixin Content.js -> removeFromFireWatchlist -> path]', path);

      // Removes watchlist data from firebase
      firebase.database().ref(path).set(null);
      // Show Removed from watchlist snackbar
      snackbar.show({ text: 'Removed from watchlist', pos: 'bottom-center' });
    },
    // This method is used in Player.vue -> addDataToFire(). Will increment subscriber views count for each content played
    incrementViewsOnFire () {
      // console.log('[mixins Content.js -> incrementViewsOnFire]');

      // This mutation will take data from AppConfig local storage and save to the store
      this.CommitConfigStore();
      // This mutation will take data from AppUser local storage and save to the store
      this.CommitUserStore();
      // If no subscriber data, return
      if (!this.subscriberid) return;
      // Define the path
      let path = `${this.vendorid}/subscriber/${this.subscriberid}/views`;

      // Checks for data existance
      this.checkFireDataExists(path).then(state => {
        // If data already exists, update data, else put data for first time
        state ? updateData() : putData();
      });

      // For managing the scope
      let self = this;

      function putData() {
        firebase.database().ref(path).set({ count: 1, subscriberid: self.subscriberid });
      }
      function updateData() {
        firebase.database().ref(path).once('value', (snapshot) => {
          let count = snapshot.val().count + 1;

          firebase.database().ref(path).update({ count });
        });
      }
    },
    updateWatchingsecondsOnFire (seconds) {
      // console.log('[mixins Content.js -> updateWatchingsecondsOnFire -> seconds]', seconds);

      // If no seconds data, return;
      if (!seconds) return;
      // This mutation will take data from AppConfig local storage and save to the store
      this.CommitConfigStore();
      // This mutation will take data from AppUser local storage and save to the store
      this.CommitUserStore();
      // Get year & month
      let year = new Date().getFullYear();
      let month = new Date().getMonth() + 1;
      // Define the path
      let path = `${this.vendorid}/subscriber/${this.subscriberid}/${year}/${month}/watchingseconds`;

      // Checks for data existance
      this.checkFireDataExists(path).then(state => {
        // If data already exists, update data, else put data for first time
        state ? updateData() : putData();
      });
      // Scope changes, so get reference for this object
      let self = this;

      function putData() {
        firebase.database().ref(path).set({ seconds, subscriberid: self.subscriberid });
      }
      function updateData() {
        firebase.database().ref(path).once('value', (snapshot) => {
          let watchingseconds = snapshot.val().seconds + seconds;
          // Update the data
          firebase.database().ref(path).update({ seconds: watchingseconds });
        });
      }
    },
    checkFireDataExists (path) {
      // console.log('[checkFireDataExists -> path]', path);

      return new Promise((resolve, reject) => {
        firebase.database().ref(path).once('value', snapshot => {
          // If value exists, return true else false
          resolve(snapshot.val() ? true : false);
        })
      });
    }
  },
  mixins: [ Utility ]
}

export default Content;
