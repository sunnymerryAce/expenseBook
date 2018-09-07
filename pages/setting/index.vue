<template lang="pug">
  section.setting
    Navigation
    ul.collection
      li.colllection-item Budget
      li.colllection-item Category
      li.colllection-item Other
</template>

<script>
import firebase from '@/plugins/firebase';
import ls from 'localstorage-ttl';

import Navigation from '~/components/Navigation.vue';
import Loading from '~/components/Loading.vue';
import EventBus from '~/assets/js/EventBus.js';

export default {
  name: 'Setting',
  components: {
    Navigation,
    Loading
  },
  data() {
    return {
      /**
       * ロード中かどうか
       */
      isLoaded: false
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style scoped lang="scss">
</style>

