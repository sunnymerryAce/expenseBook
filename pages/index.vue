<template lang="pug">
  section.top
    Navigation
    RegisterModal
    keep-alive
      ListChart(name='chart')
    button.waves-effect.waves-light.btn(@click='logout') Logout
    RegisterButton
</template>

<script>
import firebase from '@/plugins/firebase';
import Chart from 'chart.js';

import Navigation from '~/components/Navigation.vue';
import ListChart from '~/components/ListChart.vue';
import RegisterModal from '~/components/RegisterModal.vue';
import RegisterButton from '~/components/RegisterButton.vue';

export default {
  name: 'Index',
  components: {
    Navigation,
    ListChart,
    RegisterModal,
    RegisterButton
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
    if (!this.$store.state.db) {
      this.$store.dispatch('getDatabase');
    }
  },
  monuted() {},
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
</style>

