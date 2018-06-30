<template>
  <div class="vlt-tags-container">
    <div class="container">
      <ContentGrid v-if="contents" :contents="contents"></ContentGrid>
      <div class="no-results" v-else>
        <h4>"No contents to show"</h4>
      </div>
    </div>
  </div>
</template>

<script>
import ContentGrid from '@/components/Slots/ContentGrid.vue'
import App from '@/mixins/App';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import firebase from 'firebase';

export default {
  name: 'TagsContainer',
  data () {
    return {
      type: undefined,
      name: undefined,
      contents: undefined
    }
  },
  computed: {
    ...mapGetters([
    ])
  },
  created () {
    this.fetchContents();
  },
  methods: {
    ...mapMutations([
    ]),
    ...mapActions([
      'actListContents'
    ]),
    fetchContents () {
      this.type = this.$route.params.type;
      this.name = this.$route.params.name;

      let params;
      switch (this.type) {
        case 'year':
          params = { year: this.name };
          break;
        case 'language':
          params = { language: this.name };
          break;
        default:
          params = { tag: this.name };
      }

      // Fetch contents from API
      this.actListContents(params).then(response => {
        // console.log('[Tags -> Container.vue -> fetchContents -> response]', response);

        this.toggleLoader(false);
        // If no contents return with hiding the loader
        if (!(response && response.length)) return;
        // Finally assign to data property
        this.contents = response;
      }).catch(error => {
        // console.log('[Tags -> Container.vue -> fetchContents -> error]', error);
      });
    }
  },
  components: {
    ContentGrid
  },
  mixins: [ App ]
}
</script>

<style lang="scss" scoped>
.vlt-tags-container {
  margin: 6em 0 10em;
}
.no-results {
  text-align: center;
}
</style>
