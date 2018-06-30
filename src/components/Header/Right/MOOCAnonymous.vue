<template>
  <div class="vlt-header-anony">
    <!-- Profile Area -->
    <div class="vlt-header-login">
      <router-link :to="{ name: 'Signup' }" tag="button" class="btn-sm-hollow" v-if="showSignup">Signup</router-link>
      <router-link :to="{ name: 'Login' }" tag="button" class="btn-sm-hollow" v-if="showLogin">Login</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MOOCMenuAnonymous',
  data () {
    return {
      showSignup: true,
      showLogin: true,
    }
  },
  created () {
    this.initTemplate();
  },
  methods: {
    initTemplate () {
      let route = this.$route;

      // console.log('[MOOCMenuAnonymous -> initTemplate -> route]', route);

      // If we were in Signup page, don't show the login button on header
      if (route.name === 'Signup') this.showSignup = false;

      // If we were in login page, don't show the login button on header
      if (route.name === 'Login') this.showLogin = false;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~sass/modules/components';

.vlt-header-anony {
  float: left;
  padding: 10px 0;
  .vlt-header-login {
    margin-left: 15px;
  }
  .btn-sm-hollow {
    display: inline-block;
    width: 50px;
  }
}
</style>
