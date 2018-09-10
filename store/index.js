import Vuex from 'vuex';
import firebase from '@/plugins/firebase';
import { resolve } from 'path';
import EventBus from '~/assets/js/EventBus.js';

const store = () =>
  new Vuex.Store({
    state: {
      /**
       * ユーザID
       */
      userId: '',
      /**
       * Firebase RDB参照先
       */
      db: null,
      /**
       * データベース内のアイテム
       */
      list: {},
      /**
       * データベースのカテゴリ一覧
       */
      categoryList: [],
      /**
       * 予算
       */
      budget: []
    },
    mutations: {
      setUserId(state, args) {
        state.userId = args.userId;
      },
      setDb(state, database) {
        state.db = database;
      },
      setList(state, list) {
        state.list = list;
      },
      setCategoryList(state, categoryList) {
        state.categoryList = categoryList;
      },
      setBudget(state, budget) {
        state.budget = budget;
      }
    },
    getters: {
      /**
       * ログインしているか
       * @param {*} state
       */
      isAuthenticated(state) {
        return state.userId;
      },
      /**
       * カテゴリ名
       */
      categoryName: (state) => (id) => {
        return state.categoryList.length ? state.categoryList[id] : '';
      },
      /**
       * DB/expenseBook
       */
      expenseDB(state) {
        return `/${state.userId}/expense`;
      },
      /**
       * DB/category
       */
      categoryDB(state) {
        return `/${state.userId}/category`;
      },
      /**
       * DB/budget
       */
      budgetDB(state) {
        return `/${state.userId}/budget`;
      }
    },
    actions: {
      getDatabase({ commit, getters }) {
        // DBからデータを取得
        const db = firebase.database();
        commit('setDb', db);
        const promise1 = new Promise((resolve) => {
          db.ref(getters.budgetDB).on('value', (snapshot) => {
            commit('setBudget', snapshot.val());
            resolve();
          });
        });
        const promise2 = new Promise((resolve) => {
          db.ref(getters.categoryDB).on('value', (snapshot) => {
            commit('setCategoryList', snapshot.val());
            resolve();
          });
        });
        const promise3 = new Promise((resolve) => {
          db.ref(getters.expenseDB).on('value', (snapshot) => {
            commit('setList', snapshot.val());
            resolve();
          });
        });
        Promise.all([promise1, promise2, promise3]).then(() => {
          EventBus.$emit('DBLoaded');
        });
      }
    }
  });

export default store;
