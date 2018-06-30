<template>
  <div class="vlt-playlist-contents">
    <div class="container">
      <div class="row">
        <h2>Playlist</h2>

        <Category></Category>
        <Category></Category>
      </div>
    </div>
  </div>
</template>

<script>
import Category from '@/components/Playlist/Contents/Category.vue'

export default {
  name: 'PlaylistContents',
  components: {
    Category
  }
}
</script>

<style lang="scss" scoped>
.vlt-playlist-contents {
  h2 {
    margin: 20px 0;
  }
}
</style>
