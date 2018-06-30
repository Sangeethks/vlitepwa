<template>
  <div class="vlt-notifications">
    <HeaderDark></HeaderDark>
    <Container></Container>
    <FooterStretched></FooterStretched>
  </div>
</template>

<script>
import HeaderDark from '@/components/Header/Dark/HeaderDark.vue'
import Container from './Container.vue'
import FooterStretched from '@/components/Footer/FooterStretched.vue'

export default {
  name: 'Notifications',
  components: {
    HeaderDark,
    Container,
    FooterStretched
  }
}
</script>

<style lang="scss">
</style>
