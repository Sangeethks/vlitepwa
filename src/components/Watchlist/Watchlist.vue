<template>
  <div class="vlt-search">
    <HeaderDark></HeaderDark>
    <Container></Container>
    <FooterStretched></FooterStretched>
  </div>
</template>

<script>
import HeaderDark from '@/components/Header/Dark/HeaderDark.vue';
import FooterStretched from '@/components/Footer/FooterStretched.vue';
import Container from './Container.vue';

export default {
  name: 'Watchlist',
  components: {
    HeaderDark,
    FooterStretched,
    Container
  }
}
</script>

<style lang="scss" scoped>
</style>
