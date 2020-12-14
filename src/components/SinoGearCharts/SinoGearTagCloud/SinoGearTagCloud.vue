<template>
  <v-chart :forceFit="true" :height="height" :padding="'auto'" :data="data" :scale="scale">
<!--    <v-tooltip :show-title="false" />-->
    <v-coord type="rect" direction="TL" />
    <v-point position="x*y" color="category" shape="cloud" tooltip="value*category" />
  </v-chart>
</template>

<script>
import { registerShape } from 'viser-vue'
const DataSet = require('@antv/data-set');

const scale = [
  { dataKey: 'x', nice: false },
  { dataKey: 'y', nice: false }
];

registerShape('point', 'cloud', {
  draw (cfg, container) {
    return container.addShape('text', {
      attrs: {
        fillOpacity: cfg.opacity,
        fontSize: cfg.origin._origin.size,
        rotate: cfg.origin._origin.rotate,
        text: cfg.origin._origin.text,
        textAlign: 'center',
        fontFamily: cfg.origin._origin.font,
        fill: cfg.color,
        textBaseline: 'Alphabetic',
        ...cfg.style,
        x: cfg.x,
        y: cfg.y
      }
    })
  }
});

export default {
  name: 'SinoGearTagCloud',
  props: {
    tagList: {
      type: Array,
      required: true
    },
    height: {
      type: Number,
      default: 160
    }
  },
  data () {
    return {
      data: [],
      scale
    }
  },
  watch: {
    tagList: function (val) {
      if (val.length > 0) {
        this.initTagCloud(val)
      }
    }
  },
  mounted () {
    if (this.tagList.length > 0) {
      this.initTagCloud(this.tagList);
    }
  },
  methods: {
    initTagCloud (dataSource) {
      const dv = new DataSet.View().source(dataSource);
      const range = dv.range('value');
      const min = range[0];
      const max = range[1];
      dv.transform({
        type: 'tag-cloud',
        fields: ['x', 'value'],
        size: [640, 400],
        font: 'Verdana',
        padding: 5,
        timeInterval: 5000, // max execute time
        rotate() {
          // let random = ~~(Math.random() * 8) % 4;
          // if (random === 2) {
          //   random = 0;
          // }
          // return random * 35; // 0, 90, 270
          return 0
        },
        fontSize(d) {
          // if (d.value) {
          //   return ((d.value - min) / (max - min)) * (80 - 78) + 19;
          // }
          // return 0;
          const size = ((d.value - min) / (max - min)) ** 2;
          return size * 12.5 + 5;
          
        },
      });
      this.data = dv.rows;
    }
  }
}
</script>
