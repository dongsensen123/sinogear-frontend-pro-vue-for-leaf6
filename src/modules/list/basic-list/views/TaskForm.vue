<template>
  <a-form @submit="handleSubmit" :form="form">
    <a-form-item
      label="任务名称"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-decorator="['title', {rules:[{required: true, message: '请输入任务名称'}]}]" />
    </a-form-item>
    <a-form-item
      label="开始时间"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
      format="YYYY-MM-DD"
    >
      <a-date-picker
        style="width: 100%"
        v-decorator="['createdAt', {rules:[{required: true, message: '请选择开始时间'}]}]"
      />
    </a-form-item>
    <a-form-item
      label="任务负责人"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-select v-decorator="['owner', {rules:[{required: true, message: '请选择任务负责人'}]}]">
        <a-select-option :value="0">付晓晓</a-select-option>
        <a-select-option :value="1">周毛毛</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item
      label="产品描述"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-textarea v-decorator="['description']"></a-textarea>
    </a-form-item>
  </a-form>
</template>

<script>
  import moment from 'moment';
  import {Form, Input, DatePicker, Select} from 'ant-design-vue';
  
  const FormItem = Form.Item;

  export default {
    name: 'TaskForm',
    components: {
      AForm: Form,
      AFormItem: FormItem,
      AInput: Input,
      ATextarea: Input.TextArea,
      ASelect: Select,
      ASelectOption: Select.Option,
      ADatePicker: DatePicker
    },
    props: {
      record: {
        type: Object,
        default: () => {
          return {}
        }
      },
      modalType: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 7 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 13 }
        },
        form: this.$form.createForm(this)
      }
    },
    mounted() {
      this.record && this.form.setFieldsValue({
        title: this.record.title,
        createdAt: this.record.createdAt ? moment(this.record.createdAt, 'YYYY-MM-DD'): null,
        owner: this.record.owner,
        description: this.record.description
      })
    },
    watch: {
      record: function() {
        this.record && this.form.setFieldsValue({
          title: this.record.title,
          createdAt: this.record.createdAt ? moment(this.record.createdAt, 'YYYY-MM-DD') : null,
          owner: this.record.owner,
          description: this.record.description
        })
      }
    },
    methods: {
      handleSubmit () {
        const { form: { validateFields } } = this;
        this.visible = true;
        validateFields((errors, values) => {
          if (!errors) {
            console.log('数据', values)
          }
        })
      }
    }
  }
</script>
