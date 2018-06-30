<template>
  <Popup :closePopupEvent="closePopupCB" width="420px">
    <h6 slot="header">Reset Password</h6>
    <div class="reset-pass-form popup-form">
      <form @submit.prevent="resetPasswordCB">
        <!-- Retype Passoword -->
        <div class="vlt-input-group vlt-mtrl-group">
          <input type="text" required v-model="userEmail" ref="userEmail">
          <span class="highlight"></span>
          <span class="bar"></span>
          <label :class="classValidateEmail">Email Address</label>
        </div>

        <div class="subs-btns">
          <button type="submit" class="btn-lg-primary inverted">Reset Password</button>
        </div>
      </form>
    </div>
  </Popup>
</template>

<script>
import Popup from '@/components/Slots/Popup.vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { EventBus } from '@/main';
import Utility from '@/mixins/Utility';

export default {
  name: 'PopupResetPassword',
  data () {
    return {
      userEmail: '',
      classValidateEmail: ''
    }
  },
  components: {
    Popup
  },
  mounted () {
    this.initTemplate();
  },
  methods: {
    ...mapActions([
      'actResetPassword'
    ]),
    initTemplate () {
      this.$refs.userEmail.focus();
    },
    resetPasswordCB () {
      // console.log('[ResetPassword resetPasswordCB]');

      // Check for form's validity
      if (!this.isFormValid()) return;
      // If form in valid
      this.actResetPassword({ email: this.userEmail }).then(response => {
        // console.log('[ResetPassword resetPasswordCB response]', response);

        // If error occured
        if (response.error) {
          // Clear the form
          this.userEmail = '';

          // Close Reset password Popup
          EventBus.$emit('resetPasswordPopupEvent', false);
          // Show password reset failed popup message
          let popupData = {
            title: 'Oops!',
            message: response.reason
          }
          EventBus.$emit('messagePopupEvent', true, popupData);
        } else {
          // Close Reset password Popup
          EventBus.$emit('resetPasswordPopupEvent', false);
          // Show password reset success popup message
          let popupData = {
            title: 'Success',
            message: 'We have sent you an email with reset instructions'
          }
          EventBus.$emit('messagePopupEvent', true, popupData);
        }
      }).catch(error => {
        // console.log('[ResetPassword resetPasswordCB error]', error);

      });
    },
    closePopupCB () {
      EventBus.$emit('resetPasswordPopupEvent', false);
    },
    isFormValid () {
      return (this.isEmailValid());
    },
    isEmailValid () {
      // validateEmail() is defined in Utility Mixin
      if (this.userEmail && this.userEmail.length >= 4 && this.validateEmail(this.userEmail)) {
        this.classValidateEmail = '';
        return true;
      }
      this.classValidateEmail = 'error';
      return false;
    }
  },
  mixins: [ Utility ]
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
