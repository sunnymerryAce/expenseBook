<template lang="pug">
  section.list
    Navigation
    RegisterModal
    .list__content
      table.highlight.striped.centered
        thead
          tr
            th Date
            th Category
            th Amount
            th Title
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
  methods: {}
};
</script>
<style scoped lang="scss">
.list {
  text-align: center;
}
</style>

