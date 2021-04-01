<template>
  <div class="student-container">
    <a-card style="margin-bottom: 24px; border-radius: 8px">
      <a-form
        style="margin-bottom: 16px"
        :form="form"
        :label-col="{ xs: 24, sm: 8, md: 8, lg: 6 }"
        :wrapper-col="{ xs: 24, sm: 16, md: 16, lg: 18 }"
      >
        <a-row>
          <a-col
            :xs="colResponsiveProps.xs"
            :sm="colResponsiveProps.sm"
            :md="colResponsiveProps.md"
            :lg="colResponsiveProps.lg"
            :xl="colResponsiveProps.xl"
          >
            <a-form-item label="姓名：">
              <a-input v-decorator="['name', {initialValue: queryParams.name}]" placeholder="请输入姓名"></a-input>
            </a-form-item>
          </a-col>
          <a-col
            :xs="colResponsiveProps.xs"
            :sm="colResponsiveProps.sm"
            :md="colResponsiveProps.md"
            :lg="colResponsiveProps.lg"
            :xl="colResponsiveProps.xl"
          >
            <a-form-item label="学号：">
              <a-input v-decorator="['cardnum', {initialValue: queryParams.cardnum}]" placeholder="请输入学号"></a-input>
            </a-form-item>
          </a-col>
          <a-col
            v-if="collapse"
            :xs="colResponsiveProps.xs"
            :sm="colResponsiveProps.sm"
            :md="colResponsiveProps.md"
            :lg="colResponsiveProps.lg"
            :xl="colResponsiveProps.xl"
          >
            <a-form-item label="班级：">
              <a-input v-decorator="['classnum', {initialValue: queryParams.classnum}]" placeholder="请输入班级"></a-input>
            </a-form-item>
          </a-col>
          <a-col
            v-if="collapse"
            :xs="colResponsiveProps.xs"
            :sm="colResponsiveProps.sm"
            :md="colResponsiveProps.md"
            :lg="colResponsiveProps.lg"
            :xl="colResponsiveProps.xl"
          >
            <a-form-item label="性别：">
              <sinogear-dict-select
                v-decorator="[
                  'sex',
                  { rules: [{message: '请输入性别' }] },
                ]"
                placeholder="请输入性别"
                :options="dicts.XB"
              />
            </a-form-item>
          </a-col>
          <a-col
            v-if="collapse"
            :xs="colResponsiveProps.xs"
            :sm="colResponsiveProps.sm"
            :md="colResponsiveProps.md"
            :lg="colResponsiveProps.lg"
            :xl="colResponsiveProps.xl"
          >
            <a-form-item label="爱好：">
              <a-input v-decorator="['hobby', {initialValue: queryParams.hobby}]" placeholder="请输入爱好"></a-input>
            </a-form-item>
          </a-col>
          <a-col
            v-if="collapse"
            :xs="colResponsiveProps.xs"
            :sm="colResponsiveProps.sm"
            :md="colResponsiveProps.md"
            :lg="colResponsiveProps.lg"
            :xl="colResponsiveProps.xl"
          >
            <a-form-item label="年龄：">
              <a-input v-decorator="['age', {initialValue: queryParams.age}]" placeholder="请输入年龄"></a-input>
            </a-form-item>
          </a-col>
          <a-col
            :xs="colResponsiveProps.xs"
            :sm="colResponsiveProps.sm"
            :md="colResponsiveProps.md"
            :lg="colResponsiveProps.lg"
            :xl="colResponsiveProps.xl"
            class="student-form-operator-col"
          >
            <div class="student-form-operator">
              <a-button type="primary" @click="handleQuery">查询</a-button>
              <a-button @click="handleReset">重置</a-button>
              <div
                v-if="collapse"
                @click="() => {this.collapse = !this.collapse}"
                class="student-form-operator-collapse"
              >
                <span>收起</span>
                <a-icon type="up" />
              </div>
              <div
                v-else
                @click="() => {this.collapse = !this.collapse}"
                class="student-form-operator-collapse"
              >
                <span>展开</span>
                <a-icon type="down" />
              </div>
            </div>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
    <a-card style="border-radius: 8px">
      <sinogear-table
        :rowKey="(record, index) => record.id"
        :columns="columns"
        :dicts="dicts"
        :dataSource="dataList"
        :operations="operations"
        :pagination="pagination"
        @change="handleTablePaginationChange"  
        :loading = "loading"
        v-if="showTable"
      >
        <template slot="buttonsRender">
          <a-button type="primary" @click="handleShowViewModal('create')">
            新增
          </a-button>
        </template>
        <a
          class="table-name"
          slot="name"
          slot-scope="text, record"
          @click="handleShowViewModal('view', record)"
        >
          {{ text }}
        </a>
        <template slot="operate" slot-scope="text, record">
          <span @click="handleShowViewModal('edit', record)" class="table-operator">
            编辑
          </span>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <a-popconfirm title="是否确定删除？" @confirm="handleDeleteClick(record)">
            <a-icon slot="icon" type="question-circle" />
            <span class="table-operator">删除</span>
          </a-popconfirm>
        </template>
      </sinogear-table>
    </a-card>
    <a-modal
      :title="title"
      :visible="visible"
      :width="720"
      :okText="okText"
      cancelText="取消"
      @ok="handleConfirm"
      @cancel="visible = false"
    >
      <edit-form ref="editFormRef" :type="type" :formData="item"></edit-form>
    </a-modal>
  </div>
