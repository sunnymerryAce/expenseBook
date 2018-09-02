<template lang="pug">
  .list__chart
    canvas(width="100" height="161" ref="myChart")
</template>

<script>
import firebase from '@/plugins/firebase';
import Chart from 'chart.js';

export default {
  name: 'ListChart',
  data() {
    return {
      /**
       * 登録先データベース
       */
      db: null,
      /**
       * データベースのカテゴリ一覧
       */
      categoryList: [],
      /**
       * 金額
       */
      amount: '0',
      /**
       * ジャンル
       */
      category: null,
      /**
       * タイトル
       */
      title: '',
      /**
       * 各カテゴリの金額合計
       */
      foodAmount: 0,
      miscellaneousAmount: 0,
      playAmount: 0,
      bookAmount: 0,
      transportAmount: 0,
      fixedAmount: 0,
      emergentAmount: 0,
      disposableAmount: 0,
      /**
       * ロード中かどうか
       */
      isLoaded: false
    };
  },
  created() {},
  mounted() {
    // // DBからデータを取得
    // this.db = firebase.database();
    // // カテゴリの設定
    // const categoryPath = this.db.ref(`/category`);
    // categoryPath.on('value', (snapshot) => {
    //   this.categoryList = snapshot.val();
    // });
    // const path = this.db.ref(`/expensebook`);
    // path.on('value', (snapshot) => {
    //   console.log('db changed');

    //   this.$store.commit('setList', snapshot.val());
    this.calcCategoryAmount();
    this.drawChart();
    this.isLoaded = true;
    // });
  },
  computed: {
    list() {
      return this.$store.state.list;
    }
  },
  watch: {
    list: function() {
      console.log('watching');
      this.calcCategoryAmount();
      this.drawChart();
    }
  },
  methods: {
    /**
     * 各カテゴリーの合計金額を計算する
     */
    calcCategoryAmount() {
      // 各ジャンルの合計金額を計算
      if (this.$store.state.list) {
        for (let key of Object.keys(this.$store.state.list)) {
          switch (this.$store.state.list[key].category) {
            case 0:
              this.foodAmount += this.$store.state.list[key].amount;
              break;
            case 1:
              this.miscellaneousAmount += this.$store.state.list[key].amount;
              break;
            case 2:
              this.playAmount += this.$store.state.list[key].amount;
              break;
            case 3:
              this.bookAmount += this.$store.state.list[key].amount;
              break;
            case 4:
              this.transportAmount += this.$store.state.list[key].amount;
              break;
            case 5:
              this.fixedAmount += this.$store.state.list[key].amount;
              break;
            case 6:
              this.emergentAmount += this.$store.state.list[key].amount;
              break;
            case 7:
              this.disposableAmount += this.$store.state.list[key].amount;
              break;
            default:
              break;
          }
        }
      }
    },

    /**
     * グラフを描画する
     */
    drawChart() {
      // グラフの描画
      const ctx = this.$refs.myChart.getContext('2d');
      const myChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
          labels: this.$store.state.categoryList,
          datasets: [
            {
              label: '# of Votes',
              data: [
                this.foodAmount,
                this.miscellaneousAmount,
                this.playAmount,
                this.bookAmount,
                this.transportAmount,
                this.fixedAmount,
                this.emergentAmount,
                this.disposableAmount
              ],
              backgroundColor: [
                'rgba(244 ,67, 54, 0.2)',
                'rgba(233, 30, 99, 0.2)',
                'rgba(156, 39, 176, 0.2)',
                'rgba(204,102,153, 0.2)',
                'rgba(10,255,255, 0.2)',
                'rgba(0,255,0, 0.2)',
                'rgba(255,255,0, 0.2)',
                'rgba(63, 81, 181, 0.2)'
              ],
              borderColor: [
                'rgba(244 ,67, 54,1)',
                'rgba(233, 30, 99, 1)',
                'rgba(156, 39, 176, 1)',
                'rgba(204,102,153, 1)',
                'rgba(0,255,255, 1)',
                'rgba(0,255,0, 1)',
                'rgba(255,255,0, 1)',
                'rgba(63, 81, 181, 1)'
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
</style>

