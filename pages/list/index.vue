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
    RegisterButton
</template>

<script>
import firebase from '@/plugins/firebase';
import Chart from 'chart.js';
import Navigation from '~/components/Navigation.vue';
import ListItem from '~/components/ListItem.vue';
import RegisterModal from '~/components/RegisterModal.vue';
import RegisterButton from '~/components/RegisterButton.vue';

import { getCategoryName } from '~/assets/js/common.js';

export default {
  name: 'List',
  components: {
    Navigation,
    ListItem,
    RegisterModal,
    RegisterButton
  },
  data() {
    return {};
  },
  computed: {
    list() {
      return this.$store.state.list;
    }
  },
  updated() {},
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

