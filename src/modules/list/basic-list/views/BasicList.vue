<template>
  <div>
    <a-card :bordered="false">
      <a-row>
        <a-col :sm="8" :xs="24" v-for="item in headerData" :key="item.title">
          <div class="header-info">
            <span>{{ item.title }}</span>
            <p>{{ item.value }}</p>
            <em v-if="item.bordered" />
          </div>
        </a-col>
      </a-row>
    </a-card>
    
    <a-card
      style="margin-top: 24px"
      :bordered="false"
      title="标准列表">
      
      <div slot="extra">
        <a-radio-group v-model="status">
          <a-radio-button value="all">全部</a-radio-button>
          <a-radio-button value="processing">进行中</a-radio-button>
          <a-radio-button value="waiting">等待中</a-radio-button>
        </a-radio-group>
        <a-input-search style="margin-left: 16px; width: 272px;" />
      </div>
      
      <div class="operate">
        <a-button type="dashed" style="width: 100%" icon="plus" @click="handleShowModal('add')">添加</a-button>
      </div>
      
      <a-list size="large" :data-source="data" :pagination="{showSizeChanger: true, showQuickJumper: true}" >
        <a-list-item  :key="index" v-for="(item, index) in data">
          <a-list-item-meta :description="item.description">
            <a-avatar slot="avatar" size="large" shape="square" :src="item.avatar"/>
            <a slot="title">{{ item.title }}</a>
          </a-list-item-meta>
          <div slot="actions">
            <a @click="handleShowModal('edit', item)">编辑</a>
          </div>
          <div slot="actions">
            <a-dropdown>
              <a-menu slot="overlay">
                <a-menu-item><a>编辑</a></a-menu-item>
                <a-menu-item><a>删除</a></a-menu-item>
              </a-menu>
              <a>更多<a-icon type="down"/></a>
            </a-dropdown>
          </div>
          <div class="list-content">
            <div class="list-content-item">
              <span>Owner</span>
              <p>{{ item.owner }}</p>
            </div>
            <div class="list-content-item">
              <span>开始时间</span>
              <p>{{ moment(item.createdAt).format('YYYY-MM-DD HH:mm') }}</p>
            </div>
            <div class="list-content-item">
              <a-progress :percent="item.percent" :status="!item.status ? null : item.status" style="width: 180px" />
            </div>
          </div>
        </a-list-item>
      </a-list>
      
      <a-modal
        :title="title"
        :visible="visible"
        :width="700"
        :okText="okText"
        cancelText="取消"
        @ok="handleConfirmForm"
        @cancel="handleCancelModal"
      >
        <task-form ref="taskFormRef" :record="record" :modalType="modalType" />
      </a-modal>
    </a-card>
  </div>
</template>

<script>
  // 演示如何使用 this.$dialog 封装 modal 组件
  import { mapActions, mapState } from 'vuex';
  import TaskForm from './TaskForm.vue';
  import moment from 'moment';
  import {
    List,
    Icon,
    Card,
    Button,
    Avatar,
    Row,
    Col,
    Menu,
    Dropdown,
    Progress,
    Radio,
    Modal,
    Form,
    DatePicker,
    Select,
    Input
  } from 'ant-design-vue';
  const {Item} = List;
  const FormItem = Form.Item;
  const MenuItem = Menu.Item;
  const ItemMeta = Item.Meta;
  const {Group} = Radio;
  const RadioButton = Radio.Button;
  const { Option } = Select;
  
  const headerData = [
    {
      title: '我的待办',
      value: '8个任务',
      bordered: true
    },
    {
      title: '本周任务平均处理时间',
      value: '32分钟',
      bordered: true
    },
    {
      title: '本周完成任务数',
      value: '24个',
      bordered: false
    }
  ];

  export default {
    name: 'StandardList',
    components: {
      TaskForm,
      ARow: Row,
      ACol: Col,
      AForm: Form,
      AFormItem: FormItem,
      AList: List,
      AIcon: Icon,
      ACard: Card,
      AButton: Button,
      ARadioButton: RadioButton,
      AAvatar: Avatar,
      AListItem: Item,
      AListItemMeta: ItemMeta,
      ARadioGroup: Group,
      ADropdown: Dropdown,
      AMenu: Menu,
      AMenuItem: MenuItem,
      AProgress: Progress,
      AModal: Modal,
      ASelect: Select,
      ASelectOption: Option,
      ADatePicker: DatePicker,
      AInputSearch: Input.Search
    },
    data () {
      return {
        status: 'all',
        headerData,
        visible: false,
        modalType: 'edit',
        okText: '确定',
        title: '',
        record: {},
        form: this.$form.createForm(this),
        labelCol: {
          xs: { span: 24 },
          sm: { span: 7 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 13 }
        },
        moment
      }
    },
    computed: {
      ...mapState('basic-list', {
        data: state => state.list || []
      })
    },
    methods: {
      ...mapActions('basic-list', ['queryData']),
      handleShowModal(modalType, record) {
        if (modalType === 'edit') {
          this.title = '编辑';
          this.record = record;
          this.okText = '确定';
        } else {
          this.record = {};
          this.okText = '新增';
        }
        this.visible = true;
        this.modalType = modalType;
      },
      handleConfirmForm() {
        const {validateFields} = this.$refs.taskFormRef.form;
        validateFields((error, values) => {
          if (!error) {
            console.log('提交数据：', values);
            this.$message.success(this.modalType === 'edit' ? '修改成功' : '提交成功');
            this.visible = false;
          }
        })
      },
      handleCancelModal() {
        this.visible = false;
        this.record = {};
      },
      getList() {
        this.queryData({
          count: 5
        });
      }
    },
    mounted() {
      this.getList();
    }
  }
</script>

<style lang="less" scoped>
  .ant-avatar-lg {
    width: 48px;
    height: 48px;
    line-height: 48px;
  }

  .ant-list-item-meta-description {
    max-height: 100px;
    width: 100%;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
  }
  
  .list-content-item {
    color: rgba(0, 0, 0, .45);
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
    margin-left: 40px;
    span {
      line-height: 20px;
    }
    p {
      margin-top: 4px;
      margin-bottom: 0;
      line-height: 22px;
    }
  }

  .header-info {
    position: relative;
    text-align: center;
    & > span {
      display: inline-block;
      margin-bottom: 4px;
      color: rgba(0, 0, 0, 0.45);
      font-size: 14px;
      line-height: 22px;
    }
    & > p {
      margin: 0;
      color: rgba(0, 0, 0, 0.85);
      font-size: 24px;
      line-height: 32px;
    }
    & > em {
      position: absolute;
      top: 0;
      right: 0;
      width: 1px;
      height: 56px;
      background-color: #e8e8e8;
    }
  }
</style>
