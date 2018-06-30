<template>
  <div class="vlt-header-trans">
    <!-- Header -->
    <Header></Header>
  </div>
</template>

<script>
import Header from '@/components/Header/Header.vue'

export default {
  name: 'HeaderTrans',
  components: {
    Header
  }
}
</script>

<style lang="scss" scoped>
@import '~sass/modules/variables';

.vlt-header-trans {
  padding: 0 30px;
  background: $clr-dark-grad-1;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, $clr-dark-grad-1, transparent);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, $clr-dark-grad-1, transparent); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
</style>
