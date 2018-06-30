<template>
  <div class="cmpl-courses" v-show="showTemplate">
    <div class="cmpl-crs-head">
      <h5>Courses</h5>
    </div>

    <div class="cmpl-crs-card" v-for="(course, i) in completedCourses" :key="i">
      <div class="left">
        <div class="crs-img">
          <img :src="course.poster">
        </div>
        <div class="crs-text">
          <h6>{{course.contenttitle}}</h6>
          <p>{{course.enddate}}</p>
        </div>
      </div>
      <div class="right">
        <h5>{{course.credits}} Credits</h5>
        <button type="button" class="btn-md-hollow inverted" @click="showResultCB(course.contentid)" v-if="showViewResultBtn(course)">View Result</button>
        <button type="button" class="btn-md-hollow inverted" @click="resumeCourseCB(course)" v-else>Resume</button>
      </div>
      <div class="clearfix"></div>
    </div>

    <ResultCard v-show="showResultCard"></ResultCard>
  </div>
</template>

<script>
import ResultCard from '@/components/Profile/ResultCard.vue';
import { mapGetters, mapMutations } from 'vuex';
import { EventBus } from '@/main';
import firebase from 'firebase';

export default {
  name: 'ProfileCourses',
  data () {
    return {
      showTemplate: false,
      cardStyle: {
        visibility: 'hidden'
      },
      showResultCard: false,
      completedCourses: undefined
    }
  },
  computed: {
    ...mapGetters([
      'vendorid',
      'vendorkey',
      'subscriberid',
      'level'
    ])
  },
  components: {
    ResultCard
  },
  created () {
    // Entry point of the component
    this.initCourses();

    EventBus.$on('toggleResultCardEvent', this.toggleResultCardCB);
  },
  methods: {
    ...mapMutations([
      'CommitConfigStore',
      'CommitUserStore'
    ]),
    initCourses () {
      this.fetchCoursesOnFire();
    },
    fetchCoursesOnFire () {
      // Takes data from AppConfig storage and saves to store
      this.CommitConfigStore();
      // Takes data from AppUser storage and saves to store
      this.CommitUserStore();

      // If no subscriberid or vendorid, don't continue
      if (!(this.vendorid && this.subscriberid)) return;
      // Create firebase path
      let path = `${this.vendorid}/subscriber/${this.subscriberid}/courses/${this.level}`;
      // Fetch from firebase
      firebase.database().ref(path).on('value', snapshot => {
        // If no course data exists in firebase, hide the template
        if (snapshot.val() === null) return this.showTemplate = false;

        let completedCourses = [];
        snapshot.forEach(child => {
          // Credits node will come inside the result collection. Get rid of that node.
          if (child.key == 'credits') return;
          // Get the course
          let course = child.val();
          course = { contentid: child.key, ...course };
          // Now push courses to completedCourses array
          completedCourses.push(course);
        });

        // console.log('[Courses -> fetchCoursesOnFire -> completedCourses]', completedCourses);

        // Set courses to data property
        this.completedCourses = completedCourses;
      });
    },
    showResultCB (contentid) {
      // Show the result card
      this.showResultCard = true;
      // Pass an event to fetch the result to show inside the result card when it is shown
      EventBus.$emit('fetchCourseResultEvent', true, contentid);
    },
    showViewResultBtn (course) {
      return course.status === 'COMPLETED';
    },
    resumeCourseCB (course) {
      // console.log('[Courses -> resumeCourseCB -> course]', course);
    },
    toggleResultCardCB (state) {
      this.showResultCard = state;
    }
  },
  beforeDestroy () {
    EventBus.$off('toggleResultCardEvent', this.toggleResultCardCB);
  }
}
</script>

<style lang="scss" scoped>
@import '~sass/modules/variables';

.cmpl-courses {
  position: relative;
  margin-bottom: 10em;
  padding: 20px 0;
  border-top: 1px solid $clr-grey-light;

}
.cmpl-crs-head {
  h5 {
    display: block;
    text-transform: uppercase;
  }
}
.cmpl-crs-card {
    padding: 12px 0;
    border-bottom: 1px solid $clr-grey-light;
    .left {
      float: left;
      .crs-img {
        float: left;
        margin-right: 10px;
        img {
          width: 100px;
        }
      }
      .crs-text {
        float: left;
      }
    }
    .right {
      float: right;
      h5 {
        text-align: right;
        display: block;
        margin-bottom: 5px;
      }
      button {
        width: 180px;
      }
    }
}
</style>
