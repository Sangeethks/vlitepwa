<template>
  <div class="vlt-header-dark">
    <div class="container">
      <div class="row">
        <Header></Header>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue'

export default {
  name: 'HeaderDark',
  components: {
    Header
  }
}
</script>

<style lang="scss" scoped>
@import '~sass/modules/components';

.vlt-header-dark {
  @extend .primary-bg.inverted;
}
</style>
