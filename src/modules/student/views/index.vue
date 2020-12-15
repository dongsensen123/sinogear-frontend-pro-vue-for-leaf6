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
              <a-input v-decorator="['cardNum', {initialValue: queryParams.cardNum}]" placeholder="请输入学号"></a-input>
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
              <a-input v-decorator="['classNum', {initialValue: queryParams.classNum}]" placeholder="请输入班级"></a-input>
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
              <a-select v-decorator="['sex', {initialValue: queryParams.sex}]" placeholder="请输入性别">
                <a-select-option
                  v-for="item in options"
                  :key="item.value"
                  :value="item.value"
                >
                  {{ item.label }}
                </a-select-option>
              </a-select>
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
        :columns="columns"
        :dataSource="data"
        :operations="operations"
        :pagination="getPagination"
        @change="handleTablePaginationChange"
        @colSettingChange="(value) => {handleColChange('setting', value)}"
        @colHeightModeChange="(value) => {handleColChange('heightMode', value)}"
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
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <a-dropdown>
            <span style="cursor: pointer">更多操作</span>
            <a-menu
              slot="overlay"
            >
            <a-menu-item>
              操作一
            </a-menu-item>
            <a-menu-item>
              操作二
            </a-menu-item>
            </a-menu>
          </a-dropdown>
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
  import { mapActions, mapState } from 'vuex';
  import { SinogearTable } from 'sinogear-vue';
  
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
      SinogearTable
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
        options: [
          { value: '男', label: '男' },
          { value: '女', label: '女' },
          { value: '', label: '全部' }
        ],
        collapse: false,
        columns: [
          {dataIndex: 'name', title: '姓名', scopedSlots: { customRender: 'name' }, visible: true},
          {dataIndex: 'cardNum', title: '学号'},
          {dataIndex: 'classNum', title: '班级'},
          {dataIndex: 'sex', title: '性别'},
          {dataIndex: 'age', title: '爱好'},
          {dataIndex: 'hobby', title: '年龄'},
          {dataIndex: 'operate', title: '操作', scopedSlots: { customRender: 'operate' }}
        ],
        visible: false,
        type: '',
        item: {
          name: '',
          cardNum: '',
          classNum: '',
          sex: '',
          age: '',
          hobby: ''
        },
        title: '新增学生表信息',
        okText: '确定'
      }
    },
    computed: {
      ...mapState('student', {
        pagination: state => Object.assign({}, state.pagination),
        data: state => state.data,
        studentConfig: state => state.studentConfig
      }),
      studentForm() {
        return this.form.getFieldsValue();
      },
      getPagination() {
        return Object.assign({}, {current: this.pagination.page}, this.pagination)
      }
    },
    methods: {
      ...mapActions('student', [
       'deleteData', 'addData', 'editData', 'getStudentConfig', 'updateQueryConditionsAndQueryData'
      ]),
      handleTablePaginationChange(pagination) {
        const newPagination = Object.assign({}, this.pagination, {...pagination, page: pagination.current});
        this.updateQueryConditionsAndQueryData({queryParams: {operations: this.operations, ...this.form.getFieldsValue()}, pagination: newPagination})
      },
      handleColChange(type, value) {
        if (type === 'setting'){
          this.operations = Object.assign({}, this.operations, { colSetting: value })
        } else {
          this.operations = Object.assign({}, this.operations, { colHeightMode: value })
        }
        this.updateQueryConditionsAndQueryData({queryParams: { operations: this.operations, ...this.form.getFieldsValue() }, pagination: this.pagination});
      },
      handleQuery() {
        this.updateQueryConditionsAndQueryData({queryParams: {operations: this.operations, ...this.form.getFieldsValue()}, pagination: {page: 1, pageSize: 10}})
      },
      handleReset() {
        this.form.resetFields();
        const operations = { colHeightMode: true, fullScreen: true, reload: true, colSetting: true };
        this.updateQueryConditionsAndQueryData({queryParams: {operations, ...this.form.getFieldsValue()}, pagination: {page: 1, pageSize: 10}});
      },
      handleDeleteClick(val) {
        const id = val.id;
        this.deleteData({id, queryParams: this.form.getFieldsValue(), pagination: this.pagination});
      },
      handleShowViewModal(type, data) {
        switch (type) {
          case 'create':
            this.item = {};
            this.$refs.editFormRef.form.setFieldsValue({});
            this.title = '新增学生表信息';
            this.okText = '新增';
            break;
          case 'view':
            this.item = data;
            this.title = '查看学生表信息';
            this.okText = '确定';
            break;
          case 'edit':
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
        const data = this.$refs.editFormRef.form.getFieldsValue();
        if (this.type === 'create') {
          this.addData({
            item: data,
            queryParams: this.form.getFieldsValue(),
            pagination: this.pagination,
            callback: () => {
              this.$message.success('操作成功')
            }
          })
        } else if (this.type === 'edit') {
          this.editData({
            item: Object.assign({}, this.$refs.editFormRef.formData, data),
            queryParams: this.form.getFieldsValue(),
            pagination: this.pagination,
            callback: () => {
              this.$message.success('操作成功')
            }
          })
        }
        this.visible = false;
      }
    },
    created() {
      this.getStudentConfig('example-student').then(() => {
        if (this.studentConfig && JSON.stringify(this.studentConfig) !== '{}') {
          if (this.studentConfig.operations) {
            this.operations = this.studentConfig.operations;
          } else {
            this.operations = { colHeightMode: true, fullScreen: true, reload: true, colSetting: true };
          }
          const obj = {};
          Object.keys(this.studentConfig).map((item) => {
            if (item !== 'operation') {
              obj[item] = this.studentConfig[item];
            }
          });
          if (JSON.stringify(obj) !== '{}') {
            this.queryParams = obj;
            this.updateQueryConditionsAndQueryData({queryParams: {operations: this.operations, ...obj}, pagination: {page: 1, pageSize: 10}})
          }
        } else {
          this.operations = { colHeightMode: true, fullScreen: true, reload: true, colSetting: true };
          this.handleQuery();
        }
      });
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
