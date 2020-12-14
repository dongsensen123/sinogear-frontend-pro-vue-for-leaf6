<template>
  <a-row>
    <a-col>
      <a-card :bordered="false" title="流程进度">
        <a-steps :current="1" progressDot>
          <a-step>
            <template #title>
              <span>创建项目</span>
            </template>
            <template #description>
              <div class="antd-pro-pages-profile-advanced-style-stepDescription">
                曲丽丽<a-icon type="dingding" style="margin-left: 8px;" />
                <div>2016-12-12 12:32</div>
              </div>
            </template>
          </a-step>
          <a-step>
            <template #title>
              <span>部门初审</span>
            </template>
            <template #description>
              <div class="antd-pro-pages-profile-advanced-style-stepDescription">
                周毛毛<a-icon type="dingding" style="margin-left: 8px;" class="icon-view" />
                <div><a>催一下</a></div>
              </div>
            </template>
          </a-step>
          <a-step title="财务复核" />
          <a-step title="完成" />
        </a-steps>
      </a-card>
  
      <a-card style="margin-top: 24px" :bordered="false" title="用户信息">
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
                会员卡号:
              </div>
              <div class="value">
                {{userMes && userMes.memberCard}}
              </div>
            </div>
          </a-col>
          <a-col class="mes-item" :md="8">
            <div>
              <div class="label">
                身份证:
              </div>
              <div class="value">
                {{userMes && userMes.idCard}}
              </div>
            </div>
          </a-col>
        </a-row>
        <a-row>
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
          <a-col class="mes-item" :md="16">
            <div>
              <div class="label">
                联系地址:
              </div>
              <div class="value">
                {{userMes && userMes.address}}
              </div>
            </div>
          </a-col>
        </a-row>
        <a-row>
          <a-col span="24">
            <div style="font-size: 16px; font-weight: bold; color: #333; margin-top: 10px">信息组</div>
          </a-col>
          <a-col span="24">
            <a-row>
              <a-col class="mes-item" :md="8">
                <div>
                  <div class="label">
                    某某数据:
                  </div>
                  <div class="value">
                    725
                  </div>
                </div>
              </a-col>
              <a-col class="mes-item" :md="16">
                <div>
                  <div class="label">
                    该数据更新时间:
                  </div>
                  <div class="value">
                    2018-08-08
                  </div>
                </div>
              </a-col>
            </a-row>
            <a-row>
              <a-col class="mes-item" :md="8">
                <div>
                  <div class="label">
                    某某数据:
                  </div>
                  <div class="value">
                    725
                  </div>
                </div>
              </a-col>
              <a-col class="mes-item" :md="16">
                <div>
                  <div class="label">
                    该数据更新时间:
                  </div>
                  <div class="value">
                    2018-08-08
                  </div>
                </div>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
        
        <a-card type="inner" title="多层信息组">
          <a-row>
            <a-col span="24">
              <div style="font-size: 16px; font-weight: bold; color: #333">组名称</div>
            </a-col>
            <a-col span="24">
              <a-row>
                <a-col class="mes-item" :md="8">
                  <div>
                    <div class="label">
                      负责人:
                    </div>
                    <div class="value">
                      林东东
                    </div>
                  </div>
                </a-col>
                <a-col class="mes-item" :md="8">
                  <div>
                    <div class="label">
                      角色码:
                    </div>
                    <div class="value">
                      1234567
                    </div>
                  </div>
                </a-col>
                <a-col class="mes-item" :md="8">
                  <div>
                    <div class="label">
                      所属部门:
                    </div>
                    <div class="value">
                      XX公司-YY部
                    </div>
                  </div>
                </a-col>
              </a-row>
              <a-row>
                <a-col class="mes-item" :md="8">
                  <div>
                    <div class="label">
                      过期时间:
                    </div>
                    <div class="value">
                      2018-08-08
                    </div>
                  </div>
                </a-col>
                <a-col class="mes-item" :md="16">
                  <div>
                    <div class="label" style="width: 12%;">
                      描述:
                    </div>
                    <div class="value" style="width: 80%;">
                      这段描述很长很长很长很长很长很长很长很长很长很长很长很长很长很长
                    </div>
                  </div>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
          <a-divider style="margin: 16px 0" />
          <a-row>
            <a-col span="24">
              <div style="font-size: 16px; font-weight: bold; color: #333">组名称</div>
            </a-col>
            <a-col class="mes-item" :md="24">
              <div>
                <div class="label" style="width: 5%">
                  学名:
                </div>
                <div class="value" style="width: 85%">
                  Citrullus lanatus (Thunb.) Matsum. et Nakai一年生蔓生藤本；茎、枝粗壮，具明显的棱。卷须较粗..
                </div>
              </div>
            </a-col>
          </a-row>
          <a-divider style="margin: 16px 0" />
          <a-row>
            <a-col span="24">
              <div style="font-size: 16px; font-weight: bold; color: #333">组名称</div>
            </a-col>
            <a-col class="mes-item" :md="12">
              <div>
                <div class="label">
                  负责人:
                </div>
                <div class="value">
                  付小小
                </div>
              </div>
            </a-col>
            <a-col class="mes-item" :md="12">
              <div>
                <div class="label">
                  角色码:
                </div>
                <div class="value">
                  1234567
                </div>
              </div>
            </a-col>
          </a-row>
        </a-card>
      </a-card>
  
      <a-card style="margin-top: 24px" :bordered="false" title="用户近半年来电记录">
        <div class="no-data"><a-icon type="frown-o"/>暂无数据</div>
      </a-card>
  
      <!-- 操作 -->
      <a-card
        style="margin-top: 24px"
        :bordered="false"
        :tabList="operationTabList"
        :activeTabKey="operationActiveTabKey"
        @tabChange="(key) => {this.operationActiveTabKey = key}"
      >
        <a-table
          v-if="operationActiveTabKey === '1'"
          :columns="operationColumns"
          :dataSource="this.advancedOperation1"
          :pagination="false"
          size="middle"
        >
          <template
            slot="status"
            slot-scope="status">
            <a-badge :status="status | statusTypeFilter" :text="status | statusFilter"/>
          </template>
        </a-table>
        <a-table
          v-if="operationActiveTabKey === '2'"
          :columns="operationColumns"
          :dataSource="this.advancedOperation2"
          :pagination="false"
          size="middle"
        >
          <template
            slot="status"
            slot-scope="status">
            <a-badge :status="status | statusTypeFilter" :text="status | statusFilter"/>
          </template>
        </a-table>
        <a-table
          v-if="operationActiveTabKey === '3'"
          :columns="operationColumns"
          :dataSource="this.advancedOperation3"
          :pagination="false"
          size="middle"
        >
          <template
            slot="status"
            slot-scope="status">
            <a-badge :status="status | statusTypeFilter" :text="status | statusFilter"/>
          </template>
        </a-table>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import {Row, Col, Card, Table, Badge, Steps, Descriptions, Icon, Divider} from 'ant-design-vue';
  const {Step} = Steps;
  const {Item} = Descriptions;
  export default {
    name: 'Advanced',
    components: {
      ARow: Row,
      ACol: Col,
      AIcon: Icon,
      ADivider: Divider,
      ACard: Card,
      ATable: Table,
      ABadge: Badge,
      AStep: Step,
      ASteps: Steps,
      ADescriptions: Descriptions,
      ADescriptionsItem: Item
    },
    data () {
      return {
        tabList: [
          { key: 'detail', tab: '详情' },
          { key: 'rule', tab: '规则' }
        ],
        tabActiveKey: 'detail',

        operationTabList: [
          {
            key: '1',
            tab: '操作日志一'
          },
          {
            key: '2',
            tab: '操作日志二'
          },
          {
            key: '3',
            tab: '操作日志三'
          }
        ],
        operationActiveTabKey: '1',

        operationColumns: [
          {
            title: '操作类型',
            dataIndex: 'type',
            key: 'type'
          },
          {
            title: '操作人',
            dataIndex: 'name',
            key: 'name'
          },
          {
            title: '执行结果',
            dataIndex: 'status',
            key: 'status',
            scopedSlots: { customRender: 'status' }
          },
          {
            title: '操作时间',
            dataIndex: 'updatedAt',
            key: 'updatedAt'
          },
          {
            title: '备注',
            dataIndex: 'memo',
            key: 'memo'
          }
        ]
      }
    },
    filters: {
      statusFilter (status) {
        const statusMap = {
          'agree': '成功',
          'reject': '驳回'
        };
        return statusMap[status]
      },
      statusTypeFilter (type) {
        const statusTypeMap = {
          'agree': 'success',
          'reject': 'error'
        };
        return statusTypeMap[type]
      }
    },
    methods: {
      ...mapActions('advanced-profile', ['queryData']),
      handleTabChange (key) {
        console.log('');
        this.tabActiveKey = key
      }
    },
    computed: {
      ...mapState('advanced-profile', {
        advancedOperation1: state => state.advancedOperation1 || [],
        advancedOperation2: state => state.advancedOperation2 || [],
        advancedOperation3: state => state.advancedOperation3 || [],
        userMes: state => state.userMes || null
      }),
    },
    created() {
      this.queryData();
    }
  }
</script>

<style lang="less" scoped>
  .icon-view {
    color: var(--sg-primary-color);
  }
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
  
  .detail-layout {
    margin-left: 44px;
  }
  .text {
    color: rgba(0, 0, 0, .45);
  }
  
  .heading {
    color: rgba(0, 0, 0, .85);
    font-size: 20px;
  }
  
  .no-data {
    color: rgba(0, 0, 0, .25);
    text-align: center;
    line-height: 64px;
    font-size: 16px;
    
    i {
      font-size: 24px;
      margin-right: 16px;
      position: relative;
      top: 3px;
    }
  }
  
  .mobile {
    .detail-layout {
      margin-left: unset;
    }
    .text {
    
    }
    .status-list {
      text-align: left;
    }
  }
</style>
