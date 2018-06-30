<template>
  <div class="ft-container">
    <slick ref="slick" :options="slickOptions">
      <div class="slick-image" v-for="(content, index) in contents" :key="index">
        <div class="ft-card" ref="featuredCard">
          <router-link :to="getRouterPath(content)">
            <img v-if="content.poster" :src="content.poster" style="width: 100%">
          </router-link>
        </div>
      </div>
    </slick>
  </div>
</template>

<script>
import Slick from 'vue-slick'

export default {
  props: {
    contents: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      slickOptions: {
        infinite: false,
        autoplay: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        adaptiveHeight: true,
        arrows: false,
        draggable: false
      }
    }
  },
  components: {
    'slick': Slick
  },
  mounted () {
    this.renderCardAspect();
  },
  methods: {
    getRouterPath (content) {
      return { name: 'Watch', params: { type: content.contenttype, id: content.contentid } }
    },
    renderCardAspect () {
      // console.log('[featuredCard -> renderCardAspect]');

      let cardContainers = this.$refs.featuredCard;

      for (var i in cardContainers) {
        cardContainers[i].style.height = Math.round(cardContainers[i].offsetWidth / (16/9)) + 'px';
      }
    }
  }
}
</script>

<style lang="scss">
@import '~sass/modules/variables';

.slick-dotted.slick-slider {
  margin: 0;
}
.slick-dots {
  bottom: 25px;
  li {
    button {
      &::before {
        font-size: 10px;
        color: $clr-white-1;
      }
    }
    &.slick-active {
      button {
        &::before {
          opacity: 1;
          color: $clr-white-1;
        }
      }
    }
  }
}
</style>
