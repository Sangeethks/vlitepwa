<template>
  <div class="vlt-login">
    <!-- Header Dark -->
    <HeaderDark class="home-header"></HeaderDark>
    <!-- Login Form -->
    <LoginForm></LoginForm>
    <!-- footer -->
    <FooterStretched></FooterStretched>

    <transition name="popup-animate">
      <ResetPassword v-if="showResetPassword"></ResetPassword>
    </transition>
  </div>
</template>

<script>
import HeaderDark from '@/components/Header/Dark/HeaderDark.vue';
import LoginForm from '@/components/Login/LoginForm.vue';
import FooterStretched from '@/components/Footer/FooterStretched.vue';
import { EventBus } from '@/main';

const ResetPassword = () => import(/* webpackChunkName: "Popup-ResetPassword" */ '@/components/Popups/ResetPassword.vue');

export default {
  name: 'Login',
  data () {
    return {
      showResetPassword: false
    }
  },
  components: {
    HeaderDark,
    LoginForm,
    FooterStretched,
    ResetPassword
  },
  created () {
    EventBus.$on('resetPasswordPopupEvent', this.resetPasswordPopupCB);
  },
  methods: {
    resetPasswordPopupCB (state) {
      this.showResetPassword = state;
    }
  },
  beforeDestroy () {
    EventBus.$off('resetPasswordPopupEvent', this.resetPasswordPopupCB);
  }
}
</script>

<style lang="scss">
</style>
