<template lang="pug">
  a.add-button.btn-floating.btn-large.waves-effect.waves-light.pink.modal-trigger(data-target="registerModal")
    i.material-icons add
</template>

<script>
export default {
  name: 'RegisterButton',
  components: {},
  data() {
    return {};
  },
  created: function() {},
  monuted() {},
  methods: {}
};
</script>


<style>
.add-button {
  position: fixed !important;
  bottom: 5vw;
  right: 5vw;
}
</style>

