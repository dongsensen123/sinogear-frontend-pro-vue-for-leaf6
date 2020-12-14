<template>
  <div>
    <v-chart :forceFit="true" :height="height" :data="data" :scale="scale" :padding="[-5, 0, 5, 0]">
<!--      <v-tooltip/>-->
      <v-interval
        shape="liquid-fill-gauge"
        position="gender*value"
        color="gender"
        :v-style="style1"
      />
      <v-guide type="html" :position="['50%', '40%']" :html="htmlGuideHtml" />
    </v-chart>
  </div>
</template>

<script>
  import {WaterWave} from "../index";

  const data = [{
    gender: 'male',
    path: 'M381.759 0h292l-.64 295.328-100.127-100.096-94.368 94.368C499.808 326.848 512 369.824 512 415.712c0 141.376-114.56 256-256 256-141.376 0-256-114.624-256-256s114.624-256 256-256c48.8 0 94.272 13.92 133.12 37.632l93.376-94.592L381.76 0zM128.032 415.744c0 70.688 57.312 128 128 128s128-57.312 128-128-57.312-128-128-128-128 57.312-128 128z',
    value: 34
  }];
  const scale = [{
    dataKey: 'value',
    min: 0,
    max: 100,
  }];

  export default {
    name: "SinoGearWaterWave",
    props: {
      title: {
        type: String,
        default: ''
      },
      percent: {
        type: Number,
        default: 0
      },
      height: {
        type: Number,
        default: 160
      }
    },
    data() {
      return {
        data,
        scale,
        style1:{
          lineWidth: 2,
          opacity: 0.75
        },
        style2:{
          fontSize: 24,
          textAlign: 'center'
        },
        htmlGuideHtml: `
        <div style="text-align: center;">
          <p style="font-size: 14px;color: #00000073;margin: 0;">${this.title}</p>
          <p style="font-size: 24px;color: rgba(0, 0, 0, 0.65);margin: 0;">${this.percent}%</p>
        </div>
      `,
      };
    }
  };
</script>

<style scoped>

</style>