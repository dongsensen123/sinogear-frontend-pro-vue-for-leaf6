<template>
  <div>
    <a-row :gutter="24">
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <sino-gear-chart-card :loading="loading" title="总销售额" total="￥126,560">
          <a-tooltip title="指标说明" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <sino-gear-trend flag="up" style="margin-right: 16px;" :term="'周同比'" :type="true" :percentage="'12'"></sino-gear-trend>
            <sino-gear-trend flag="down" :term="'日同比'" :type="false" :percentage="'11'"></sino-gear-trend>
          </div>
          <template slot="footer">日均销售额<span>￥ 234.56</span></template>
        </sino-gear-chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <sino-gear-chart-card :loading="loading" title="访问量" :total="'8,846'">
          <a-tooltip title="指标说明" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <sino-gear-mini-area :data="this.miniAreaData" />
          </div>
          <template slot="footer">日访问量<span> {{ '1,234' }}</span></template>
        </sino-gear-chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <sino-gear-chart-card :loading="loading" title="支付笔数" :total="'6,560'">
          <a-tooltip title="指标说明" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <sino-gear-mini-bar :data="miniData" />
          </div>
          <template slot="footer">转化率 <span>60%</span></template>
        </sino-gear-chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <sino-gear-chart-card :loading="loading" title="运营活动效果" total="78%">
          <a-tooltip title="指标说明" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <sino-gear-mini-progress color="rgb(19, 194, 194)" :target="80" :percentage="78" height="8px" />
          </div>
          <template slot="footer">
            <div>
              <sino-gear-trend flag="up" style="margin-right: 16px;" :term="'同周比'" :type="false" :percentage="12"></sino-gear-trend>
              <sino-gear-trend flag="down" :term="'日环比'" :type="true" :percentage="80"></sino-gear-trend>
            </div>
          </template>
        </sino-gear-chart-card>
      </a-col>
    </a-row>
    
    <a-card :loading="loading" :bordered="false" :body-style="{padding: '0'}">
      <div class="salesCard">
        <a-tabs default-active-key="1" size="large" :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}">
          <div class="extra-wrapper" slot="tabBarExtraContent">
            <div class="extra-item">
              <a :class="isActive('today')"  @click="selectData('today')">今日</a>
              <a :class="isActive('week')" @click="selectData('week')">本周</a>
              <a :class="isActive('month')" @click="selectData('month')">本月</a>
              <a :class="isActive('year')" @click="selectData('year')">本年</a>
            </div>
            <a-range-picker :value="rangePickerValue" :style="{width: '256px'}" />
          </div>
          <a-tab-pane loading="true" tab="销售额" key="1">
            <a-row>
              <a-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
                <sino-gear-bar :data="barData" title="销售额排行" />
              </a-col>
              <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                <sino-gear-rank-list title="门店销售排行榜" :list="this.rankList"/>
              </a-col>
            </a-row>
          </a-tab-pane>
          <a-tab-pane tab="访问量" key="2">
            <a-row>
              <a-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
                <sino-gear-bar :data="this.barData2" title="销售额趋势" />
              </a-col>
              <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                <sino-gear-rank-list title="门店访问量排行榜" :list="this.rankList"/>
              </a-col>
            </a-row>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-card>
    
    <div class="antd-pro-pages-dashboard-analysis-twoColLayout" :class="'desktop'" style="margin-top: 24px">
      <a-row :gutter="[24, 24]" type="flex">
        <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card :loading="loading" :bordered="false" title="线上热门搜索" :style="{ height: '100%' }">
            <a-dropdown :trigger="['click']" placement="bottomLeft" slot="extra">
              <a class="ant-dropdown-link" href="#">
                <a-icon type="ellipsis" />
              </a>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a href="javascript:;">操作一</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">操作二</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
            <a-row :gutter="68">
              <a-col :xs="24" :sm="12" :style="{ marginBottom: ' 24px'}">
                <sino-gear-number-info :total="'12,321'" :sub-total="17.1" status="up">
                  <span slot="subtitle">
                    <span>搜索用户数</span>
                    <a-tooltip title="指标说明" slot="action">
                      <a-icon type="info-circle-o" :style="{ marginLeft: '8px' }" />
                    </a-tooltip>
                  </span>
                </sino-gear-number-info>
                <!-- miniChart -->
                <div>
                  <sino-gear-mini-smooth-area :style="{ height: '45px' }" :dataSource="searchUserData" :scale="searchUserScale" />
                </div>
              </a-col>
              <a-col :xs="24" :sm="12" :style="{ marginBottom: ' 24px'}">
                <sino-gear-number-info :total="2.7" :sub-total="26.2" status="down">
                  <span slot="subtitle">
                    <span>人均搜索次数</span>
                    <a-tooltip title="指标说明" slot="action">
                      <a-icon type="info-circle-o" :style="{ marginLeft: '8px' }" />
                    </a-tooltip>
                  </span>
                </sino-gear-number-info>
                <!-- miniChart -->
                <div>
                  <sino-gear-mini-smooth-area :style="{ height: '45px' }" :dataSource="searchUserData" :scale="searchUserScale" />
                </div>
              </a-col>
            </a-row>
            <div class="ant-table-wrapper">
              <a-table
                row-key="index"
                size="small"
                :columns="searchTableColumns"
                :dataSource="searchData"
                :pagination="{ pageSize: 5 }"
              >
                <span slot="range" slot-scope="text, record">
                  <sino-gear-trend :type="record.status === 0" :percentage="text">
