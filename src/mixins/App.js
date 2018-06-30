import { EventBus } from '@/main';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import User from '@/mixins/User';
// import AppConfig from 'static/config/lite-app-config.json';
import AppConfig from 'static/config/mooc-app-config.json';
import firebase from 'firebase';

const App = {
  computed: {
    ...mapGetters([
      'AppUser',
      'FIRE_API_KEY',
      'FIRE_AUTH_DOMAIN',
      'FIRE_DATABASE_URL',
      'FIRE_PROJECT_ID',
      'FIRE_STORAGE_BUCKET',
      'FIRE_MESSAGING_SENDER_ID',
      'vendorid',
      'vendorkey'
    ])
  },
  methods: {
    ...mapMutations([
      'setAppActive',
      'CommitConfigStore'
    ]),
    ...mapActions([
      'actGetVendorInfo',
      'DispatchConstStore'
    ]),
    // This method acts as the main execution entry of the Entire App. This method will fetch the App Configuration which includes the vendor and theme information which we need to store in the local storage which later will be used in different parts of the App
    initAppCycle () {
      this.initAppDOM();
      this.initAppFirebase();
      this.initFacebookSDK();
    },
    initAppDOM () {
      // Save the data to local storage
      localStorage.setItem('AppConfig', JSON.stringify(AppConfig));
      // Adding playtform specific class to the DOM Body tag. Platforms include 'MOOC' && 'LITE'
      let platform = AppConfig.platform;
      let platformClasss = platform === 'MOOC' ? 'app-mooc' : 'app-lite';
      document.body.classList.add(platformClasss);

      // Adding app specific class to the DOM Body tag
      let theme = AppConfig.theme
      let themeClass = theme === 'LIGHT' ? 'vlt-light' : 'vlt-dark'
      document.body.classList.add(themeClass)
    },
    initAppFirebase () {
      // Check how many instance of firebase app has been registered. If already registered then apps.length will return >0. Then no need to register again.
      if (firebase.apps.length) return;

      // Commit Const store
      this.DispatchConstStore();

      // If not
      firebase.initializeApp({
        apiKey: this.FIRE_API_KEY,
        authDomain: this.FIRE_AUTH_DOMAIN,
        databaseURL: this.FIRE_DATABASE_URL,
        projectId: this.FIRE_PROJECT_ID,
        storageBucket: this.FIRE_STORAGE_BUCKET,
        messagingSenderId: this.FIRE_MESSAGING_SENDER_ID
      });

      // DEBUG: Prints message to console
      // console.log('[App Firebase initialized]');
    },
    initFacebookSDK () {
      window.fbAsyncInit = function() {
        FB.init({
          appId      : '391165184735921',
          xfbml      : false,
          version    : 'v3.0'
        });
      };
      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.async = true;
        js.src = "//connect.facebook.net/en_GB/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    },
    fetchVendorAndUser () {
      // console.log('[App getVendorInfo]');

      // Defined in Vendor.js Store Module
      this.actGetVendorInfo().then(response => {
        // console.log('[App] getVendorInfo response', response);
        // Set the vendor config data to local storage
        localStorage.setItem('AppVendor', JSON.stringify(response));
        // Now check for user data
        this.fetchUser();
      }).catch(error => {
        // console.log('[App] getVendorInfo error', error);
      });
    },
    fetchUser () {
      // console.log('[Mixin App.js -> fetchUser]');
      // console.log('[Mixin App.js -> fetchUser -> AppUser]', this.AppUser);

      // CommitLocalStore() mutation is been made from fetchVendorAndUser() method. So we are able to access the AppUser data from store, which we are using below to check user data. If user data not exists means the user is not logged in. So make the App active immediately.
      if (!this.AppUser) return this.processAppEntry();
      // If user data exists
      this.fetchUserData().then(response => {
        // console.log('[App fetchUser response]', response);

        // Save the data to local storage
        // console.log('[Mixin App.js -> fetchUser -> AppUser]', { ...this.AppUser, ...response });

        let AppUser = JSON.stringify({ ...this.AppUser, ...response });
        localStorage.setItem('AppUser', AppUser);

        // console.log('[Mixin App.js -> fetchUser -> AppUser]', AppUser);

        // Then make the app active. As we got all the necessary informations. This is a mutation
        this.processAppEntry();
      }).catch(error => {
        // console.log('[App fetchUser error]', error);

        // error.status will return the error code. Based on this take appropriate actions
        if (!error.status) return;
        // Conditioning the error codes
        switch (error.status) {
          case 401:
            // Defined in User Mixin. Shows session expired popup and clears the user data
            this.sessionExpiredCB();
            break;
          default:
            // Will define the default condition later
        }
        // Set the App to active state.
        this.processAppEntry();
        // Finally hide the App Loader
        this.toggleLoader(false);
      });
    },
    processAppEntry () {
      this.setAppActive();
      // Initializing vLive Analytics SDK
      this.initvLiveWebSdk();
    },
    initvLiveWebSdk () {
      this.CommitConfigStore();
      // Check for value in vendorid & vendorkey
      if (!(this.vendorid && this.vendorkey)) return;

      import(/* webpackChunkName: 'vLiveWebSdk' */ 'vLiveWebSdk/vLiveWebSdkBase').then(VLiveBaseSdk => {

        let vLiveWebSdk = new VLiveBaseSdk(this.vendorid, this.vendorkey);

        // Set the analytics SDK Object to global window object
        // window.vLiveWebSdk = vLiveWebSdk;
      });
    },
    togglePageSticky (state) {
      document.body.style.overflow = state ? 'hidden' : 'auto';
    },
    toggleLoader (state, from = null) {
      if (from) {
        // console.log('[App.js -> toggleLoader -> from]', from);
      }

      EventBus.$emit('toggleAppLoaderEvent', state);
    }
  },
  mixins: [ User ]
}

export default App;
