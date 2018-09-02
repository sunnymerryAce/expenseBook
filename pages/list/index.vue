<template lang="pug">
  section.list
    Navigation
    RegisterModal
    .list__content
      table.highlight.striped.centered
        thead
          tr
            th Date
            th Title
            th Category
            th Amount
        tbody
          ListItem(v-for='item, key in list', :item='item', :id='key', index='index')
</template>

<script>
import firebase from '@/plugins/firebase';
import Chart from 'chart.js';
import Navigation from '~/components/Navigation.vue';
import ListItem from '~/components/ListItem.vue';
import RegisterModal from '~/components/RegisterModal.vue';

import { getCategoryName } from '~/assets/js/common.js';

export default {
  name: 'List',
  components: {
    Navigation,
    ListItem,
    RegisterModal
  },
  data() {
    return {
      /**
       * 登録アイテム
       */
      list: this.$store.state.list
    };
  },
  methods: {
    getName(category) {
      return getCategoryName(category);
    }
  }
};
</script>
<style scoped lang="scss">
.list {
  text-align: center;
}
</style>

