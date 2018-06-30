<template>
  <Popup :closePopupEvent="closePopupCB" width="60%">
    <h6 slot="header">Congrats!</h6>

    <div class="vlt-mcq popup-form" id="vlt-mcq">
      <div class="mcq-head-sub">
        <h5>You've completed watching "{{contenttitle}}"</h5>

        <div class="mcq-score" v-if="showScore">
          <p class="score-text">{{score}}/{{totalScore}}</p>
          <p class="score-label">FINAL SCORE</p>
        </div>
      </div>

      <div class="mcq-container" v-if="showQuestions">
        <div class="mcq-box">
          <div class="mcq-qstns">
            <div class="mcq-qstn-box" v-for="(qstn, i) in MCQQuestions" :key="i">
              <h6>{{i + 1}}. {{qstn.question}}</h6>
              <div class="mcq-choice-btns" :id="`mcq-question-${i+1}`" :data-qstnindex="i+1">
                <button type="button" class="choice-btn btn-md-hollow inverted" v-for="(choice, valKey, posKey) in getChoices(qstn.choices)" :key="valKey" :data-checkindex="valKey | stripAnswer" :data-checkposindex="posKey" @click="choiceBtnClickCB($event)" v-once>{{choice}}</button>
              </div>
            </div>
          </div>
          <div class="mcq-footer">
            <div class="mcq-sub-after" v-if="showMCQFooterAfter">
              <div class="mcq-footer-btns">
                <button type="button" class="mcq-footer-btn btn-lg-primary inverted" @click.prevent="nextMCQCB">Next</button>
              </div>
              <div class="mcq-footer-btns">
                <button type="button" class="mcq-footer-btn btn-md-hollow inverted" @click="watchAgainMCQCB">Watch Again</button>
              </div>
            </div>

            <div class="mcq-sub-before" v-else>
              <p class="mcq-message" v-if="MCQMessage">{{MCQMessage}}</p>

              <div class="mcq-footer-btns btns-submit">
                <button type="button" class="mcq-footer-btn btn-lg-primary inverted" @click="submitMCQCB">Submit</button>
              </div>
              <div class="mcq-footer-btns">
                <button type="button" class="mcq-footer-btn btn-md-hollow inverted" @click="skipMCQCB">Skip</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Loading v-show="showLoading" class="loading"></Loading>
  </Popup>
</template>

<script>
import Popup from '@/components/Slots/Popup.vue';
import Loading from '@/components/Slots/Loading.vue';
import { EventBus } from '@/main';
import { mapGetters, mapMutations } from 'vuex';
import firebase from 'firebase';
import Utility from '@/mixins/Utility';

