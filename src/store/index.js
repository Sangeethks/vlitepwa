import Vue from 'vue';
import Vuex from 'vuex';

import { Master } from './modules/Master';
import { User } from './modules/User';
import { Content } from './modules/Content';
import { Vendor } from './modules/Vendor';
import { Const } from './modules/Const';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { Master, User, Content, Vendor, Const }
});
