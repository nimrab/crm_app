import { createStore } from 'vuex';
import auth from './modules/auth.module';

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
  },
});
