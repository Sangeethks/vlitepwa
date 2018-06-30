<template>
  <!-- Featured Section -->
  <div class="home-main">
    <div class="vlt-home-featured" v-if="featuredContents">
      <!-- Featured Carousel -->
      <FeaturedCarousel :contents="featuredContents"></FeaturedCarousel>
      <!-- List Carousels -->
    </div>
    <div class="vlt-hl-carousel" v-for="(item, i) in listContents" :key="i">
      <ListCarousel :contents="item.contents" :category="item.category"></ListCarousel>
    </div>
  </div>
</template>

<script>
import FeaturedCarousel from '@/components/Carousels/Featured.vue';
import ListCarousel from '@/components/Carousels/List.vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { EventBus } from '@/main';
import User from '@/mixins/User';
import App from '@/mixins/App';

export default {
  data () {
    return {
      featuredContents: undefined,
      listContents: undefined,
      categories: undefined,
    }
  },
  components: {
    FeaturedCarousel,
    ListCarousel
  },
  computed: {
    ...mapGetters([
      'AppUser',
      'level',
      'AppConfig',
      'platform',
      'LITECategories'
    ])
  },
  created () {
    // console.log('[Carousels.vue -> created]');

    this.initCarousels();

    EventBus.$on('AppUserChangeEvent', this.AppUserChangeCB);
  },
  activated () {
    // console.log('[Carousels.vue -> activated]');

    this.initCarousels();
  },
  // The methods associated with the global carousels including the featured
  methods: {
    ...mapMutations([
      'CommitConfigStore'
    ]),
    ...mapActions([
      'actListContents',
      'actListCategories'
    ]),
    initCarousels () {
      // Gets the categories based on the platform
      this.getCategories();
    },
    getCategories () {
      if (this.featuredContents) return this.toggleLoader(false);

      // Takes data from local storage and saves to store
      this.CommitConfigStore();
      // If no platform data, return
      if (!this.platform) return;
      // If platform is MOOC, we need to fetch the categories from category API, based on the user level
      if (this.platform === 'MOOC') {
        this.fetchMOOCCategories();
      } else {
        this.categories = this.LITECategories;
        this.renderCarousels();
      }
    },
    fetchMOOCCategories () {
      // console.log('[Carousels.vue -> fetchMOOCCategories]');

      let categoryParams = {  };
      // Fetch from API
      this.actListCategories().then(response => {
        // console.log('[Carousels.vue -> fetchMOOCCategories -> response]', response);

        // Set the categories to the data property
        this.categories = response;
        // After getting categories, remder the list carousels
        this.renderCarousels();
      }).catch(error => {
        // console.log('[Carousels.vue -> fetchMOOCCategories -> error]', error);

      });
    },
    renderCarousels () {
      // console.log('[Carousels.vue -> renderCarousels -> categories]', categories);

      // If no categories, don't continue
      if (!this.categories) return;
      // Defined in Mixin User.js
      let userHasAccess = this.checkUserHasAccess();

      // console.log('[Carousels.vue -> renderCarousels -> userHasAccess]', userHasAccess);

      // console.log('[Carousels] userHasAccess', userHasAccess);
      if (!userHasAccess) return this.$router.push({ name: 'Login' });
      // Render Featured Carousel
      this.renderFeaturedCarousel();
      // Render List Carousel
      this.renderListCarousel();
    },
    renderFeaturedCarousel () {
      this.actListContents().then(response => {
        // console.log('[Carousels] actListContents response', response);

        this.featuredContents = response;

        // console.log('[Carousels] actListContents response', response);
        this.toggleLoader(false, 'Carousels.vue -> renderFeaturedCarousel');
      }).catch(error => {
        // console.log('[Carousels] actListContents error', error);

        this.toggleLoader(false);
      });
    },
    renderListCarousel () {
      // Defining list contents array to be set to the data property
      let listContents = [];
      // Loop through the content types and fetch the contents
      for (var i in this.categories) {
        // Parameters to get the contents of MOOC list carousel contents are:
        // 1. category (the category name coming from response)
        // 2. contenttype == 'SERIES'
        // Get the category
        let category = this.categories[i].category;

        // Define the API Parameters. Parameters will be different for both MOOC & LITE
        let params = null;
        if (this.platform === 'LITE') {
          params = { contenttype: category };
        } else {
          params = { category, contenttype: 'SERIES' };
        }

        this.actListContents(params).then(response => {
          if (!response) return;

          let listObject = {
            // For MOOC  we need to pass the contenttype as category name to diplay as the head of carousel
            category,
            contents: response
          }

          listContents.push(listObject);
        }).catch(error => {
          // console.log('[Carousels] renderLITEListCarousels error', error);
        });

        // Setting to the data property
        this.listContents = listContents;
      }
    },
    AppUserChangeCB (state) {
      // console.log('[Carousels.vue -> AppUserChangeCB -> featuredContents]', this.featuredContents);

      // Hide the loader when featuredContents data property has values. featuredContents data property will have value when the home page is in active state while the user clicks the unsubscribe button, so we need to hide the loader which started showing when the user clicks the unsubscribe button.
      this.toggleLoader(!this.featuredContents);
    }
  },
  mixins: [ User, App ]
}
</script>

<style lang="scss">
$slick-font-path: "~nm/slick-carousel/slick/fonts/";
$slick-loader-path: "~nm/slick-carousel/slick/";
@import "~nm/slick-carousel/slick/slick.scss";
@import "~nm/slick-carousel/slick/slick-theme.scss";

.vlt-home-featured {
  position: relative;
}
</style>
