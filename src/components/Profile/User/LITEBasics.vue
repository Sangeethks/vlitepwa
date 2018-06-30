<template>
  <div class="vlt-usr-info">
    <div class="vlt-usrin-left">
      <div class="vlt-usrin-img">
        <img :src="defaultPic">
      </div>
      <div class="usrin-text" v-if="AppUser">
        <h4>{{AppUser.subscribername}}</h4>
        <p>{{AppUser.email}}</p>
      </div>
    </div>
    <div class="vlt-usrin-right">
      <div class="usrin-right-buttons">
        <button type="button" class="btn-md-hollow inverted" @click="editProfileClickCB">Edit Profile</button>
      </div>
    </div>
    <div class="clearfix"></div>

    <!-- Edit Profile Popup -->
    <EditProfile v-show="showEditProfile"></EditProfile>
  </div>
</template>

<script>
import { EventBus } from '@/main';
import { mapGetters, mapMutations } from 'vuex';
import EditProfile from '@/components/Popups/EditProfile.vue';
import User from '@/mixins/User';
import App from '@/mixins/App';

export default {
  name: 'ProfileUserBasics',
  data () {
    return {
      defaultPic: require('@/assets/icons/profile.png'),
      showEditProfile: false
    };
  },
  computed: {
    ...mapGetters([
      'AppUser'
    ])
  },
  components: {
    EditProfile
  },
  created () {
    this.initBasics();

    EventBus.$on('editProfilePopupEvent', this.editProfilePopupCB);
    EventBus.$on('profileUpdatedEvent', this.profileUpdatedCB);
  },
  methods: {
    ...mapMutations([
      'CommitUserStore'
    ]),
    initBasics () {
      // console.log('[LITEBasics initBasics]');

      this.CommitUserStore();
    },
    editProfileClickCB () {
      this.showEditProfile = true;
    },
    changePassClickCB () {
      EventBus.$emit('changePasswordPopupEvent', true);
    },
    editProfilePopupCB (state) {
      this.showEditProfile = state;
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
        // Saves data to the store
        this.CommitUserStore();

        // Close the Edit Profile Popup
        this.showEditProfile = false;
        // Now hide the loader, which is starts showing when the user clicked on update button
        // Defined in App Mixin
        this.toggleLoader(false);
      }).catch(error => {
        // console.log('[LITEBasics profileUpdatedCB error]', error);
      });
    }
  },
  beforeDestroy () {
    EventBus.$off('editProfilePopupEvent', this.editProfilePopupCB);
    EventBus.$off('profileUpdatedEvent', this.profileUpdatedCB);
  },
  mixins: [ User, App ]
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
