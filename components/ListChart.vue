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
    this.readyChart();
  },
  computed: {
    items() {
      return this.$store.state.items;
    },
    budgetList() {
      return this.$store.state.budgetList.map((category) => category.budget);
    },
    categoryLabels() {
      return this.$store.state.budgetList.map((category) => category.title);
    }
  },
  destroyed() {
    // EventBus.$off('DBLoaded', this.readyChart);
  },
  watch: {
    // データの変更を検知してグラフを更新
    items() {
      this.readyChart();
    }
  },
  methods: {
    async readyChart() {
      if (!this.isLoading) {
        this.isLoading = true;
        await this.calcCategoryAmount();
        this.drawChart();
      }
      this.isLoading = false;
    },
    /**
     * 各カテゴリーの合計金額を計算する
     */
    calcCategoryAmount() {
      return new Promise((resolve) => {
        // 各カテゴリに色を設定する
        let i = 0;
        for (let key of Object.keys(CONST.MATERIAL_COLOR_PALETTES)) {
          this.barColors[i] = CONST.MATERIAL_COLOR_PALETTES[key].DARK;
          this.barBackgroundColors[i] =
            CONST.MATERIAL_COLOR_PALETTES[key].LIGHT;
          i += 1;
        }
        // 各カテゴリの合計金額を計算
        if (this.$store.state.items) {
          // amountListを初期化(0円を設定)
          if (this.amountList.length) {
            this.amountList.forEach((amount) => {
              console.log('０設定');
              amount = 0;
            });
          }
          for (let key of Object.keys(this.$store.state.items)) {
            // 未設定の場合、合計金額に0円を設定
            if (!this.amountList[this.$store.state.items[key].category]) {
              this.amountList[this.$store.state.items[key].category] = 0;
            }
            this.amountList[
              this.$store.state.items[key].category
            ] += this.$store.state.items[key].amount;
          }
        }
        // 赤字のカテゴリに赤色を指定
        this.amountList.forEach((amount, index) => {
          if (amount > this.budgetList[index]) {
            this.barColors[index] = CONST.MATERIAL_COLOR_PALETTES.RED.DARK;
            this.barBackgroundColors[index] =
              CONST.MATERIAL_COLOR_PALETTES.RED.NORMAL;
          }
        });
        resolve();
      });
    },

    /**
     * グラフを描画する
     */
    drawChart() {
      console.log('draw');
      // グラフの描画
      if (!this.$refs.myChart) return;
      const ctx = this.$refs.myChart.getContext('2d');
      const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.categoryLabels,
          datasets: [
            {
              label: '予算',
              data: this.budgetList,
              type: 'bubble',
              radius: 5,
              pointStyle: 'star',
              backgroundColor: 'rgba(13,71,161,0.1)',
              borderColor: 'rgba(13,71,161,0.5)'
            },
            {
              label: '出費',
              data: this.amountList,
              backgroundColor: this.barBackgroundColors,
              borderColor: this.barColors,
              borderWidth: 1,
              options: {
                barPercentage: 0.95
              }
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

