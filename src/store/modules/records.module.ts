import {
  get,
  getDatabase, ref,
  push,
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
      return state.records;
    },
  },

  mutations: {
    setRecords(state, records) {
      state.records = Object.keys(records).map((key) => ({
        id: key,
        amount: records[key].amount,
        categoryId: records[key].categoryId,
        date: records[key].date,
        description: records[key].description,
        type: records[key].type,
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
        const snapshot = await get(ref(db, `users/${userUid}/records`));
        const records = snapshot.val();
        commit('setRecords', records);
      } catch (err) {
        throw new Error();
      }
    },

    async fetchRecordById({ dispatch }, recordId) {
      const userUid = await dispatch('getUid', {}, { root: true });
      try {
        const db = getDatabase();
        const snapshot = await get(ref(db, `users/${userUid}/records/${recordId}`));
        const record = snapshot.val();
        return record || null;
      } catch (err) {
        throw new Error();
      }
    },
  },

};
