<template>
  <div class="v-header-contain">
    <!-- Header Left Section -->
    <HeaderLeft class="vlt-header-left"></HeaderLeft>
    <!-- Header Right Section -->
    <HeaderRight class="vlt-header-right"></HeaderRight>
    <div class="clearfix"></div>

    <!-- Sidebar -->
    <Menu v-show="showMenu"></Menu>
  </div>
</template>

<script>
import HeaderLeft from '@/components/Header/Left/HeaderLeft.vue';
import HeaderRight from '@/components/Header/Right/HeaderRight.vue';
import Menu from '@/components/Header/Menu/Menu.vue';
import { EventBus } from '@/main';
import App from '@/mixins/App';

export default {
  name: 'Header',
  data () {
    return {
      showMenu: false
    }
  },
  components: {
    HeaderLeft,
    HeaderRight,
    Menu
  },
  created () {
    // console.log('[Header.vue -> created]');

    EventBus.$on('toggleMenuEvent', this.toggleMenuCB)
  },
  methods: {
    toggleMenuCB (state) {
      this.showMenu = state;
      this.togglePageSticky(state);
    }
  },
  mixins: [ App ]
}
</script>

<style lang="scss" scoped>
.v-header-contain {
  padding: 15px 0;
  .vlt-header-left {
    float: left;
  }
  .vlt-header-right {
    float: right;
    position: relative;
  }
}
</style>
