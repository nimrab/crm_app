import {
  get,
  getDatabase, ref,
  push, set,
} from 'firebase/database';

export default {
  namespaced: true,
  state() {
    return {
      categories: [],
    };
  },

  getters: {
    getCategories(state) {
      return state.categories;
    },
  },

  mutations: {
    setCategories(state, categories) {
      state.categories = Object.keys(categories).map((key) => ({
        id: key,
        name: categories[key].name,
        limit: categories[key].limit,
      }));
    },
  },

  actions: {
    async createCategory({ dispatch }, { name, limit }) {
      const uid = await dispatch('getUid', {}, { root: true });
      try {
        const db = getDatabase();
        await push(ref(db, `users/${uid}/category`), {
          name,
          limit,
        });
      } catch (err) {
        throw new Error();
      }
    },

    async fetchCategories({ commit, dispatch }) {
      const userUid = await dispatch('getUid', {}, { root: true });
      try {
        const db = getDatabase();
        const snapshot = await get(ref(db, `users/${userUid}/category`));
        const categories = snapshot.val();
        commit('setCategories', categories);
      } catch (err) {
        throw new Error();
      }
    },

    async editCategory({ commit, dispatch }, { categoryId, name, limit }) {
      const userUid = await dispatch('getUid', {}, { root: true });
      try {
        const db = getDatabase();
        await set(ref(db, `users/${userUid}/category/${categoryId}`), {
          name,
          limit,
        });
      } catch (err) {
        throw new Error();
      }
    },

  },

};
