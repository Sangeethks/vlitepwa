<template>
  <div class="vlt-signup">
    <!-- Header Dark -->
    <HeaderDark class="home-header"></HeaderDark>
    <!-- Login Form -->
    <SignupForm></SignupForm>
    <!-- footer -->
    <FooterStretched></FooterStretched>
  </div>
</template>

<script>
import HeaderDark from '@/components/Header/Dark/HeaderDark.vue'
import SignupForm from '@/components/Signup/SignupForm.vue'
import FooterStretched from '@/components/Footer/FooterStretched.vue'

export default {
  components: {
    HeaderDark,
    SignupForm,
    FooterStretched
  }
}
</script>

<style lang="scss">
</style>
