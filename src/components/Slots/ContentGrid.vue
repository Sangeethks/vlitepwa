<template>
  <div class="catg-cards">
    <div class="catg-c-contain" v-for="(content, i) in contents" :key="i">
      <div class="catg-card">
        <ContentCard :content="content"></ContentCard>
      </div>
    </div>

    <div class="clearfix"></div>
  </div>
</template>

<script>
import ContentCard from '@/components/Slots/ContentCard.vue';

export default {
  props: {
    contents: {
      type: Array,
      default: () => []
    }
  },
  components: {
    ContentCard
  }
}
</script>

<style lang="scss">
@import '~sass/modules/content-card';

.catg-c-contain {
  float: left;
  margin-right: 10px;
  margin-bottom: 30px;
  width: calc((100% - 30px) / 4);
  &:nth-child(4n) {
    margin-right: 0;
  }
}
.catg-card {
  @extend .slide;
  overflow: hidden;
  position: relative;
  .content {
    bottom: 0px;
  }
}
</style>
