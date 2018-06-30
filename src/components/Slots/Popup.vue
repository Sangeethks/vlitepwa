<template>
  <div class="vlt-popup">
    <div class="popup-box" :style="{ width }" ref="popupBox">
      <div class="box-header">
        <slot name="header"></slot>
        <img src="@/assets/icons/close-dark.svg" class="header-close" @click="closePopupEvent()">
        <div class="clearfix"></div>
      </div>
      <slot name="message"></slot>
      <slot></slot>
    </div>
    <div class="popup-overlay"></div>
  </div>
</template>

<script>
import { EventBus } from '@/main';

export default {
  name: 'Popup',
  props: {
    closePopupEvent: {
      type: Function
    },
    width: {
      type: String
    }
  },
  created () {
    EventBus.$on('popupMCQMountedEvent', this.popupMCQMountedCB);
  },
  methods: {
    popupMCQMountedCB (state) {
      if (!state) return;

      let bodyHeight = document.body.clientHeight;
      let popupBox = this.$refs.popupBox;
      let popupBoxHeight = popupBox.offsetHeight;

      if (popupBoxHeight > bodyHeight) {
        popupBox.style.maxHeight = '80%';
        popupBox.style.overflow = 'scroll';
      }
    }
  },
  beforeDestroy () {
    EventBus.$off('popupMCQMountedEvent', this.popupMCQMountedCB);
  }
}
</script>

<style lang="scss">
@import '~sass/modules/variables';

.vlt-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  z-index: 8888;
  overflow-y: scroll;
  .popup-box {
    position: fixed;
    background-color: #fff;
    z-index: 8889;
    padding: 15px 20px;
    border-radius: 4px;
    width: 320px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    // max-height: 80%;
    // overflow-y: auto;
  }
  .popup-form {
    margin-top: 25px;
  }
  .box-header {
    // margin-bottom: 40px;
    h6 {
      float: left;
      text-transform: uppercase;
      color: $clr-white-2;
    }
    .header-close {
      position: relative;
      cursor: pointer;
      float: right;
      width: 12px;
      top: 5px;
    }
  }
  .popup-message {
    text-align: center;
    margin: 1em;
    display: block;
  }
}
</style>
