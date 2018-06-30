<template>
  <div class="profile-lite">
    <!-- LITEBasics -->
    <LITEBasics></LITEBasics>
  </div>
</template>

<script>
import LITEBasics from '@/components/Profile/User/LITEBasics.vue';
import App from '@/mixins/App';

export default {
  name: 'ProfileContainerLite',
  components: {
    LITEBasics
  },
  mounted () {
    // Hide the loader
    this.toggleLoader(false);
  },
  mixins: [ App ]
}
</script>

<style lang="scss" scoped>
</style>
