import ls from 'localstorage-ttl';
import createPersistedState from "vuex-persistedstate";

export default ({store, isHMR}) => {
  // In case of HMR, mutation occurs before nuxReady, so previously saved state
  // gets replaced with original state received from server. So, we've to skip HMR.
  // Also nuxtReady event fires for HMR as well, which results multiple registration of
  // vuex-persistedstate plugin
  if (isHMR) return;

  if (process.client) {
    const userId = ls.get('userId');
    // localstorageのstore情報がログインユーザのものと一致しない場合
    if(localStorage.getItem('vuex') && userId === localStorage.getItem('vuex').userId) {
      // localstorageの情報を削除
      localStorage.removeItem('vuex');
    }
    // vuexの永続化
    const options = {
      reducer: (state) => ({
        userId: state.userId,
        // これあるとConverting circular structure to JSONエラー
        // db: state.db,
        list: state.list,
        categoryList: state.categoryList,
        budget: state.budget,
      })
    }
    createPersistedState(options)(store); // vuex plugins can be connected to store, even after creation
    console.log('永続化');
  }
};