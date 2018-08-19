<template lang="pug">
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
      router-link(to='/') 登録画面へ

    
</template>

<script>
import firebase from '@/plugins/firebase';
import Chart from 'chart.js';

export default {
  name: 'List',
  components: {},
  data() {
    return {
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
  computed: {},
  created: function() {},
  mounted: function() {},
  methods: {
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
<style scoped lang="scss">
</style>

