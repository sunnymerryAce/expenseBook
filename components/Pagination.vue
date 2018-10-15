<template lang="pug">
  .pagination
    .prev
      a.waves-effect.waves-teal.btn-flat(@click='changeMonth(-1)') PREV
    .main {{dateText}}
    .prev
      a.waves-effect.waves-teal.btn-flat(@click='changeMonth(1)') NEXT
</template>

<script>
import firebase from '@/plugins/firebase';
import EventBus from '~/assets/js/EventBus.js';
import CONST from '~/assets/js/CONST.js';

export default {
  name: 'Pagination',
  data() {
    return {
      /**
       * 登録先データベース
       */
      db: null,
      /**
       * データベースのカテゴリ一覧
       */
      categoryList: [],
      /**
       * 金額
       */
      amount: '0',
      /**
       * ジャンル
       */
      category: null,
      /**
       * タイトル
       */
      title: '',
      /**
       * 各カテゴリの金額合計
       */
      amountList: [],
      barColors: [],
      barBackgroundColors: [],
      /**
       * ロード中かどうか
       */
      isLoading: false
    };
  },
  created() {},
  computed: {
    dateText() {
      return `${this.$store.getters.currentYYYYMM}${
        this.$store.state.startMonthDate
      }-`;
    }
  },
  watch: {},
  methods: {
    changeMonth(i) {
      EventBus.$emit('changeMonth', i);
    }
  }
};
</script>


<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 20px auto 0;
}
</style>

