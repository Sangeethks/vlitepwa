<template>
  <div class="vlt-ms-pr">
    <div class="pr-user" v-if="hasUser">
      <Profile></Profile>
      <div class="btns">
        <button type="button" class="btn-md-primary inverted" @click="logoutClickCB">Logout</button>
      </div>
    </div>
    <div v-else>
      <router-link :to="{ name: 'Login' }" tag="button" class="btn-md-primary inverted">Login</router-link>
    </div>
  </div>
</template>

<script>
import Profile from '@/components/Header/Menu/Profile.vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { EventBus } from '@/main';
import User from '@/mixins/User';
import App from '@/mixins/App';

export default {
  name: 'MenuMOOCTemplate',
  data () {
    return {
      hasUser: false
    }
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
  components: {
    Profile
  },
  methods: {
    ...mapMutations([
      'CommitUserStore'
    ]),
    ...mapActions([
      'actLogout'
    ]),
    logoutClickCB () {
      // Show the loader
      this.toggleLoader(true);

      this.actLogout().then(response => {
        // console.log('[logoutClickCB response]', response);

        localStorage.removeItem('AppUser');

        // Reload the window
        window.location.reload();
      }).catch(error => {
        // console.log('[logoutClickCB error]', error);

        // Reload the window
        window.location.reload();
      });
    },
    checkTemplateState () {
      // console.log('[LITERegistered checkTemplateState]');

      // Takes data from AppUser and saves to store
      this.CommitUserStore();

      if (this.AppUser) {
        // Set this to true to set the template to user logged in state
        this.hasUser = true;
      } else {
        this.hasUser = false;
      }
    },
    AppUserChangeCB (state) {
      this.checkTemplateState();
    }
  },
  beforeDestroy () {
    EventBus.$off('AppUserChangeEvent', this.AppUserChangeCB);
  },
  mixins: [ User, App ]
}
</script>

<style lang="scss" scoped>
.pr-user {
  .btns {
    text-align: center;
    margin: 10px 0;
  }
}
</style>
