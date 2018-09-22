<template lang="pug">
  section.monthl-budget
    Navigation
    a.waves-effect.waves-light.btn.add-button ADD NEW BUDGET
    ul.collection
      MonthlyBudgetItem.collection-item.setting__item(
        tag='li',
        v-for='month in months',
        :category='month')
        
</template>

<script>
import firebase from '@/plugins/firebase';
import ls from 'localstorage-ttl';

import EventBus from '~/assets/js/EventBus.js';
import Navigation from '~/components/Navigation.vue';
import Loading from '~/components/Loading.vue';
import MonthlyBudgetItem from '~/components/MonthlyBudgetItem.vue';

export default {
  name: 'budget',
  components: {
    Navigation,
    Loading,
    MonthlyBudgetItem
  },
  props: {},
  data() {
    return {
      /**
       * ロード中かどうか
       */
      isLoaded: false
    };
  },
  computed: {
    /**
     * 月別予算の配列
     */
    months() {
      return this.$store.state.budgetList;
    }
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style scoped lang="scss">
.setting__item {
  font-size: 16px;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    top: 14px;
    right: 20px;
    width: 13px;
    height: 13px;
    border-top: 2px solid #d7d7d7;
    border-right: 2px solid #d7d7d7;
    transform: rotate(45deg);
  }
}
.add-button {
  @extend .light-blue;
  @extend .darken-4;
  margin: 0 auto;
}
</style>

