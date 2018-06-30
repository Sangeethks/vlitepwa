<template>
  <div class="vlt-login-screen">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-4 col-md-offset-4">
          <div class="vlt-login-sec">
            <div class="vlt-lgn-header">
              <h2>LOGIN</h2>
            </div>

            <div class="form-message" v-show="showFormMessage">
              <p>{{formMessage}}</p>
            </div>

            <!-- Form -->
            <form @submit.prevent="loginUserCB">
              <div class="vlt-lgn-form">
                <!-- Email Input -->
                <div class="vlt-input-group vlt-mtrl-group dark">
                  <input type="text" v-model="userEmail" required ref="userEmail">
                  <span class="highlight"></span>
                  <span class="bar"></span>
                  <label :class="errLabelEmail">Email Address</label>
                </div>

                <!-- Password Input -->
                <div class="vlt-input-group vlt-mtrl-group input-ico dark">
                  <input type="text" @focus="$event.target.type = 'password'" v-model="password" required>
                  <span class="ico-img">
                    <img :src="iconEyeOpenPath" @click="toggleInputMode">
                  </span>
                  <span class="highlight"></span>
                  <span class="bar"></span>
                  <label :class="errLabelPassword">Password</label>
                </div>
                <!-- Forgot Password -->
                <p class="vlt-link vlt-lgn-fgtpwd" @click.prevent="resetPasswordCB">Forgot Password?</p>
                <!-- Buttons -->

                <Loading v-show="showLoading"></Loading>

                <div class="vlt-lgn-btns">
                  <button type="submit" class="btn-lg-primary inverted" ref="loginBtnSubmit">Login</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import App from '@/mixins/App';
import Loading from '@/components/Slots/Loading.vue';
import Utility from '@/mixins/Utility';
import { mapActions } from 'vuex';
import { EventBus } from '@/main';

export default {
  name: 'LoginForm',
  data () {
    return {
      userEmail: '',
      password: '',
      errLabelEmail: '',
      errLabelPassword: '',
      showFormMessage: false,
      formMessage: '',
      showLoading: false,
      iconEyeOpenPath: require('@/assets/icons/eye.svg'),
      iconEyeClosePath: require('@/assets/icons/eye-close.svg')
    }
  },
  mounted () {
    // When the login form is mounted, hide the loader. The loader will be visible when the user refreshes the page. Method defined in App Mixin
    this.toggleLoader(false);
    // Initialize the processes for the template
    this.initTemplate();
  },
  methods: {
    ...mapActions([
      'actLogin',
      'actGetSubscriber'
    ]),
    initTemplate () {
      this.$refs.userEmail.focus();
    },
    loginUserCB () {
      // console.log('[LoginForm loginUserCB]');

      if (!this.isFormValid()) return;

      this.showFormMessage = false;
      this.showLoading = true;
      this.$refs.loginBtnSubmit.disabled = true;

      this.actLogin({
        email: this.userEmail,
        password: this.password
      }).then(response => {
        // DEBUG:
        // console.log('[LoginForm] loginUserCB response', response);

        // If error comes as part of the response,
        if (response.error) {
          // Hide the loader
          this.showLoading = false;
          // Show the message
          this.formMessage = response.reason;
          this.showFormMessage = true;
          // Enable the submit button
          this.$refs.loginBtnSubmit.disabled = false;
        } else {
          // Save the user data to local storage
          localStorage.setItem('AppUser', JSON.stringify(response));
          // Get the subscriber information. Pass the email which is used to login
          this.getSubscriberData(this.userEmail);
        }
      }).catch(error => {
        // console.log('[LoginForm] loginUserCB error', error);
      });
    },
    getSubscriberData (email) {
      let data = { email };
      // Make the get subscriber API call to get subscriber data. Defined in User Store.
      this.actGetSubscriber(data).then(response => {
        // console.log('[LoginForm getSubscriberData response]', response);

        let AppUser = JSON.stringify({ ...JSON.parse(localStorage.getItem('AppUser')), ...response });
        localStorage.setItem('AppUser', AppUser);

        // Emitting events which the components listen
        EventBus.$emit('AppUserChangeEvent', true);
        // Redirect to home page after getting all the data
        this.$router.push({ name: 'Home' });
      }).catch(error => {
        // console.log('[LoginForm getSubscriberData error]', error);

      });
    },
    isFormValid () {
      return this.validateUserEmail() && this.validatePassword();
    },
    validateUserEmail () {
      // validateEmail() is defined in Utility Mixin
      if (this.userEmail && this.userEmail.length >= 4 && this.validateEmail(this.userEmail)) {
        this.errLabelEmail = '';
        return true;
      }
      this.errLabelEmail = 'error';
      return false;
    },
    validatePassword () {
      if (this.password && this.password.length > 3) {
        this.errLabelPassword = '';
        return true;
      } else {
        this.errLabelPassword = 'error';
        return false;
      }
    },
    resetPasswordCB () {
      // console.log('[LoginForm resetPasswordCB]');

      // Emit an event to Login.vue to show the popup
      EventBus.$emit('resetPasswordPopupEvent', true);
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

.vlt-login-screen {
  margin: 10em 0;
}
.vlt-login-sec {
  padding: 0 50px;
  .vlt-lgn-header {
    text-align: center;
  }
  .vlt-input-group, .vlt-lgn-fgtpwd {
    margin-top: 30px;
  }
  .vlt-lgn-fgtpwd {
    display: block;
    font-size: $text-sm-h6;
  }
  .vlt-lgn-btns {
    margin-top: 30px;
  }
}
</style>
