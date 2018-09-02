import Vuex from 'vuex';

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
      setDb(state, db) {
        state.db = db;
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
    }
  });

export default store;
