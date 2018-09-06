<template lang="pug">
  .list__chart
    canvas(width="100" height="140" ref="myChart")
</template>

<script>
import firebase from '@/plugins/firebase';
import Chart from 'chart.js';
import EventBus from '~/assets/js/EventBus.js';

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
      amountList: [],
      /**
       * ロード中かどうか
       */
      isLoaded: false
    };
  },
  created() {
    EventBus.$on('DBLoaded', () => {
      this.calcCategoryAmount();
      this.drawChart();
    });
  },
  mounted() {
    this.calcCategoryAmount();
    this.drawChart();
  },
  computed: {
    list() {
      return this.$store.state.list;
    }
  },
  methods: {
    /**
     * 各カテゴリーの合計金額を計算する
     */
    calcCategoryAmount() {
      // DBのカテゴリリストに応じてamountListを初期化
      if (this.$store.state.categoryList) {
        console.log(this.$store.state.categoryList);
        for (
          let index = 0;
          index < this.$store.state.categoryList.length;
          index++
        ) {
          this.amountList.push(0);
        }
      }
      // 各ジャンルの合計金額を計算
      if (this.$store.state.list) {
        for (let key of Object.keys(this.$store.state.list)) {
          console.log(this.$store.state.list[key].amount);
          this.amountList[
            this.$store.state.list[key].category
          ] += this.$store.state.list[key].amount;
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
              label: '出費',
              data: this.amountList,
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
            },
            {
              label: '予算',
              data: this.$store.state.budget,
              type: 'horizontalBar'
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

