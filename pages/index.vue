<template lang="pug">
  section.top
    Loading(v-show='isLoading')
    .main(v-show='!isLoading')
      Navigation
      RegisterModal
      ListChart(name='chart')
      button.waves-effect.waves-light.btn.logout-button.light-blue.darken-3(@click='logout') Logout
      RegisterButton
</template>

<script>
import firebase from '@/plugins/firebase';
import Chart from 'chart.js';
import ls from 'localstorage-ttl';

import Navigation from '~/components/Navigation.vue';
import ListChart from '~/components/ListChart.vue';
import RegisterModal from '~/components/RegisterModal.vue';
import RegisterButton from '~/components/RegisterButton.vue';
import Loading from '~/components/Loading.vue';
import EventBus from '~/assets/js/EventBus.js';

export default {
  name: 'Index',
  components: {
    Navigation,
    ListChart,
    RegisterModal,
    RegisterButton,
    Loading
  },
  data() {
    return {
      /**
       * ロード中かどうか
       */
      isLoading: true
    };
  },
  created() {
    if (ls.get('userId')) {
      // ユーザ情報を格納
      this.$store.commit('setUserId', {
        userId: ls.get('userId')
      });
    } else {
      // ログイン画面を表示
      this.$router.push('/login');
    }

    // await this.checkLoginState();
    // DBからデータを取得
    if (!this.$store.state.db) {
      this.$store.dispatch('getDatabase');
    } else {
      this.isLoading = false;
    }
    EventBus.$on('DBLoaded', () => {
      this.isLoading = false;
    });
  },
  monuted() {},
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.commit('setUserId', {
            userId: null
          });
          localStorage.removeItem('userId');
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
.logout-button {
  margin-top: 20px;
}
.top__link {
  display: block;
}
</style>

