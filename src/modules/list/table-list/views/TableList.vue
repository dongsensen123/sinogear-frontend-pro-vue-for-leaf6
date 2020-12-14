<template>
  <div>
    <a-card :bordered="false">
      <div>
        <a-form>
          <a-row :gutter="32">
            <a-col :md="8" :sm="24">
              <a-form-item label="规则编号" :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol">
                <a-input v-model="queryParam.id" placeholder=""/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24" :lg="8">
              <a-form-item label="使用状态" :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol">
                <a-select
                  v-model="queryParam.status"
                  placeholder="请选择"
                  default-value="0"
                >
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">关闭</a-select-option>
                  <a-select-option value="2">运行中</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="调用次数" :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol">
                  <a-input-number v-model="queryParam.callNo" style="width: 100%"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="更新日期" :labelCol="formItemLayout.labelCol" :wrapperCol="formItemLayout.wrapperCol">
                  <a-date-picker v-model="queryParam.date" style="width: 100%" placeholder="请输入更新日期"/>
                </a-form-item>
              </a-col>
            </template>
            <a-col :md="!advanced && 8 || 16" :sm="24">
              <a-form-item>
                <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                  <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                  <a-button style="margin-left: 8px" @click="() => this.queryParam = {}">重置</a-button>
                  <a @click="toggleAdvanced" style="margin-left: 8px">
                    {{ advanced ? '收起' : '展开' }}
                    <a-icon :type="advanced ? 'up' : 'down'"/>
                  </a>
                </span>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
      
      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="handleAdd">新建</a-button>
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <a-menu slot="overlay">
            <a-menu-item key="1"><a-icon type="delete" />删除</a-menu-item>
            <!-- lock | unlock -->
            <a-menu-item key="2"><a-icon type="lock" />锁定</a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px">
            批量操作 <a-icon type="down" />
          </a-button>
        </a-dropdown>
      </div>
      <div class="alert-view">
        <a-alert :showIcon="true" style="margin-bottom: 16px">
          <template slot="message">
            <span style="margin-right: 12px">
              已选择:
              <a style="font-weight: 600">
                {{this.selectedRows.length}}
              </a>
               服务调用次数总计
              <a>{{this.totalCall}}次</a>
            </span>
          </template>
        </a-alert>
      </div>
      <a-table
        rowKey="key"
        :columns="columns"
        :data-source="data.list"
        :rowSelection="rowSelection"
        :pagination="pagination"
        size="middle"
      >
        <span slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>
        <span slot="status" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span>
        <span slot="description" slot-scope="text">
          <a-tooltip :title="text">{{text.slice(0, 2)}}...</a-tooltip>
        </span>
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)">配置</a>
            <a-divider type="vertical" />
            <a @click="handleSub(record)">订阅报警</a>
          </template>
        </span>
      </a-table>
      
      <create-form
        ref="createModal"
        :visible="visible"
        :loading="confirmLoading"
        :model="mdl"
        @cancel="handleCancel"
        @ok="handleOk"
      />
    </a-card>
  </div>
</template>

