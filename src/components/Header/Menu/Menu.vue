<template>
  <div class="vlt-menu">
    <div class="vlt-menu-contain">
      <div class="vlt-menu-csec">
        <div class="vlt-ms-profile">
          <component :is="profileComponent"></component>
          <div class="clearfix"></div>
        </div>

        <div class="vlt-menus">
          <ul @click="closeMenu">
            <li class="vlt-menu-hlt">
              <router-link :to="{ name: 'Notifications' }">
                Notifications
                <span>
                  <button type="button" class="vlt-btn-ico">
                    <img src="@/assets/icons/notification-dark.svg">
                  </button>
                </span>
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'Home' }">HOME</router-link>
            </li>
            <li v-for="(category, i) in categories" :key="i">
              <router-link :to="{ name: 'Category', params: { category: category.category } }">
                {{category.category}}
              </router-link>
              <!-- <a href="#">{{category.category}}</a> -->
            </li>
            <li>
              <router-link :to="{ name: 'Watchlist' }">Watchlist</router-link>
            </li>
            <li class="vlt-menu-hlt">
              <router-link :to="{ name: 'Help' }">Help</router-link>
            </li>
          </ul>
        </div>

        <div class="vlt-menu-footer" v-show="showFooterComponent">
          <component :is="footerComponent"></component>
        </div>
      </div>

      <div class="vlt-menu-close" @click="closeMenu">
        <img src="@/assets/icons/close.svg">
      </div>
    </div>

    <div class="vlt-menu-overlay" @click="closeMenu"></div>
  </div>
</template>

<script>
import ProfileLITE from './Profile/LITE.vue';
import ProfileMOOC from './Profile/MOOC.vue';
import FooterLITE from './Footer/LITE.vue';
import FooterMOOC from './Footer/MOOC.vue';
import { EventBus } from '@/main';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import App from '@/mixins/App';

export default {
  name: 'HeaderMenu',
  data () {
    return {
      profileComponent: undefined,
      footerComponent: undefined,
      categories: undefined,
      showFooterComponent: false,
    }
  },
  components: {
    ProfileLITE,
    ProfileMOOC,
    FooterLITE,
    FooterMOOC
  },
  computed: {
    ...mapGetters([
      'AppActive',
      'AppUser',
      'level',
      'email',
      'platform',
      'LITECategories'
    ])
  },
  watch: {
    AppActive () {
      this.getCategories();
    }
  },
  created () {
    this.CommitConfigStore();
    this.getProfileComponent();
    this.getFooterComponent();
    // If App is active, then only get the categories
    if (this.AppActive) this.getCategories();

    // Listens to events from EventBus
    EventBus.$on('AppUserChangeEvent', this.AppUserChangeCB);
  },
  methods: {
    ...mapMutations([
      // Defined in Store Master.js
      'CommitConfigStore',
      // Defined in Store Master.js
      'CommitUserStore',
    ]),
    ...mapActions([
      'actListCategories'
    ]),
    closeMenu () {
      EventBus.$emit('toggleMenuEvent', false);
    },
    AppUserChangeCB () {
      this.getFooterComponent();
    },
    getCategories () {
      // Takes data from local storage and saves to store
      this.CommitConfigStore();
      // If platform is MOOC, we need to fetch the categories from category API, based on the user level
      if (this.platform === 'MOOC') {
        this.fetchMOOCCategories();
      } else {
        this.categories = this.LITECategories;
      }
    },
    fetchMOOCCategories () {
      this.actListCategories({ level: this.level }).then(response => {
        // console.log('[fetchMOOCListCarousels response]', response);

        // If no categories object came as response
        if (!(response && response.length)) return;
        // Set the categories to the data property
        this.categories = response;
      }).catch(error => {
        // console.log('[fetchMOOCListCarousels error]', error);
      });
    },
    getProfileComponent () {
      // console.log('[Menu.vue -> getProfileComponent]');

      // The platform will return the platform name. When we return this platform name it will match with the template name we registered and will render it.
      if (!this.platform) return;
      // Set the component name to data property
      this.profileComponent = `Profile${this.platform}`;
    },
    getFooterComponent () {
      // console.log('[Menu.vue -> getFooterComponent]');

      // Gets user data from local storage and saves to store
      this.CommitUserStore();

      // console.log('[Menu.vue -> getFooterComponent -> AppUser]', this.AppUser);

      this.showFooterComponent = this.AppUser ? true : false

      // The platform will return the platform name. When we return this platform name it will match with the template name we registered and will render it.
      if (!this.platform) return;
      // Set the component name to data property
      this.footerComponent = `Footer${this.platform}`;
    }
  },
  mixins: [ App ]
}
</script>

<style lang="scss">
@import '~sass/modules/components';
.close-cont {
  overflow: hidden;
}
.vlt-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 888;
  .vlt-menu-contain {
    position: absolute;
    height: 100%;
    background-color: #f5f5f5;
    color: #5a5a5a;
    z-index: 999;
    width: 280px;
  }
  .vlt-menu-overlay {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    background-color: $clr-dark-hlt;
    height: 100%;
    z-index: 998;
  }
  .menu-unsub-btn {
    margin: 10px 0;
  }
  .vlt-menu-csec {
    position: absolute;
    padding: 0 20px;
    height: 100%;
    width: 100%;
    overflow-y: scroll;
  }
  .vlt-ms-profile {
    padding: 15px;
    .vlt-ms-pr {
      float: left;
      p {
        font-size: $text-xs;
      }
    }
    .vlt-ms-settings {
      float: right;
    }
    .vlt-ms-pr-img {
      margin-bottom: 5px;
      img, h5 {
        float: left;
      }
      h5 {
        padding: 8px 5px;
      }
      img {
        width: 40px;
        border-radius: 30px;
      }
    }
  }
  // menu
  .vlt-menus {
    ul {
      li {
        a {
          display: block;
          padding: 12px 15px;
        }
        &.vlt-menu-hlt {
          border-top: 1px solid $clr-white-2;
          border-bottom: 1px solid $clr-white-2;
          .vlt-btn-ico {
            img {
              width: 20px;
            }
          }
          span {
            float: right;
          }
        }
      }
    }
  }
  .vlt-menu-close {
    position: absolute;
    display: inline-block;
    top: 0;
    right: -40px;
    width: 40px;
    text-align: center;
    height: 40px;
    line-height: 40px;
    color: #fff;
    cursor: pointer;
    img {
      width: 15px;
    }
  }
}
</style>
