import firebase from 'firebase/compat/app';

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
    async login({
      commit,
      dispatch,
    }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch {
        throw new Error();
      }
    },
  },
};
