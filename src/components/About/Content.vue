<template>
  <div class="vlt-content container">
    <h2>About vLite</h2>
    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.</p>
    <p>Praesent dapibus, neque id cursus faucibus, tortor neque egestas auguae, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus. Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus. Nam nulla quam, gravida non, commodo a, sodales sit amet, nisi.</p>

    <div class="subscribe-sec" v-if="showSubscribe">
      <div class="form-group">
        <button type="submit" class="btn-lg-primary inverted" @click="subscribePopupCB(true)">Subscribe</button>
      </div>
    </div>

    <div class="follow-sec">
      <h4>FOLLOW US</h4>
      <div class="follow-social">
        <ul>
          <li><a href="https://www.facebook.com/mobiotics" target="_blank" class="ico fb-ico"><img src="@/assets/icons/facebook.svg"></a></li>
          <li><a href="https://twitter.com/mobiotics" target="_blank" class="ico tw-ico"><img src="@/assets/icons/twitter.svg"></a></li>
          <li><a href="https://plus.google.com/106588943035549674608" target="_blank" class="ico gp-ico"><img src="@/assets/icons/google-plus.svg"></a></li>
        </ul>
      </div>
      <h5 class="mob-link">www.mobiotics.com/vlive</h5>
      <p class="text-xs">Powered by Mobiotics</p>
    </div>

    <Subscribe v-if="showSubscribePopup"></Subscribe>
  </div>
</template>

<script>
import Subscribe from '@/components/Popups/Subscribe.vue';
import Utility from '@/mixins/Utility';
import { mapGetters, mapMutations } from 'vuex';
import { EventBus } from '@/main';

export default {
  name: 'About',
  data () {
    return {
      userEmail: '',
      errLabelEmail: '',
      subscribeMessage: '',
      showSubscribe: false,
      showSubscribePopup: false
    }
  },
  computed: {
    ...mapGetters([
      'AppUser'
    ])
  },
  created () {
    // To determing whether to show or hide the subscribe section
    this.assertSubscribeVisible();

    EventBus.$on('subscribePopupEvent', this.subscribePopupCB);
    EventBus.$on('AppUserChangeEvent', this.AppUserChangeCB);
  },
  methods: {
    ...mapMutations([
      'CommitUserStore'
    ]),
    subscribePopupCB (state) {
      this.showSubscribePopup = state;
    },
    AppUserChangeCB (state) {
      this.showSubscribe = !state;
    },
    assertSubscribeVisible () {
      this.CommitUserStore();
      this.showSubscribe = this.AppUser ? false : true;
    }
  },
  components: {
    Subscribe
  },
  beforeDestroy () {
    EventBus.$off('subscribePopupEvent', this.subscribePopupCB);
  },
  mixins: [ Utility ]
}
</script>

<style lang="scss" scoped>
@import '~sass/modules/variables';

.vlt-content {
  margin-top: 40px;
  margin-bottom: 8em;
  h2 {
    margin-bottom: 20px;
  }
  h2, h5 {
    font-weight: 600;
  }
  h5, p {
    margin-bottom: 12px;
  }
  ul {
    margin-top: 12px;
    &.bulleted {
      margin-left: 20px;
      li {
        list-style: circle;
      }
    }
  }
  .subscribe-sec, .follow-sec {
    padding: 30px 0;
    text-align: center;
  }
  .follow-sec {
    border-top: 1px solid $clr-border-grey;
  }
  .follow-social {
    ul {
      margin: 20px 0;
      li {
        display: inline-block;
        a {
          margin-right: 22px;
          display: block;
          &.ico {
            padding: 18px;
            border-radius: 16px;
          }
          &.fb-ico {
            background-color: $clr-fb-blue;
          }
          &.tw-ico {
            background-color: $clr-tw-blue;
          }
          &.gp-ico {
            background-color: $clr-gp-red;
          }
          img {
            width: 24px;
            vertical-align: middle;
          }
        }
      }
    }
  }
  .form-group {
    display: inline-block;
  }
}
</style>