<!--                    {{ text }}%-->
                  </sino-gear-trend>
                </span>
              </a-table>
            </div>
          </a-card>
        </a-col>
        <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card class="antd-pro-pages-dashboard-analysis-salesCard" :loading="loading" :bordered="false" title="销售额类别占比" :style="{ height: '100%' }">
            <div slot="extra" style="height: inherit;">
              <!-- style="bottom: 12px;display: inline-block;" -->
              <span class="dashboard-analysis-iconGroup">
                <a-dropdown :trigger="['click']" placement="bottomLeft">
                  <a-icon type="ellipsis" class="ant-dropdown-link" />
                  <a-menu slot="overlay">
                    <a-menu-item>
                      <a href="javascript:;">操作一</a>
                    </a-menu-item>
                    <a-menu-item>
                      <a href="javascript:;">操作二</a>
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </span>
              <div class="analysis-salesTypeRadio">
                <a-radio-group defaultValue="all" @change="(e) => changeSalesType(e.target.value)">
                  <a-radio-button value="all">全部渠道</a-radio-button>
                  <a-radio-button value="online">线上</a-radio-button>
                  <a-radio-button value="store">门店</a-radio-button>
                </a-radio-group>
              </div>
            
            </div>
            <h4>销售额</h4>
            <div>
              <!-- style="width: calc(100% - 240px);" -->
              <div>
                <v-chart :force-fit="true" :height="405" :data="this.pieData" :scale="pieScale" :padding="['auto', '40%', 'auto', -36]">
                  <v-tooltip :showTitle="false" dataKey="item*percent" />
                  <v-axis />
                  
                  <v-legend :useHtml="true" :itemTpl="itemTpl" dataKey="item" position="right-center" :offsetX="-5" />
                  <v-pie position="percent" color="item" :vStyle="pieStyle" />
                  <v-coord type="theta" :radius="0.75" :innerRadius="0.78" />
                  <v-guide type="html" :position="['50%', '50%']" :html="htmlGuideHtml" />
                </v-chart>
              </div>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import moment from 'moment';
  import {Table, Tooltip, Radio, Dropdown, Menu, Tabs, Row, Col, Card, Icon, DatePicker,} from 'ant-design-vue';
  import {
    SinoGearChartCard,
    SinoGearMiniArea,
    SinoGearMiniBar,
    SinoGearMiniProgress,
    SinoGearRankList,
    SinoGearBar,
    SinoGearTrend,
    SinoGearMiniSmoothArea
  } from '../../../../components/SinoGearCharts';
  import SinoGearNumberInfo from '../../../../components/SinoGearNumberInfo';
  
  const MenuItem = Menu.Item;
  const {TabPane} = Tabs;
  const RadioGroup = Radio.Group;
  const searchUserScale = [
    {
      dataKey: 'x',
      alias: '时间'
    },
    {
      dataKey: 'y',
      alias: '用户数',
      min: 0,
      max: 10
    }];

  const searchTableColumns = [
    {
      dataIndex: 'index',
      title: '排名',
      width: 90
    },
    {
      dataIndex: 'keyword',
      title: '搜索关键词'
    },
    {
      dataIndex: 'count',
      title: '用户数'
    },
    {
      dataIndex: 'range',
      title: '周涨幅',
      align: 'right',
      sorter: (a, b) => a.range - b.range,
      scopedSlots: { customRender: 'range' }
    }
  ];

  const DataSet = require('@antv/data-set');

  const pieScale = [{
    dataKey: 'percent',
    min: 0,
    formatter: function (val) {
      let newVal = val;
      newVal = `${(newVal * 100).toFixed(2)}%`;
      return newVal;
    }
  }];

  export default {
    name: 'Analysis',
    components: {
      SinoGearChartCard,
      SinoGearMiniArea,
      SinoGearMiniBar,
      SinoGearMiniProgress,
      SinoGearRankList,
      SinoGearBar,
      SinoGearTrend,
      SinoGearNumberInfo,
      SinoGearMiniSmoothArea,
      ARow: Row,
      ACol: Col,
      ACard: Card,
      AIcon: Icon,
      ATabs: Tabs,
      ADropdown: Dropdown,
      AMenu: Menu,
      AMenuItem: MenuItem,
      ATabPane: TabPane,
      ARadioGroup: RadioGroup,
      ARangePicker: DatePicker.RangePicker,
      ARadioButton: Radio.Button,
      ATable: Table,
      ATooltip: Tooltip
    },
    computed: {
      ...mapState('analysis-chart', {
        barData: state => state.barData,
        barData2: state => state.barData2,
        rankList: state => state.rankList,
        searchUserData: state => state.searchUserData,
        searchData: state => state.searchData,
        sourceData: state => state.sourceData,
        pieData: state => {
          const dv = new DataSet.View().source(state.sourceData);
          dv.transform({
            type: 'percent',
            field: 'count',
            dimension: 'item',
            as: 'percent'
          });
          return  dv.rows;
        },
        miniData: state => state.miniData,
        miniAreaData: state => state.miniArea,
        sumData: state => {
          let sum = 0;
          state.sourceData.forEach(ele => {
            sum += ele.count;
          });
          return sum;
        }
      }),
      htmlGuideHtml: function () {
        return `
        <div style="text-align: center;">
          <p style="font-size: 14px;color: #00000073;margin: 10px 0;">销售额</p>
          <p style="font-size: 24px;color: rgba(0, 0, 0, 0.65);margin: 0;">
            <span>￥${this.sumData}</span>
          </p>
        </div>
      `
      }
    },
    data () {
      return {
        loading: false,

        // 搜索用户数
        // searchUserData,
        searchUserScale,
        searchTableColumns,
        rangePickerValue: undefined,
        //
        pieScale,
        pieStyle: {
          stroke: '#fff',
          lineWidth: 3
        }
      }
    },
    methods: {
      ...mapActions('analysis-chart', ['queryData', 'querySourceData']),
      selectData(type) {
        this.rangePickerValue = this.getTimeDistance(type);
      },
      fixedZero(val) {
        return val * 1 < 10 ? `0${val}` : val;
      },
      getTimeDistance(type) {
        const now = new Date();
        const oneDay = 1000 * 60 * 60 * 24;

        if (type === 'today') {
          now.setHours(0);
          now.setMinutes(0);
          now.setSeconds(0);
          return [moment(now), moment(now.getTime() + (oneDay - 1000))];
        }

        if (type === 'week') {
          let day = now.getDay();
          now.setHours(0);
          now.setMinutes(0);
          now.setSeconds(0);

          if (day === 0) {
            day = 6;
          } else {
            day -= 1;
          }

          const beginTime = now.getTime() - day * oneDay;
          return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))];
        }

        const year = now.getFullYear();

        if (type === 'month') {
          const month = now.getMonth();
          const nextDate = moment(now).add(1, 'months');
          const nextYear = nextDate.year();
          const nextMonth = nextDate.month();
          return [
            moment(`${year}-${this.fixedZero(month + 1)}-01 00:00:00`),
            moment(moment(`${nextYear}-${this.fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000)
          ];
        }

        return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)];
      },
      isActive(type) {
        const value = this.getTimeDistance(type);
        if (!this.rangePickerValue[0] || !this.rangePickerValue[1]) {
          return 'default';
        }
        if (this.rangePickerValue[0].isSame(value[0], 'day') && this.rangePickerValue[1].isSame(value[1], 'day')) {
          return 'currentDate';
        }
      },
      itemTpl(value, color, checked, index) {
        const length = this.sourceData.length;
        const per = ((this.sourceData[index].count / this.sumData) * 100).toFixed(1);
        return '<li class="g2-legend-list-item item-{index} {checked}" data-color="{originColor}" data-value="{originValue}" style="cursor: pointer;font-size: 14px; line-height: 2 !important;">'
          + '<i class="g2-legend-marker" style="width:10px;height:10px;border-radius:50%;display:inline-block;margin-right:10px;background-color: {color};"></i>'
          + `<span class="g2-legend-text">${index === length -1 ? `${value[0]}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp${value[1]}` : value} ` +
          `<span style="border-left: 1px solid #ddd; margin-left: 6px; padding-left: 6px">
              ${per}%
              <span style="margin-left: 10px">￥${this.sourceData[index].count}</span>
           </span>`
          + '</li>';
      },
      changeSalesType(type) {
        switch (type) {
          case 'all':
            this.querySourceData('all');
            break;
          case 'online':
            this.querySourceData('online');
            break;
          default:
            this.querySourceData('store');
        }
      }
    },
    created () {
      this.rangePickerValue = this.getTimeDistance('year');
      // setTimeout(() => {
      //   this.loading = !this.loading
      // }, 1000);
    },
    mounted() {
      this.queryData();
      this.changeSalesType('all');
    }
  }
</script>

<style lang="less" scoped>
  .extra-wrapper {
    line-height: 55px;
    padding-right: 24px;
    
    .extra-item {
      display: inline-block;
      margin-right: 24px;
      a {
        color: rgba(0,0,0,.65);
        margin-left: 24px;
      }
      .currentDate {
        color: #1890ff;
      }
    }
  }
  
  
  .antd-pro-pages-dashboard-analysis-twoColLayout {
    position: relative;
    display: flex;
    display: block;
    flex-flow: row wrap;
  }
  
  .antd-pro-pages-dashboard-analysis-salesCard {
    height: calc(100% - 24px);
    /deep/ .ant-card-head {
      position: relative;
    }
  }
  
  .dashboard-analysis-iconGroup {
    i {
      margin-left: 16px;
      color: rgba(0,0,0,.45);
      cursor: pointer;
      transition: color .32s;
      color: black;
    }
  }
  .analysis-salesTypeRadio {
    position: absolute;
    right: 54px;
    bottom: 12px;
  }
</style>
