<template>
  <div>
    <a-form :form="form">
      <a-card title="项目填报表" :bordered="false" class="sg-form_card">
        <a-row>
          <a-col :span="12">
            <a-form-item
              name="basic"
              label="基础用法"
              :labelCol="formItemLayout.labelCol"
              :wrapperCol="formItemLayout.wrapperCol"
            >
              <sinogear-dict-select
                placeholder="请选择"
                allowClear showSearch
                :options="dictOptions"
                @blur="handleBlur"
                @click="handleChange"
                v-decorator="['basic', { initialValue: '2*广东省' }]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              name="basicMultiple"
              label="基础多选"
              :labelCol="formItemLayout.labelCol"
              :wrapperCol="formItemLayout.wrapperCol"
            >
              <sinogear-dict-select
                allowClear showSearch
                mode="multiple"
                :options="dictOptions"
                @change="handleChange"
                @blur="handleBlur"
                v-decorator="['basicMultiple']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item
              name="custom"
              label="自定义搜索"
              :labelCol="formItemLayout.labelCol"
              :wrapperCol="formItemLayout.wrapperCol"
            >
              <sinogear-dict-select
                :multiple="true"
                :options="searchOptions"
                :showSearch="true"
                :search="search"
                @change="handleChange"
                @blur="handleBlur"
                v-decorator="['custom']"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              name="autoPaging"
              label="自动分页"
              :labelCol="formItemLayout.labelCol"
              :wrapperCol="formItemLayout.wrapperCol"
            >
              <sinogear-dict-select
                mode="multiple"
                :options="dictOptions"
                :local-paginate="true"
                v-decorator="['autoPaging', { initialValue: '1*湖北省' }]"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item
              name="multipleCol"
              label="多列展示"
              :labelCol="formItemLayout.labelCol"
              :wrapperCol="formItemLayout.wrapperCol"
            >
              <sinogear-dict-select
                :options="dictOptions"
                :col-model="colModel"
                @change="handleChange"
                v-decorator="['multipleCol']"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              name="asyncLoad"
              label="远程加载数据"
              :labelCol="formItemLayout.labelCol"
              :wrapperCol="formItemLayout.wrapperCol"
            >
              <sinogear-dict-select-async
                mode="multiple"
                :col-model="colModel"
                @change="handleChange"
                :pagination="{ page: 1, pageSize: 5 }"
                :default-load-url="`${config.mockContextPath}/api/dictForms/getByAsync`"
                v-decorator="['asyncLoad']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item
              name="customLoad"
              label="自定义加载数据"
              :labelCol="formItemLayout.labelCol"
              :wrapperCol="formItemLayout.wrapperCol"
            >
              <sinogear-dict-select-async
                :options="dictOptions"
                :col-model="colModel"
                :default-load-url="`${config.mockContextPath}/api/dictForms/getByAsync`"
                @change="handleChange"
                :on-fetch="handleFetch"
                v-decorator="['customLoad']"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item :wrapperCol="{span: 14, offset: 10}">
          <a-button htmlType="submit" type="primary" @click="handleSubmit">提交</a-button>
        </a-form-item>
      </a-card>
    </a-form>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import { io } from 'sinobest-functions';
  import { SinogearDictSelect, SinogearDictSelectAsync } from 'sinogear-vue';
  import { config } from '../../../../common/config';
  import { Card, Form, Button, Row, Col, Input } from 'ant-design-vue';
  const FormItem = Form.Item;
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 19 }
    }
  };

  const colModel = [
    { key: 'code', title: '编码' },
    { key: 'detail', title: '名称' },
    // { key: 'parent_code', title: '父编码' }
  ];
  
  export default {
    name: "DictForm",
    components: {
      Button,
      ACard: Card,
      ARow: Row,
      ACol: Col,
      AForm: Form,
      AButton: Button,
      AInput: Input,
      AFormItem: FormItem,
      SinogearDictSelect,
      SinogearDictSelectAsync
    },
    computed: {
      ...mapState('dictForm', {
        dictOptions: state => state.dictOptions,
        asyncDictOptions: state => state.asyncDictOptions
      })
    },
    watch: {
      dictOptions: function () {
        this.searchOptions = this.dictOptions;
      }
    },
    data: function () {
      return {
        formItemLayout,
        form: this.$form.createForm(this),
        searchOptions: this.dictOptions,
        colModel,
        config,
        io
      }
    },
    methods: {
      ...mapActions('dictForm', ['getDictOptions']),
      handleChange(event) {
        // console.info('选中：', event);
      },
      handleBlur(event) {
        // console.info(event);
      },
      search(searchValue) {
        const opts = this.dictOptions.filter((item) => {
          return item.detail.indexOf(searchValue) >= 0;
        });
        this.searchOptions = opts;
      },
      handleFetch(url, params) {
        const { page, pageSize, code } = params;
        const start = (+page -1) * pageSize;
        const end = +page * pageSize;
        const { dictOptions } = this;
        let result = [...dictOptions];
        return io.get(url);
        // return new Promise((resolve) => {
        //   console.log('resolve', resolve);
        //   setTimeout(() => {
        //     console.log('aaaa', resolve);
        //     if (code) {
        //       result = result.filter((opt) => ~opt.code.indexOf(code));
        //     }
        //     const data =  result.slice(start, end);
        //     const pagination = { page, pageSize, total: result.length };
        //     resolve({ data, pagination })
        //   }, 500)
        // });
      },
      handleSubmit() {
        console.log('表单数据：', this.form.getFieldsValue());
      }
    },
    mounted() {
      this.getDictOptions();
    }
  }
</script>

<style scoped lang="less">
.sg-form_card {
  margin-bottom: 24px;
}
</style>