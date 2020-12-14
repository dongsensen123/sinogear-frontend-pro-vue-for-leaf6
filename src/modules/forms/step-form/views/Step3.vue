<template>
  <div class="step3-contain">
    <a-form>
      <a-result status="success" title="操作成功" sub-title="预计两小时内到账" style="max-width: 560px; margin: 0 auto 0;">
        <div class="information">
          <a-row>
            <a-col :sm="8" :xs="24">付款账户：</a-col>
            <a-col :sm="16" :xs="24">{{mes.account}}</a-col>
          </a-row>
          <a-row>
            <a-col :sm="8" :xs="24">收款账户：</a-col>
            <a-col :sm="16" :xs="24">{{mes.receivedAccount}}</a-col>
          </a-row>
          <a-row>
            <a-col :sm="8" :xs="24">收款人姓名：</a-col>
            <a-col :sm="16" :xs="24">{{mes.name}}</a-col>
          </a-row>
          <a-row>
            <a-col :sm="8" :xs="24">转账金额：</a-col>
            <a-col :sm="16" :xs="24"><span class="money">{{mes.money}}</span> 元</a-col>
          </a-row>
        </div>
        <template #extra>
          <a-button type="primary" @click="finish">再转一笔</a-button>
          <a-button style="margin-left: 8px" @click="toOrderList">查看账单</a-button>
        </template>
      </a-result>
    </a-form>
  </div>
</template>

<script>
  import {Form, Card, Button, Input, Divider, Result, Row, Col} from 'ant-design-vue';
  const FormItem = Form.Item;
  
  export default {
    name: 'Step3',
    components: {
      AForm: Form,
      ACard: Card,
      AInput: Input,
      AButton: Button,
      ADivider: Divider,
      AFormItem: FormItem,
      AResult: Result,
      ARow: Row,
      ACol: Col
    },
    props: {
      mes: {
        type: Object,
        default: function () {
          return {
            account: 'ant-design@alipay.com',
            receivedAccount: 'test@example.com',
            name: 'Alex',
            money: 5000
          }
        }
      }
    },
    data () {
      return {
        loading: false
      }
    },
    methods: {
      finish () {
        this.$emit('finish')
      },
      toOrderList () {
        this.$router.push('/list/table-list')
      }
    }
  }
</script>
<style lang="less" scoped>
  .step3-contain {
    .ant-result{
      padding: 24px 32px;;
    }
  }
  .information {
    line-height: 22px;
    
    .ant-row:not(:last-child) {
      margin-bottom: 15px;
    }
  }
  .money {
    font-family: "Helvetica Neue",sans-serif;
    font-weight: 500;
    font-size: 20px;
    line-height: 14px;
  }
</style>
