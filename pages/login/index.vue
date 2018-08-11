<template lang="pug">
  .login
    h1 メールアドレス
    input(type='text') 
    button(@click='login') ログイン
</template>

<script>
import firebase from '@/plugins/firebase';
// import { store } from 'vuex';

const googleProvider = new firebase.auth.GoogleAuthProvider();

export default {
  name: 'Login',
  components: {},
  data() {
    return {};
  },
  created: function() {
    this.checkLoginState();
  },
  mounted: function() {},
  computed: {},
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
          // ユーザ情報を格納
          this.$store.commit('setUserId', {
            userId: user
          });
          // トップ画面に遷移
          this.$router.push('/');
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

