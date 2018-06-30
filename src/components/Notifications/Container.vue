<template>
  <div class="ntfs-container">
    <div class="container">
      <div class="ntfs-empty">
        <h4>You don't have any notifications right now</h4>
      </div>
    </div>
  </div>
</template>

<script>
import App from '@/mixins/App';

export default {
  name: 'NotificationsContainer',
  mounted () {
    this.toggleLoader(false);
  },
  mixins: [ App ]
}
</script>

<style lang="scss" scoped>
.ntfs-empty {
  text-align: center;
  margin: 10em 0;
}
</style>
