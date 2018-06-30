<template>
  <div class="vlt-loader" id="vlt-loader">
    <div class="loader-img">
      <img src="@/assets/icons/loader.svg">
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppLoader'
}
</script>

<style lang="scss" scoped>
.vlt-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background-color: #fff;
  .loader-img {
    position: relative;
    text-align: center;
    top: 50%;
    transform: translateY(-50%);
    img {
      width: 5%;
    }
  }
}
</style>
