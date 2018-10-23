<template lang="pug">
  section.top
    Loading(v-show='isLoading')
    .main(v-show='!isLoading')
      Navigation
      RegisterModal
      ListChart(name='chart')
      Pagination
      RegisterButton
</template>

<script>
import firebase from '@/plugins/firebase';
import Chart from 'chart.js';
import ls from 'localstorage-ttl';
import { getDateOfThisMonth } from '~/assets/js/common.js';

import Navigation from '~/components/Navigation.vue';
import ListChart from '~/components/ListChart.vue';
import RegisterModal from '~/components/RegisterModal.vue';
import RegisterButton from '~/components/RegisterButton.vue';
import Pagination from '~/components/Pagination.vue';
import Loading from '~/components/Loading.vue';
import EventBus from '~/assets/js/EventBus.js';

export default {
  name: 'Index',
  components: {
    Navigation,
    ListChart,
    RegisterModal,
    RegisterButton,
    Loading,
    Pagination
  },
  data() {
    return {
      /**
       * ロード中かどうか
       */
      isLoading: true,
      now: null
    };
  },
  created() {
    if (ls.get('userId')) {
      // 日時を取得し当月を設定する
      this.$store.commit('setCurrentMonth', getDateOfThisMonth());
      this.now = getDateOfThisMonth();

      // ユーザ情報を格納
      if (!this.$store.state.userId) {
        this.$store.dispatch('initDatabase', ls.get('userId'));
      } else {
        this.isLoading = false;
      }
    } else {
      // ログイン画面を表示
      this.$router.push('/login');
    }
    // オンラインで情報取得後に情報更新
    EventBus.$on('DBLoaded', () => {
      this.isLoading = false;
    });
    // ページネーション
    EventBus.$on('changeMonth', (direction) => {
      this.changeMonth(direction);
    });
  },
  methods: {
    // 表示する月を変更する
    changeMonth(direction) {
      this.now.setMonth(this.now.getMonth() + direction);
      this.$store.commit('setCurrentMonth', this.now);
      this.$store.dispatch('getDatabase');
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

