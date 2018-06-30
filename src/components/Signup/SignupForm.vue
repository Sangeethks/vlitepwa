<template>
  <div class="vlt-signup-screen">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-4 col-md-offset-4">
          <div class="vlt-signup-sec">
            <div class="vlt-signup-header">
              <h2>SIGN UP</h2>
            </div>
            <!-- Form -->
            <div class="vlt-signup-form">
              <!-- Name Input -->
              <div class="vlt-input-group vlt-mtrl-group dark">
                <input type="text" v-model="subscribername" required ref="subscribername">
                <span class="highlight"></span>
                <span class="bar"></span>
                <label :class="errLabelName">Name</label>
              </div>

              <!-- Email Input -->
              <div class="vlt-input-group vlt-mtrl-group dark">
                <input type="text" v-model="userEmail" required>
                <span class="highlight"></span>
                <span class="bar"></span>
                <label :class="errLabelEmail">Email</label>
              </div>

              <!-- Password Input -->
              <div class="vlt-input-group vlt-mtrl-group input-ico dark">
                <input type="password" required v-model="password">
                <span class="ico-img">
                  <img :src="iconEyeOpenPath" @click="toggleInputMode">
                </span>
                <span class="highlight"></span>
                <span class="bar"></span>
                <label :class="errLabelPassword">Password</label>
              </div>

              <!-- Name Input -->
              <div class="vlt-input-group vlt-mtrl-group dark" v-if="instituteenabled === `YES`">
                <input type="text" v-model="instituteid" required>
                <span class="highlight"></span>
                <span class="bar"></span>
                <label :class="errLabelInstCode">Institution Code</label>
              </div>

              <!-- Select Level -->
              <div class="vlt-input-group vlt-slct-grp" v-if="showLevels">
                <select class="vlt-slct-input" v-model="level">
                  <option value="0">Select Level</option>
                  <option value="1" v-for="(level, i) in levels" :key="i">{{level}}</option>
                </select>
                <span class="ico-img">
                  <img src="@/assets/icons/caret-up-down.svg">
                </span>
              </div>

              <Loading v-show="showLoading"></Loading>

              <!-- Buttons -->
              <div class="vlt-signup-btns">
                <button type="button" class="btn-lg-primary inverted" @click="signupCB">Signup</button>
              </div>
            </div>
            <!-- .vlt-signup-form -->

            <div class="vlt-signup-divd">
              <p>OR</p>
            </div>

            <div class="vlt-signup-misc">
              <button type="button" class="btn-fb lg">Sign up with Facebook</button>
              <button type="button" class="btn-gg lg">Sign up with Google</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import Loading from '@/components/Slots/Loading.vue';
import App from '@/mixins/App';
import Utility from '@/mixins/Utility';
import { EventBus } from '@/main';

