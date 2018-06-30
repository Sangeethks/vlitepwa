<template>
  <Popup :closePopupEvent="closePopupCB">
    <h6 slot="header">Edit Profile</h6>
    <p slot="message" class="popup-message">{{popupMessage}}</p>
    <form @submit.prevent="editProfileCB" class="popup-form">
      <div class="subscribe-form">
        <!-- Name -->
        <div class="vlt-input-group vlt-mtrl-group">
          <input type="text" required v-model="name" maxlength="20">
          <span class="highlight"></span>
          <span class="bar"></span>
          <label :class="classLabelName">Name</label>
        </div>
        <!-- Date Of Birth -->
        <div class="vlt-input-group vlt-mtrl-group input-ico">
          <VueDatepicker v-model="dob" :first-day-of-week="1" lang="en" placeholder="Date Of Birth" width="100%" format="dd-MM-yyyy" @change="dobChangeCB" :not-after="new Date()">
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
            <input id="subs-gender-1" name="radio" type="radio" checked v-model="gender" value="MALE">
            <label for="subs-gender-1" class="radio-label">Male</label>
          </div>
          <div class="vlt-radio inline">
            <input id="subs-gender-2" name="radio" type="radio" v-model="gender" value="FEMALE">
            <label for="subs-gender-2" class="radio-label">Female</label>
          </div>
          <div class="vlt-radio inline">
            <input id="subs-gender-3" name="radio" type="radio" v-model="gender" value="OTHER">
            <label for="subs-gender-3" class="radio-label">Other</label>
          </div>
        </div>
        <!-- Country -->
        <div class="vlt-input-group vlt-mtrl-group">
          <input type="text" required v-model="country">
          <span class="highlight"></span>
          <span class="bar"></span>
          <label :class="classLabelCountry">Country</label>
        </div>

        <div class="subs-btns">
          <button type="submit" class="btn-lg-primary inverted" ref="submitBtn">Update</button>
        </div>

        <Loading v-show="showLoading"></Loading>
      </div>
    </form>
  </Popup>
</template>

<script>
  import Popup from '@/components/Slots/Popup.vue';
  import Loading from '@/components/Slots/Loading.vue';
  import VueDatepicker from 'vue2-datepicker';
  import { mapGetters, mapMutations, mapActions } from 'vuex';
  import App from '@/mixins/App';
  import User from '@/mixins/User';
  import { EventBus } from '@/main';

  export default {
    name: 'PopupEditProfile',
    data () {
      return {
        name: '',
        dob: '',
        gender: '',
        country: '',
        classLabelName: '',
        classLabelCountry: '',
        popupMessage: '',
        showLoading: false
      }
    },
    components: {
      Popup,
      Loading,
      VueDatepicker
    },
    computed: {
      ...mapGetters([
        'AppUser',
        'subscriberid',
        'email'
      ])
    },
    created () {
      this.initEditProfilePopup();
    },
    methods: {
      ...mapMutations([
        'CommitUserStore'
      ]),
      ...mapActions([
        'actUpdateSubscriber',
        'actLocate'
      ]),
      initEditProfilePopup () {
        // Takes data from local storage and saves to store
        this.CommitUserStore();

        // console.log('[EditProfile -> initEditProfilePopup -> AppUser]', this.AppUser);

        // Check whether user data stored in the local storage has country data. If no country data, fetch the location
        this.AppUser.country ? this.country = this.AppUser.country : this.locateUser();

        this.name = this.AppUser.subscribername;
        this.dob = this.AppUser.dob;
        this.gender = this.AppUser.gender ? this.AppUser.gender : 'MALE';
      },
      dobChangeCB (dob) {
        this.dob = dob.toISOString().slice(0, 10);
      },
      editProfileCB () {
        // console.log('[EditProfile editProfileCB]');

        if (!this.isFormValid()) return;
        // Show Loding
        this.showLoading = true;
        // Disable the submit button
        this.$refs.submitBtn.disabled = true;
        // Takes data from local storage and saves to store
        this.CommitUserStore();
        // If no subscriberid, return
        if (!this.subscriberid) return;

        let data = {
          subscribername: this.name,
          country: this.country,
          gender: this.gender,
          dob: this.dob
        }

        // console.log('[EditProfile editProfileCB data]', data);

        this.actUpdateSubscriber(data).then(response => {
          // Check for error in response
          if (response.error) {
            this.popupMessage = response.reason;
          } else {
            EventBus.$emit('profileUpdatedEvent', true);
          }
        }).catch(error => {
          // console.log('[EditProfile editProfileCB error]', error);

          // Hide the Loader
          this.showLoading = false;
          // Enable the submit button
          this.$refs.submitBtn.disabled = false;
          // Show the appropriate message
          this.popupMessage = 'Oops! Something error happened';
        });
      },
      isFormValid (){
        return this.inputNameValid() && this.inputCountryValid();
      },
      inputNameValid () {
        if (this.name && this.name.length >= 3) {
          this.classLabelName = '';
          return true;
        }
        this.classLabelName = 'error';
        return false;
      },
      inputCountryValid () {
        if (this.country && this.country.length >= 2) {
          this.classLabelCountry = '';
          return true;
        }
        this.classLabelCountry = 'error';
        return false;
      },
      closePopupCB () {
        EventBus.$emit('editProfilePopupEvent', false);
      },
      locateUser () {
        this.actLocate().then(response => {
          this.country = response.success;
          // Takes user data from local storage
          this.CommitUserStore();
          let AppUser = JSON.stringify({ ...this.AppUser, ...{ country: this.country } });
          // Save to local storage
          localStorage.setItem('AppUser', AppUser);
        }).catch(error => {
          // console.log('[SignupForm -> getCountryData -> error]', error);
        });
      }
    },
    mixins: [ App, User ]
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
  .popup-message {
    color: $clr-gp-red;
  }
</style>
