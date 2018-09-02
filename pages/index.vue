<template lang="pug">
  section.top
    Navigation
    RegisterModal
    keep-alive
      ListChart(name='chart')
    button.waves-effect.waves-light.btn(@click='logout') Logout
    a.add-button.btn-floating.btn-large.waves-effect.waves-light.light-blue.modal-trigger(data-target="registerModal")
      i.material-icons add
</template>

<script>
import firebase from '@/plugins/firebase';
import Chart from 'chart.js';

import Navigation from '~/components/Navigation.vue';
import ListChart from '~/components/ListChart.vue';
import RegisterModal from '~/components/RegisterModal.vue';

export default {
  name: 'Index',
  components: {
    Navigation,
    ListChart,
    RegisterModal
  },
  data() {
    return {
      /**
       * ロード中かどうか
       */
      isLoaded: false
    };
  },
  created: function() {
    // DBからデータを取得
    this.$store.commit('setDb', firebase.database());
    // カテゴリの設定
    const categoryPath = this.$store.state.db.ref(`/category`);
    categoryPath.once('value', (snapshot) => {
      this.$store.commit('setCategoryList', snapshot.val());
    });
  },
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
          location.href = '/login';
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
};
</script>


<style>
.top {
  text-align: center;
}
.btn {
  margin-bottom: 20px;
}
.top__link {
  display: block;
}
.add-button {
  position: fixed;
  bottom: 5vw;
  right: 5vw;
}
</style>

