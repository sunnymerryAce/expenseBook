<template lang="pug">
  #budgetModal.modal.budget-modal
    .modal-content
      .register
        .title Title
        input.register__input(type='text', v-model='title' placeholder='')
        .amount Amount
        input.register__input(type='number', v-model='amount')
        .category {{$store.getters.categoryName(categoryId)}}
        .register(v-if='!isFixing')
          button.button__register.waves-effect.waves-light.btn.light-blue.modal-close(
            :class="{disabled: !requiredInfoFilled}",
            @click='register') REGISTER
        .fix(v-if='isFixing')
          button.button.waves-effect.waves-light.btn.light-blue.modal-close(
            :class="{disabled: !requiredInfoFilled}",
            @click='register') EDIT
          button.button.waves-effect.waves-light.btn.red.darken-4.modal-close(@click='deleteItem') DELETE
</template>

<script>
import { getYYYYMM } from '~/assets/js/common.js';

import EventBus from '~/assets/js/EventBus.js';

export default {
  name: 'BudgetModal',
  props: {
    categoryId: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      /**
       * カテゴリ名
       */
      title: '',
      /**
       * 金額
       */
      amount: 0,
      /**
       * カテゴリ
       */
      category: -1,
      /**
       * Materialize.cssのモジュール
       */
      materializeModal: null
    };
  },
  computed: {
    /**
     * デフォルトのカテゴリ一覧
     */
    categoryList() {
      return this.$store.state.categoryList;
    },
    /**
     * 月ごとのカテゴリ/予算一覧
     */
    budgetList() {
      return this.$store.state.budgetList;
    },
    /**
     * 必須項目が全て入力されているか
     */
    requiredInfoFilled() {
      return this.amount > 0 && this.title;
    },
    /**
     * 編集かどうか
     */
    isFixing() {
      return this.categoryId > -1 ? true : false;
    }
  },
  watch: {
    // 編集時、categoryIdからTitleとAmountを設定する
    categoryId() {
      if (this.categoryId >= 0) {
        this.amount = this.budgetList[this.categoryId].amount;
        this.title = this.budgetList[this.categoryId].title;
      } else {
        this.amount = 0;
        this.title = '';
      }
    }
  },
  created() {},
  mounted() {
    // Materialize.css のモジュール有効化
    this.materializeModal = M.Modal.init(document.querySelectorAll('.modal'));
    var instances3 = M.FormSelect.init(document.querySelectorAll('select'));
  },
  updated() {
    // DBからカテゴリを取得しselectboxが更新された後、セレクトボックスを初期化する
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
  },
  methods: {
    /**
     * 登録、編集ボタン押下時の処理
     */
    register() {
      if (this.requiredInfoFilled) {
        const newList = [...this.budgetList];
        //　登録
        if (this.categoryId < 0) {
          newList.push({
            amount: this.amount,
            title: this.title
          });
          // 編集
        } else {
          newList.splice(this.categoryId, 1, {
            amount: this.amount,
            title: this.title
          });
        }
        this.$store.state.budgetListRef
          .doc(this.$store.getters.currentYYYYMM)
          .update({
            list: newList
          })
          .then(() => {});
      } else {
        return;
      }
    },
    /**
     * 削除ボタン押下時の処理
     */
    deleteItem() {
      const newList = [...this.budgetList];
      newList.splice(this.categoryId, 1);
      this.$store.state.budgetListRef
        .doc(this.$store.getters.currentYYYYMM)
        .update({
          list: newList
        });
    }
  }
};
</script>


<style scoped lang='scss'>
.register {
  width: 80%;
  margin: 0 auto;
}
.budget-modal {
  max-height: 85%;
  overflow-y: visible;
}
.register__headline {
  font-size: 2.2rem;
}
.register__input {
  text-align: center;
}
.btn {
  margin-bottom: 20px;
}
.top__link {
  display: block;
}
.select-dropdown {
  text-align: center;
}
.dropdown-content {
  transform-origin: top center !important;
}
.dropdown-content li {
  text-align: center;
}
.datepicker {
  text-align: center;
}
.datepicker-modal {
  max-width: 255px;
}
.datepicker-container {
  /* transform: scale(0.85);
  transform-origin: left center; */
}
.datepicker-date-display {
  display: none;
}
.datepicker-row {
  .is-selected {
    @extend .light-blue;
    @extend .darken-2;
  }
  .is-today {
    @extend .yellow-text;
    @extend .text-darken-2;
  }
}
.datepicker-cancel,
.datepicker-clear,
.datepicker-today,
.datepicker-done {
  @extend .light-blue-text;
  @extend .text-darken-2;
}
.dropdown-content > li > span {
  @extend .light-blue-text;
  @extend .text-darken-2;
}
input:not(.browser-default):focus:not([readonly]) {
  border-bottom: 1px solid #0288d1 !important;
}
.button {
  margin: 12px 3px;
}
.select-month input {
  width: 90px !important;
}
</style>

