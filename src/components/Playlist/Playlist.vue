<template>
  <div class="vlt-playlist">
    <Header></Header>
    <Contents></Contents>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header/Dark/HeaderDark.vue'
import Contents from '@/components/Playlist/Contents/Contents.vue'
import Footer from '@/components/Footer/FooterStretched.vue'

export default {
  components: {
    Header,
    Contents,
    Footer
  }
}
</script>

<style lang="scss">
</style>
