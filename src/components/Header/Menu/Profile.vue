<template>
  <div class="menu-profile">
    <div class="vlt-ms-pr-img">
      <router-link :to="{ name: 'Profile' }">
        <img :src="picture" alt="vlt-prof" class="img-responsive">
      </router-link>
      <h5 class="menu-text">{{subscribername}}</h5>
      <div class="clearfix"></div>
    </div>
    <p class="menu-text">{{email}}</p>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { EventBus } from '@/main';

export default {
  name: 'MenuProfile',
  data () {
    return {
      subscribername: '',
      email: '',
      picture: require('@/assets/icons/profile.png')
    }
  },
  computed: {
    ...mapGetters([
      'AppUser'
    ])
  },
  created () {
    this.initMenuProfile();

    EventBus.$on('AppUserChangeEvent', this.initMenuProfile);
  },
  methods: {
    ...mapMutations([
      'CommitUserStore'
    ]),
    initMenuProfile () {
      // console.log('[Profile.vue -> initMenuProfile]');

      this.CommitUserStore();

      // console.log('[Profile.vue -> initMenuProfile -> AppUser]', this.AppUser);

      if (!this.AppUser) return;
      this.subscribername = this.AppUser.subscribername;
      this.email = this.AppUser.email;
      if (this.AppUser.picture) this.picture = this.AppUser.picture;

      // console.log('[Profile.vue -> initMenuProfile -> subscribername]', this.subscribername);
    }
  },
  beforeDestroy () {
    EventBus.$off('AppUserChangeEvent', this.initMenuProfile);
  }
}
</script>

<style lang="scss" scoped>
.menu-text {
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
