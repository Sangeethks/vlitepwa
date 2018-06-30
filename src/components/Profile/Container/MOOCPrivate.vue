<template>
  <div class="profile-lite">
    <!-- MOOCBasics -->
    <MOOCBasics></MOOCBasics>
    <Courses></Courses>
  </div>
</template>

<script>
import MOOCBasics from '@/components/Profile/User/MOOCBasics.vue';
import Courses from '@/components/Profile/Courses/Courses.vue';
import App from '@/mixins/App';

export default {
  name: 'ProfileContainerLite',
  components: {
    MOOCBasics,
    Courses
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
