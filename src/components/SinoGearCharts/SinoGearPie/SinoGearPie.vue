<template>
  <div>
    <v-chart :forceFit="true" :height="height" :data="data" :scale="scale" :padding="['auto', '11%', 'auto', 0]">
      <v-tooltip :showTitle="false" dataKey="item*percent" />
      <v-axis />
      <v-pie position="percent" :color="['item', [color, '#f2f4f6']]" :vStyle="pieStyle" />
      <v-coord type="theta" :innerRadius="0.75" />
      <v-guide type="html" :position="['50%', '50%']" :html="htmlGuideHtml" />
    </v-chart>
  </div>
</template>

<script>
  const DataSet = require('@antv/data-set');

  const scale = [{
    dataKey: 'percent',
    min: 0,
    formatter: '.0%',
  }];

  export default {
    name: 'SinoGearPie',
    props: {
      title: {
        type: String,
        default: '中式餐厅'
      },
      testData: {
        type: Array,
        default: function () {
          return (
            [
              { item: '中式餐厅', count: 20 },
              { item: '其他', count: 20 }
            ]
          )
        }
      },
      color: {
        type: String,
        default: '#58afff'
      }
    },
    computed: {
      htmlGuideHtml: function () {
       return `
        <div style="text-align: center;">
          <p style="font-size: 14px;color: #00000073;margin: 0;">${this.title}</p>
          <p style="font-size: 24px;color: rgba(0, 0, 0, 0.65);margin: 0;">
            <span>${this.percent}</span>%
          </p>
        </div>
      `
      }
    },
    data() {
      return {
        data: [],
        scale,
        height: 128,
        percent: 0,
        pieStyle: {
          stroke: "#fff",
          lineWidth: 1,
        },
        labelConfig: ['percent', {
          formatter: (val, item) => {
            return item.point.item + ': ' + val;
          }
        }],
      };
    },
    mounted() {
      if (this.testData.length > 0) {
        this.initPieChart(this.testData);
      }
    },
    watch: {
      testData: function (val) {
        if (val.length > 0) {
          this.initPieChart(val)
        }
      }
    },
    methods: {
      initPieChart(dataSource) {
        const dv = new DataSet.View().source(dataSource);
        dv.transform({
          type: 'percent',
          field: 'count',
          dimension: 'item',
          as: 'percent'
        });
        this.data = dv.rows;
        this.percent = Math.round(dataSource[0].count / (dataSource[0].count + dataSource[1].count) * 100);
      }
    }
  };
</script>

<style scoped>

</style>