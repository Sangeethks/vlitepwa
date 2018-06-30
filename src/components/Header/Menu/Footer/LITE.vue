<template>
  <button type="button" class="btn-lg-primary inverted menu-unsub-btn" @click="unsubscribeClickCB">Unsubscribe</button>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import App from '@/mixins/App';
import User from '@/mixins/User';
import { EventBus } from '@/main';

export default {
  name: 'MenuFooterLITE',
  computed: {
    ...mapGetters([
      'email'
    ])
  },
  methods: {
    ...mapMutations([
      'CommitLocalStore'
    ]),
    ...mapActions([
      'actUnsubscribe'
    ]),
    unsubscribeClickCB () {
      // Defined in Mixin App.js. Show the loader
      this.toggleLoader(true);
      // Mutation defined in Store User.js
      this.CommitUserStore();
      // If no user return
      if (!this.email) return;
      // Get the user email from AppUser
      let email = this.email;

      // console.log('[Menu.vue -> getProfileComponent -> email]', email);

      // Make the delete API call
      this.actUnsubscribe({ email }).then(response => {
        // console.log('[Menu unsubscribeClickCB response]', response);

        // Remove User data from local storage
        localStorage.removeItem('AppUser');
        // Emit an event to homepage
        EventBus.$emit('AppUserChangeEvent', false);
        // Redirect to Home page
        this.$router.push({ name: 'Home' });
      }).catch(error => {
        // console.log('[Menu unsubscribeClickCB response]', error);
      });
    }
  },
  mixins: [ App, User ]
}
</script>

<style lang="scss">
</style>
