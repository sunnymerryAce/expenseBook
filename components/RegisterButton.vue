<template lang="pug">
  a.add-button.btn-floating.btn-large.waves-effect.waves-light.pink.modal-trigger(data-target="registerModal" @click='registerItem')
    i.material-icons add
</template>

<script>
import EventBus from '~/assets/js/EventBus.js';

export default {
  name: 'RegisterButton',
  components: {},
  data() {
    return {};
  },
  created: function() {},
  monuted() {},
  methods: {
    registerItem() {
      // モーダル内の情報を初期化
      EventBus.$emit('editItem', {
        id: null,
        date: null,
        title: '',
        category: null,
        amount: 0
      });
    }
  }
};
</script>


<style>
.add-button {
  position: fixed !important;
  bottom: 5vw;
  right: 5vw;
}
</style>

