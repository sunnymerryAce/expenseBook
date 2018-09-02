<template lang="pug">
  tr.list-item.modal-trigger(@click='editItem')
    td {{item.registerDate}}
    td {{item.title}}
    td {{getName(item.category)}}
    td {{item.amount}}
</template>

<script>
import firebase from '@/plugins/firebase';
import Chart from 'chart.js';
import Navigation from '~/components/Navigation.vue';

import { getCategoryName } from '~/assets/js/common.js';
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
    return {
      /**
       * 登録アイテム
       */
      list: this.$store.state.list
    };
  },
  created() {},
  methods: {
    getName(category) {
      return getCategoryName(category);
    },
    editItem() {
      EventBus.$emit('editItem', {
        id: this.id,
        registerDate: this.item.registerDate,
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

