<template lang="pug">
  section.monthl-budget
    Navigation
    BudgetModal(:categoryId='categoryId')
    a.waves-effect.waves-light.btn.add-button.modal-trigger(
      data-target="budgetModal",
      @click="registerBudget(-1)") ADD NEW BUDGET
    ul.collection
      li.collection-item.setting__item.modal-trigger(
        v-for='budget, index in budgets',
        :budget='budget',
        data-target="budgetModal",
        @click="registerBudget(index)") {{$store.getters.categoryName(index)}} {{budget.amount}}
</template>

<script>
import firebase from '@/plugins/firebase';
import ls from 'localstorage-ttl';

import EventBus from '~/assets/js/EventBus.js';
import Navigation from '~/components/Navigation.vue';
import BudgetModal from '~/components/BudgetModal.vue';
import Loading from '~/components/Loading.vue';
import MonthlyBudgetItem from '~/components/MonthlyBudgetItem.vue';

export default {
  name: 'budget',
  components: {
    Navigation,
    Loading,
    MonthlyBudgetItem,
    BudgetModal
  },
  data() {
    return {
      /**
       * ロード中かどうか
       */
      isLoaded: false,
      /**
       * カテゴリ編集モーダルに渡すID
       */
      categoryId: -1
    };
  },
  computed: {
    /**
     * 予算の配列
     */
    budgets() {
      return this.$store.state.budgetList;
    }
  },
  created() {},
  mounted() {},
  methods: {
    registerBudget(id) {
      console.log(id);
      this.categoryId = id;
    }
  }
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

