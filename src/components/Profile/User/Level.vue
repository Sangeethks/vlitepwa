<template>
  <div class="vlt-usr-level">
    <div class="lvl-head">
      <h5 class="lvl-name">Level 4</h5>
      <h5 class="lvl-credits">768 Credits</h5>
      <div class="clearfix"></div>
    </div>
    <div class="lvl-misc">
      <div class="misc-btns">
        <button type="button" class="btn-md-hollow inverted">Change Level</button>
      </div>
      <div class="misc-text">
        <p>Institution Name, Code</p>
        <p>Joined on 10 Aug, 2015</p>
      </div>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileUserLevel',
  data () {
    return {

    };
  }
}
</script>

<style lang="scss" scoped>
@import '~sass/modules/variables';

.vlt-usr-level {
  border-bottom: 1px solid $clr-grey-light;
  padding: 15px 0;
}
.lvl-head {
  margin-bottom: 20px;
  .lvl-name {
    float: left;
  }
  .lvl-credits {
    float: right;
  }
}
.lvl-misc {
  .misc-btns {
    float: left;
    button {
      width: 220px;
    }
  }
  .misc-text {
    float: right;
  }
}
</style>
