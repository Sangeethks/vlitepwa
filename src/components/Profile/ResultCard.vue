<template>
  <div class="vlt-result-card" id="vlt-result-card">
    <div class="card-box" v-if="course">
      <div class="head">
        <h4>{{course.contenttitle}}</h4>
        <p>{{course.startdate}}</p>
        <div class="clearfix"></div>
      </div>
      <div class="contain">
        <div class="credit-head">
          <h1>{{course.credits}}</h1>
          <p>Credits</p>
        </div>

        <div class="lesson-card" v-for="(lesson, i) in lessons" :key="i">
          <div class="left">
            <div class="lesson-img">
              <img :src="lesson.poster">
            </div>
            <div class="lesson-text">
              <p class="l-title">Lesson {{lesson.episodenum}}</p>
              <p class="l-title">{{lesson.contenttitle}}</p>
              <p class="l-date">Completed on: {{lesson.startdate}}</p>
            </div>
          </div>
          <div class="right" v-if="lesson.mcq">
            <p class="l-mark">{{lesson.mcq.correct}}/{{lesson.mcq.total}}</p>
          </div>
          <div class="clearfix"></div>
        </div>
      </div>

      <div class="box-loader" v-show="showBoxLoader">
        <img src="@/assets/icons/91.svg">
      </div>
      <!-- .box-loader -->
    </div>
    <!-- .card-box -->

    <div class="card-overlay" @click="hideCardCB"></div>
  </div>
</template>

<script>
import { EventBus } from '@/main';
import App from '@/mixins/App';
import { mapGetters, mapMutations } from 'vuex';
import firebase from 'firebase';

export default {
  name: 'ProfileResultCard',
  data () {
    return {
      showBoxLoader: true,
      course: undefined,
      lessons: undefined
    }
  },
  computed: {
    ...mapGetters([
      'AppVendor',
      'AppUser'
    ])
  },
  created () {
    EventBus.$on('fetchCourseResultEvent', this.fetchCourseResultCB);
  },
  methods: {
    ...mapMutations([
      'CommitConfigStore',
      'CommitUserStore'
    ]),
    fetchCourseResultCB (state, contentid) {
      // console.log('[ResultCard -> fetchCourseResultCB -> contentid]', contentid);

      // Make the body sticky. Defined in App Mixin
      this.togglePageSticky(state);
      // Show the loader on the card according to state
      this.showBoxLoader = state;
      // Takes data from AppConfig storage and saves to store
      this.CommitConfigStore();
      // Takes data from AppUser storage and saves to store
      this.CommitUserStore();
      // If no subscriberid or vendorid, don't continue
      if (!(this.vendorid && this.subscriberid)) return;
      // Create firebase path
      let path = `${this.vendorid}/subscriber/${this.subscriberid}/courses/${this.level}/${contentid}`;
      // Fetch from firebase
      firebase.database().ref(path).on('value', snapshot => {
        // save to data property
        this.course = snapshot.val();
        // Get the lessons
        this.lessons = this.course.lesson;
        // Hide the loader
        this.showBoxLoader = false;
      });
    },
    hideCardCB () {
      // Make the body non-sticky. Defined in App Mixin
      this.togglePageSticky(false);
      // Emit event to close the result card
      EventBus.$emit('toggleResultCardEvent', false);
    }
  },
  beforeDestroy () {
    EventBus.$off('fetchCourseResultEvent', this.fetchCourseResultCB);
  },
  mixins: [ App ]
}
</script>

<style lang="scss">
@import '~sass/modules/variables';

.vlt-result-card {
  .card-box {
    position: fixed;
    width: 450px;
    background-color: #ffffff;
    box-shadow: 0px 1px 10px 1px;
    display: inline-block;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 92;
    .box-loader {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      text-align: center;
      background-color: $clr-white;
      img {
        margin-top: 50%;
        transform: translateY(-50%);
      }
    }
  }
  .card-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
    z-index: 91;
  }
  .head {
    background-color: $clr-dark-grad-2;
    padding: 10px 20px;
    h4 {
      color: $clr-white;
      float: left;
    }
    p {
      float: right;
      color: $clr-white-2;
      font-size: $text-xs;
      line-height: 30px;
    }
  }
  .contain {
    padding: 0 20px;
    height: 380px;
    overflow-y: scroll;
  }
  .credit-head {
    text-align: center;
    border-bottom: 1px solid $clr-grey-light;
    padding: 10px;
    margin-bottom: 15px;
  }
  .lesson-card {
    padding: 7px 0;
    border-bottom: 1px solid $clr-grey-light;
    margin-bottom: 7px;
    .left {
      float: left;
      .lesson-img, .lesson-text {
        float: left;
      }
      .lesson-img {
        margin-right: 10px;
        img {
          width: 80px;
        }
      }
      .l-title {
        font-size: $text-xs;
        line-height: 14px;
      }
      .l-date {
        font-size: 12px;
      }
    }
    .right {
      float: right;
    }
  }
}
</style>
