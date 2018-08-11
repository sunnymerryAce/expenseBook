<template lang="pug">
  section.top
    h1 トップ
    button(@click='logout') ログアウト
</template>

<script>
import firebase from '@/plugins/firebase';
import AppLogo from '~/components/AppLogo.vue';

export default {
  name: 'Index',
  components: {
    AppLogo
  },
  data() {
    return {
      db: null,
      myChatAll: null
    };
  },
  created: function() {},
  computed: {},
  methods: {
    /**
     * ログアウトボタン押下時の処理
     */
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.commit('setUserId', {
            userId: null
          });
          alert('ログアウトしました');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
};
</script>


<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

