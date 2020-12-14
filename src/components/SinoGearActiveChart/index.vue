<template>
  <div class="activeChart">
    <sino-gear-number-info subTitle="目标评估" total="有望达到预期" />
    <div style="margin-top: 120px">
      <sino-gear-mini-area :animate='false' line borderWidth="2" height="84" :data="activeData" />
<!--      <mini-smooth-area :style="{ height: '84px' }" :dataSource="activeData" :scale="searchUserScale" />-->
    </div>
    <div class="activeChartGrid" v-if="activeData">
      <p>
        <span v-if="activeData.length > 0">{{[...activeData].sort()[activeData.length - 1].y + 200}}</span>
        亿元
      </p>
      <p>
        <span v-if="activeData.length > 0">{{[...activeData].sort()[Math.floor(activeData.length / 2)].y}}</span>
        亿元
      </p>
    </div>
    <div class="activeChartLegend" v-if="activeData">
      <span>00:00</span>
      <span v-if="activeData.length > 0">{{activeData[Math.floor(activeData.length / 2)].x}}</span>
      <span v-if="activeData.length > 0">{{activeData[activeData.length - 1].x}}</span>
    </div>
  </div>
</template>

<script>
  import SinoGearNumberInfo from "../SinoGearNumberInfo/index";
  import {SinoGearMiniArea} from '../SinoGearCharts';

  const fixedZero =  (val) => {
    return val * 1 < 10 ? `0${val}` : val;
  };
  
  const getActiveData = () => {
    const activeData = [];
    for (let i = 0; i < 24; i += 1) {
      activeData.push({
        x: `${fixedZero(i)}:00`,
        y: Math.floor(Math.random() * 200) + i * 50
      });
    }
    return activeData;
  };
  
  export default {
    name: "index",
    components: {
      SinoGearNumberInfo,
      SinoGearMiniArea
    },
    data: function () {
      return {
        activeData: []
      }
    },
    mounted() {
      this.activeData = getActiveData();
      this.timer = setInterval(() => {
        this.activeData = getActiveData();
      }, 1000);
    },
    destroyed() {
      clearInterval(this.timer);
    }
  }
</script>

<style scoped lang="less">
  .activeChart {
    position: relative;
  }
  .activeChartGrid {
    p {
      position: absolute;
      top: 80px;
    }
    p:last-child {
      top: 115px;
    }
  }
  .activeChartLegend {
    position: relative;
    font-size: 0;
    margin-top: 8px;
    height: 20px;
    line-height: 20px;
    span {
      display: inline-block;
      font-size: 12px;
      text-align: center;
      width: 33.33%;
    }
    span:first-child {
      text-align: left;
    }
    span:last-child {
      text-align: right;
    }
  }

</style>