import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home/Home.vue';
const Login = (resolve) => {
  require.ensure(['@/components/Login/Login.vue'], () => {
    resolve(require('@/components/Login/Login.vue'))
  }, 'Route-Login');
};
const Signup = (resolve) => {
  require.ensure(['@/components/Signup/Signup.vue'], () => {
    resolve(require('@/components/Signup/Signup.vue'))
  }, 'Route-Signup');
};
const Profile = (resolve) => {
  require.ensure(['@/components/Profile/Profile.vue'], () => {
    resolve(require('@/components/Profile/Profile.vue'))
  }, 'Route-Profile');
};
const Playlist = (resolve) => {
  require.ensure(['@/components/Playlist/Playlist.vue'], () => {
    resolve(require('@/components/Playlist/Playlist.vue'))
  }, 'Route-Playlist');
};
const Watch = (resolve) => {
  require.ensure(['@/components/Watch/Watch.vue'], () => {
    resolve(require('@/components/Watch/Watch.vue'))
  }, 'Route-Watch');
};
const Notifications = (resolve) => {
  require.ensure(['@/components/Notifications/Notifications.vue'], () => {
    resolve(require('@/components/Notifications/Notifications.vue'))
  }, 'Route-Notifications');
};
const Support = (resolve) => {
  require.ensure(['@/components/Support/Support.vue'], () => {
    resolve(require('@/components/Support/Support.vue'))
  }, 'Route-Support');
};
const Search = (resolve) => {
  require.ensure(['@/components/Search/Search.vue'], () => {
    resolve(require('@/components/Search/Search.vue'))
  }, 'Route-Search');
};
const PrivacyPolicy = (resolve) => {
  require.ensure(['@/components/PrivacyPolicy/PrivacyPolicy.vue'], () => {
    resolve(require('@/components/PrivacyPolicy/PrivacyPolicy.vue'))
  }, 'Route-PrivacyPolicy');
};
const TermsOfUse = (resolve) => {
  require.ensure(['@/components/TermsOfUse/TermsOfUse.vue'], () => {
    resolve(require('@/components/TermsOfUse/TermsOfUse.vue'))
  }, 'Route-TermsOfUse');
};
const About = (resolve) => {
  require.ensure(['@/components/About/About.vue'], () => {
    resolve(require('@/components/About/About.vue'))
  }, 'Route-About');
};
const Help = (resolve) => {
  require.ensure(['@/components/Help/Help.vue'], () => {
    resolve(require('@/components/Help/Help.vue'))
  }, 'Route-Help');
};
const Watchlist = (resolve) => {
  require.ensure(['@/components/Watchlist/Watchlist.vue'], () => {
    resolve(require('@/components/Watchlist/Watchlist.vue'))
  }, 'Route-Watchlist');
};
const Category = (resolve) => {
  require.ensure(['@/components/Category/Category.vue'], () => {
    resolve(require('@/components/Category/Category.vue'))
  }, 'Route-Category');
};
const Tags = (resolve) => {
  require.ensure(['@/components/Tags/Tags.vue'], () => {
    resolve(require('@/components/Tags/Tags.vue'))
  }, 'Route-Tags');
};
const Page404 = (resolve) => {
  require.ensure(['@/components/Page404/Page404.vue'], () => {
    resolve(require('@/components/Page404/Page404.vue'))
  }, 'Route-Page404');
};
// For testing purpose only. Remove this on production
const Garage = (resolve) => {
  require.ensure(['@/components/Garage/Garage.vue'], () => {
    resolve(require('@/components/Garage/Garage.vue'))
  }, 'Route-Garage');
};

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/watch/:type/:id',
      name: 'Watch',
      component: Watch
    },
    {
      path: '/notifications',
      name: 'Notifications',
      component: Notifications
    },
    {
      path: '/playlist',
      name: 'Playlist',
      component: Playlist
    },
    {
      path: '/watchlist',
      name: 'Watchlist',
      component: Watchlist
    },
    {
      path: '/404',
      name: 'Page404',
      component: Page404
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/category/:category',
      name: 'Category',
      component: Category
    },
    {
      path: '/tags/:type/:name',
      name: 'Tags',
      component: Tags
    },
    {
      path: '/support',
      name: 'Support',
      component: Support
    },
    {
      path: '/help',
      name: 'Help',
      component: Help
    },
    {
      path: '/privacy-policy',
      name: 'PrivacyPolicy',
      component: PrivacyPolicy
    },
    {
      path: '/terms-of-use',
      name: 'TermsOfUse',
      component: TermsOfUse
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/press',
      name: 'Press',
      component: About
    },
    {
      path: '/copyright',
      name: 'Copyright',
      component: About
    },
    {
      path: '/garage',
      name: 'Garage',
      component: Garage
    },
    {
      path: '*',
      redirect: '/404'
    }
  ],
  mode: 'history'
})
