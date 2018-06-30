import Vue from 'vue';

const state = {
  baseUrl: 'https://vlitetest.mobiotics.com',
  AppActive: false,
  AppUser: null,
  email: null,
  AppConfig: null,
  AppVendor: null,
  subscriberid: null,
  // If level is not defined, default level would be 1
  level: 1,
  platform: null,
  accessmode: null,
  theme: 'LIGHT',
  vendorid: null,
  vendorkey: null,
  bulkenrollenabled: 'NO',
  instituteenabled: 'NO',
  levelenabled: 'NO'
}

const getters = {
  baseUrl: (state) => {
    return state.baseUrl
  },
  AppActive: (state) => {
    return state.AppActive
  },
  AppUser: (state) => {
    return state.AppUser;
  },
  email: (state) => {
    return state.email;
  },
  AppConfig: (state) => {
    return state.AppConfig;
  },
  AppVendor: (state) => {
    return state.AppVendor;
  },
  subscriberid: (state) => {
    return state.subscriberid;
  },
  level: (state) => {
    return state.level;
  },
  platform: (state) => {
    return state.platform;
  },
  accessmode: (state) => {
    return state.accessmode;
  },
  theme: (state) => {
    return state.theme;
  },
  vendorid: (state) => {
    return state.vendorid;
  },
  vendorkey: (state) => {
    return state.vendorkey;
  },
  bulkenrollenabled: (state) => {
    return state.bulkenrollenabled;
  },
  instituteenabled: (state) => {
    return state.instituteenabled;
  },
  levelenabled: (state) => {
    return state.levelenabled;
  }
}

const mutations = {
  setAppActive: (state) => {
    // console.log('[Store Master] setAppActive');
    state.AppActive = true;
  },
  CommitUserStore: (state) => {
    // Check for AppUser in local storage
    if (localStorage.getItem('AppUser')) {
      let AppUser = state.AppUser = JSON.parse(localStorage.getItem('AppUser'));
      if (AppUser.subscriberid) state.subscriberid = AppUser.subscriberid;
      // If level is not defined, default level would be 1
      if (AppUser.level) state.level = AppUser.level;
      if (AppUser.email) state.email = AppUser.email;
    } else {
      state.AppUser = false;
    }
  },
  CommitConfigStore: (state) => {
    // Check for AppConfig in local storage
    if (localStorage.getItem('AppConfig')) {
      let AppConfig = state.AppConfig = JSON.parse(localStorage.getItem('AppConfig'));
      if (AppConfig.platform) state.platform = AppConfig.platform;
      if (AppConfig.accessmode) state.accessmode = AppConfig.accessmode;
      if (AppConfig.theme) state.theme = AppConfig.theme;
      if (AppConfig.vendorid) state.vendorid = AppConfig.vendorid;
      if (AppConfig.vendorkey) state.vendorkey = AppConfig.vendorkey;
    } else {
      state.AppConfig = false;
    }
  },
  CommitVendorStore: (state) => {
    // Check for AppVendor in local storage
    if (localStorage.getItem('AppVendor')) {
      let AppVendor = state.AppVendor = JSON.parse(localStorage.getItem('AppVendor'));
      if (AppVendor.bulkenrollenabled) state.bulkenrollenabled = AppVendor.bulkenrollenabled;
      if (AppVendor.instituteenabled) state.instituteenabled = AppVendor.instituteenabled;
      if (AppVendor.levelenabled) state.levelenabled = AppVendor.levelenabled;
    } else {
      state.AppVendor = false;
    }
  }
}

const actions = {
  CommitLocalStore: (context) => {
    context.commit('CommitUserStore');
    context.commit('CommitConfigStore');
    context.commit('CommitVendorStore');
  },
  actLocate: (context) => {
    // console.log('[User -> actGetSubscribe]');

    // Set data from local storage to the store
    context.commit('CommitConfigStore');
    // Get AppConfig Getter
    let AppConfig = context.getters.AppConfig;
    // Get vendorid
    let vendorid = AppConfig.vendorid;
    // Get vendorkey
    let vendorkey = AppConfig.vendorkey;
    // If vendorid and vendorkey is not available, don't continue
    if (!(vendorid && vendorkey)) return;
    // Get base URL
    let baseUrl = context.getters.baseUrl;

    let params = { vendorid, vendorkey };
    // Define the URL
    let url = `${baseUrl}/subscriber/v1/locate`;

    return new Promise(function(resolve, reject) {
      Vue.http.get(url, { params }).then(response => {
        // console.log('[Store actGetSubscribe] response', response);

        if (response.ok && response.status === 200) {
          resolve(response.body);
        } else {
          reject({ error: true });
        }
      }).catch(error => {
        // console.log('[Store actGetSubscribe] error', error);

        reject(error);
      });
    });
  }
}

export const Master = { state, getters, mutations, actions }