export default {
  name: 'SignupForm',
  data () {
    return {
      subscribername: '',
      userEmail: '',
      password: '',
      instituteid: '',
      level: '0',
      country: '',
      showLoading: false,
      showLevels: false,
      levels: undefined,
      errLabelName: '',
      errLabelEmail: '',
      errLabelPassword: '',
      errLabelInstCode: '',
      iconEyeOpenPath: require('@/assets/icons/eye.svg'),
      iconEyeClosePath: require('@/assets/icons/eye-close.svg')
    }
  },
  computed: {
    ...mapGetters([
      'levelenabled',
      'instituteenabled'
    ])
  },
  created () {
    this.initSignupForm();
  },
  mounted () {
    // Focus the subscribername input field
    this.$refs.subscribername.focus();
  },
  methods: {
    ...mapMutations([
      'CommitVendorStore',
    ]),
    ...mapActions([
      'actLocate',
      'actListLevels',
      'actSubscribe',
      'actLogin',
    ]),
    initSignupForm () {
      // Get country Data from locate API
      this.getCountryData();
      // Saves data from local storage to store
      this.CommitVendorStore();
      // Hide the loader
      this.toggleLoader(false);
      // Check if level enabled or not from AppVendor. If not don't continue to fetch level data
      if (this.levelenabled === 'NO') return;
      // If level is enabled, fetch the level data from level API
      this.fetchLevelData();
    },
    getCountryData () {
      this.actLocate().then(response => {
        // console.log('[SignupForm -> getCountryData -> response]', response);

        this.country = response.success;
      }).catch(error => {
        // console.log('[SignupForm -> getCountryData -> error]', error);

      });
    },
    fetchLevelData () {
      this.actListLevels().then(response => {
        // console.log('[SignupForm -> fetchLevelData -> response]', response);

        // Set the levels to the data property
        this.levels = response;
        // Set the data property to true to make the levels select box visible
        this.showLevels = true;
      }).catch(error => {
        // console.log('[SignupForm -> fetchLevelData -> error]', error);
      });
    },
    signupCB () {
      if (!this.isFormValid()) return;

      // Show the loader
      this.showLoading = true;

      let params = {
        subscribername: this.subscribername,
        email: this.userEmail,
        password: this.password,
        instituteid: this.instituteid,
        country: this.country
      }

      // Calling the subscribe API
      this.actSubscribe(params).then(response => {
        // console.log('[signupCB -> actGetSubscribe -> response]', response);

        let title = 'Error';
        let message = 'Oops! something error happened';
        if (response.error) {
          // Hide the loader
          this.showLoading = false;

          if (response.error === 2012) {
            message = response.reason;
          }

          // Show the Error popup with message
          EventBus.$emit('messagePopupEvent', true, { title, message });
          // Them return out of the method
          return;
        }
        // If no error happened
        this.loginUser();
      }).catch(error => {
        // console.log('[signupCB -> actGetSubscribe -> error]', error);
      });
    },
    loginUser () {
      let loginData = {
        email: this.userEmail,
        password: this.password
      }

      this.actLogin(loginData).then(response => {
        // console.log('[signupCB -> loginUser -> response]', response);

        // Save user data in the name of AppUser to local storage
        localStorage.setItem('AppUser', JSON.stringify(response));
        // Emit an event to notify components that the user mode has changed
        EventBus.$emit('AppUserChangeEvent', true);
        // Redirect To Home Page
        this.$router.push({ name: 'Home' });
      }).catch(error => {
        // console.log('[signupCB -> loginUser -> error]', error);

      });
    },
    isFormValid () {
      return this.validateName() && this.validateEmailInput() && this.validatePassword();
    },
    validateName() {
      // console.log('[SignupForm -> validateName]');

      if (this.subscribername && this.subscribername.length > 2) {
        this.errLabelName = '';
        return true;
      } else {
        this.errLabelName = 'error';
        return false;
      }
    },
    validateEmailInput() {
      // console.log('[SignupForm -> validateEmailInput]');

      // validateEmail method was defined in Utility mixin
      if (this.validateEmail(this.userEmail)) {
        this.errLabelEmail = '';
        return true;
      } else {
        this.errLabelEmail = 'error';
        return false;
      }
    },
    validatePassword() {
      // console.log('[SignupForm -> validatePassword]');

      if (this.password && this.password.length > 3) {
        this.errLabelPassword = '';
        return true;
      } else {
        this.errLabelPassword = 'error';
        return false;
      }
    },
    toggleInputMode (_event) {
      // Get the target element
      let target = _event.target;
      // Get the container div of the input field
      let parentNode = target.parentNode.parentNode;
      // Get the input element from it
      let inputElm = parentNode.getElementsByTagName('input')[0];
      // Now change the type to text if password or vice-versa and change the icon
      if (inputElm.type === 'password') {
        inputElm.type = 'text';
        // Change the icon
        target.src = this.iconEyeClosePath;
      } else {
        inputElm.type = 'password';
        // Change the icon
        target.src = this.iconEyeOpenPath;
      }
    }
  },
  components: {
    Loading
  },
  mixins: [ App, Utility ]
}
</script>

<style lang="scss" scoped>
@import '~sass/modules/variables';
@import '~sass/modules/components';

.vlt-signup-screen {
  margin: 10em 0;
}
.vlt-signup-form {
  margin-top: 40px;
}
.vlt-signup-sec {
  padding: 0 50px;
  .vlt-signup-header {
    text-align: center;
  }
  .vlt-input-group, .vlt-signup-fgtpwd {
    margin-bottom: 30px;
  }
  .vlt-signup-fgtpwd {
    display: block;
    font-size: $text-sm-h6;
  }
  .vlt-signup-btns {
    margin-top: 20px;
  }
}

.vlt-signup-divd {
  text-align: center;
  p {
    display: block;
    margin: 15px 0;
    color: $clr-white-2;
  }
}
.vlt-signup-misc {
  button {
    margin-bottom: 20px;
  }
}
</style>
