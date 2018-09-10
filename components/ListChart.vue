<template lang="pug">
  .list__chart
    canvas(width="100" height="140" ref="myChart")
</template>

<script>
import firebase from '@/plugins/firebase';
import Chart from 'chart.js';
import EventBus from '~/assets/js/EventBus.js';
import CONST from '~/assets/js/CONST.js';

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
      barColors: [],
      barBackgroundColors: [],
      /**
       * ロード中かどうか
       */
      isLoading: false
    };
  },
  created() {
    EventBus.$on('DBLoaded', () => {
      this.calcCategoryAmount();
      this.drawChart();
    });
  },
  async mounted() {
    if (!this.isLoading) {
      this.isLoading = true;
      await this.calcCategoryAmount();
      this.drawChart();
    }
    this.isLoading = false;
  },
  computed: {
    list() {
      return this.$store.state.list;
    }
  },
  watch: {
    async list() {
      if (!this.isLoading) {
        this.isLoading = true;
        await this.calcCategoryAmount();
        this.drawChart();
      }
      this.isLoading = false;
    }
  },
  methods: {
    /**
     * 各カテゴリーの合計金額を計算する
     */
    calcCategoryAmount() {
      console.log('amount');
      return new Promise((resolve) => {
        // DBのカテゴリリストに応じてamountListを初期化
        this.amountList = [];
        if (this.$store.state.categoryList) {
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
            this.amountList[
              this.$store.state.list[key].category
            ] += this.$store.state.list[key].amount;
          }
        }
        // 各ジャンルに色を設定
        let i = 0;
        for (let key of Object.keys(CONST.MATERIAL_COLOR_PALETTES)) {
          this.barColors[i] = CONST.MATERIAL_COLOR_PALETTES[key].DARK;
          this.barBackgroundColors[i] =
            CONST.MATERIAL_COLOR_PALETTES[key].LIGHT;
          i += 1;
        }
        resolve();
      });
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
              backgroundColor: this.barBackgroundColors,
              borderColor: this.barColors,
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

