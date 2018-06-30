<template>
  <div class="Help">
    <HeaderDark></HeaderDark>
    <Content></Content>
    <FooterStretched></FooterStretched>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import HeaderDark from '@/components/Header/Dark/HeaderDark.vue'
import Content from './Content.vue'
import FooterStretched from '@/components/Footer/FooterStretched.vue'
import App from '@/mixins/App';

export default {
  name: 'Help',
  mounted () {
    // Hide the loader
    this.toggleLoader(false);
  },
  components: {
    HeaderDark,
    Content,
    FooterStretched
  },
  mixins: [ App ]
}
</script>

<style lang="scss">
</style>
