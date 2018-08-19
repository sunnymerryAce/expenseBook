<template lang="pug">
  .login
    .loading(v-show='!isLoaded') Loading...
    .login__content(v-show='isLoaded')
      button.waves-effect.waves-light.btn.light-blue(@click='login') Googleアカウントでログイン
</template>

<script>
import firebase from '@/plugins/firebase';
// import { store } from 'vuex';

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
  created: function() {
    this.checkLoginState();
  },
  mounted: function() {},
  methods: {
    /**
     * ログインボタン押下時の処理
     */
    login() {
      // firebaseでGoogleログインを実行する
      firebase
        .auth()
        .signInWithRedirect(googleProvider)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * ログイン状態を確認する
     */
    checkLoginState() {
      // ログイン状態のチェック
      firebase.auth().onAuthStateChanged((user) => {
        // ログイン済みの場合
        if (user) {
          console.log('logged in');
          // ユーザ情報を格納
          this.$store.commit('setUserId', {
            userId: user
          });
          // トップ画面に遷移
          this.$router.push('/');
        } else {
          // ログイン画面を表示
          this.isLoaded = true;
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
.red {
  color: red;
}
</style>

