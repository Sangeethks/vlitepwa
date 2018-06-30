<template>
  <div>
    <div class="top">
      <div class="tp-left">
        <div class="tpl-logo">
          <img src="@/assets/icons/logo-black.svg" alt="vlite-logo">
        </div>
        <ul>
          <li><router-link :to="{ name: 'About' }">About</router-link></li>
          <li><router-link :to="{ name: 'About' }">Press</router-link></li>
          <li><router-link :to="{ name: 'About' }">Copyright</router-link></li>
        </ul>
      </div>
      <div class="tp-right">
        <ul>
          <li><router-link :to="{ name: 'TermsOfUse' }">Terms Of Use</router-link></li>
          <li><router-link :to="{ name: 'PrivacyPolicy' }">Privacy Policy</router-link></li>
        </ul>
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="bottom">
      <div class="bt-left">
        <p>&copy;2017 vLite</p>
      </div>
      <div class="bt-right">
        <p>Powered by Mobiotics</p>
      </div>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
@import '~sass/modules/components';

.top {
  padding: 5px;
  margin-bottom: 10px;
  border-bottom: 1px solid $clr-white-2;
  .tpl-logo {
    img {
      width: 70px;
    }
  }
  ul {
    li {
      display: inline-block;
      padding: 8px 0;
      a {
        font-size: $text-xs;
        display: block;
        margin-left: 30px;
      }
    }
  }
}
.bottom {
  p {
    font-size: $text-xs;
    font-weight: 300;
    color: $clr-dark-grad-2;
  }
}
.tp-right, .bt-right {
  float: right;
}
.tp-left, .tpl-logo, .bt-left, ul {
  float: left
}
</style>
