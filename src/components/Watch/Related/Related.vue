<template>
  <div class="container">
    <div class="row">
      <div class="vlt-pbc-related">
        <Tabs :content="content"></Tabs>
        <RelatedGrid :content="content"></RelatedGrid>
      </div>
    </div>
  </div>
</template>

<script>
import Tabs from '@/components/Watch/Related/Tabs/Tabs.vue';
import RelatedGrid from '@/components/Watch/Related/Grid/Grid.vue'
import { EventBus } from '@/main';

export default {
  name: 'WatchRelated',
  props: {
    content: {
      type: Object
    }
  },
  components: {
    Tabs,
    RelatedGrid
  }
}
</script>

<style lang="scss">
.vlt-pbc-related {
  margin: 20px 0 200px;
}
</style>
