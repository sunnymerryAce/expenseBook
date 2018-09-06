<template lang="pug">
  section.loading Loading...
</template>

<script>
import EventBus from '~/assets/js/EventBus.js';

export default {
  name: 'Loading',
  components: {},
  data() {
    return {
      /**
       * ロード中かどうか
       */
      loading: true
    };
  },
  created() {
    EventBus.$on('DBLoaded', () => {});
  },
  monuted() {},
  methods: {}
};
</script>
<style>
</style>

