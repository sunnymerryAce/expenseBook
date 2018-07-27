<template>
  <section class="container">
    <div>
      <app-logo/>
      <h1 class="title">
        expense_book
      </h1>
      <h2 class="subtitle">
        Nuxt.js project
      </h2>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green">Documentatios</a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey">GitHub</a>
      </div>
    </div>
    <div id="message">
    <h1>Firebaseてすと</h1>
    <p>文字を入れると更新されます</p>
    <ul>
      <li id="chatText"></li>
      <li>
        <input type="text" name="" id="my_text">
      </li>
      <li>
        <a @click="changeData()">更新</a>
      </li>
    </ul>
  </div>

  </section>
</template>

<script>
import AppLogo from "~/components/AppLogo.vue";
import * as firebase from "firebase";

export default {
  name: "Index",
  components: {
    AppLogo
  },
  data() {
    return {
      db: null,
      myChatAll: null
    };
  },
  created() {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyAODGADlNsoKYKLScPmjsSErEXy3LohAZg",
      authDomain: "expensebook-f07e6.firebaseapp.com",
      databaseURL: "https://expensebook-f07e6.firebaseio.com",
      projectId: "expensebook-f07e6",
      storageBucket: "expensebook-f07e6.appspot.com",
      messagingSenderId: "724598919621"
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }

    this.db = firebase.database();
    this.myChatAll = this.db.ref("/my/chat/all");

    this.myChatAll.on("value", function(snapshot) {
      document.getElementById("chatText").innerText = snapshot.val().text;
    });
  },
  computed: {
    /**
     * 現在のページ
     */
    currentPage() {
      return getCurrentPage(this.$route.path);
    }
  },
  methods: {
    changeData() {
      var text = document.getElementById("my_text").value;
      this.myChatAll.set({ title: "example", text: text });
    }
  }
};
</script>


<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

