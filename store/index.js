import Vuex from 'vuex';
import firebase from '@/plugins/firebase';

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
      categoryList: []
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
      }
    },
    getters: {
      /**
       * ログインしているか
       * @param {*} state
       */
      isAuthenticated(state) {
        return state.userId;
      }
    },
    actions: {
      getDatabase({ commit }) {
        // DBからデータを取得
        const db = firebase.database();
        commit('setDb', db);
        // カテゴリ更新時のイベント設定
        db.ref(`/category`).on('value', (snapshot) => {
          commit('setCategoryList', snapshot.val());
        });
        // exprenseBookアイテム更新時のイベント設定
        db.ref(`/expensebook`).on('value', (snapshot) => {
          commit('setList', snapshot.val());
        });
      }
    }
  });

export default store;
