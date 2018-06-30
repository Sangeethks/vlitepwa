<template>
  <Popup :closePopupEvent="closePopupCB">
    <h6 slot="header">Change Password</h6>
    <div class="chng-pass-form">
      <form class="popup-form" @submit.prevent="updatePasswordCB">
        <div class="vlt-input-group vlt-mtrl-group input-ico">
          <input type="password" required v-model="newPassword" ref="newPassword">
          <span class="ico-img">
            <img :src="iconEyeOpenPath" @click="toggleInputMode">
          </span>
          <span class="highlight"></span>
          <span class="bar"></span>
          <label :class="errLabelNewPass">New Password</label>
        </div>
        <!-- Retype Passoword -->
        <div class="vlt-input-group vlt-mtrl-group input-ico">
          <input type="password" required v-model="retypePassword">
          <span class="ico-img">
            <img :src="iconEyeOpenPath" @click="toggleInputMode">
          </span>
          <span class="highlight"></span>
          <span class="bar"></span>
          <label :class="errLabelRetypePass">Retype Password</label>
        </div>

        <div class="subs-btns">
          <button type="submit" class="btn-lg-primary inverted">Update Password</button>
        </div>

        <Loading v-show="showLoading"></Loading>
      </form>
    </div>
  </Popup>
</template>

<script>
import Popup from '@/components/Slots/Popup.vue';
import Loading from '@/components/Slots/Loading.vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import App from '@/mixins/App';
import User from '@/mixins/User';
import { EventBus } from '@/main';

export default {
  name: 'PopupChangePassword',
  data () {
    return {
      oldPassword: '',
      newPassword: '',
      retypePassword: '',
      errLabelNewPass: '',
      classValidateOldP: '',
      errLabelRetypePass: '',
      iconEyeOpenPath: require('@/assets/icons/eye.svg'),
      iconEyeClosePath: require('@/assets/icons/eye-close.svg'),
      showLoading: false
    }
  },
  components: {
    Popup,
    Loading
  },
  mounted () {
    this.$refs.newPassword.focus();
  },
  methods: {
    ...mapActions([
      'actSubscribe',
      'actUpdateSubscriber'
    ]),
    updatePasswordCB () {
      if (!this.isFormValid()) return;

      // Show the loader
      this.showLoading = true;
      // Define the data to be sent
      let data = {
        password: this.newPassword
      };

      this.actUpdateSubscriber(data).then(response => {
        // console.log('[Subscribe updatePasswordCB response]', response);

        EventBus.$emit('changePasswordPopupEvent', false);

        if (response.error) {
          let popupData = {
            title: 'Oops!',
            message: 'Something Error Happened'
          }
          EventBus.$emit('messagePopupEvent', true, popupData);
        }
      }).catch(error => {
        // console.log('[Subscribe updatePasswordCB error]', error);
      });
    },
    closePopupCB () {
      EventBus.$emit('changePasswordPopupEvent', false);
    },
    isFormValid () {
      // console.log('[Subscribe isFormValid]');

      return (this.isNewPasswordValid() && this.isRetypePasswordValid());
    },
    isOldPasswordValid () {
      if (this.oldPassword && this.oldPassword.length >= 4) {
        this.classValidateOldP = '';
        return true;
      }
      this.classValidateOldP = 'error';
      return false;
    },
    isNewPasswordValid () {
      if (this.newPassword && this.newPassword.length >= 4) {
        this.errLabelNewPass = '';
        return true;
      }
      this.errLabelNewPass = 'error';
      return false;
    },
    isRetypePasswordValid () {
      if (this.retypePassword && this.retypePassword.length >= 4 && this.retypePassword === this.newPassword) {
        this.errLabelRetypePass = '';
        return true;
      }
      this.errLabelRetypePass = 'error';
      return false;
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
</style>
