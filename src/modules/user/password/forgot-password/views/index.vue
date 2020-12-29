<template>
  <div class="forgot-password">
    <global-login-box title="重置密码"></global-login-box>
    <send-mail v-if="!isResult" @on-submit="handleSendMail"></send-mail>
    <div class="top" v-else>
      <p class="tip">检查你的邮件，点击邮箱里的链接进行密码重置</p>
      <a-row>
        <a-button type="primary" @click="toLogin">
          返回到登录页
        </a-button>
      </a-row>
    </div>
  </div>
</template>

<script>
  import { Row, Button } from 'ant-design-vue';
  import GlobalLoginBox from '../../../../../components/GlobalLoginBox/index.vue'
  import SendMail from './SendMail.vue';
  import { mapActions, mapState } from 'vuex';
  
  export default {
    name: "ForgotPassword",
    components: {
      GlobalLoginBox, SendMail, ARow: Row, AButton: Button
    },
    computed: {
      ...mapState('forgot-password', {
        isResult: state => {console.log(state.isResult); return state.isResult}
      })
    },
    methods: {
      ...mapActions('forgot-password', [
          'sendResetPasswordMail', 'init'
      ]),
      handleSendMail(values) {
        this.sendResetPasswordMail(values)
      },
      toLogin() {
        this.init();
        this.$router.push('/user/login');
      }
    }
  }
</script>

<style scoped lang="less">
  @brand-color: #1e6ddd;
  .forgot-password {
    .ant-btn{
      background-color: @brand-color;
    }
    .top {
      height: 150px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .tip {
        margin: 50px 0;
        font-size: 16px;
      }
      margin-bottom: 36px;
    }
  }
</style>