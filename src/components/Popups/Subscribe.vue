<template>
  <Popup :closePopupEvent="closePopupCB">
    <h6 slot="header">Subscribe</h6>
    <div class="popup-form">
      <!-- Name -->
      <div class="vlt-input-group vlt-mtrl-group">
        <input type="text" required v-model="subscriberName">
        <span class="highlight"></span>
        <span class="bar"></span>
        <label :class="errLabelName">Name</label>
      </div>
      <!-- Email -->
      <div class="vlt-input-group vlt-mtrl-group">
        <input type="text" required v-model="userEmail">
        <span class="highlight"></span>
        <span class="bar"></span>
        <label :class="errLabelEmail">Email</label>
      </div>
      <!-- Date Of Birth -->
      <div class="vlt-input-group vlt-mtrl-group input-ico">
        <VueDatepicker v-model="dob" :first-day-of-week="1" lang="en" placeholder="Date Of Birth" width="100%" format="dd-MM-yyyy">
        </VueDatepicker>
        <span class="ico-img">
          <img src="@/assets/icons/calendar-dark.svg">
        </span>
        <span class="highlight"></span>
        <span class="bar"></span>
      </div>
      <!-- Gender Radio -->
      <div class="subs-gender">
        <h6 class="gender-label">Gender</h6>
        <div class="vlt-radio inline">
          <input id="subs-gender-1" name="radio" type="radio" checked v-model="gender" value="Male">
          <label for="subs-gender-1" class="radio-label">Male</label>
        </div>
        <div class="vlt-radio inline">
          <input id="subs-gender-2" name="radio" type="radio" v-model="gender" value="Female">
          <label for="subs-gender-2" class="radio-label">Female</label>
        </div>
        <div class="vlt-radio inline">
          <input id="subs-gender-3" name="radio" type="radio" v-model="gender" value="Other">
          <label for="subs-gender-3" class="radio-label">Other</label>
        </div>
      </div>
      <!-- Country -->
      <div class="vlt-input-group vlt-mtrl-group">
        <input type="text" required v-model="country">
        <span class="highlight"></span>
        <span class="bar"></span>
        <label>Country</label>
      </div>

      <div class="subs-btns">
        <button type="button" class="btn-lg-primary inverted" @click="subscribeCB" ref="subscribeBtn">Subscribe</button>
      </div>

      <Loading v-show="showLoading"></Loading>
    </div>
  </Popup>
</template>

<script>
import Popup from '@/components/Slots/Popup.vue';
import Loading from '@/components/Slots/Loading.vue';
import VueDatepicker from 'vue2-datepicker';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import App from '@/mixins/App';
import Utility from '@/mixins/Utility';
import User from '@/mixins/User';
import { EventBus } from '@/main';

export default {
  name: 'PopupSubscribe',
  data () {
    return {
      subscriberName: '',
      errLabelName: '',
      userEmail: '',
      errLabelEmail: '',
      dob: '',
      gender: 'Male',
      country: '',
      showLoading: false
    }
  },
  computed: {
    ...mapGetters([
      'AppConfig'
    ])
  },
  components: {
    Popup,
    Loading,
    VueDatepicker
  },
  created () {
    this.getCountryCode();
  },
  methods: {
    ...mapMutations([
      'CommitConfigStore'
    ]),
    ...mapActions([
      'actSubscribe',
      'actLocate'
    ]),
    subscribePopupCB (state) {
      // console.log('[Subscribe.vue -> subscribePopupCB -> state]', state);

      if (!state) return;
      this.getCountryCode();
    },
    subscribeCB () {
      // console.log('[Subscribe subscribeCB]');

      // First check the form is valid or not
      if(!(this.isFormValid())) return;

      // Show the loader
      this.showLoading = true;
      // Disable the subscribe button
      this.$refs.subscribeBtn.disabled = true;

      let userData = {
        email: this.userEmail,
        subscribername: this.subscriberName,
        country: this.country,
        gender: this.gender
      }

      if (this.dob) {
        userData.dob = this.dob.toISOString().slice(0, 10);
      }

      this.actSubscribe(userData).then(response => {
        // console.log('[Subscribe subscribeCB response]', response);

        // Save the data to local storage
        if (response.success) {
          // Hide the subscribe popup
          EventBus.$emit('subscribePopupEvent', false);

          let AppUser = JSON.stringify({ ...userData, ...response });
          // Save to local storage
          localStorage.setItem('AppUser', AppUser);
          // Now get the user data
          this.getUserData();
        }
        // Hide the loader
        this.toggleLoader(false);
      }).catch(error => {
        // console.log('[Subscribe subscribeCB error]', error);
      });
    },
    getUserData () {
      // NOTE: Defined in User Mixins
      this.fetchUserData().then(response => {
        // DEBUG:
        // console.log('[Subscribe getUserData response]', response);

        // Store the user data to local storage
        let AppUser = JSON.parse(localStorage.getItem('AppUser'));
        AppUser = JSON.stringify({ ...AppUser, ...response });
        localStorage.setItem('AppUser', AppUser);
        // Emitting events which the components listen
        EventBus.$emit('AppUserChangeEvent', true);
      }).catch(error => {
        // console.log('[Subscribe getUserData error]', error);
      });
    },
    isFormValid () {
      // console.log('[Subscribe isFormValid]');

      return this.isInputNameValid() && this.inputEmailValid();
    },
    isInputNameValid () {
      if (this.subscriberName && this.subscriberName.length > 2) {
        this.errLabelName = '';
        return true;
      } else {
        this.errLabelName = 'error';
        return false;
      }
    },
    inputEmailValid () {
      if (this.validateEmail(this.userEmail)) {
        this.errLabelEmail = '';
        return true;
      } else {
        this.errLabelEmail = 'error';
        return false;
      }
    },
    getCountryCode () {
      // Take user data from local storage
      this.CommitConfigStore();
      // Check for country data
      if (this.AppConfig.country) return this.country = this.AppConfig.country;

      this.actLocate().then(response => {
        // console.log('[Subscribe.vue -> getCountryCode -> response]', response);
        // Set the country data property from response
        this.country = response.success;

        // Save the country data to AppConfig local storage
        let AppConfig = JSON.stringify({ ...this.AppConfig, ...{ country: this.country } });
        localStorage.setItem('AppConfig', AppConfig);
      }).catch(error => {
        // console.log('[Subscribe.vue -> getCountryCode -> error]', error);

        // If not able to get response, set the country code as IN by default
        this.country = 'IN';
      });
    },
    closePopupCB () {
      EventBus.$emit('subscribePopupEvent', false);
    }
  },
  beforeDestroy () {
    // Switch Off Event Listeners
    EventBus.$off('subscribePopupEvent', this.subscribePopupCB);
  },
  mixins: [ App, User, Utility ]
}
</script>

<style lang="scss" scoped>
@import '~sass/modules/components';

.vlt-input-group {
  margin-bottom: 15px;
}
.subs-gender {
  margin: 20px 0 15px;
  .gender-label {
    display: inline-block;
    margin-right: 10px;
  }
}
.subs-btns {
  margin: 25px 0;
}
</style>