</template>

<script>
import {
  handleQueryData,
  handleAddData,
  handleEditData,
  handleDeleteData,
  getDictItems
} from "../services/student";

  import { SinogearTable, SinogearDictSelect } from 'sinogear-vue';
  
  import {
    Popconfirm,
    Button,
    Modal,
    Form,
    Select,
    Icon,
    Card,
    Dropdown,
    Menu,
    Col,
    Row,
    Input
  } from 'ant-design-vue';
  import EditForm from './EditForm.vue';
  
  const AFormItem = Form.Item;
  const ASelectOption = Select.Option;
  const AMenuItem = Menu.Item;
  
  export default {
    name: "StudentContainer",
    components: {
      AForm: Form,
      AFormItem,
      ASelect: Select,
      ASelectOption,
      APopconfirm: Popconfirm,
      AIcon: Icon,
      AButton: Button,
      AModal: Modal,
      ACard: Card,
      ADropdown: Dropdown,
      AMenu: Menu,
      EditForm,
      AMenuItem,
      ACol: Col,
      ARow: Row,
      AInput: Input,
      SinogearTable,
      SinogearDictSelect
    },
    beforeMount(){
      console.info('beforeMount');
    },
    mounted() {
      console.info('mounted');
    },
    data: function () {
      return {
        form: this.$form.createForm(this, { name: 'studentForm' }),
        queryParams: {},
        operations: { colHeightMode: true, fullScreen: true, reload: true, colSetting: true },
        colResponsiveProps: {
          xs: 24,
          sm: 12,
          md: 12,
          lg: 8,
          xl: 8
        },
        //分页信息
        pagination: {
          current: 1,
          pageSize: 10,
          total: 0
        },
        //列表数据源
        dataList:[],
        dicts:{},
        //table dicts属性是组件初始化时获取的，后面属性值的调整不会影响到组件，所以通过设置字典初始化后才初始化组件解决问题
        showTable:false,
        isCheckPassed:false,
        loading: false,
        collapse: false,
        columns: [
          {dataIndex: 'name', title: '姓名', scopedSlots: { customRender: 'name' }, visible: true},
          {dataIndex: 'cardnum', title: '学号'},
          {dataIndex: 'classnum', title: '班级'},
          {dataIndex: 'sex', title: '性别', dicts:"XB"},
          {dataIndex: 'age', title: '年龄'},
          {dataIndex: 'hobby', title: '爱好'},
          {dataIndex: 'operate', title: '操作', scopedSlots: { customRender: 'operate' }}
        ],
        visible: false,
        type: '',
        item: {
          id: '',
          name: '',
          cardnum: '',
          classnum: '',
          sex: '',
          age: '',
          hobby: ''
        },
        title: '新增学生表信息',
        okText: '确定'
      }
    },
    computed: {

    },
    methods: {
       initDicts() {
        getDictItems("XB")
        .then((res) => {
          this.dicts = res.map.data;
          this.showTable=true;
         })
        .catch((err) => {
          console.info(err);
        });
    },
      handleTablePaginationChange(pagination) {
        const newPagination = Object.assign({}, this.pagination, {...pagination, page: pagination.current});
        this.pagination = newPagination;
        this.handleQuery();
      },
      handleColChange(type, value) {
        if (type === 'setting'){
          this.operations = Object.assign({}, this.operations, { colSetting: value })
        } else {
          this.operations = Object.assign({}, this.operations, { colHeightMode: value })
        }
        this.handleQuery();
      },
      handleQuery() {

        //1.调用查询接口获取数据
        //查询接口返回：{"appcode":"0","msg":"","map":{"data":{"limit":2,"total":12,"rows":[{"bae002":"b5b74925-d89e-46dd-948a-26e40b94698f","bae003":"2021-03-23 18:39:33","bae004":"b5b74925-d89e-46dd-948a-26e40b94698f","bae005":"2021-03-23 18:39:33","id":"1374309837730541569","name":"张三","cardnum":"NO1","classnum":"一班","sex":"1","hobby":"唱歌","age":10},{"bae002":"b5b74925-d89e-46dd-948a-26e40b94698f","bae003":"2021-03-23 18:39:34","bae004":"b5b74925-d89e-46dd-948a-26e40b94698f","bae005":"2021-03-23 18:39:34","id":"1374309841367003137","name":"张三"},{"bae002":"b5b74925-d89e-46dd-948a-26e40b94698f","bae003":"2021-03-23 18:39:35","bae004":"b5b74925-d89e-46dd-948a-26e40b94698f","bae005":"2021-03-23 18:39:35","id":"1374309844860858369","name":"张三"},{"bae002":"b5b74925-d89e-46dd-948a-26e40b94698f","bae003":"2021-03-23 18:39:35","bae004":"b5b74925-d89e-46dd-948a-26e40b94698f","bae005":"2021-03-23 18:39:35","id":"1374309846572134402","name":"张三"},{"bae002":"b5b74925-d89e-46dd-948a-26e40b94698f","bae003":"2021-03-23 18:39:36","bae004":"b5b74925-d89e-46dd-948a-26e40b94698f","bae005":"2021-03-23 18:39:36","id":"1374309848623149057","name":"张三"},{"bae002":"b5b74925-d89e-46dd-948a-26e40b94698f","bae003":"2021-03-23 18:39:36","bae004":"b5b74925-d89e-46dd-948a-26e40b94698f","bae005":"2021-03-23 18:39:36","id":"1374309850288287745","name":"张三"},{"bae002":"b5b74925-d89e-46dd-948a-26e40b94698f","bae003":"2021-03-23 18:39:36","bae004":"b5b74925-d89e-46dd-948a-26e40b94698f","bae005":"2021-03-23 18:39:36","id":"1374309851907289090","name":"张三"},{"bae002":"b5b74925-d89e-46dd-948a-26e40b94698f","bae003":"2021-03-23 18:39:37","bae004":"b5b74925-d89e-46dd-948a-26e40b94698f","bae005":"2021-03-23 18:39:37","id":"1374309853756977153","name":"张三"},{"bae002":"b5b74925-d89e-46dd-948a-26e40b94698f","bae003":"2021-03-23 18:39:38","bae004":"b5b74925-d89e-46dd-948a-26e40b94698f","bae005":"2021-03-23 18:39:38","id":"1374309859872272385","name":"张三"},{"bae002":"dd55bda7-df0d-d4b7-799b-7056717c6923","bae003":"2021-03-22 11:16:59","bae004":"dd55bda7-df0d-d4b7-799b-7056717c6923","bae005":"2021-03-22 11:16:59","id":"e87da9acc3315b94e7152a9986a0cc8d","name":"张三"}]}}}
        this.loading = true
        handleQueryData(this.form.getFieldsValue(), this.pagination.pageSize,this.pagination.current)
        .then((res) => {
          const json = res.map
          console.info('json:',json);
          // 多记录表记录
          this.dataList = json.data.rows
          // 分页器数据更新
          this.pagination.total = json.data.total
 
        })
        .catch((err) => {
          this.$throw(err, '错误', err)
          
        })
        this.loading = false;
      },
      handleReset() {
        this.form.resetFields();
        //重置功能不需要重新刷列表数据
        //this.handleQuery();
      },
      handleDeleteClick(val) {
        const id = val.id;
        handleDeleteData(id).then((res) => {
          console.info(res);
              if (res.appcode == '0') {
                this.handleQuery();
              } else {
                this.$notification.error({
                  message: '错误',
                  description: res.msg,
                })
              }
            });
      },
      handleShowViewModal(type, data) {
        switch (type) {
          case 'create':
            this.item = {};
            //重新复位form表单的字段
            if(this.$refs.editFormRef){
              this.$refs.editFormRef.form.resetFields();
            }
            this.title = '新增学生表信息';
            this.okText = '新增';
            break;
          case 'view':
            if(this.$refs.editFormRef){
              this.$refs.editFormRef.form.resetFields();
            }
            this.item = data;
            this.title = '查看学生表信息';
            this.okText = '确定';
            break;
          case 'edit':
            if(this.$refs.editFormRef){
              this.$refs.editFormRef.form.resetFields();
            }
            this.item = data;
            this.title = '编辑学生表信息';
            this.okText = '保存';
            break;
          default:
            return;
        }
        this.type = type;
        this.visible = true;
      },
      handleConfirm() {
        this.isCheckPassed = false;
        this.$refs.editFormRef.form.validateFields((err, values) => {
            if(err){
                this.visible=true;
            }else{
              this.isCheckPassed = true;
            }
        });
        if(!this.isCheckPassed){
          return;
        }
        const data = this.$refs.editFormRef.form.getFieldsValue();

        if (this.type === 'create') {

          handleAddData(data).then((res) => {
              if (res.appcode == '0') {
                this.$notification.success({
                  message: '成功',
                  description: res.msg || '创建成功',
                })
                this.handleQuery();
              } else {
                this.$notification.error({
                  message: '错误',
                  description: res.msg,
                })
              }
            })
        } else if (this.type === 'edit') {
           handleEditData(Object.assign({}, this.$refs.editFormRef.formData, data)).then((res) => {
              if (res.appcode == '0') {
                this.$notification.success({
                  message: '成功',
                  description: res.msg || '修改成功',
                })
                this.handleQuery();
              } else {
                this.$notification.error({
                  message: '错误',
                  description: res.msg,
                })
              }
            });
        }
        this.visible = false;
      }
    },
    created: function () {
        this.initDicts();
    }
  }
</script>

<style scoped lang="less">
  .student-container{
    .ant-form{
      margin-bottom: 0 !important;
      &-item{
        width: 90%;
      }
      .student-form-operator-col{
        float: right;
      }
      .student-form-operator{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-top: 4px;
        &-collapse{
          cursor: pointer;
          margin-left: 6px;
          color: var(--sg-primary-color);
          i{
            font-size: 16px;
          }
        }
        .ant-btn{
          margin-right: 8px
        }
      }
    }
    .ant-table{
      .table-name{
        color: var(--sg-primary-color);
      }
      .table-operator{
        cursor: pointer;
      }
    }
  }
</style>