<script>
  import moment from 'moment';
  import { mapActions, mapState } from 'vuex';

  import CreateForm from './CreateForm.vue';
  import {
    Icon,
    Card,
    Button,
    Badge,
    Avatar,
    Row,
    Col,
    Menu,
    Dropdown,
    Divider,
    Modal,
    Form,
    DatePicker,
    Select,
    Table,
    Input,
    Alert,
    Tooltip,
    Spin,
    InputNumber
  } from 'ant-design-vue';
  const FormItem = Form.Item;
  const MenuItem = Menu.Item;
  const { Option } = Select;

  const columns = [
    {
      title: '规则编号',
      dataIndex: 'no'
    },
    {
      title: '描述',
      dataIndex: 'description',
      scopedSlots: { customRender: 'description' }
    },
    {
      title: '服务调用次数',
      dataIndex: 'callNo',
      sorter: true,
      needTotal: true,
      customRender: (text) => text + ' 次'
    },
    {
      title: '状态',
      dataIndex: 'status',
      scopedSlots: { customRender: 'status' }
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      sorter: true,
      customRender: (text) => moment(text).format('YYYY-MM-DD HH:mm')
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: '150px',
      scopedSlots: { customRender: 'action' }
    }
  ];

  const statusMap = ['default', 'processing', 'success', 'error'];
  const status = ['关闭', '运行中', '已上线', '异常'];
  
  const pagination = {
    showSizeChanger: true
  };
  
  const formItemLayout = {
    labelCol: {
      lg: {
        span: 8
      }
    },
    wrapperCol: {
      lg: {
        span: 16
      }
    }
  };

  export default {
    name: 'TableList',
    components: {
      CreateForm,
      // StepByStepModal,
      ARow: Row,
      ACol: Col,
      AForm: Form,
      AFormItem: FormItem,
      AInput: Input,
      AInputNumber: InputNumber,
      AAlert: Alert,
      ATooltip: Tooltip,
      AModal: Modal,
      ASpin: Spin,
      ATable: Table,
      AIcon: Icon,
      ACard: Card,
      AButton: Button,
      ABadge: Badge,
      ADivider: Divider,
      AAvatar: Avatar,
      ADropdown: Dropdown,
      AMenu: Menu,
      AMenuItem: MenuItem,
      ASelect: Select,
      ASelectOption: Option,
      ADatePicker: DatePicker
    },
    data () {
      return {
        // create model
        visible: false,
        confirmLoading: false,
        mdl: null,
        formItemLayout: formItemLayout,
        columns,
        pagination,
        // 高级搜索 展开/关闭
        advanced: false,
        // 查询参数
        queryParam: {},
        // 加载数据方法 必须为 Promise 对象
        loadData: [
          {
            key: 1,
            no: 'No.1',
            description: '111',
            callNo: '234',
            status: 'success',
            updatedAt: '2020-03-02'
          },
          {
            key: 2,
            no: 'No.2',
            description: '111',
            callNo: '234',
            status: 'default',
          },
          {
            key: 3,
            no: 'No.3',
            description: '111',
            callNo: '234',
            status: 'error',
          },
        ],
        selectedRowKeys: [],
        selectedRows: [],
        totalCall: 0,
        form: this.$form.createForm(this)
      }
    },
    filters: {
      statusFilter (index) {
        return status[index]
      },
      statusTypeFilter (index) {
        return statusMap[index]
      }
    },
    computed: {
      rowSelection () {
        return {
          selectedRowKeys: this.selectedRowKeys,
          totalCall: this.totalCall,
          onChange: this.onSelectChange
        }
      },
      ...mapState('tableList', {
        data: state => state.data || []
      })
    },
    methods: {
      ...mapActions('tableList', ['fetch', 'add', 'remove']),
      handleAdd () {
        this.mdl = null;
        this.visible = true;
      },
      handleEdit (record) {
        this.visible = true;
        this.mdl = { ...record }
      },
      handleOk () {
        const form = this.$refs.createModal.form;
        this.confirmLoading = true;
        form.validateFields((errors, values) => {
          if (!errors) {
            console.log('values', values);
            if (values.id > 0) {
              // 修改 e.g.
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve()
                }, 1000)
              }).then(res => {
                this.visible = false;
                this.confirmLoading = false;
                // 重置表单数据
                form.resetFields();
                // 刷新表格
                this.$refs.table.refresh();

                this.$message.info('修改成功')
              })
            } else {
              // 新增
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve()
                }, 1000)
              }).then(res => {
                this.visible = false;
                this.confirmLoading = false;
                // 重置表单数据
                form.resetFields();
                // 刷新表格
                this.$refs.table.refresh();

                this.$message.info('新增成功')
              })
            }
          } else {
            this.confirmLoading = false
          }
        })
      },
      handleCancel () {
        this.visible = false;

        const form = this.$refs.createModal.form;
        form.resetFields() // 清理表单数据（可不做）
      },
      handleSub (record) {
        if (record.status !== 0) {
          this.$message.info(`${record.no} 订阅成功`)
        } else {
          this.$message.error(`${record.no} 订阅失败，规则已关闭`)
        }
      },
      onSelectChange (selectedRowKeys, selectedRows) {
        this.selectedRowKeys = selectedRowKeys;
        this.selectedRows = selectedRows;
        let total = 0;
        if (selectedRows.length > 0) {
          selectedRows.map((item) => {
            total += Number(item.callNo);
          })
        }
        this.totalCall = total;
      },
      toggleAdvanced () {
        this.advanced = !this.advanced
      },
      resetSearchForm () {
        this.queryParam = {
          date: moment(new Date())
        }
      },
    },
    mounted() {
      this.fetch();
    }
  }
</script>

<style lang="less" scoped>
  .table-operator {
    margin-top: 10px;
  }
  .alert-view {
    margin-top: 15px;
  }
</style>