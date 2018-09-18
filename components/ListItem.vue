<template lang="pug">
  tr.list-item.modal-trigger(@click='editItem')
    td {{registerDate}}
    td {{categoryName}}
    td {{item.amount}}
    td {{item.title}}
</template>

<script>
import firebase from '@/plugins/firebase';
import Chart from 'chart.js';
import Navigation from '~/components/Navigation.vue';

import EventBus from '~/assets/js/EventBus.js';

export default {
  name: 'ListItem',
  components: {
    Navigation
  },
  props: {
    item: {},
    id: ''
  },
  data() {
    return {};
  },
  computed: {
    /**
     * 登録日
     */
    registerDate() {
      return `${this.item.date.getFullYear()}/${this.item.date.getMonth() +
        1}/${this.item.date.getDate()}`;
    },
    /**
     * カテゴリ名
     */
    categoryName() {
      return this.$store.getters.categoryName(this.item.category);
    }
  },
  created() {
    console.log(this.id);
  },
  methods: {
    editItem() {
      EventBus.$emit('editItem', {
        id: this.id,
        date: this.item.date,
        title: this.item.title,
        category: this.item.category,
        amount: this.item.amount
      });
    }
  }
};
</script>
<style scoped lang="scss">
.list-item {
  position: relative;
}
.delete-button {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
</style>

