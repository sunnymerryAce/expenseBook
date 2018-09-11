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
    EventBus.$on('DBLoaded', this.readyChart);
  },
  mounted() {
    this.readyChart();
  },
  computed: {
    list() {
      return this.$store.state.list;
    }
  },
  destroyed(){
    // EventBus.$off('DBLoaded', this.readyChart);
  },
  watch: {
    list() {
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
        // 赤字カテゴリの色を指定
        this.amountList.forEach((amount, index) => {
          if(amount > this.$store.state.budget[index]) {
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
      if(!this.$refs.myChart) return;
      const ctx = this.$refs.myChart.getContext('2d');
      const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.$store.state.categoryList,
          datasets: [
            {
              label: '予算',
              data: this.$store.state.budget,
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

