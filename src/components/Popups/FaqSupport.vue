<template>
  <Popup :closePopupEvent="closePopupCB">
    <h6 slot="header"></h6>
    <div class="session-exp-popup">
      <div class="popup-message">
        <p>Call us for free through the vLite App on Android and iOS</p>

        <div class="app-imgs">
          <img src="@/assets/icons/google-play.png">
          <img src="@/assets/icons/appstore.png">
        </div>
      </div>
    </div>
  </Popup>
</template>

<script>
// Pass title, message as props to the popup to display appropriate Data

import Popup from '@/components/Slots/Popup.vue';
import { EventBus } from '@/main';
import Utility from '@/mixins/Utility';

export default {
  name: 'PopupFaqSupport',
  components: {
    Popup
  },
  methods: {
    closePopupCB () {
      EventBus.$emit('faqSupportPopupEvent', false);
    },
    closePopup () {
      // Hide the popup
      this.closePopupCB();
    }
  }
}
</script>

<style lang="scss" scoped>
.app-imgs {
  margin-top: 15px;
  img {
    width: 48%;
    display: inline-block;
  }
}
</style>
