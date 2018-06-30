<template>
  <div class="list-carousel">
    <h5 class="ls-car-header">{{category}}</h5>
    <Slick ref="slick" :options="slickOptions" @init="slickInitCB" @afterChange="slickAfterChangeCB">
      <div class="slide-box" v-for="(content, index) in contents" :key="index">
        <ContentCard :content="content"></ContentCard>
      </div>
    </Slick>
  </div>
</template>

<script>
import Slick from 'vue-slick';
import jQuery from 'jquery';
import ContentCard from '@/components/Slots/ContentCard.vue';
const prevIco = require('@/assets/icons/previous.svg');
const nextIco = require('@/assets/icons/next.svg');

export default {
  props: {
    contents: {
      type: Array,
      default: () => []
    },
    category: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      slickOptions: {
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: true,
        draggable: false,
        prevArrow: `<div class="slick-prev"><img src=${prevIco}></div>`,
        nextArrow: `<div class="slick-next"><img src=${nextIco}></div>`,
      }
    }
  },
  components: {
    Slick,
    ContentCard
  },
  methods: {
    // The slick slider method
    // method executed on slider init
    slickInitCB (_event, slick) {
      this.renderSlideClass(slick);
    },
    // The slick slider method
    // method executed on slider change. ie. on pressing prev or next button
    slickAfterChangeCB (_event, slick, currentSlide) {
      this.renderSlideClass(slick);
    },
    // Common method to execute the slide rendering.
    // Invoked in slickInitCB() && slickAfterChangeCB()
    renderSlideClass (slick) {
      // Gets an array of slides with class .slide-active
      let activeSlides = []

      slick.$slides.map((i, slide) => {
        // Remove class on init
        slide.classList.remove('slide-first', 'slide-last');

        slide.style.height = Math.round(slide.offsetWidth / (16/9)) + 'px';

        if (slide.classList.contains('slick-active')) {
          activeSlides.push(slide);
        }

        jQuery(slide).hover((event) => {
          jQuery(slide).prevAll().addClass('shift-left');
          jQuery(slide).nextAll().addClass('shift-right');

          jQuery(slide).addClass('current-slide');
        }, (event) => {
          jQuery(slide).prevAll().removeClass('shift-left');
          jQuery(slide).nextAll().removeClass('shift-right');

          jQuery(slide).removeClass('current-slide');
        })
      })

      // console.log('[List -> slickInitCB -> activeSlides ]', activeSlides)

      activeSlides[0].classList.add('slide-first')
      if (activeSlides.length > 1) {
        activeSlides[activeSlides.length - 1].classList.add('slide-last')
      }
    }
  }
}
</script>

<style lang="scss">
@import '~sass/modules/variables';
@import '~sass/modules/content-card';

// Set the margin-left to 0 to make the carousel align to left
.slick-track {
  margin-left: 0;
}
.list-carousel {
  .slick-track {
    padding: 26px 0;
  }
}
.slick-slide {
  margin: 0 5px;
}
.slick-list {
  margin: 0 -5px;
}
.slick-prev {
  right: 40px;
  left: auto;
  &::before {
    content: "";
  }
}
.slick-next {
  right: 0;
  &::before {
    content: "";
  }
}
.slick-prev, .slick-next {
  position: absolute;
  top: 0;
  width: auto !important;
  height: auto !important;
  img {
    width: 26px;
  }
}
.slick-prev.slick-disabled:before, .slick-next.slick-disabled:before {
  opacity: 1;
}
.slick-prev.slick-disabled, .slick-next.slick-disabled {
  opacity: 0.3;
}

.list-carousel {
  .ls-car-header {
    position: relative;
    top: 12px;
  }
  $scale-value: 1.2;

  .slick-slide {
    // Defined in _content-card sass module
    @extend .slide;
    &.slide-first {
      &:hover {
        z-index: 12;
        transform: translate3d(30px, 0, 0) scale($scale-value);
      }
    }
    &.slide-last {
      &:hover {
        z-index: 9999;
        transform: translate3d(-30px, 0, 0) scale($scale-value);
      }
    }
    &.shift-left {
      transform: translate3d(-35px, 0, 0);
      -webkit-transform: translate3d(-35px, 0, 0);
      -moz-transform: translate3d(-35px, 0, 0);
    }
    &.shift-right {
      transform: translate3d(25px, 0, 0);
      -webkit-transform: translate3d(25px, 0, 0);
      -moz-transform: translate3d(25px, 0, 0);
    }
  }
}
</style>
