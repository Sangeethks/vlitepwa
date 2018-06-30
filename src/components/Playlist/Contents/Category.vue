<template>
  <div class="vlt-pl-category">
    <h5 class="cat-title">Category</h5>

    <ContentGrid :contents="Playlist"></ContentGrid>
  </div>
</template>

<script>
import Playlist from './playlist.json'
import ContentGrid from '@/components/Slots/ContentGrid.vue'

export default {
  name: 'PlaylistContents',
  data () {
    return {
      Playlist
    }
  },
  created () {
    // console.log('[Category] created content', this.content);
  },
  components: {
    ContentGrid
  }
}
</script>

<style lang="scss" scoped>
.vlt-pl-category {
  h5 {
    margin-bottom: 15px;
  }
}
</style>
