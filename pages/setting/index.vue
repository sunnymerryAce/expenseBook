<template lang="pug">
  section.setting
    Navigation
    ul.collection
      v-touch.collection-item.setting__item(tag='li' @tap="$router.push('/setting/budget')") Monthly Budget
      li.collection-item.setting__item First Day of Month
    button.waves-effect.waves-light.btn.logout-button.light-blue.darken-3(@click='logout') Logout
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
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          localStorage.removeItem('userId');
          location.href = '/login';
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
};
</script>
<style scoped lang="scss">
.setting__item {
  font-size: 16px;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    top: 14px;
    right: 20px;
    width: 13px;
    height: 13px;
    border-top: 2px solid #d7d7d7;
    border-right: 2px solid #d7d7d7;
    transform: rotate(45deg);
  }
}
.logout-button {
  margin-top: 20px;
}
</style>

