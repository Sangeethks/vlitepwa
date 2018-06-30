<template>
  <div>
    <div class="hamb-btn vlt-dark" v-show="showHamburger">
      <button type="button" class="btn-hamb lite" @click="showMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
    <div class="vlt-header-logo">
      <router-link :to="{ name: 'Home' }">
        <img src="@/assets/icons/logo-white.svg" alt="vlite-logo">
      </router-link>
    </div>

    <div class="clearfix"></div>
  </div>
</template>

<script>
import { EventBus } from '@/main'

export default {
  name: 'HeaderLeft',
  data () {
    return {
      showHamburger: true,
      denyRoutes: ['Login', 'Signup']
    }
  },
  created () {
    this.initTemplate();
  },
  methods: {
    initTemplate () {
      let routeName = this.$route.name;

      // console.log('[HeaderLeft -> routeName]', routeName);

      // If route name value is present in denyRoutes, then don't show the Hamburger button
      if (this.denyRoutes.includes(routeName)) this.showHamburger = false;
    },
    showMenu () {
      EventBus.$emit('toggleMenuEvent', true);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~sass/modules/components';

.hamb-btn, .vlt-header-logo {
  float: left;
}
.hamb-btn {
  padding-top: 10px;
}
.vlt-header-logo {
  display: inline-block;
  padding: 0 20px;
  img {
    width: 90px;
  }
}
</style>
