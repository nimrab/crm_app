import firebase from 'firebase/compat/app';
import {
  getDatabase, ref, set,
} from 'firebase/database';

export default {
  namespaced: true,
  state() {
    return {
    };
  },

  getters: {
    authToken(state) {
      return state.token;
    },

    isAuthenticated(state, getters) {
      return !!getters.authToken;
    },
  },

  mutations: {
    setToken(state, tokenValue) {
      state.token = tokenValue;
    },
    resetToken(state) {
      state.token = null;
    },
  },

  actions: {
    async login(context, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (err) {
        throw new Error();
      }
    },

    async register({ dispatch }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);

        const uid = await dispatch('getUid');
        const db = getDatabase();
        await set(ref(db, `users/${uid}/info`), {
          bill: 10000,
          name,
        });
      } catch (err) {
        throw new Error();
      }
    },

    async logout() {
      await firebase.auth().signOut();
    },

    getUid() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null;
    },
  },
};
