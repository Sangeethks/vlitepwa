<template>
  <div class="vlt-header-anony">
    <!-- Profile Area -->
    <div class="vlt-header-login">
      <button type="button" class="btn-sm-hollow" @click="subscribeBtnClickCB">Subscribe</button>
    </div>
  </div>
</template>

<script>
import { EventBus } from '@/main';

export default {
  name: 'HeaderRightLiteAnony',
  methods: {
    subscribeBtnClickCB () {
      EventBus.$emit('subscribePopupEvent', true);
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
}
</style>
