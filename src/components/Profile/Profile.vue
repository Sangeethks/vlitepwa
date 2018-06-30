<template>
  <div class="vlt-profile">
    <!-- Header Dark -->
    <HeaderDark></HeaderDark>
    <!-- Profile Container -->
    <Container></Container>
    <!-- footer -->
    <FooterStretched></FooterStretched>
  </div>
</template>

<script>
import HeaderDark from '@/components/Header/Dark/HeaderDark.vue'
import Container from '@/components/Profile/Container/Container.vue'
import FooterStretched from '@/components/Footer/FooterStretched.vue'

export default {
  name: 'profile',
  components: {
    HeaderDark,
    Container,
    FooterStretched
  },
  beforeRouteEnter: (to, from, next) => {
    let AppConfig = undefined;
    if (localStorage.getItem('AppConfig')) {
      AppConfig = JSON.parse(localStorage.getItem('AppConfig'));
    }
    if (!AppConfig) return;
    // Get User data
    let AppUser = localStorage.getItem('AppUser');
    // Condition the platform name
    switch (AppConfig.platform) {
      case 'LITE':
        next();
        break;
      case 'MOOC':
        AppUser ? next() : next({ name: 'Login' });
        break;
      default:
        next({ name: 'Page404' });
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
