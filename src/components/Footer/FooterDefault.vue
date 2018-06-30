<template>
  <div class="vlt-footer">
    <footer-content></footer-content>
  </div>
</template>

<script>
import FooterContent from './FooterContent.vue';

export default {
  components: {
    'footer-content': FooterContent
  }
}
</script>

<style lang="scss" scoped>
@import '~sass/modules/components';

.vlt-footer {
  background-color: $clr-white-1;
  padding: 10px 20px 15px;
}
</style>
