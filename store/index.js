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
       * データベース内のアイテム一覧
       * key値も参照するため、オブジェクト形式で渡す
       */
      items: {},
      /**
       * カテゴリ/予算コレクションの参照
       */
      categoryListRef: null,
      /**
       * データベースのカテゴリ/予算一覧
       */
      categoryList: [],
      /**
       * カテゴリ/予算コレクションの参照
       */
      budgetListRef: null,
      /**
       * データベースのカテゴリ/予算一覧
       */
      budgetList: []
    },
    mutations: {
      setUserId(state, userId) {
        state.userId = userId;
      },
      setItemsRef(state, itemsRef) {
        state.itemsRef = itemsRef;
      },
      setItems(state, items) {
        state.items = items;
      },
      setCategoryListRef(state, categoryListRef) {
        state.categoryListRef = categoryListRef;
      },
      setCategoryList(state, categoryList) {
        state.categoryList = categoryList;
      },
      setBudgetList(state, budgetList) {
        state.budgetList = budgetList;
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
        return state.categoryList.length ? state.categoryList[id].title : '';
      }
    },
    actions: {
      /**
       * ユーザIDを保存し、データベースへの参照を取得する
       */
      initDatabase({ commit, dispatch, state }, userId) {
        commit('setUserId', userId);
        commit(
          'setItemsRef',
          state.db.doc(`users/${state.userId}`).collection('expense')
        );
        commit(
          'setCategoryListRef',
          state.db.doc(`users/${state.userId}`).collection('category')
        );
        commit(
          'setCategoryListRef',
          state.db.doc(`users/${state.userId}`).collection('budget')
        );
        dispatch('getDatabase');
      },
      /**
       * データベースからデータを取得する
       */
      getDatabase({ commit, state }) {
        // カテゴリ
        const promise1 = new Promise((resolve) => {
          state.categoryListRef.onSnapshot((querySnapshot) => {
            const categoryList = [];
            querySnapshot.forEach((doc) => {
              categoryList.push(doc.data());
            });
            commit('setCategoryList', categoryList);
            resolve();
          });
        });
        // 予算
        const promise3 = new Promise((resolve) => {
          state.categoryListRef.onSnapshot((querySnapshot) => {
            const budgetList = [];
            querySnapshot.forEach((doc) => {
              budgetList.push(doc.data());
            });
            commit('setBudgetList', budgetList);
            resolve();
          });
        });
        // 支出項目
        const promise2 = new Promise((resolve) => {
          state.itemsRef.onSnapshot((querySnapshot) => {
            const items = {};
            querySnapshot.forEach((doc) => {
              items[doc.id] = doc.data();
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
