<template>
  <a-row>
    <a-card :bordered="false">
      <a-row>
        <a-col span="24">
          <div style="font-size: 16px; font-weight: bold; color: #333; margin-top: 10px">退款申请</div>
        </a-col>
        <a-col span="24">
          <a-row>
            <a-col class="mes-item" :md="8">
              <div>
                <div class="label">
                  取货单号:
                </div>
                <div class="value">
                  {{refundMes && refundMes.pickUpNum}}
                </div>
              </div>
            </a-col>
            <a-col class="mes-item" :md="8">
              <div>
                <div class="label">
                  状态:
                </div>
                <div class="value">
                  {{refundMes && refundMes.status}}
                </div>
              </div>
            </a-col>
            <a-col class="mes-item" :md="8">
              <div>
                <div class="label">
                  销售单号:
                </div>
                <div class="value">
                  {{refundMes && refundMes.salesNum}}
                </div>
              </div>
            </a-col>
            <a-col class="mes-item" :md="8">
              <div>
                <div class="label">
                  子订单:
                </div>
                <div class="value">
                  {{refundMes && refundMes.subOrderNum}}
                </div>
              </div>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
      <a-divider style="margin-bottom: 32px"/>
      <a-row>
        <a-col span="24">
          <div style="font-size: 16px; font-weight: bold; color: #333; margin-top: 10px">用户信息</div>
        </a-col>
        <a-col>
          <a-row>
            <a-col class="mes-item" :md="8">
              <div>
                <div class="label">
                  用户姓名:
                </div>
                <div class="value">
                  {{userMes && userMes.username}}
                </div>
              </div>
            </a-col>
            <a-col class="mes-item" :md="8">
              <div>
                <div class="label">
                  联系方式:
                </div>
                <div class="value">
                  {{userMes && userMes.phone}}
                </div>
              </div>
            </a-col>
            <a-col class="mes-item" :md="8">
              <div>
                <div class="label">
                  常用快递:
                </div>
                <div class="value">
                  菜鸟仓储
                </div>
              </div>
            </a-col>
          </a-row>
          <a-row>
            <a-col class="mes-item" :md="8">
              <div>
                <div class="label">
                  取货地址:
                </div>
                <div class="value">
                  {{userMes && userMes.takeItAddress}}
                </div>
              </div>
            </a-col>
            <a-col class="mes-item" :md="8">
              <div>
                <div class="label">
                  备注:
                </div>
                <div class="value">
                  {{userMes && userMes.remark}}
                </div>
              </div>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
      <a-divider style="margin-bottom: 32px; font-weight: bold; color: #333;"/>
      
      <div class="title" style="font-weight: bold; color: #333;">退货商品</div>
      <a-table
        :columns="goodsColumns"
        :dataSource="this.basicGoods"
        :pagination="false"
        size="middle"
      >
        <a slot="name" slot-scope="text">{{ text }}</a>
      </a-table>
      
      <div class="title" style="margin-top: 25px; font-weight: bold; color: #333;">退货进度</div>
      <a-table
        style="margin-bottom: 24px"
        :columns="scheduleColumns"
        :dataSource="this.basicProgress"
        :pagination="false"
        size="middle"
      >
        <template
          slot="status"
          slot-scope="status">
          <a-badge :status="status" :text="status | statusFilter"/>
        </template>
      
      </a-table>
    </a-card>
  </a-row>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import {Row, Col, Card, Table, Badge, Steps, Descriptions, Divider} from 'ant-design-vue';
  const {Step} = Steps;
  const {Item} = Descriptions;
  
  export default {
    components: {
      ARow: Row,
      ACol: Col,
      ACard: Card,
      ATable: Table,
      ABadge: Badge,
      AStep: Step,
      ASteps: Steps,
      ADescriptions: Descriptions,
      ADescriptionsItem: Item,
      ADivider: Divider
    },
    data () {
      return {
        goodsColumns: [
          {
            title: '商品编号',
            dataIndex: 'id',
            key: 'id'
          },
          {
            title: '商品名称',
            dataIndex: 'name',
            key: 'name'
          },
          {
            title: '商品条码',
            dataIndex: 'barcode',
            key: 'barcode'
          },
          {
            title: '单价',
            dataIndex: 'price',
            key: 'price',
            align: 'right'
          },
          {
            title: '数量（件）',
            dataIndex: 'num',
            key: 'num',
            align: 'right'
          },
          {
            title: '金额',
            dataIndex: 'amount',
            key: 'amount',
            align: 'right'
          }
        ],

        scheduleColumns: [
          {
            title: '时间',
            dataIndex: 'time',
            key: 'time'
          },
          {
            title: '当前进度',
            dataIndex: 'rate',
            key: 'rate'
          },
          {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            scopedSlots: { customRender: 'status' }
          },
          {
            title: '操作员ID',
            dataIndex: 'operator',
            key: 'operator'
          },
          {
            title: '耗时',
            dataIndex: 'cost',
            key: 'cost'
          }
        ],
      }
    },
    filters: {
      statusFilter (status) {
        const statusMap = {
          'processing': '进行中',
          'success': '完成',
          'failed': '失败'
        };
        return statusMap[status]
      }
    },
    methods: {
      ...mapActions('basic-profile', ['queryData']),
    },
    computed: {
      ...mapState('basic-profile', {
        basicGoods: state => state.basicGoods || [],
        basicProgress: state => state.basicProgress || [],
        userMes: state => state.userMes || null,
        refundMes: state => state.refundMes || null
      }),
      title () {
        return this.$route.meta.title
      }
    },
    created() {
      this.queryData();
    }
  }
</script>

<style lang="less" scoped>
  .mes-item {
    & > div {
      padding: 8px 0;
      vertical-align: middle;
    }
    .label {
      display: inline-block;
      vertical-align: middle;
      width: 26%;
    }
    .value {
      display: inline-block;
      vertical-align: middle;
      width: 60%;
    }
  }
  .title {
    color: rgba(0,0,0,.85);
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 16px;
  }
  
</style>
