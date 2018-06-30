<template>
  <div class="vlt-header-r-sec">
    <!-- Notification -->
    <div class="vlt-header-notif">
      <!-- Notification Button -->
      <!-- notifBtnClass: data property || notifBtnClickCB: method -->
      <button type="button" class="vlt-btn-ico lite" :class="notifBtnClass" @click="notifBtnClickCB">
        <img src="@/assets/icons/notification.svg">
      </button>
    </div>
    <!-- Profile Area -->
    <div class="vlt-header-prof">
      <div class="vlt-hprof">
        <router-link :to="{ name: 'Profile' }">
          <img :src="picture" alt="vlt-prof" class="img-responsive">
        </router-link>
      </div>
    </div>

    <Notification v-show="showNotificationBox"></Notification>
  </div>
</template>

<script>
import Notification from '@/components/Header/Notification/Notification.vue';
import User from '@/mixins/User';
import { EventBus } from '@/main';

export default {
  name: 'HeaderRightRegistered',
  data () {
    return {
      notifBtnClass: '',
      showNotificationBox: false,
      picture: require('@/assets/icons/profile.png')
    }
  },
  components: {
    Notification
  },
  created () {
    // DEBUG:
    // console.log('[LITERegistered created]');

    this.fetchUserDataCB();
    EventBus.$on('toggleNotificationEvent', this.notifBtnClickCB);
    EventBus.$on('fetchUserDataEvent', this.fetchUserDataCB);
  },
  methods: {
    notifBtnClickCB () {
      this.showNotificationBox = !this.showNotificationBox
      // EventBus.$emit('toggleNotificationEvent', true)
      // Toggle the Before Element. The small caret created on .vlt-header-notif button
      this.notifBtnClass = this.showNotificationBox ? 'visible' : ''
    },
    fetchUserDataCB () {
      let AppUser = JSON.parse(localStorage.getItem('AppUser'));
      // DEBUG:
      // console.log('[LITERegistered fetchUserDataCB AppUser]', AppUser);

      // Set the profile pic if not null
      if (AppUser.picture) this.picture = AppUser.picture;
    }
  },
  beforeDestroy () {
    EventBus.$off('toggleNotificationEvent', this.notifBtnClickCB)
    EventBus.$off('fetchUserDataEvent', this.fetchUserDataCB)
  },
  mixins: [ User ]
}
</script>

<style lang="scss" scoped>
@import '~sass/modules/components';

.vlt-header-notif, .vlt-header-prof {
  float: left;
  margin-left: 25px;
}
.vlt-header-notif {
  button {
    position: relative;
    z-index: 91;
    img {
      width: 20px;
    }
  }
}
.vlt-btn-ico {
  padding: 12px 0;
  &.visible {
    position: relative;
    &::before {
      position: absolute;
      content: '';
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      border-bottom: 7px solid $clr-dark-grad-2;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
.vlt-hprof {
  padding: 8px 0;
  img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    vertical-align: middle;
  }
}
</style>
