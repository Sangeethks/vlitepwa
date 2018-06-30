<template>
  <div class="vlt-share">
    <div class="vlt-share-contain">
      <button type="button" class="vlt-btn-ico dark">
        <img src="@/assets/icons/share.svg" @click="togglePopup">
      </button>
      <div class="share-popup" v-show="showPopup">
        <div class="share-box">
          <ul>
            <li @click="shareFbCB"><img src="@/assets/icons/twitter.svg" class="share-ico"></li>
            <li>
              <a :href="gplusShareUrl" target="_blank">
                <img src="@/assets/icons/google-plus.svg" class="share-ico">
              </a>
            </li>
            <li>
              <a :href="twitterShareUrl" target="_blank">
                <img src="@/assets/icons/twitter.svg" class="share-ico">
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="share-overlay" v-show="showPopup" @click="closePopup"></div>
  </div>
</template>

<script>
export default {
  name: 'Share',
  props: {
    content: {
      type: Object
    }
  },
  data () {
    return {
      showPopup: false,
      twitterShareUrl: undefined,
      gplusShareUrl: undefined
    }
  },
  created () {
    this.initShare();
  },
  methods: {
    initShare () {
      // console.log('[Share initShare content]', this.content);

      if (!this.content) return;
      // Creating the twitter share URL
      this.twitterShareUrl = 'https://twitter.com/share?url=' + encodeURIComponent(window.location.href) + '&text=Watch ' + this.content.title + ' on vLite';
      // Creating the Google Plus share URL
      this.gplusShareUrl = `https://plus.google.com/share?url=${encodeURIComponent(window.location.href)}`;
    },
    togglePopup () {
      this.showPopup = !this.showPopup;
    },
    closePopup () {
      this.showPopup = false;
    },
    shareFbCB () {
      // Get the URL to be shared
      let link = window.location.href;
      // Get the image to be shown on the feed
      let image = this.content.poster;
      // Get the title to be shown on the feed
      let title = `Watch ${this.content.title} on vLite`;
      // Get the description to be shown on the feed
      let description = this.content.description;

      // Initialize Share
      FB.ui({
        method: 'share_open_graph',
        action_type: 'og.shares',
        action_properties: JSON.stringify({
          object: {
            'og:url': window.location.href,
            'og:title': title,
            'og:description': description,
            'og:image': image
          }
        })
      }, (response) => {
        // console.log('[shareFbCB response]', response);
      });
    },
    shareGpCB () {
      // console.log('[shareGpCB]');
    },
    shareTwCB () {
      // console.log('[shareTwCB]');
    }
  }
}
</script>

<style lang="scss" scoped>
// Top element styles are defined where the component is being declared
.vlt-share-contain {
  position: relative;
  z-index: 89;
  .share-popup {
    position: absolute;
    background-color: #fff;
    padding: 20px 10px;
    width: 200px;
    right: calc(100% - 26px);
    top: 130%;
    box-shadow: 0px 1px 6px 0px #d0d0d0;
    ul {
      text-align: center;
      li {
        display: inline-block;
        margin-right: 20px;
        width: 36px;
        height: 36px;
        background-color: #ddd;
        padding: 10px 0;
        cursor: pointer;
        img {
          width: 22px;
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
  .vlt-btn-ico {
    cursor: pointer;
  }
}
.share-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // background-color: red;
  z-index: 88;
}
</style>
