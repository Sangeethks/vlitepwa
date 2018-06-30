<template>
  <div class="vlt-ms-pr">
    <div class="pr-user" v-if="hasUser">
      <div class="vlt-ms-pr-img">
        <router-link :to="{ name: 'Profile' }">
          <img :src="picture" alt="vlt-prof" class="img-responsive">
        </router-link>
        <h5>{{subscribername}}</h5>
        <div class="clearfix"></div>
      </div>
      <p>{{userEmail}}</p>
    </div>
    <div class="pr-anonymous" v-else>
      <button type="button" class="btn-lg-primary inverted" @click="subscribeBtnClickCB">Subscribe</button>
    </div>
  </div>
</template>

<script>
import { EventBus } from '@/main';
import { mapGetters, mapMutations } from 'vuex';
import User from '@/mixins/User';

export default {
  name: 'MenuLITEPublic',
  data () {
    return {
      hasUser: false,
      subscribername: '',
      userEmail: '',
      picture: require('@/assets/icons/profile.png')
    };
  },
  computed: {
    ...mapGetters([
      'AppUser'
    ])
  },
  created () {
    this.checkTemplateState();
    // Listens to events from EventBus
    EventBus.$on('AppUserChangeEvent', this.AppUserChangeCB);
  },
  methods: {
    ...mapMutations([
      'CommitUserStore'
    ]),
    AppUserChangeCB (state) {
      this.checkTemplateState();
    },
    checkTemplateState () {
      // console.log('[LITERegistered checkTemplateState]');

      // Takes data from AppUser and saves to store
      this.CommitUserStore();

      if (this.AppUser) {
        // Set this to true to set the template to user logged in state
        this.hasUser = true;
        // Display user data on the template
        this.renderUserData();
      } else {
        this.hasUser = false;
      }
    },
    renderUserData () {
      // Takes data from AppUser and saves to store
      this.CommitUserStore();

      // console.log('[LITE -> renderUserData -> AppUser]', this.AppUser);

      // Set the profile pic if not null
      if (this.AppUser.picture) this.picture = this.AppUser.picture;
      // Set the subscriber name
      if (this.AppUser.subscribername) this.subscribername = this.AppUser.subscribername;
      // Set the email
      if (this.AppUser.email) this.userEmail = this.AppUser.userEmail;
    },
    subscribeBtnClickCB () {
      // Close Menu
      EventBus.$emit('toggleMenuEvent', false);
      // Show subscribe popup
      EventBus.$emit('subscribePopupEvent', true);
    }
  },
  mixins: [ User ]
}
</script>

<style lang="scss">
</style>
