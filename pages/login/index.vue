<template lang="pug">
  .login
    .loading(v-show='!isLoaded') Loading...
    .login__content(v-show='isLoaded')
      button.login-button.waves-effect.waves-light.btn.light-blue(@click='login') Googleアカウントでログイン
</template>

<script>
import firebase from '@/plugins/firebase';
import ls from 'localstorage-ttl';

const googleProvider = new firebase.auth.GoogleAuthProvider();

export default {
  name: 'Login',
  components: {},
  data() {
    return {
      /**
       * ロード中かどうか
       */
      isLoaded: false
    };
  },
  computed: {},
  created() {
    this.checkLoginState();
  },
  mounted() {},
  methods: {
    /**
     * ログインボタン押下時の処理
     */
    login() {
      // firebaseでGoogleログインを実行する
      firebase.auth().signInWithRedirect(googleProvider);
    },
    /**
     * ログイン状態を確認する
     */
    checkLoginState() {
      // ログイン状態のチェック
      firebase.auth().onAuthStateChanged((user) => {
        // ログイン済みの場合
        if (user) {
          // ユーザ情報を格納
          this.$store.commit('setUserId', {
            userId: user.uid
          });
          ls.set('userId', user.uid, 86400000);
          // トップ画面に遷移
          this.$router.push('/');
        } else {
          // ログイン画面を表示
          this.isLoaded = true;
          // iOSのPWA用にuserIDをストレージに登録
          // this.$store.commit('setUserId', {
          //   userId: 'XR77WGBWGNMZQ2Z79ykNLzhfBwt1'
          // });
          // ls.set('userId', 'XR77WGBWGNMZQ2Z79ykNLzhfBwt1', 86400000);
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
.login-button {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 100%;
}
</style>

