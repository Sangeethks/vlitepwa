<template>
  <div class="vlt-popups">
    <transition-group name="popup-animate">
      <Subscribe v-show="showSubscribe" key="Subscribe"></Subscribe>
      <SessionExpired v-show="showSessionExpired" key="SessionExpired"></SessionExpired>
      <Message v-show="showMessage" key="Message" :popupData="messagePopupData"></Message>
    </transition-group>
  </div>
</template>

<script>
import { EventBus } from '@/main';
import Subscribe from './Subscribe.vue';
import SessionExpired from './SessionExpired.vue';
import ChangePassword from './ChangePassword.vue';
import ResetPassword from './ResetPassword.vue';
import Message from './Message.vue';
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Popups',
  data () {
    return {
      showSubscribe: false,
      showSessionExpired: false,
      showChangePassword: false,
      showResetPassword: false,
      showMessage: false,
      messagePopupData: undefined
    }
  },
  components: {
    Subscribe,
    SessionExpired,
    ChangePassword,
    ResetPassword,
    Message
  },
  created () {
    EventBus.$on('subscribePopupEvent', this.subscribePopupCB);
    EventBus.$on('sessionExpPopupEvent', this.sessionExpPopupCB);
    EventBus.$on('changePasswordPopupEvent', this.changePasswordPopupCB);
    EventBus.$on('resetPasswordPopupEvent', this.resetPasswordPopupCB);
    EventBus.$on('messagePopupEvent', this.messagePopupEvent);
  },
  computed: {
    ...mapGetters([
      'platform'
    ])
  },
  methods: {
    ...mapMutations([
      'CommitConfigStore'
    ]),
    subscribePopupCB (state) {
      this.showSubscribe = state;
    },
    sessionExpPopupCB (state) {
      // Takes data from AppConfig local storage and save to store
      this.CommitConfigStore();
      if (this.platform === 'LITE') return;

      this.showSessionExpired = state;
    },
    changePasswordPopupCB (state) {
      this.showChangePassword = state;
    },
    resetPasswordPopupCB (state) {
      this.showResetPassword = state;
    },
    messagePopupEvent (state, data) {
      this.messagePopupData = data;
      this.showMessage = state;
    }
  },
  beforeDestroy () {
    EventBus.$off('subscribePopupEvent', this.subscribePopupCB);
    EventBus.$off('sessionExpPopupEvent', this.sessionExpPopupCB);
    EventBus.$off('changePasswordPopupEvent', this.changePasswordPopupCB);
    EventBus.$off('resetPasswordPopupEvent', this.resetPasswordPopupCB);
    EventBus.$off('messagePopupEvent', this.messagePopupEvent);
  }
}
</script>

<style lang="scss">
</style>
