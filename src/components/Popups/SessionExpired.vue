<template>
  <Popup :closePopupEvent="closePopupCB" width="420px">
    <h6 slot="header">Session Expired</h6>
    <div class="session-exp-popup">
      <div class="popup-message">
        <p>Session Expired. Login To Continue.</p>
      </div>

      <div class="subs-btns">
        <button type="button" class="btn-lg-primary inverted" @click="loginCB">Login</button>
      </div>
    </div>
  </Popup>
</template>

<script>
import Popup from '@/components/Slots/Popup.vue';
import { EventBus } from '@/main';
import Utility from '@/mixins/Utility';

export default {
  name: 'PopupResetPassword',
  components: {
    Popup
  },
  methods: {
    closePopupCB () {
      EventBus.$emit('sessionExpPopupEvent', false);
    },
    loginCB () {
      // Hide the popup
      this.closePopupCB();
      // Redirect to login page
      this.$router.push({ name: 'Login' });
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
