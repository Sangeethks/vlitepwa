<template>
  <div class="vlt-notif-box">
    <div class="contain">
      <div class="vlt-notif-items">
        <div :class="getCardClass(i)" v-for="(item, i) in 5" :key="i">
          <div class="vlt-notifc-left" >
            <div class="vlt-notifcl-img">
              <img src="@/assets/posters/notif-poster.jpg" alt="notif-poster">
            </div>
            <div class="vlt-notifcl-text">
              <h6>Unread Notification</h6>
              <p>Lorem ipsum dolar sit...</p>
            </div>
            <div class="clearfix"></div>
          </div>
          <div class="vlt-notifc-right">
            <button type="button" class="btn-sm-primary lite">CTA</button>
          </div>
          <div class="clearfix"></div>
        </div>
      </div>

      <div class="see-all">
        <p>See all notifications</p>
      </div>

    </div>
    <div class="notif-overlay" @click="hideNotificationCB"></div>
    <!-- .contain -->
  </div>

</template>

<script>
import { EventBus } from '@/main'

export default {
  methods: {
    getCardClass (index) {
      let className = 'vlt-notif-card'
      if (index > 1) className += ' read'
      return className
    },
    hideNotificationCB () {
      EventBus.$emit('toggleNotificationEvent', false);
    }
  }
}
</script>

<style lang="scss" scoped>
// import components module so that it imports variables module inside
@import '~sass/modules/components';

.vlt-notif-items {
  max-height: 240px;
  overflow-x: scroll;
  padding: 0 10px;
}
.vlt-notif-box {
  .contain {
    position: absolute;
    background-color: $clr-dark-grad-2;
    top: 100%;
    right: 0;
    color: $clr-white-1;
    z-index: 90;
  }

  .notif-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    z-index: 89;
  }

  .vlt-notif-card {
    padding: 6px 0;
    border-bottom: 1px solid $clr-grey-light;
    &.read {
      opacity: 0.5;
    }
    .vlt-notifc-left {
      float: left;
      width: 75%;
      .vlt-notifcl-img {
        display: inline-block;
        width: 30%;
        float: left;
        padding-right: 5px;
        img {
          width: 100%;
        }
      }
      .vlt-notifcl-text {
        display: inline-block;
        width: 70%;
        float: left;
        overflow: hidden;
      }
      p {
        font-size: $text-xs;
      }
    }
    .vlt-notifc-right {
      float: right;
      width: 25%;
      padding: 10px 0 10px 4px;
      button {
        float: right;
        min-width: auto;
      }
    }
  }
  // See All Notification
  .see-all {
    text-align: center;
    padding: 5px 0;
    p {
      cursor: pointer;
      font-size: $text-xs;
    }
  }
}
</style>
