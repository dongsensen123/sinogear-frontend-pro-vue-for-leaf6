<template>
  <div class="register">
    <global-login-box title="账号注册" :tips="renderTips" @on-tips-click="handleTipsClick"></global-login-box>
    <a-form
      :form="form"
      :label-col="{ xs: 24, sm: 8, md: 8, lg: 6 }"
      :wrapper-col="{ xs: 24, sm: 16, md: 16, lg: 18 }"
    >
      <a-form-item label="登录账号">
        <a-input
          placeholder="请输入登录账号"
          v-decorator="['loginName', {rules: rules.loginName}]"
        ></a-input>
      </a-form-item>
      <a-form-item label="电子邮箱">
        <a-input
          placeholder="请填写联系人对应的电子邮箱"
          v-decorator="['email', {rules: rules.email}]"
        >
          <a-tooltip title="忘记密码时通过验证后的邮箱重置密码" placement="topRight" slot="suffix">
            <a-icon type="info-circle" />
          </a-tooltip>
        </a-input>
      </a-form-item>
      <a-form-item label="密码">
        <a-input-password
          v-decorator="['loginPassword', {rules: rules.loginPassword}]"
          placeholder="请输入密码"></a-input-password>
      </a-form-item>
      <a-form-item label="确认密码">
        <a-input-password
          @blur="checkConfirmPassword"
          v-decorator="['confirmPassword', {rules: rules.confirmPassword}]"
          placeholder="请再次输入密码"
        ></a-input-password>
      </a-form-item>
      <a-form-item label="证件号">
        <a-input
          v-decorator="['cardCode', {rules: rules.cardCode}]"
          placeholder="请输入证件号"
        ></a-input>
      </a-form-item>
      <a-form-item label="手机号">
        <a-input
          v-decorator="['phone', {rules: rules.phone}]"
          placeholder="请输入手机号"
        ></a-input>
      </a-form-item>
      <a-form-item
        label="验证码"
        :validate-status="captchaVerifyStatus"
        has-feedback
        class="captcha"
      >
        <sinogear-captcha
          v-decorator="['captcha', {rules: rules.captcha}]"
          :mapParam="{data: 'codeimg'}"
          :captcha-url="config.contextPath + '/captcha/render'"
          :ifVerify="false"
          :verify-captcha-url="config.contextPath + '/api/captcha/verify'"
          @on-verify-status-change="handleVerifyStatusChange"
          @on-refresh="handleCaptcha"
          @change-captcha-verify-status="handleVerifyStatusChange"
          :update-captcha-flag="updateCaptchaFlag"
          size="default"
        >
        </sinogear-captcha>
      </a-form-item>
      <a-form-item class="register-button" :wrapper-col="{span: 24}">
        <a-button
          @click.prevent="handleRegister"
          type="primary"
        >立即注册</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
  import GlobalLoginBox from '../../../../components/GlobalLoginBox/index.vue';
  import { SinogearCaptcha } from 'sinogear-vue';
  import { config } from "../../../../common/config";
  import { mapActions } from 'vuex';
  import { Form, Input, Button, Tooltip, Icon } from 'ant-design-vue';
  
  const AFormItem = Form.Item;
  const AInputPassword = Input.Password;

  export default {
    name: "RegisterContainer",
    components: {
      GlobalLoginBox,
      SinogearCaptcha,
      AForm: Form,
      AFormItem,
      AInputPassword,
      AInput: Input,
      AButton: Button,
      ATooltip: Tooltip,
      AIcon: Icon
    },
    data: function () {
      const phoneRegExp = new RegExp('^((1[358][0-9])|(14[57])|(17[0678])|(19[7]))\\d{8}$');
      // 只允许英文字母、数字、下划线、英文句号、以及中划线组成
      const emailRegExp = new RegExp('^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$');
      return {
        renderTips: () => {
          return `<div>已有账号？现在<a style="color: #1e6ddd">登录</a></div>`
        },
        form: this.$form.createForm(this, { name: 'registerForm' }),
        config: {
          contextPath: config.contextPath
        },
        captchaVerifyStatus: '',
        updateCaptchaFlag: '',
        confirmDirty: false,
        rules: {
          loginName: [
            { required: true, message: '请输入登录账号' },
            { max: 30, message: '长度不超过30个字符' },
            { validator: this.checkLoginNameRule }
          ],
          email: [
            { required: true, message: '请填写联系人对应的电子邮箱' },
            { pattern: emailRegExp, message: '请输入正确的邮箱地址!' },
            { max: 50, message: '邮箱地址长度不超过50个字符' }
          ],
          phone: [
            { whitespace: true, message: '请输入手机号码' },
            { pattern: phoneRegExp, message: '请输入正确的手机号' }
          ],
          captcha: [
            { required: true, message: '请输入验证码' },
            { validator: this.checkCaptcha, trigger: ['blur', 'change'] },
            
          ],
          loginPassword: [
            { required: true, whitespace: true, message: '请输入密码' },
            { min: 8, message: '密码长度必须大于等于8' },
            { validator: this.validateToNextPassword }
          ],
          confirmPassword: [
            { required: true, whitespace: true, message: '请输入密码' },
            { min: 8, message: '密码长度必须大于等于8' },
            { validator: this.compareToFirstPassword }
          ],
          cardCode: [{ max: 30, message: '证件号码长度不超过30个字符' }]
        }
      }
    },
    methods: {
      ...mapActions('register', [
        'checkLoginName', 'register'
      ]),
      handleTipsClick() {
        this.$router.push('/user/login')
      },
      checkCaptcha(rule, value, callback) {
        setTimeout(() => {
          if (this.captchaVerifyStatus === 'success') {
            callback();
          } else {
            callback(new Error('请输入正确的验证码'))
          }
        }, 500)
      },
      checkConfirmPassword(value){
        this.confirmDirty = this.confirmDirty || !!value;
      },
      checkLoginNameRule(rule, value, callback) {
        const checkLoginNameCallback = (result) => {
          if (!result) {
            callback('账号已存在');
            return;
          }
          callback();
        };
        this.checkLoginName({data: {loginName: value}, checkLoginNameCallback});
      },
      validateToNextPassword(rule, value, callback) {
        if (value && this.confirmDirty) {
          this.form.validateFields(['confirmPassword']);
        }
        callback();
      },
      compareToFirstPassword(rule, value, callback) {
        if (value && value !== this.form.getFieldValue('loginPassword')) {
          callback('两次输入的密码不一致，请再次确认您的密码!');
        } else {
          callback();
        }
      },
      handleVerifyStatusChange(value) {
        this.captchaVerifyStatus = value;
      },
      handleCaptcha(){
        if (config.enableCaptcha) {
          this.form.setFieldsValue({captcha: ''})
        }
      },
      handleRegister() {
        this.form.validateFields((err, values) => {
          if (!err) {
            this.register({data: values, onFail: this.handleRegisterFail});
          } else if (!values.captcha) {
            this.handleVerifyStatusChange('error');
          }
        });
      },
      handleRegisterFail() {
        this.updateCaptchaFlag = +Date.now();
        this.handleCaptcha();
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.handleCaptcha();
      })
    }
  }
</script>

<style lang="less">
  @brand-color: #1e6ddd;
  .register{
    .ant-form-item{
      margin-bottom: 20px;
    }
    .ant-btn-primary{
      background: @brand-color;
      width: 80%;
    }
    .ant-input:hover,
    .ant-input:focus{
      border-color: @brand-color;
    }
    .ant-input-prefix{
      color: rgba(0, 0, 0, 0.65);
      i{
        font-size: 16px;
      }
    }
    .captcha{
      .ant-form-item-children-icon {
        position: absolute;
        margin-right: 120px;
      }
    }
    .register-button{
      .ant-form-item-control{
        text-align: center;
      }
    }
  }
</style>