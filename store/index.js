import Vuex from 'vuex';
import firebase from '@/plugins/firebase';
import 'firebase/firestore';

import EventBus from '~/assets/js/EventBus.js';

const store = () =>
  new Vuex.Store({
    state: {
      /**
       * ユーザID
       */
      userId: '',
      /**
       * Firestoreの参照
       */
      db: firebase.firestore(),
      /**
       * 支出項目コレクションの参照
       */
      itemsRef: null,
      /**
       * カテゴリ/予算コレクションの参照
       */
      categoryListRef: null,
      /**
       * データベース内のアイテム一覧
       */
      items: [],
      /**
       * データベースのカテゴリ/予算一覧
       */
      categoryList: []
    },
    mutations: {
      setUserId(state, userId) {
        state.userId = userId;
      },
      setItemsRef(state, itemsRef) {
        state.itemsRef = itemsRef;
      },
      setCategoryListRef(state, categoryListRef) {
        state.categoryListRef = categoryListRef;
      },
      setItems(state, items) {
        state.items = items;
      },
      setCategoryList(state, categoryList) {
        state.categoryList = categoryList;
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
      }
    },
    actions: {
      /**
       * ユーザIDを保存し、データベースへの参照を取得する
       */
      initDatabase({ commit, state }, userId) {
        commit('setUserId', userId);
        commit(
          'setItemsRef',
          state.db.doc(`users/${state.userId}`).collection('expense')
        );
        commit(
          'setCategoryListRef',
          state.db.doc(`users/${state.userId}`).collection('category')
        );
      },
      /**
       * データベースからデータを取得する
       */
      getDatabase({ commit, state }) {
        // カテゴリ
        const promise1 = new Promise((resolve) => {
          const categoryList = [];
          state.categoryListRef.onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              categoryList.push(doc.data());
            });
            commit('setCategoryList', categoryList);
            resolve();
          });
        });
        // 支出項目
        const promise2 = new Promise((resolve) => {
          const items = [];
          state.itemsRef.onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              items.push(doc.data());
            });
            commit('setItems', items);
            resolve();
          });
        });
        Promise.all([promise1, promise2]).then(() => {
          EventBus.$emit('DBLoaded');
        });
      }
    }
  });

export default store;
