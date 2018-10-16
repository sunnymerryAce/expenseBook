import Vuex from 'vuex';
import firebase from '@/plugins/firebase';
import 'firebase/firestore';

import EventBus from '~/assets/js/EventBus.js';
import { getYYYYMM } from '~/assets/js/common.js';

const store = () =>
  new Vuex.Store({
    state: {
      /**
       * ユーザID
       */
      userId: '',
      /**
       * 表示する月 (Dateオブジェクト)
       */
      currentMonth: Date,
      /**
       * 月始まりの日にち
       */
      startMonthDate: 25,
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
       * カテゴリコレクションの参照
       */
      categoryListRef: null,
      /**
       * デフォルトのカテゴリ一覧
       */
      categoryList: [],
      /**
       * 予算コレクションの参照
       */
      budgetListRef: null,
      /**
       * 月ごとのカテゴリ/予算一覧
       */
      budgetList: []
    },
    mutations: {
      setUserId(state, userId) {
        state.userId = userId;
      },
      setCurrentMonth(state, currentMonth) {
        state.currentMonth = currentMonth;
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
      setBudgetListRef(state, budgetListRef) {
        state.budgetListRef = budgetListRef;
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
        return state.budgetList.length && state.budgetList[id]
          ? state.budgetList[id].title
          : '';
      },
      /**
       * 現在の年月(YYYYMM)
       */
      currentYYYYMM(state) {
        return getYYYYMM(state.currentMonth, state.startMonthDate);
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
          'setBudgetListRef',
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
          const YYYYMM = getYYYYMM(state.currentMonth, state.startMonthDate);
          state.budgetListRef
            // 当月の予算1件検索
            .where(firebase.firestore.FieldPath.documentId(), '==', YYYYMM)
            .onSnapshot((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                commit('setBudgetList', doc.data().list);
              });
              resolve();
            });
        });
        // 支出項目
        const promise2 = new Promise((resolve) => {
          // 検索期間を設定
          // 開始日
          const from = new Date(state.currentMonth);
          from.setDate(state.startMonthDate);
          if (state.currentMonth.getDate() < state.startMonthDate) {
            // 設定開始日以前のとき、前月を設定
            from.setMonth(state.currentMonth.getMonth() - 1);
          }
          // 終了日
          const to = new Date(state.currentMonth);
          to.setDate(state.startMonthDate - 1);
          if (state.currentMonth.getDate() >= state.startMonthDate) {
            // 設定開始日以降のとき、来月を設定
            to.setMonth(state.currentMonth.getMonth() + 1);
          }

          // from/toで絞り込み
          state.itemsRef
            .where('date', '>=', from)
            .where('date', '<', to)
            .onSnapshot((querySnapshot) => {
              const items = {};
              querySnapshot.forEach((doc) => {
                items[doc.id] = doc.data();
              });
              commit('setItems', items);
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
