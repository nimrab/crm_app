import { createStore } from 'vuex';
import firebase from 'firebase/compat/app';
import auth from './modules/auth.module';
import info from './modules/info.module';
import category from './modules/category.module';

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
  actions: {
    getUid() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null;
    },
  },
  modules: {
    auth,
    info,
    category,
  },
});
