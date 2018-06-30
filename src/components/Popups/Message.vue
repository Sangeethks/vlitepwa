<template>
  <Popup :closePopupEvent="closePopupCB">
    <h6 slot="header">{{popupData && popupData.title || ''}}</h6>
    <div class="session-exp-popup">
      <div class="popup-message">
        <p>{{popupData && popupData.message || ''}}</p>
      </div>

      <div class="subs-btns">
        <button type="button" class="btn-lg-primary inverted" @click="closePopup">OK</button>
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
  name: 'PopupResetPassword',
  props: {
    popupData: {
      type: Object
    }
  },
  components: {
    Popup
  },
  methods: {
    closePopupCB () {
      EventBus.$emit('messagePopupEvent', false);
    },
    closePopup () {
      // Hide the popup
      this.closePopupCB();
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
