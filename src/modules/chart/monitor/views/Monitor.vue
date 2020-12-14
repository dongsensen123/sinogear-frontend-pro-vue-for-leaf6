<template>
  <div>
    <a-row :gutter="[24, 24]">
      <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="18">
        <a-card title="活动实时交易情况" :bordered="false">
          <a-row>
            <a-col :xs="24" :sm="12" :md="6">
              <sino-gear-number-info :total="'124,543,233元'">
                <span slot="subtitle">
                  <span>今日交易总额</span>
                </span>
              </sino-gear-number-info>
            </a-col>
            <a-col :xs="24" :sm="12" :md="6">
              <sino-gear-number-info total="92%">
                <span slot="subtitle">
                  <span>销售目标完成率</span>
                </span>
              </sino-gear-number-info>
            </a-col>
            <a-col :xs="24" :sm="12" :md="6">
              <sino-gear-number-info :total="leftTime">
                <span slot="subtitle">
                  <span>活动剩余时间</span>
                </span>
              </sino-gear-number-info>
            </a-col>
            <a-col :xs="24" :sm="12" :md="6">
              <sino-gear-number-info :total="'234元'">
                <span slot="subtitle">
                  <span>每秒交易总额</span>
                </span>
              </sino-gear-number-info>
            </a-col>
          </a-row>
          <div class="mapChart">
            <a-tooltip title="等待后期实现">
              <img :src="map" alt="map">
            </a-tooltip>
          </div>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="6">
        <a-card title="活动情况预测" :bordered="false" style="margin-bottom: 24px">
          <sino-gear-active-chart  />
        </a-card>
        <a-card title="券核效率" :bordered="false">
          <sino-gear-gauge :height="180" percent="87" title="跳出率" />
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="[24, 24]">
      <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
        <a-card title="各品类占比" :bordered="false" class="pieChart">
          <a-row style="padding: 16px 0">
            <a-col :span="8">
              <sino-gear-pie :testData="this.sourceData" :title="'中式餐厅'" />
            </a-col>
            <a-col :span="8">
              <sino-gear-pie :testData="this.sourceData2" :color="'#75e3d6'" :title="'西餐'" />
            </a-col>
            <a-col :span="8">
              <sino-gear-pie :testData="this.sourceData3" :color="'#6dd48c'" :title="'火锅'" />
            </a-col>
          </a-row>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="6">
        <a-card title="热门搜索" :bordered="false">
          <sino-gear-tag-cloud :tagList="this.tagsList" />
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="6">
        <a-card title="资源剩余" :bordered="false">
          <sino-gear-water-wave :title="'补贴资金剩余'" :height="161" :percent="34" />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex';
  import { Row, Col, Card, Tooltip } from 'ant-design-vue';
  import SinoGearNumberInfo from "../../../../components/SinoGearNumberInfo";
  import SinoGearActiveChart from '../../../../components/SinoGearActiveChart/index.vue';
  import {SinoGearGauge, SinoGearPie, SinoGearWaterWave, SinoGearTagCloud} from '../../../../components/SinoGearCharts';
  import map from './images/map.png';
  
  export default {
    name: "Monitor",
    components: {
      ARow: Row,
      ACol: Col,
      ACard: Card,
      ATooltip: Tooltip,
      SinoGearNumberInfo,
      SinoGearActiveChart,
      SinoGearGauge,
      SinoGearPie,
      SinoGearWaterWave,
      SinoGearTagCloud
    },
    computed: {
      ...mapState('monitor', {
        tagsList: state =>  state.tags,
        sourceData: state => state.sourceData1,
        sourceData2: state => state.sourceData2,
        sourceData3: state => state.sourceData3
      })
    },
    data: function () {
      return {
        map,
        leftTime: '00:00:00',
        endDate: new Date(new Date().getTime() + 300000)
      }
    },
    methods: {
      ...mapActions('monitor', ['getTagData', 'getPieData']),
      countDown: function () {
        const date = new Date();
        const now = date.getTime();
        const end = this.endDate.getTime();
        //时间差
        const differTime = end - now;
        //定义变量,h,m,s保存倒计时的时间
        let h, m, s;
        if (differTime >= 0) {
          h = Math.floor(differTime / 1000 / 60 / 60);
          m = Math.floor(differTime / 1000 / 60 % 60);
          s = Math.floor(differTime / 1000 % 60);
          h = h < 10 ? ("0" + h) : h;
          m = m < 10 ? ("0" + m) : m;
          s = s < 10 ? ("0" + s) : s;
          this.leftTime = `${h}:${m}:${s}`;
        } else {
          clearInterval(this.timer);
        }
      }
    },
    mounted() {
      this.getTagData();
      this.getPieData();
      this.countDown();
      this.timer = setInterval(this.countDown, 1000);
    },
    destroyed() {
      clearInterval(this.timer);
    }
  }
</script>

<style scoped lang="less">
  .mapChart {
    padding-top: 24px;
    height: 457px;
    text-align: center;
    img {
      display: inline-block;
      max-width: 100%;
      max-height: 437px;
    }
  }
</style>