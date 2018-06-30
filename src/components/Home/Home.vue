<template>
  <div class="vlt-home">
    <div class="home-header">
      <div class="container">
        <div class="row">
          <HeaderTrans></HeaderTrans>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <!-- Carousels - includes the header -->
        <Carousels></Carousels>
        <!-- footer -->
        <FooterDefault></FooterDefault>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderTrans from '@/components/Header/Trans/HeaderTrans.vue';
import Carousels from './Carousels.vue';
import FooterDefault from '@/components/Footer/FooterDefault.vue';
import App from '@/mixins/App';

export default {
  name: 'Home',
  components: {
    Carousels,
    FooterDefault,
    HeaderTrans
  },
  mixins: [ App ]
}
</script>

<style lang="scss" scoped>
.home-header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 220;
}
</style>
