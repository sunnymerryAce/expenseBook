<template lang="pug">
  section.list
    Navigation
    RegisterModal
    .list__content
      table.highlight.striped.centered
        thead
          tr
            th Date
            th Category
            th Amount
            th Title
        tbody
          ListItem(v-for='item, key in list', :item='item', :id='key', index='index')
    Pagination
    RegisterButton
</template>

<script>
import firebase from '@/plugins/firebase';
import ls from 'localstorage-ttl';

import Chart from 'chart.js';
import Navigation from '~/components/Navigation.vue';
import ListItem from '~/components/ListItem.vue';
import RegisterModal from '~/components/RegisterModal.vue';
import RegisterButton from '~/components/RegisterButton.vue';
import Pagination from '~/components/Pagination.vue';
import { getDateOfThisMonth } from '~/assets/js/common.js';

export default {
  name: 'List',
  components: {
    Navigation,
    ListItem,
    RegisterModal,
    RegisterButton,
    Pagination
  },
  data() {
    return {};
  },
  computed: {
    list() {
      return this.$store.state.items;
    }
  },
  created() {
    if (ls.get('userId')) {
      // 日時を取得し当月を設定する
      this.$store.commit('setCurrentMonth', getDateOfThisMonth());

      // ユーザ情報を格納
      if (!this.$store.state.userId) {
        this.$store.dispatch('initDatabase', ls.get('userId'));
      }
    } else {
      // ログイン画面を表示
      this.$router.push('/login');
    }
  },
  updated() {},
  methods: {}
};
</script>
<style scoped lang="scss">
.list {
  text-align: center;
}
.list__content {
  margin-bottom: 30px;
}
</style>

