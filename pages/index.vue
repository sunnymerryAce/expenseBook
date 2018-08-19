<template lang="pug">
  section.top
    Navigation
    .modal(id="modal1")
      .modal-content
        .register
          .amount Amount
          input.register__input(type='number', v-model='amount')
          .genre Category
          .input-field
            select(v-model='genre')
              option(value='01') 食費
              option(value='02') 雑費
              option(value='03') 飲み遊び費
          .title Item Name
          input.register__input(type='text', v-model='title')
          button.button__register.waves-effect.waves-light.btn.light-blue.modal-close(@click='register') REGISTER

    .list
      .loading(v-show='!isLoaded') Loading...
      .list__content(v-show='isLoaded')
        .list__chart
          canvas(id="myChart" width="400" height="400")
        table.highlight
          thead
            tr
              th Title
              th Genre
              th Amount
          tbody
            tr(v-for='item in list')
              td {{item.title}}
              td {{item.genre}}
              td {{item.amount}}
    button.waves-effect.waves-light.btn(@click='logout') Logout
</template>

<script>
import firebase from '@/plugins/firebase';
import Navigation from '~/components/Navigation.vue';
import Chart from 'chart.js';

export default {
  name: 'Index',
  components: {
    Navigation
  },
  data() {
    return {
      /**
       * 登録先データベース
       */
      db: null,
      /**
       * 金額
       */
      amount: '0',
      /**
       * ジャンル
       */
      genre: '',
      /**
       * タイトル
       */
      title: '',
      /**
       * 登録アイテム
       */
      list: {},
      foodAmount: 0,
      miscellaneousAmount: 0,
      playAmount: 0,
      /**
       * ロード中かどうか
       */
      isLoaded: false
    };
  },
  computed: {
    /**
     * 必須項目が全て入力されているか
     */
    requiredInfoFilled() {
      return this.amount && this.genre && this.title;
    }
  },
  created: function() {
    this.db = firebase.database();
  },
  mounted: function() {
    // Materialize.css のセレクトボックス有効化
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
    elems = document.querySelectorAll('.modal');
    var instances2 = M.Modal.init(elems);

    // DBからデータを取得
    this.db = firebase.database();
    const path = this.db.ref(`/expensebook`);
    path.on('value', (snapshot) => {
      this.list = snapshot.val();
      // 各ジャンルの合計金額を計算
      for (let key of Object.keys(this.list)) {
        switch (this.list[key].genre) {
          case '01':
            this.foodAmount += this.list[key].amount;
            break;
          case '02':
            this.miscellaneousAmount += this.list[key].amount;
            break;
          case '03':
            this.playAmount += this.list[key].amount;
            break;
          default:
            break;
        }
      }
      this.drawChart();
      this.isLoaded = true;
    });
  },
  methods: {
    /**
     * 登録ボタン押下時の処理
     */
    register() {
      console.log(this.requiredInfoFilled);
      if (this.requiredInfoFilled) {
        const now = Date.now();
        const path = this.db.ref(`/expensebook/${now}`);
        const item = {
          title: this.title,
          genre: this.genre,
          amount: parseInt(this.amount, 10)
        };
        path.set(item);
      }
    },

    /**
     * ログアウトボタン押下時の処理
     */
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.commit('setUserId', {
            userId: null
          });
          alert('ログアウトしました');
          location.href = '/login';
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * グラグを描画する
     */
    drawChart() {
      // グラフの描画
      const ctx = document.getElementById('myChart').getContext('2d');
      console.log(this.miscellaneousAmount);
      const myChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
          labels: ['食費', '雑費', '飲み遊び費'],
          datasets: [
            {
              label: '# of Votes',
              data: [
                this.foodAmount,
                this.miscellaneousAmount,
                this.playAmount
              ],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
              ],
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
              ],
              borderWidth: 1
            }
          ]
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      });
    }
  }
};
</script>


<style>
.top {
  text-align: center;
}
.register {
  width: 80%;
  margin: 0 auto;
}
.register__headline {
  font-size: 2.2rem;
}
.register__input {
  text-align: center;
}
.btn {
  margin-bottom: 20px;
}
.top__link {
  display: block;
}
.button__register {
}
.select-dropdown {
  text-align: center;
}
.dropdown-content {
  transform-origin: top center !important;
}
.dropdown-content li {
  text-align: center;
}
</style>

