<template>
  <div class="vlt-404">
    <HeaderDark></HeaderDark>
    <div class="sec-404">
      <div class="sec-content">
        <img src="@/assets/icons/broken-link.svg">
        <h4 class="oops-head">Oops !</h4>
        <p class="oops-text">Something happened. Please retry. If the problem still persists, <router-link :to="{ name: 'Support' }" class="link">contact support</router-link></p>
         <button type="button" class="btn-md-hollow inverted retry-btn">Retry</button>
      </div>
    </div>
    <FooterStretched></FooterStretched>
  </div>
</template>

<script>
import HeaderDark from '@/components/Header/Dark/HeaderDark.vue';
import FooterStretched from '@/components/Footer/FooterStretched.vue'
import App from '@/mixins/App';

export default {
  name: 'Page404',
  components: {
    HeaderDark,
    FooterStretched
  },
  mounted () {
    this.toggleLoader(false);
  },
  mixins: [ App ]
}
</script>

<style lang="scss">
@import '~sass/modules/variables';

.sec-404 {
  width: 30%;
  margin: 12em auto;
  text-align: center;
  .oops-head {
    margin: 20px 0;
  }
  .oops-text, .link {
    color: $clr-grey-light;
  }
  .link {
    text-decoration: underline;
  }
  .retry-btn {
    margin-top: 40px;
    width: 180px;
  }
}
</style>
