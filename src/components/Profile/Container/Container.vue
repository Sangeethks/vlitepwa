<template>
  <div class="container">
    <div class="profile-container">
      <components :is="template"></components>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import LITEPrivate from '@/components/Profile/Container/LITEPrivate.vue';
import MOOCPrivate from '@/components/Profile/Container/MOOCPrivate.vue';

export default {
  name: 'ProfileContainer',
  data () {
    return {
      template: undefined
    }
  },
  computed: {
    ...mapGetters([
      'AppConfig',
      'AppUser'
    ])
  },
  components: {
    LITEPrivate,
    MOOCPrivate
  },
  created () {
    this.initContainer();
  },
  methods: {
    ...mapMutations([
      'CommitConfigStore'
    ]),
    initContainer () {
      // Mutation defined in User Store
      this.CommitConfigStore();
      // If config data is not available, return
      if (!this.AppConfig) return;
      // Condition the platform
      switch (this.AppConfig.platform) {
        case 'MOOC':
          this.template = this.AppUser ? 'MOOCPrivate' : false;
          break;
        case 'LITE':
          this.template = this.AppUser ? 'LITEPrivate' : false;
          break;
        default:
          this.template = false;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-container {
  position: relative;
  width: 60%;
  margin: 20px auto;
}
</style>
