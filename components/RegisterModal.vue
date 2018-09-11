<template lang="pug">
  .modal#registerModal.register-modal
    .modal-content
      .register
        .calendar Date
          input.datepicker(type='text', autoClose='true')
        .amount Amount
        input.register__input(type='number', v-model='amount')
        .category Category
        .input-field.col.s12.blue-text
          select(v-model='category')
            option(value=-1) 未選択
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
            @click='editItem') EDIT
          button.button.waves-effect.waves-light.btn.red.darken-4.modal-close(@click='deleteItem') DELETE
</template>

<script>
import EventBus from '~/assets/js/EventBus.js';
// import 'materialize-css/dist/js/materialize.min.js';

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
      this.date = new Date(params.year, params.month - 1, params.date);
      this.initializeCalendar();
      this.title = params.title;
      this.category = params.category;
      this.amount = params.amount;
      this.materializeModal[0].open();
      console.log(this.date);
    });
  },
  mounted() {
    this.initializeCalendar();
    // Materialize.css のモジュール有効化
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
     * カレンダーを初期化する
     */
    initializeCalendar() {
      // Materialize.css のモジュール有効化
      this.materializeDatePicker = M.Datepicker.init(
        document.querySelectorAll('.datepicker'),
        {
          autoClose: true,
          defaultDate: this.date ? this.date : new Date(),
          setDefaultDate: true,
          container: document.querySelector('.top'),
          format: 'yyyy/mm/dd',
          onSelect: (date) => {
            this.date = date;
          }
        }
      );
      this.date = this.materializeDatePicker[0].date;
    },
    /**
     * 登録ボタン押下時の処理
     */
    register() {
      if (this.requiredInfoFilled) {
        const year = this.date.getFullYear();
        const month = this.date.getMonth() + 1;
        const date = this.date.getDate();

        const path = this.$store.state.db.ref(
          `${this.$store.getters.expenseDB}/${Date.now()}`
        );
        const item = {
          year,
          month,
          date,
          title: this.title,
          category: this.category,
          amount: parseInt(this.amount, 10)
        };
        path.set(item).then(() => {});
      } else {
        return;
      }
    },
    /**
     * 編集ボタン押下時の処理
     */
    editItem() {
      if (this.requiredInfoFilled) {
        console.log(this.category);

        const year = this.date.getFullYear();
        const month = this.date.getMonth() + 1;
        const date = this.date.getDate();

        const path = this.$store.state.db.ref(
          `${this.$store.getters.expenseDB}/${this.id}`
        );
        const item = {
          year,
          month,
          date,
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
     * 削除ボタン押下時の処理
     */
    deleteItem() {
      const path = this.$store.state.db.ref(
        `${this.$store.getters.expenseDB}/${this.id}`
      );
      path.set(null);
    }
  }
};
</script>


<style lang='scss'>
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
.datepicker-cancel, .datepicker-clear, .datepicker-today, .datepicker-done {
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

