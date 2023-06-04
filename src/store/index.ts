import { createStore } from 'vuex';
import auth from './modules/auth.module';
import info from './modules/info.module';

const plugins = [];

export default createStore({
  plugins,
  state() {
    return {
      message: null,
    };
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    info,
  },
});
