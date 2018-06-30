<template>
  <div class="vlt-content faq-container">
    <div class="vlt-faqs-data" v-if="faqsData">
      <h5 v-if="faqsData.faqtitle">{{faqsData.faqtitle}}</h5>
      <div class="vlt-faq-tickets" v-if="faqsData.faqdata && faqsData.faqdata.length">
        <p class="ticket-title">My Tickets</p>
        <div class="vlt-faq-sec" v-for="(faq, i) in faqsData.faqdata" :key="faq.faqno" :id="`faq-sec-${i}`" :class="isSecActive(i)" :data-action="getDataAction(i)">
          <div class="faq-qstn" @click="toggleAnswer(i)">
            <p>{{faq.faqquestion}}</p>
            <div class="faq-collapse">
              <img :src="getCollapseIco(i)" class="collapse-ico" :id="`collapse-ico-${i}`">
            </div>
            <div class="clearfix"></div>
          </div>
          <div class="faq-answ" :id="`faq-answ-${i}`">
            <p>{{faq.faqanswer}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="no-help" v-else>
      <h4>Sorry, help isn't available right now</h4>
    </div>

    <div class="vlt-faq-support">
      <div class="support-box">
        <button type="button" class="btn-lg-primary inverted support-btn" @click="faqSupportPopupCB(true)">Contact Support</button>
      </div>
    </div>

    <FaqSupport v-show="showFaqSupport"></FaqSupport>
  </div>
</template>

<script>
import FaqSupport from '@/components/Popups/FaqSupport.vue';
import { mapActions } from 'vuex';
import { EventBus } from '@/main';

export default {
  name: 'HelpContent',
  data () {
    return {
      faqsData: undefined,
      toggleIco: undefined,
      showFaqSupport: false,
      minusIco: require('@/assets/icons/minus.svg'),
      plusIco: require('@/assets/icons/plus.svg')
    }
  },
  created () {
    this.getFaqsData();

    EventBus.$on('faqSupportPopupEvent', this.faqSupportPopupCB);
  },
  methods: {
    ...mapActions([
      'getFaqJSON'
    ]),
    getFaqsData () {
      this.getFaqJSON().then(response => {
        // console.log('[Help -> Content.vue -> getFaqsData -> response]', response);

        if (response.ok && response.status === 200) {
          this.faqsData = response.body;
        }
      }).catch(error => {
        // console.log('[Help -> Content.vue -> getFaqsData -> error]', error);

      });
    },
    toggleAnswer (index) {
      // NOTE: KEEP IT FOR THE TIME BEING
      // // Remove 'active' class from all the sections
      // let faqSecs = document.querySelectorAll('.vlt-faq-sec');
      // faqSecs.forEach((el) => {
      //   el.classList.remove('active');
      // });

      // Section section with index id
      let clickedSec = document.getElementById(`faq-sec-${index}`);
      // If unable to get the element
      if (!clickedSec) return;
      // Get the data action
      let action = clickedSec.getAttribute('data-action');
      // Get collapse icon
      let collapseIco = document.getElementById(`collapse-ico-${index}`);

      if (action == 'minus') {
        // Add active class to the element
        clickedSec.classList.remove('active');
        clickedSec.setAttribute('data-action', 'add');
        // Change image
        collapseIco.src = this.plusIco;
      } else {
        // Add active class to the element
        clickedSec.classList.add('active');
        clickedSec.setAttribute('data-action', 'minus');
        // Change image
        collapseIco.src = this.minusIco;
      }
    },
    faqSupportPopupCB (state) {
      this.showFaqSupport = state;
    },
    getCollapseIco (index) {
      return index === 0 ? this.minusIco : this.plusIco;
    },
    getDataAction (index) {
      return index === 0 ? 'minus' : 'plus';
    },
    isSecActive (index) {
      return index === 0 ? 'active' : '';
    }
  },
  components: {
    FaqSupport
  },
  beforeDestroy () {
    EventBus.$off('faqSupportPopupEvent', this.faqSupportPopupCB);
  }
}
</script>

<style lang="scss" scoped>
@import '~sass/modules/variables';

.faq-container {
  width: 40%;
  margin: 2em auto 8em;
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
  .no-help {
    margin: 10em 0;
    text-align: center;
  }
}
.collapse-ico {
  width: 16px;
}
.ticket-title {
  color: $clr-grey-light;
  font-size: 17px;
}
.vlt-faq-sec {
  border-bottom: 1px solid $clr-border-grey;
  padding: 8px 0;
  margin-bottom: 10px;
  &:last-child {
    border: none;
  }
}
.faq-qstn {
  cursor: pointer;
  user-select: none;
  p {
    color: $clr-grey-dark;
    float: left;
    font-weight: 700;
  }
  .faq-collapse {
    float: right;
    img {
      vertical-align: middle;
    }
  }
}
.faq-answ {
  height: 0;
  opacity: 0;
  overflow: hidden;
  transition: height 0s, opacity 0.3s ease;
}
.active {
  .faq-answ {
    height: auto;
    opacity: 1;
  }
}
.support-box {
  text-align: center;
  margin: 40px 0;
  .support-btn {
    width: auto;
    display: inline-block;
  }
}
</style>
