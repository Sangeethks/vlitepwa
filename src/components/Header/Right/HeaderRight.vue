<template>
  <div>
    <!-- Search Input Box -->
    <Search width="220px" v-show="showSearch"></Search>
    <!-- The header right section. The component is determined by the user state -->
    <component :is="template"></component>
    <!-- <Registered v-show="isUserLoggedIn"></Registered> -->
    <div class="clearfix"></div>
  </div>
</template>

<script>
import Search from '@/components/Header/Right/Search.vue';
import MOOCAnonymous from '@/components/Header/Right/MOOCAnonymous.vue';
import MOOCRegistered from '@/components/Header/Right/MOOCRegistered.vue';
import LITEAnonymous from '@/components/Header/Right/LITEAnonymous.vue';
import LITERegistered from '@/components/Header/Right/LITERegistered.vue';
import { EventBus } from '@/main';
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'HeaderRight',
  data () {
    return {
      template: undefined,
      showSearch: true,
      searchDenyRoutes: ['Login', 'Signup', 'Profile']
    }
  },
  computed: {
    ...mapGetters([
      'AppConfig',
      'AppUser'
    ])
  },
  components: {
    Search,
    MOOCAnonymous,
    MOOCRegistered,
    LITEAnonymous,
    LITERegistered
  },
  created () {
    // Get's the template based on platform
    this.getRightTemplate();
    // Determine whether to show or hide the search component
    this.assertSearchTemplate();

    EventBus.$on('AppUserChangeEvent', this.AppUserChangeCB);
  },
  methods: {
    ...mapMutations([
      'CommitConfigStore'
    ]),
    getRightTemplate () {
      // Defined in User Store
      this.CommitConfigStore();
      // If not able to get config data
      if (!this.AppConfig) return;
      // Get the platform name
      let platform = this.AppConfig.platform;
      // Condition the platform
      switch (platform) {
        case 'MOOC':
          this.template = this.AppUser ? 'MOOCRegistered' : 'MOOCAnonymous';
          break;
        case 'MOOC':
          this.template = this.AppUser ? 'LITERegistered' : 'LITEAnonymous';
          break;
        default:
          this.template = false;
      }
    },
    AppUserChangeCB (state) {
      if (!state) return;
      // Get the template component
      this.getRightTemplate();
    },
    assertSearchTemplate () {
      let routeName = this.$route.name;

      // console.log('[HeaderRight -> assertSearchTemplate -> routeName]', routeName);

      if (this.searchDenyRoutes.includes(routeName)) this.showSearch = false;
    }
  },
  beforeDestroy () {
    EventBus.$off('AppUserChangeEvent', this.AppUserChangeCB);
  }
}
</script>

<style lang="scss">
.vlt-header-r-sec {
  float: left;
}
</style>
