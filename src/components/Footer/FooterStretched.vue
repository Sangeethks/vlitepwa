<template>
  <div class="vlt-footer">
    <div class="container">
      <div class="row">
        <FooterContent></FooterContent>
      </div>
    </div>
  </div>
</template>

<script>
import FooterContent from './FooterContent.vue'

export default {
  components: {
    FooterContent
  }
}
</script>

<style lang="scss" scoped>
@import '~sass/modules/variables';

.vlt-footer {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  background-color: $clr-white-1;
  padding: 10px 20px 15px;
}
</style>
