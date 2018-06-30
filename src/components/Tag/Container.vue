<template>
  <div class="vlt-category-container">
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
  name: 'TagContainer',
  data () {
    return {
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
      let params = this.$route.params;

      // console.log('[Tags -> Container.vue -> fetchContents -> params]', params);

      let type = this.type;
      let name = this.name;
    }
  },
  components: {
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
