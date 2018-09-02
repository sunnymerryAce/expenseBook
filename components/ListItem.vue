<template lang="pug">
  tr.list-item.modal-trigger(@click='editItem')
    td {{registerDate}}
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
    return {};
  },
  computed: {
    /**
     * 登録日
     */
    registerDate() {
      return `${this.item.year}/${this.item.month}/${this.item.date}`;
    }
  },
  created() {},
  methods: {
    getName(category) {
      return getCategoryName(category);
    },
    editItem() {
      EventBus.$emit('editItem', {
        id: this.id,
        year: this.item.year,
        month: this.item.month,
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

