import { mapGetters, mapMutations, mapActions } from 'vuex';
import firebase from 'firebase';
import snackbar from 'node-snackbar';
import { EventBus } from '@/main';
import 'nm/node-snackbar/dist/snackbar.css';

const User = {
  computed: {
    ...mapGetters([
      'AppUser',
      'platform',
      'accessmode',
      'email'
    ])
  },
  methods: {
    ...mapMutations([
      'CommitUserStore',
      'CommitConfigStore'
    ]),
    ...mapActions([
      'actGetSubscriber'
    ]),
    checkUserHasAccess () {
      // console.log('[Mixin User.js -> checkUserHasAccess]');

      // Takes data from AppConfig local storage and saves to store
      this.CommitConfigStore();
      // Takes data from AppUser local storage and saves to store
      this.CommitUserStore();
      // Condition based on platform
      if (this.accessmode === 'PRIVATE') {
        return this.AppUser ? true : false;
      }
      return true;
    },
    fetchUserData () {
      // console.log('[fetchUserData]');

      // Takes data from AppUser local storage and saves to store
      this.CommitUserStore();
      // If userdata is not available, don't continue
      if (!this.email) return;

      let self = this;
      return new Promise(function(resolve, reject) {
        self.actGetSubscriber({ email: self.email }).then(response => {
          // console.log('[Mixins User fetchUserData response]', response);

          resolve(response);
        }).catch(error => {
          // console.log('[Mixins User fetchUserData error]', error);

          reject(error);
        });
      });
    },
    sessionExpiredCB () {
      // Remove the user data stored in local storage in the name: AppUser
      localStorage.removeItem('AppUser');
      // Show the session expired popup
      EventBus.$emit('AppUserChangeEvent', true);
      EventBus.$emit('sessionExpPopupEvent', true);
    }
  }
}

export default User
