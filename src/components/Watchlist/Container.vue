<template>
  <div class="vlt-watchlist-container">
    <div class="container">
      <ContentGrid v-if="watchlist" :contents="watchlist"></ContentGrid>
      <div class="no-results" v-else>
        <h4>"You have no items in watchlist"</h4>
      </div>
    </div>
  </div>
</template>

<script>
import ContentGrid from '@/components/Slots/ContentGrid.vue'
import App from '@/mixins/App';
import { mapGetters, mapMutations } from 'vuex';
import firebase from 'firebase';

export default {
  name: 'WatchlistContainer',
  data () {
    return {
      watchlist: undefined
    }
  },
  computed: {
    ...mapGetters([
      'platform',
      'vendorid',
      'level',
      'subscriberid'
    ])
  },
  components: {
    ContentGrid
  },
  created () {
    this.fetchWatchlist();
  },
  methods: {
    ...mapMutations([
      'CommitConfigStore',
      'CommitUserStore'
    ]),
    fetchWatchlist () {
      this.CommitConfigStore();
      if (!this.platform) return;

      this.CommitUserStore();
      let path = `${this.vendorid}/subscriber/${this.subscriberid}/watchlist`;

      // Differentiate using platform
      if (this.platform === 'MOOC') {
        path += `/${this.level}`;
      }

      // Fetch from firebase
      firebase.database().ref(path).on('value', snapshot => {
        if (!snapshot.val()) return;

        let watchlist = [];
        // Iterate over each snapshot object to convert to an array
        snapshot.forEach(snap => {
          watchlist.push(snap.val());
        });

        // console.log('[Watchlist -> fetchWatchlist -> watchlist]', watchlist);

        // Finally assign to data property
        this.watchlist = watchlist;
        // Hide the loader
        this.toggleLoader(false);
      });
    }
  },
  mixins: [ App ]
}
</script>

<style lang="scss" scoped>
.vlt-watchlist-container {
  margin: 6em 0 10em;
}
.no-results {
  text-align: center;
}
</style>
