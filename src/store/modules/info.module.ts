import {
  getDatabase, ref, get, set,
} from 'firebase/database';

export default {
  namespaced: true,
  state() {
    return {
      userInfo: {
        name: '',
        bill: null,
      },
    };
  },

  getters: {
    userName(state) {
      return state.userInfo.name;
    },
    userBill(state) {
      return state.userInfo.bill;
    },
  },

  mutations: {
    setUserInfo(state, user) {
      state.userInfo.name = user.name ?? '';
      state.userInfo.bill = user.bill ?? 0;
    },
    resetUserInfo(state) {
      state.userInfo.name = '';
      state.userInfo.bill = 0;
    },
  },

  actions: {
    async getUserInfo({
      dispatch,
      commit,
    }) {
      const userUid = await dispatch('getUid', {}, { root: true });
      const db = getDatabase();
      const snapshot = await get(ref(db, `users/${userUid}/info`));
      const user = snapshot.val();

      if (user) {
        commit('setUserInfo', user);
      }
    },

    async getCurrency() {
      const key = process.env.VUE_APP_CURRENCY;
      const response = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=EUR,USD,EUR,RUB,CHF`, {
        method: 'GET',
        referrerPolicy: 'same-origin',
      });
      return response.json();
    },

    async editUserBill({ state, dispatch }, newBill) {
      const userUid = await dispatch('getUid', {}, { root: true });
      try {
        const db = getDatabase();
        await set(ref(db, `users/${userUid}/info`), {
          name: state.userInfo.name,
          bill: newBill,
        });
        await dispatch('info/getUserInfo');
      } catch (err) {
        throw new Error();
      }
    },
  },
};
