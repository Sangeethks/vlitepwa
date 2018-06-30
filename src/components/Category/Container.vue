<template>
  <div class="vlt-category-container">
    <div class="container" v-show="hasContents">
      <ContentGrid v-if="contents" :contents="contents"></ContentGrid>
      <div class="no-results" v-else>
        <h4>"No contents to show"</h4>
      </div>
    </div>

    <Loading v-show="showLoading"></Loading>
  </div>
</template>

<script>
import Loading from '@/components/Slots/Loading.vue';
import ContentGrid from '@/components/Slots/ContentGrid.vue';
import App from '@/mixins/App';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import firebase from 'firebase';

export default {
  name: 'CategoryContainer',
  data () {
    return {
      contents: undefined,
      hasContents: false,
      showLoading: true
    }
  },
  computed: {
    ...mapGetters([
      'platform'
    ])
  },
  watch: {
    '$route'(to, from) {
      this.fetchContents();
    }
  },
  created () {
    this.fetchContents();
  },
  methods: {
    ...mapMutations([
      'CommitConfigStore',
      'CommitUserStore'
    ]),
    ...mapActions([
      'actListContents'
    ]),
    fetchContents () {
      this.hasContents = false;
      this.showLoading = true;

      let category = this.$route.params.category;

      if (!category) return;

      // Define params
      let params;
      if (this.platform === 'MOOC') params = { category };
      if (this.platform === 'LITE') params = { contenttype: category };

      // Make the API call
      this.actListContents(params).then(response => {
        // console.log('[Category -> Container.vue -> fetchContents -> response]', response);

        this.toggleLoader(false);
        // Hide the loader if no contents exists
        if (!response && response.length) return;
        // Assign to data property
        this.contents = response;

        this.hasContents = true;
        this.showLoading = false;
      }).catch(error => {
        // console.log('[Category -> Container.vue -> fetchContents -> error]', error);

      });
    }
  },
  components: {
    Loading,
    ContentGrid
  },
  mixins: [ App ]
}
</script>

<style lang="scss" scoped>
.vlt-category-container {
  margin: 6em 0 10em;
}
.no-results {
  text-align: center;
}
</style>
