<template lang="pug">
  .register
    h1 登録画面
    .amount 金額
    input(type='number', v-model='amount')
    .genre ジャンル
    select
      option(value='食費') 食費
      option(value='雑費') 雑費
      option(value='飲み遊び費') 飲み遊び費
    .title Item Name
    input(type='text', v-model='title')
    button(@click='register') 登録
</template>

<script>
import firebase from '@/plugins/firebase';

export default {
  name: 'Register',
  components: {},
  data() {
    return {
      db: null,
      expensebook: null,
      amount: 0,
      title: ''
    };
  },
  created() {
    this.db = firebase.database();
    this.expensebook = this.db.ref('/expensebook/');
  },
  computed: {},
  methods: {
    register() {
      const now = Date.now();
      const path = this.db.ref(`/expensebook/${now}`);
      const item = {
        title: this.title,
        amount: this.amount
      };
      console.log('register');

      path.set(item);
      // this.title = '';
      // this.amount = 0;
    }
  }
};
</script>
<style scoped lang="scss">
.red {
  color: red;
}
</style>

