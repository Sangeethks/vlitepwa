<template>
  <div class="vlt-usr-info">
    <div class="vlt-usrin-left">
      <div class="vlt-usrin-img">
        <img :src="picture">
      </div>
      <div class="usrin-text">
        <h4>{{subscribername}}</h4>
        <p>{{userEmail}}</p>
      </div>
    </div>
    <div class="vlt-usrin-right">
      <div class="usrin-right-buttons">
        <button type="button" class="btn-md-hollow inverted" @click="editProfilePopupCB(true)">Edit Profile</button>
        <button type="button" class="btn-md-hollow inverted" @click="changePasswordPopupCB(true)">Change Password</button>
      </div>
    </div>
    <div class="clearfix"></div>

    <transition name="popup-animate">
      <EditProfile v-if="showEditProfile"></EditProfile>
    </transition>
    <transition name="popup-animate">
      <ChangePassword v-if="showChangePassword"></ChangePassword>
    </transition>
  </div>
</template>

<script>
import { EventBus } from '@/main';
import App from '@/mixins/App';
import User from '@/mixins/User';
import { mapGetters, mapMutations } from 'vuex';

const EditProfile = () => import(/* webpackChunkName: EditProfile */ '@/components/Popups/EditProfile.vue');
const ChangePassword = () => import(/* webpackChunkName: ChangePassword */ '@/components/Popups/ChangePassword.vue');

export default {
  name: 'ProfileUserBasics',
  data () {
    return {
      subscribername: '',
      userEmail: '',
      picture: require('@/assets/icons/profile.png'),
      showEditProfile: false,
      showChangePassword: false
    };
  },
  computed: {
    ...mapGetters([
      'AppUser'
    ])
  },
  created () {
    this.initBasics();

    EventBus.$on('editProfilePopupEvent', this.editProfilePopupCB);
    EventBus.$on('changePasswordPopupEvent', this.changePasswordPopupCB);
    EventBus.$on('profileUpdatedEvent', this.profileUpdatedCB);
  },
  methods: {
    ...mapMutations([
      'CommitUserStore'
    ]),
    initBasics () {
      // console.log('[Basics initBasics]');

      this.CommitUserStore();
      // Set the profile pic if not null
      if (this.AppUser.picture) this.picture = this.AppUser.picture;
      // Set the subscriber name
      if (this.AppUser.subscribername) this.subscribername = this.AppUser.subscribername;
      // Set the email
      if (this.AppUser.email) this.userEmail = this.AppUser.email;
    },
    editProfilePopupCB (state) {
      this.showEditProfile = state;
    },
    changePasswordPopupCB (state) {
      this.showChangePassword = state;
    },
    profileUpdatedCB (state) {
      // If state is not true, return;
      if (!state) return;

      // Defined in User Mixin
      this.fetchUserData().then(response => {
        // console.log('[LITEBasics profileUpdatedCB response]', response);

        // Create the new user from the existing one in the local storage
        let AppUser = { ...this.AppUser, ...response };
        // Now save the new value to the local storage
        localStorage.setItem('AppUser', JSON.stringify(AppUser));

        this.initBasics();
        // Close the Edit Profile Popup
        this.showEditProfile = false;
        // Emit an event to other components like header, menu etc to listen for the change
        EventBus.$emit('AppUserChangeEvent', true);
      }).catch(error => {
        // console.log('[LITEBasics profileUpdatedCB error]', error);
      });
    }
  },
  components: {
    EditProfile,
    ChangePassword
  },
  beforeDestroy () {
    EventBus.$off('editProfilePopupEvent', this.editProfilePopupCB);
    EventBus.$off('changePasswordPopupEvent', this.changePasswordPopupCB);
  },
  mixins: [ App, User ]
}
</script>

<style lang="scss" scoped>
@import '~sass/modules/variables';

.vlt-usr-info {
  padding: 15px 0;
}
.vlt-usrin-left, .vlt-usrin-right, .vlt-usrin-img, .usrin-text {
  float: left;
}
.vlt-usrin-left{
  width: 70%;
}
.vlt-usrin-right{
  width: 30%;
}
.vlt-usrin-img {
  margin-right: 20px;
  img {
    width: 96px;
    height: 96px;
    border-radius: 50%;
  }
}
.usrin-right-buttons {
  button {
    margin-top: 15px;
  }
}
.usrin-text {
  margin-top: 15px;
}
</style>
