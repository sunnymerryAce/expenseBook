<template lang="pug">
  v-touch.monthly-item(@tap='toggleDetail')
    .monthly-item__label 201809
    .monthly-item__category__wrapper(ref='monthWrapper')
      ul.collection.monthly-item__category(ref='month')
        v-touch.collection-item.setting__item(tag='li') {{category}}
</template>

<script>
import firebase from '@/plugins/firebase';
import ls from 'localstorage-ttl';

import EventBus from '~/assets/js/EventBus.js';

export default {
  name: 'MonthlyBudgetItem',
  components: {},
  props: {
    category: {}
  },
  data() {
    return {
      /**
       * ロード中かどうか
       */
      isLoaded: false,
      /**
       * カテゴリ内訳を表示しているか
       */
      showCategory: false
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
  created() {
    console.log(this.category);
  },
  mounted() {},
  methods: {
    /**
     * アコーディオン表示
     */
    toggleDetail() {
      if (!this.showCategory) {
        const contentHeight = getComputedStyle(this.$refs.month).height;
        TweenMax.to(this.$refs.monthWrapper, 0.2, {
          height: contentHeight,
          ease: Power2.easeOut,
          onComplete: () => {
            console.log('complete');
          }
        });
      } else {
        TweenMax.to(this.$refs.monthWrapper, 0.2, {
          height: 0,
          ease: Power2.easeOut
        });
      }
      this.showCategory = !this.showCategory;
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
    transform: rotate(135deg);
  }
}
.add-button {
  @extend .light-blue;
  @extend .darken-4;
  margin: 0 auto;
}
.monthly-item__category__wrapper {
  height: 0;
  overflow: hidden;
}
</style>

