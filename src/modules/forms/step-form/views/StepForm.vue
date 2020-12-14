<template>
  <a-row>
    <a-col>
      <template v-slot:content>
        将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。
      </template>
      <a-card :bordered="false">
        <a-steps class="steps" :current="currentTab">
          <a-step title="填写转账信息" />
          <a-step title="确认转账信息" />
          <a-step title="完成" />
        </a-steps>
        <div class="content">
          <step1 :mes="transferMes" v-if="currentTab === 0" @nextStep="nextStep"/>
          <step2 :mes="transferMes" v-if="currentTab === 1" @nextStep="nextStep" @prevStep="prevStep"/>
          <step3 :mes="transferMes" v-if="currentTab === 2" @prevStep="prevStep" @finish="finish"/>
        </div>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import {Steps, Row, Col, Card} from 'ant-design-vue';
  import Step1 from './Step1.vue';
  import Step2 from './Step2.vue';
  import Step3 from './Step3.vue';
  
  const {Step} = Steps;

  export default {
    name: 'StepForm',
    components: {
      Step1,
      Step2,
      Step3,
      AStep: Step,
      ASteps: Steps,
      ARow: Row,
      ACol: Col,
      ACard: Card
    },
    data () {
      return {
        currentTab: 0,
        // form
        form: null
      }
    },
    computed: {
      ...mapState('step-form', {
        transferMes: state => state.transferMes
      })
    },
    methods: {
      ...mapActions('step-form', ['saveData']),
      // handler
      nextStep (value) {
        if (value) {
          const editData = {
            account: value.paymentUser,
            receivedAccount: value.payType,
            name: value.name,
            money: value.money
          };
          this.saveData(editData);
        }
        if (this.currentTab < 2) {
          this.currentTab += 1
        }
      },
      prevStep () {
        if (this.currentTab > 0) {
          this.currentTab -= 1
        }
      },
      finish () {
        this.currentTab = 0
      }
    },
    destroyed() {
      this.saveData({
        account: 'ant-design@alipay.com',
        receivedAccount: 'test@example.com',
        name: 'Alex',
        money: 5000
      });
    }
  }
</script>

<style lang="less" scoped>
  .steps {
    max-width: 750px;
    margin: 16px auto;
  }
</style>
