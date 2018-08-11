import Vuex from 'vuex';

const store = () =>
  new Vuex.Store({
    state: {
      userId: ''
    },
    mutations: {
      setUserId(state, args) {
        state.userId = args.userId;
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
