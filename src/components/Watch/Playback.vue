<template>
  <div class="vlt-playback">
    <!-- Player -->
    <Player></Player>
    <!-- Details -->
    <Details></Details>
    <!-- Contents -->
    <Related></Related>
  </div>
</template>

<script>
import Player from '@/components/Watch/Player/Player.vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import App from '@/mixins/App';
import User from '@/mixins/User';
import { EventBus } from '@/main';

// Load the below components asyncronously.
const Details = () => import(/* webpackChunkName: "Playback-Details" */ '@/components/Watch/Details/Details.vue');
const Related = () => import(/* webpackChunkName: "Playback-Related" */ '@/components/Watch/Related/Related.vue');

export default {
  name: 'Playback',
  data () {
    return {
      contenttype: undefined,
      contentid: undefined,
      content: undefined
    }
  },
  components: {
    Player,
    Details,
    Related
  },
  computed: {
    ...mapGetters([
      'AppActive'
    ])
  },
  watch: {
    AppActive () {
      this.initPlayback();
    },
    '$route' (to, from) {
      this.initPlayback();
    }
  },
  created () {
    this.initPlayback();
  },
  methods: {
    ...mapActions([
      // Defined in Contents.js Store
      'actGetContent'
    ]),
    initPlayback () {
      // console.log('[Playback -> initPlayback -> AppActive]', this.AppActive);

      // If app is not active, don't continue
      if (!this.AppActive) return;

      // Initialize the component data from the router
      this.contenttype = this.$route.params.type;
      this.contentid = this.$route.params.id;

      this.getContent();
    },
    getContent () {
      // console.log('[Playback.vue -> getContent]');

      // Defined in Contents.js Store
      this.actGetContent(this.contentid).then(response => {
        // console.log('[Playback.vue -> getContent() -> actGetContent() -> response]', response);

        // If no repsonse, then don't continue
        if (!response) return;
        // Set the response to the data property
        this.content = response;
        // The following event is emitted to pass the content data to the player component. This will fetch the playlist and render the player accordingly
        EventBus.$emit('renderPlayerEvent', this.content);
        // The following event is emitted to pass the content data to the Details.vue component. This will render the meta details of the content and the watchlist information
        EventBus.$emit('renderDetailsEvent', this.content);
        // After setting the data property, go for rendering the related section
        EventBus.$emit('renderRelatedEvent', this.content);
      }).catch(error => {
        // console.log('[Playback] getContent error', error);

        if (error.status === 401) {
          this.sessionExpiredCB();
          this.$router.push({ name: 'Login' });
        } 
      });
    }
  },
  mixins: [ App, User ]
}
</script>

<style lang="scss">
</style>