export default {
  name: 'mcq',
  data () {
    return {
      content: undefined,
      showLoading: true,
      showQuestions: false,
      MCQQuestions: undefined,
      contenttitle: '',
      answers: [],
      MCQMessage: false,
      showScore: false,
      score: 0,
      totalScore: 0,
      showMCQFooterAfter: false
    }
  },
  computed: {
    ...mapGetters([
      'vendorid',
      'subscriberid',
      'level'
    ])
  },
  created () {
    EventBus.$on('popupMCQFetchEvent', this.popupMCQFetchCB);
  },
  components: {
    Popup,
    Loading
  },
  methods: {
    ...mapMutations([
      'CommitConfigStore',
      'CommitUserStore'
    ]),
    popupMCQFetchCB (content) {
      // console.log('[MCQ.vue -> popupMCQFetchCB -> content]', content);

      // Assign the content to content data property
      this.content = content;
      // Assign the content title data property
      this.contenttitle = content.title;
      // RESET TO DEFAULT VALUES
      this.showScore = false;
      this.score = 0;
      this.totalScore = 0;
      this.showMCQFooterAfter = false;
      this.MCQQuestions = undefined;
      this.answers = [];

      this.CommitConfigStore();
      // Create firebase path
      let path = `${this.vendorid}/content/${content.contentid}/mcq`;
      // Fetch data from firebase
      firebase.database().ref(path).once('value').then(snapshot => {
        if (!snapshot.val()) return;
        // Store the data to a variable
        let MCQData = snapshot.val();

        // console.log('[MCQ.vue -> popupMCQFetchCB -> MCQData]', MCQData);

        let MCQQuestions = [];
        snapshot.forEach(item => {
          if (item.key !== 'shuffle') {
            MCQQuestions.push(item.val());
          }
        });

        // console.log('[MCQ.vue -> popupMCQFetchCB -> MCQQuestions]', MCQQuestions);

        // shuffleArray defined in Utility.js Mixin
        if (MCQData.shuffle) MCQQuestions = this.shuffleArray(MCQQuestions);

        this.MCQQuestions = MCQQuestions;

        // console.log('[MCQ.vue -> popupMCQFetchCB -> this.MCQQuestions]', this.MCQQuestions);

        // Show the questions once got the data
        this.showQuestions = true;
        // Hide the loader
        this.showLoading = false;

        EventBus.$emit('popupMCQMountedEvent', true);
      });
    },
    getChoices (choice) {
      return this.shuffleObject(choice);
    },
    choiceBtnClickCB (_event) {
      let choiceBtn = _event.target;
      let choiceParent = choiceBtn.parentNode;

      // console.log('[MCQ.vue -> popupMCQFetchCB -> choiceBtn]', choiceBtn);

      let choiceBtns = choiceParent.getElementsByClassName('choice-btn');

      // console.log('[MCQ.vue -> popupMCQFetchCB -> choiceBtns]', choiceBtns);

      let ansIndex;
      for (let btn of choiceBtns) {
        btn.classList.remove('btn-md-primary');
        btn.classList.add('btn-md-hollow');
        btn.disabled = true;

        if (btn.getAttribute('data-checkindex') == 0) {
          ansIndex = btn.getAttribute('data-checkposindex');
        }
      }


      choiceBtn.classList.remove('btn-md-hollow');
      choiceBtn.classList.add('btn-md-primary');

      // Get the answer index
      let checkIndex = choiceBtn.getAttribute('data-checkindex');
      let checkposIndex = choiceBtn.getAttribute('data-checkposindex');
      // Get Parent Question index
      let qstnIndex = choiceParent.getAttribute('data-qstnIndex');

      // console.log('[MCQ.vue -> popupMCQFetchCB -> checkIndex]', checkIndex);
      // console.log('[MCQ.vue -> popupMCQFetchCB -> checkposIndex]', checkposIndex);
      // console.log('[MCQ.vue -> popupMCQFetchCB -> qstnIndex]', qstnIndex);
      // console.log('[MCQ.vue -> popupMCQFetchCB -> ansIndex]', ansIndex);

      // Now create answer object to be stored
      let answerObj = {
        qstnIndex, checkIndex, checkposIndex, ansIndex
      };

      // console.log('[MCQ.vue -> popupMCQFetchCB -> answerObj]', answerObj);

      this.answers.push(answerObj);

      // console.log('[MCQ.vue -> popupMCQFetchCB -> answers]', this.answers);
    },
    submitMCQCB () {
      // EventBus.$emit('popupMCQSubmitEvent', true);

      // Assign the total score data property
      this.totalScore = this.MCQQuestions.length;

      // console.log('[MCQ.vue -> submitMCQCB -> this.MCQQuestions]', this.MCQQuestions);
      // console.log('[MCQ.vue -> submitMCQCB -> this.answers]', this.answers);
      // console.log('[MCQ.vue -> submitMCQCB -> this.MCQQuestions.length]', this.MCQQuestions.length);
      // console.log('[MCQ.vue -> submitMCQCB -> this.answers.length]', this.answers.length);

      if (this.MCQQuestions.length !== this.answers.length) return this.MCQMessage = 'You haven\'t answered all the questions';

      this.MCQMessage = false;

      // Hide the questions
      this.showQuestions = false;
      // Show the loader
      this.showLoading = true;

      // console.log('[MCQ.vue -> submitMCQCB -> this.answers]', this.answers);

      for (var i in this.answers) {
        let answer = this.answers[i];

        let qstnParent = document.getElementById(`mcq-question-${answer.qstnIndex}`);
        if (!qstnParent) return;

        // console.log('[MCQ.vue -> submitMCQCB -> qstnParent]', qstnParent);
        // console.log('[MCQ.vue -> submitMCQCB -> answer.checkIndex]', answer.checkIndex);

        // Declare variables
        let btnChecked = qstnParent.querySelector(`[data-checkindex = "${answer.checkIndex}"]`);
        let btnCorrect = qstnParent.querySelector('[data-checkindex = "0"]');

        // console.log('[MCQ.vue -> submitMCQCB -> btnChecked]', btnChecked);
        // console.log('[MCQ.vue -> submitMCQCB -> btnCorrect]', btnCorrect);

        if (answer.checkIndex == '0') {
          // console.log('[MCQ.vue -> submitMCQCB -> btnChecked]', btnChecked);

          // Increment correct answer count
          this.score += 1;

          // Change the class to make the button success button
          btnChecked.classList.remove('btn-md-primary');
          btnChecked.classList.add('btn-md-hollow', 'success');
        } else {
          // console.log('[MCQ.vue -> submitMCQCB -> btnChecked]', btnChecked);
          // console.log('[MCQ.vue -> submitMCQCB -> btnCorrect]', btnCorrect);

          // Change the class to make the button success button
          btnCorrect.classList.remove('btn-md-primary');
          btnCorrect.classList.add('btn-md-hollow', 'success');

          // Change the class to make the button success button
          btnChecked.classList.remove('btn-md-primary');
          btnChecked.classList.add('btn-md-hollow', 'error');
        }
      }

      // Hide the questions
      this.showQuestions = true;
      // Show the loader
      this.showLoading = false;
      // Show the score
      this.showScore = true;
      // Change footer
      this.showMCQFooterAfter = true;
    },
    nextMCQCB () {
      // console.log('[MCQ.vue -> nextMCQCB]');

      // Hide Questions
      this.showQuestions = false;

      // console.log('[MCQ.vue -> nextMCQCB -> content]', this.content);

      // Get data for saving to firebase
      this.CommitConfigStore();
      this.CommitUserStore();

      // Create the firebase path
      let path = `${this.vendorid}/subscriber/${this.subscriberid}/courses/${this.level}`;

      if (this.content.contenttype === 'COURSE') {
        path += `/${this.content.seriesid}/lesson/${this.content.contentid}/mcq`;
      }

      // console.log('[MCQ.vue -> nextMCQCB -> path]', path);

      let data = { correct: this.score, total: this.totalScore };

      firebase.database().ref(path).set(data);

      // Notify the Player.vue to close the MCQ popup
      EventBus.$emit('nextMCQPopupEvent', false);
    },
    watchAgainMCQCB () {
      // console.log('[MCQ.vue -> watchAgainMCQCB]');

    },
    skipMCQCB () {
      // EventBus.$emit('popupMCQSkipEvent', true);
    },
    closePopupCB () {
      EventBus.$emit('togglePopupMCQEvent', false);
    }
  },
  filters: {
    stripAnswer: (key) => {
      // console.log('[MCQ.vue -> stripAnswer -> key]', key.slice(key.length - 1));

      return key.slice(key.length - 1);
    }
  },
  mixins: [ Utility ]
}
</script>

<style lang="scss">
  @import '~sass/modules/variables';

.mcq-message {
  color: $clr-gp-button-red-1;
  text-align: center;
}
.mcq-head-sub {
  margin-bottom: 20px;
  padding-bottom: 10px;
  text-align: center;
  border-bottom: 1px solid $clr-border-grey;
}
.mcq-qstn-box {
  margin-bottom: 20px;
  h6 {
    margin-bottom: 6px;
  }
  .choice-btn {
    display: inline-block;
    margin-right: 10px;
    margin-bottom: 10px;
    width: auto !important;
    cursor: pointer;
  }
}
.mcq-footer {
  padding-top: 10px;
  margin-top: 30px;
  border-top: 1px solid $clr-border-grey;
}
.mcq-footer-btns {
  text-align: center;
  margin-top: 20px;
  .mcq-footer-btn {
    display: inline-block;
    width: auto;
  }
}
.mcq-score {
  .score-text {
    font-size: 2.4em;
  }
  .score-label {
    color: $clr-grey-light;
    font-size: 13px;
  }
}
.loading {
  margin: 20px 0;
}
</style>
