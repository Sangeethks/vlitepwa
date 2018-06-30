import Vue from 'vue';

const state = {
  FIRE_API_KEY: false,
  FIRE_AUTH_DOMAIN: false,
  FIRE_DATABASE_URL: false,
  FIRE_PROJECT_ID: false,
  FIRE_STORAGE_BUCKET: false,
  FIRE_MESSAGING_SENDER_ID: false,

  FIRE_LITE_API_KEY: 'AIzaSyBtsmRCRKGLO1CsqWR6vHoVoL17NzjbdY4',
  FIRE_LITE_AUTH_DOMAIN: 'vlite-demo-ent2.firebaseio.com',
  FIRE_LITE_DATABASE_URL: 'https://vlite-demo-ent2.firebaseio.com/',
  FIRE_LITE_PROJECT_ID: 'vlite-demo-ent2',
  FIRE_LITE_STORAGE_BUCKET: '',
  FIRE_LITE_MESSAGING_SENDER_ID: '693383813192',
  FIRE_MOOC_API_KEY: 'AIzaSyCAsiTlSVLcgyf7uMEKdiAY17Dhx9J70JA',
  FIRE_MOOC_AUTH_DOMAIN: 'vlite-demo-mooc2.firebaseio.com',
  FIRE_MOOC_DATABASE_URL: 'https://vlite-demo-mooc2.firebaseio.com/',
  FIRE_MOOC_PROJECT_ID: 'vlite-demo-mooc2',
  FIRE_MOOC_STORAGE_BUCKET: '',
  FIRE_MOOC_MESSAGING_SENDER_ID: '1057276799328',

  FAQ_LITE_URL: 'https://vpremieretest.mobiotics.com/subscriber/faq/entertainmentweb_faq.json',
  FAQ_MOOC_URL: 'https://vpremieretest.mobiotics.com/subscriber/faq/moocweb_faq.json',
}

const getters = {
  FIRE_API_KEY: (state) => {
    return state.FIRE_API_KEY;
  },
  FIRE_AUTH_DOMAIN: (state) => {
    return state.FIRE_AUTH_DOMAIN;
  },
  FIRE_DATABASE_URL: (state) => {
    return state.FIRE_DATABASE_URL;
  },
  FIRE_PROJECT_ID: (state) => {
    return state.FIRE_PROJECT_ID;
  },
  FIRE_STORAGE_BUCKET: (state) => {
    return state.FIRE_STORAGE_BUCKET;
  },
  FIRE_MESSAGING_SENDER_ID: (state) => {
    return state.FIRE_MESSAGING_SENDER_ID;
  },
  FAQ_LITE_URL: (state) => {
    return state.FAQ_LITE_URL;
  },
  FAQ_MOOC_URL: (state) => {
    return state.FAQ_MOOC_URL;
  }
}

const mutations = {
  CommitLITEConstants: (state) => {
    state.FIRE_API_KEY = state.FIRE_LITE_API_KEY;
    state.FIRE_AUTH_DOMAIN = state.FIRE_LITE_AUTH_DOMAIN;
    state.FIRE_DATABASE_URL = state.FIRE_LITE_DATABASE_URL;
    state.FIRE_PROJECT_ID = state.FIRE_LITE_PROJECT_ID;
    state.FIRE_STORAGE_BUCKET = state.FIRE_LITE_STORAGE_BUCKET;
    state.FIRE_MESSAGING_SENDER_ID = state.FIRE_LITE_MESSAGING_SENDER_ID;
  },
  CommitMOOCConstants: (state) => {
    state.FIRE_API_KEY = state.FIRE_MOOC_API_KEY;
    state.FIRE_AUTH_DOMAIN = state.FIRE_MOOC_AUTH_DOMAIN;
    state.FIRE_DATABASE_URL = state.FIRE_MOOC_DATABASE_URL;
    state.FIRE_PROJECT_ID = state.FIRE_MOOC_PROJECT_ID;
    state.FIRE_STORAGE_BUCKET = state.FIRE_MOOC_STORAGE_BUCKET;
    state.FIRE_MESSAGING_SENDER_ID = state.FIRE_MOOC_MESSAGING_SENDER_ID;
  },
}

const actions = {
  DispatchConstStore: (context) => {
    // console.log('[Const.js -> DispatchConstStore]');

    // Take AppConfig from local storage and save to the store
    context.commit('CommitConfigStore');
    // Get App Platform
    let platform = context.getters.platform;
    // If unable to get platform, return
    if (!platform) return;

    // Differentiate using platform
    if (platform === 'LITE') return context.commit('CommitLITEConstants');
    if (platform === 'MOOC') return context.commit('CommitMOOCConstants');
  }
}

export const Const = { state, getters, mutations, actions }
