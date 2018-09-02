<template lang="pug">
  .modal#registerModal.register-modal
    .modal-content
      .register
        .calendar Date
          input.datepicker(type='text', autoClose='true')
        .amount Amount
        input.register__input(type='number', v-model='amount')
        .category Category
        .input-field.col.s12
          select(v-model='category')
            option(v-for='item, index in categoryList', :value='index') {{item}}
        .item-name Item Name
        input.register__input(type='text', v-model='title')
        .register(v-if='!isFixing')
          button.button__register.waves-effect.waves-light.btn.light-blue.modal-close(
            :class="{disabled: !requiredInfoFilled}",
            @click='register') REGISTER
        .fix(v-if='isFixing')
          button.button.waves-effect.waves-light.btn.light-blue.modal-close(
            :class="{disabled: !requiredInfoFilled}",
            @click='edit') EDIT
          button.button.waves-effect.waves-light.btn.red.darken-4.modal-close(@click='register') DELETE
</template>

<script>
import EventBus from '~/assets/js/EventBus.js';

export default {
  name: 'RegisterModal',
  data() {
    return {
      /**
       * ID
       */
      id: null,
      /**
       * 日付
       */
      date: null,
      /**
       * 金額
       */
      amount: 0,
      /**
       * カテゴリ
       */
      category: -1,
      /**
       * タイトル
       */
      title: '',
      /**
       * Materialize.cssのカレンダーモジュール
       */
      materializeDatePicker: null,
      materializeModal: null
    };
  },
  computed: {
    /**
     * データベースのカテゴリ一覧
     */
    categoryList() {
      return this.$store.state.categoryList;
    },
    /**
     * 必須項目が全て入力されているか
     */
    requiredInfoFilled() {
      return this.date && this.amount > 0 && this.category >= 0;
    },
    /**
     * 編集かどうか
     */
    isFixing() {
      return this.id ? true : false;
    }
  },
  created() {
    EventBus.$on('editItem', (params) => {
      this.id = params.id;
      this.date = params.registerDate;
      this.title = params.title;
      this.category = params.category;
      this.amount = params.amount;
      this.materializeModal[0].open();
      console.log(this.id);
    });
  },
  mounted() {
    // Materialize.css のモジュール有効化
    this.materializeDatePicker = M.Datepicker.init(
      document.querySelectorAll('.datepicker'),
      {
        autoClose: true,
        defaultDate: new Date(),
        setDefaultDate: true,
        container: document.querySelector('.top'),
        showDaysInNextAndPreviousMonths: true,
        format: 'yyyy/mm/dd',
        onSelect: (date) => {
          this.date = date;
        }
      }
    );
    this.date = this.materializeDatePicker[0].date;
    this.materializeModal = M.Modal.init(document.querySelectorAll('.modal'));
    var instances3 = M.FormSelect.init(document.querySelectorAll('select'));
  },
  updated: function() {
    // DBからカテゴリを取得しselectboxが更新された後、セレクトボックスを初期化する
    // Materialize.css のセレクトボックス有効化
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
  },
  destroyed() {
    EventBus.$off('editItem');
  },
  methods: {
    /**
     * 登録ボタン押下時の処理
     */
    register() {
      if (this.requiredInfoFilled) {
        const year = this.date.getFullYear();
        const month = this.date.getMonth() + 1;
        const date = this.date.getDate();

        const path = this.$store.state.db.ref(`/expensebook/${Date.now()}`);
        const item = {
          registerDate: `${year}/${month}/${date}`,
          title: this.title,
          category: this.category,
          amount: parseInt(this.amount, 10)
        };
        path.set(item);
      } else {
        return;
      }
    },
    /**
     * 編集ボタン押下時の処理
     */
    edit() {
      if (this.requiredInfoFilled) {
        // const year = this.date.getFullYear();
        // const month = this.date.getMonth() + 1;
        // const date = this.date.getDate();

        const path = this.$store.state.db.ref(`/expensebook/${this.id}`);
        const item = {
          // registerDate: `${year}/${month}/${date}`,
          title: this.title,
          category: this.category,
          amount: parseInt(this.amount, 10)
        };
        console.log(path);
        path.set(item);
      } else {
        return;
      }
    }
  }
};
</script>


<style>
.register {
  width: 80%;
  margin: 0 auto;
}
.register-modal {
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
.button {
  margin: 12px 3px;
}
</style>

