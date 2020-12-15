<template>
  <div class="student-modal-container">
    <a-form :form="form" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
      <a-row>
        <a-col :span="12">
          <a-form-item label="姓名：">
            <a-input :disabled="type === 'view'" v-decorator="['name', {rules: validateRules.name, initialValue: formData.name} ]" placeholder="请输入姓名"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="学号：">
            <a-input :disabled="type === 'view'" v-decorator="['cardNum', {rules: validateRules.cardNum, initialValue: formData.cardNum}]" placeholder="请输入学号"></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item label="性别：">
            <a-select :disabled="type === 'view'" v-decorator="['sex', {rules: validateRules.sex, initialValue: formData.sex}]" placeholder="请输入性别">
              <a-select-option
                v-for="item in options"
                :key="item.value"
                :value="item.value">
                {{ item.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="班级：">
            <a-input :disabled="type === 'view'" v-decorator="['classNum',  {rules: validateRules.classNum, initialValue: formData.classNum}]" placeholder="请输入班级"></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-item label="爱好：">
            <a-input :disabled="type === 'view'" v-decorator="['hobby', {rules: validateRules.hobby, initialValue: formData.hobby}]" placeholder="请输入爱好"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item prop="age" label="年龄：">
            <a-input :disabled="type === 'view'" v-decorator="['age', {rules: validateRules.age, initialValue: formData.age}]" placeholder="请输入年龄"></a-input>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
  import { Select, Form, Input, Row, Col } from 'ant-design-vue';
  
  const ASelectOption = Select.Option;
  const AFormItem = Form.Item;
  
  export default {
    name: "EditForm",
    components: {
      ASelect: Select, ASelectOption, AForm: Form, AFormItem, AInput: Input, ARow: Row, ACol: Col
    },
    data: function() {
      return {
        options: [
          { value: '男', label: '男' },
          { value: '女', label: '女' }
        ],
        data: Object.assign({}, this.formData),
        form: this.$form.createForm(this, {name: 'StudentEditForm'}),
        formItemLayout: {
          labelCol: { span: 6 },
          wrapperCol: { span: 16 }
        }
      }
    },
    computed: {
      validateRules(){
        return {
          name: [{required: this.type !== 'view', message: '姓名不能为空'}],
          cardNum: [{required: this.type !== 'view', message: '学号不能为空'}],
          classNum: [{required: this.type !== 'view', message: '班级不能为空'}],
          hobby: [{required: this.type !== 'view', message: '爱好不能为空'}],
          age: [{required: this.type !== 'view', message: '年龄不能为空'}],
          sex: [{required: this.type !== 'view', message: '性别不能为空'}]
        }
      }
    },
    props: {
      formData: {
        type: Object,
        default: () => {return {}}
      },
      type: {
        type: String,
        default: 'create'
      }
    },
    methods: {
      handleCancel() {
        this.$emit('on-cancel')
      },
      handleConfirm(type) {
        this.$emit('on-confirm', type, this.data);
      }
    }
  }
</script>

<style lang="less" scoped>
  .student-modal-container{
    .ant-form{
      .ant-input-disabled, .ant-select-disabled {
        background: none;
        border: none;
        color: rgba(0,0,0,.65);
        font-weight: 700;
        cursor: auto;
        /deep/ .ant-select-selection{
          background: none;
          border: none;
          cursor: auto;
          .ant-select-arrow{
            display: none;
          }
        }
      }
    }
  }
</style>
