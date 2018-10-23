<template lang="pug">
  .pagination
    .prev
      a.waves-effect.waves-teal.btn-flat(@click='changeMonth(-1)') PREV
    .main {{currentYYYYMM}}
    .prev
      a.waves-effect.waves-teal.btn-flat(@click='changeMonth(1)') NEXT
</template>

<script>
import { mapGetters } from 'vuex';
import firebase from '@/plugins/firebase';
import EventBus from '~/assets/js/EventBus.js';
import CONST from '~/assets/js/CONST.js';

export default {
  name: 'Pagination',
  data() {
    return {};
  },
  created() {},
  computed: {
    ...mapGetters(['currentYYYYMM'])
  },
  watch: {},
  methods: {
    changeMonth(direction) {
      EventBus.$emit('changeMonth', direction);
    }
  }
};
</script>


<style scoped lang="scss">
.pagination {
  @extend .light-blue;
  @extend .lighten-4;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 20px auto 0;
}
</style>

