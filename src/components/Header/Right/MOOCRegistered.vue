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
import { mapGetters, mapMutations } from 'vuex';
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
  computed: {
    ...mapGetters([
      'AppUser'
    ])
  },
  components: {
    Notification
  },
  created () {
    this.initTemplate();

    EventBus.$on('toggleNotificationEvent', this.notifBtnClickCB);
  },
  methods: {
    ...mapMutations([
      'CommitUserStore'
    ]),
    initTemplate () {
      // console.log('[MOOCRegistered initTemplate]');

      // This mutation takes data from local storage and save to store. Defined in User Store
      this.CommitUserStore();
      // Get User image from user data which is saved in store
      if (this.AppUser.picture) this.picture = this.AppUser.picture;
    },
    notifBtnClickCB () {
      // console.log('[Registered -> notifBtnClickCB ]');

      // NOTE: Hiding for the time being
      // this.showNotificationBox = !this.showNotificationBox
      // // EventBus.$emit('toggleNotificationEvent', true)
      // // Toggle the Before Element. The small caret created on .vlt-header-notif button
      // this.notifBtnClass = this.showNotificationBox ? 'visible' : ''
    }
  },
  destroyed () {
    EventBus.$off('toggleNotificationEvent', this.notifBtnClickCB)
  }
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
