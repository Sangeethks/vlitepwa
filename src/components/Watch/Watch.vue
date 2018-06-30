<template>
  <div class="vlt-watch">
    <!-- Header Dark -->
    <HeaderDark></HeaderDark>
    <!-- Playback -->
    <Playback></Playback>
    <!-- footer -->
    <FooterStretched></FooterStretched>
  </div>
</template>

<script>
import Playback from '@/components/Watch/Playback.vue';

// Load the below components asyncronously.
const HeaderDark = () => import(/* webpackChunkName: "Watch-HeaderDark" */ '@/components/Header/Dark/HeaderDark.vue');
const FooterStretched = () => import(/* webpackChunkName: "Watch-FooterStretched" */ '@/components/Footer/FooterStretched.vue');

export default {
  name: 'Watch',
  components: {
    HeaderDark,
    Playback,
    FooterStretched
  }
}
</script>

<style lang="scss">
</style>
