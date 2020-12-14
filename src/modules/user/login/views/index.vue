<template>
  <div class="login-form">
    <div class="title">登录</div>
    <a-form
      :wrapper-col="{span: 24}"
      :form="form"
    >
      <a-form-item :has-feedback="true">
        <a-input
          v-decorator="['username', {rules: [{ required: true, message: '请输入用户名' }], initialValue: 'guest'}]"
          placeholder="guest"
          size="large"
        >
          <a-icon slot="prefix" type="user"></a-icon>
        </a-input>
      </a-form-item>
      <a-form-item :has-feedback="true">
        <a-input
          size="large"
          v-decorator="['password', {rules: [{ required: true, message: '请输入密码' }], initialValue: 'guest'}]"
          placeholder="guest">
          <a-icon slot="prefix" type="lock"></a-icon>
        </a-input>
      </a-form-item>
      <a-form-item
        has-feedback
        class="captcha"
      >
        <sinogear-captcha
          v-decorator="['captcha', {rules: [{ required: true, message: '请输入验证码' }]}]"
          :mapParam="{data: 'codeimg'}"
          :verify-captcha-url="config.contextPath + '/api/captcha/verify'"
          :ifVerify="false"
          :captcha-url="config.contextPath + '/captcha/render'"
          @on-refresh="handleCaptcha"
          @on-captcha-change="handleCaptchaChange"
          :update-captcha-flag="updateCaptchaFlag"
          v-if="config.enableCaptcha"
        >
        </sinogear-captcha>
      </a-form-item>
      <div class="remember-password">
        <a-form-item>
          <a-checkbox
            v-decorator="['remember-me', { valuePropName: 'checked' }]"
            @change="handleCheck"
          >保持登录</a-checkbox>
        </a-form-item>
        <span v-if="enableResetPassword" style="margin: 0 16px">
          <router-link to="/user/forgotPassword">忘记密码</router-link>
        </span>
      </div>
      <a-form-item>
        <a-button
          @click.prevent="handleLogin"
          :loading="loginLoading"
          type="primary"
          size="large"
          html-type="submit"
        >登录</a-button>
      </a-form-item>
    </a-form>
    <div class="login-tips">
      <div>
        <span>用户名：guest</span>
        <span>&nbsp;密码：guest</span>
      </div>
      <span>没有账号？去<router-link to="/user/register">注册</router-link></span>
    </div>
  </div>
</template>

<script>
  import { Form, Input, Button, Checkbox, Icon } from 'ant-design-vue';
  import { config } from '../../../../common/config';
  import { SinogearCaptcha } from 'sinogear-vue'
  import JsEncrypt from 'jsencrypt';
  import { mapActions, mapState } from 'vuex';
  import { store } from '../../../../utils/func';
  
  const { store_user_key: STORE_USER_KEY } = config.store_keys;
  
  const AFormItem = Form.Item;
  
  export default {
    name: "LoginContainer",
    computed: {
      ...mapState('login', {
        loginLoading: state => state.LOGIN_LOADING
      })
    },
    components: {
      SinogearCaptcha, AForm: Form, AFormItem, AButton: Button, AInput: Input, ACheckbox: Checkbox, AIcon: Icon
    },
    data(){
      return {
        form: this.$form.createForm(this, { name: 'loginForm' }),
        config: config,
        captchaVerifyStatus: '',
        updateCaptchaFlag: '',
        enableResetPassword: config.enableResetPassword,
        enableRegister: config.enableRegister,
        captchaObj: {}
      }
    },
    methods: {
      ...mapActions('login', [
        'loginByOAuthWithProxyPSW', 'loginByOAuthWithProxyPSW', 'login', 'loginByOAuthWithPSW'
      ]),
      ...mapActions(['initInfos']),
      checkCaptcha(rule, value, callback) {
        setTimeout(() => {
          if (this.captchaVerifyStatus === 'success') {
            callback();
          } else {
            callback(new Error('请输入正确的验证码'))
          }
        }, 500)
      },
      handleCaptchaChange(obj) {
        this.captchaObj = obj;
      },
      handleLoginFailed() {
        this.updateCaptchaFlag = +Date.now();
        this.handleCaptcha();
      },
      handleCaptcha(){
        if (config.enableCaptcha) {
          this.form.setFieldsValue({captcha: ''})
        }
      },
      handleCheck(e) {
        store.removeItem(STORE_USER_KEY, !e.target.checked);
      },
      handleLogin() {
        this.form.validateFields((err, values) => {
          if (!err) {
            values.reqid = this.captchaObj.reqid;
            this.loginByOAuthWithPSW({values, onFail: this.handleLoginFailed});
          } else {
            if (!values.captcha) {
              this.captchaVerifyStatus = 'error';
            }
          }
        })
      }
    },
    created() {
      this.initInfos()
    },
    mounted: function() {
      this.$nextTick(() => {
        const {enableCaptcha} = config;
        if (enableCaptcha) {
          this.handleCaptcha();
        }
        this.form.setFieldsValue({'remember-me': !!store.getItem(STORE_USER_KEY, true)});
      })
    }
  }
</script>

<style scoped lang="less">
  @sg-login-bottom-text-color: #666; // 登录页面表单 底部文字字体颜色@import '../../../themes/default';
  @sg-login-input-text-color: #1461a6; // 登录页面表单 输入框文字颜色
  @brand-color: #1e6ddd;
  .login-form {
    position: relative;
    margin: 0 auto;
    text-align: center;
    background-color: #fff;
    border-radius: 8px;
    box-sizing: border-box;
    .title{
      font-size: 32px;
      text-align: center;
      margin-bottom: 16px;
    }
    .remember-password{
      display: flex;
      justify-content: space-between;
      line-height: 40px;
      .ant-form-item{
        margin-bottom: 0;
      }
      a{
        color: @brand-color;
      }
    }
    .login-tips{
      display: flex;
      justify-content: space-between;
      a{
        color: @brand-color;
      }
    }
    .ant-btn-primary {
      width: 100%;
      border-radius: 0;
      background-color: @brand-color;
      border-color: @brand-color;
    }
  }
</style>

<style lang="less">
  @brand-color: #1e6ddd;
  .login-form{
    .ant-input:hover,
    .ant-input:focus{
      border-color: @brand-color;
      box-shadow: 0 0 2px rgba(30, 109, 221, 0.2);
    }
    ant-input-prefix{
      color: rgba(0, 0, 0, 0.65);
    }
    .ant-checkbox-checked .ant-checkbox-inner{
      background-color: @brand-color;
      border-color: @brand-color;
    }
    .ant-checkbox:hover .ant-checkbox-inner,
    .ant-checkbox:focus .ant-checkbox-inner{
      border-color: @brand-color;
    }
    .captcha{
      .ant-form-item-children-icon {
        position: absolute;
        margin-right: 120px;
      }
    }
  }
</style>