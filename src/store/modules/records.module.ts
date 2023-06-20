import {
  get,
  getDatabase, ref,
  push, set,
} from 'firebase/database';

export default {
  namespaced: true,
  state() {
    return {
      records: [],
    };
  },

  getters: {
    getRecords(state) {
      return state.categories;
    },
  },

  mutations: {
    setRecords(state, categories) {
      state.records = Object.keys(categories).map((key) => ({
        id: key,
        type: categories[key].type,
        amount: categories[key].amount,
        description: categories[key].amount,
        date: categories[key].amount,
      }));
    },
  },

  actions: {
    async createRecord({ dispatch }, {
      category, radioType, amount, description,
    }) {
      const uid = await dispatch('getUid', {}, { root: true });
      try {
        const db = getDatabase();
        await push(ref(db, `users/${uid}/records`), {
          categoryId: category,
          type: radioType,
          amount,
          description,
          date: new Date().toJSON(),
        });
      } catch (err) {
        throw new Error();
      }
    },

    async fetchRecords({ commit, dispatch }) {
      const userUid = await dispatch('getUid', {}, { root: true });
      try {
        const db = getDatabase();
        const snapshot = await get(ref(db, `users/${userUid}/category`));
        const categories = snapshot.val();
        // commit('setCategories', categories);
      } catch (err) {
        throw new Error();
      }
    },
  },

};
