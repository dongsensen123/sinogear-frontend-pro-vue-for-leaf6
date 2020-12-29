<template>
  <div class="send-mail-container">
    <div class="tips">
      <p>请输入你认证后的邮箱地址，系统会发送一封重置密码邮件</p>
    </div>
    <a-form
      :label-col="{ xs: 24, sm: 8, md: 8, lg: 6 }"
      :wrapper-col="{ xs: 24, sm: 16, md: 16, lg: 18 }"
      :form="form"
    >
      <a-form-item label="登录账号">
        <a-input
          v-decorator="['loginName', {rules: rules.loginName}]"
          placeholder="请输入登录账号"
        ></a-input>
      </a-form-item>
      <a-form-item label="电子邮箱">
        <a-input v-decorator="['email', {rules: rules.email}]" placeholder="请输入邮箱地址"></a-input>
      </a-form-item>
      <a-form-item
        label="验证码"
        :validate-status="captchaVerifyStatus"
        has-feedback
        class="captcha"
      >
        <sinogear-captcha
          size="default"
          v-decorator="['captcha', {rules: rules.captcha}]"
          :captcha-url="config.contextPath + '/captcha/render'"
          :ifVerify="false"
          :verify-captcha-url="config.contextPath + '/api/captcha/verify'"
          @on-verify-status-change="handleVerifyStatusChange"
          @on-refresh="handleCaptcha"
          @change-captcha-verify-status="handleVerifyStatusChange"
          :update-captcha-flag="updateCaptchaFlag"
        >
        </sinogear-captcha>
      </a-form-item>
      <a-form-item class="register-button">
        <a-button
          @click.prevent="handleSubmit"
          type="primary"
          >发送验证邮件</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
  import { Form, Input, Button } from 'ant-design-vue';
  import { SinogearCaptcha } from 'sinogear-vue';
  import { config } from '../../../../../common/config';
  
  const AFormItem = Form.Item;

  export default {
    name: "SendMail",
    components: {
      SinogearCaptcha, AForm: Form, AInput: Input, AButton: Button, AFormItem
    },
    data: function () {
      const emailRegExp = new RegExp('^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$');
      return {
        form: this.$form.createForm(this, {name: 'forgotPasswordForm'}),
        config: {
          contextPath: config.contextPath
        },
        captchaVerifyStatus: '',
        updateCaptchaFlag: '',
        rules: {
          loginName: [
            { required: true, message: '请输入登录账号' },
            { max: 30, message: '长度不超过30个字符' }
          ],
          email: [
            { required: true, whitespace: true, message: '请输入邮箱地址' },
            { pattern: emailRegExp, message: '请输入正确的邮箱地址!' },
            { max: 50, message: '邮箱地址长度不超过50个字符' }
          ],
          captcha: [
            { required: true, message: '请输入验证码' },
            { validator: this.checkCaptcha, trigger: ['blur', 'change'] }
          ]
        }
      }
    },
    methods: {
      checkCaptcha(rule, value, callback) {
        setTimeout(() => {
          if (this.captchaVerifyStatus === 'success') {
            callback();
          } else {
            callback(new Error('请输入正确的验证码'))
          }
        }, 500)
      },
      handleVerifyStatusChange(value) {
        this.captchaVerifyStatus = value;
      },
      handleCaptcha(){
        if (config.enableCaptcha) {
          this.form.setFieldsValue({captcha: ''})
        }
      },
      handleSubmit() {
        this.form.validateFields((err, values) => {
          if (!err) {
            this.$emit('on-submit', values);
          } else if (!values.captcha) {
            this.handleVerifyStatusChange('error');
          }
        });
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.handleCaptcha();
      })
    }
  }
</script>

<style scoped lang="less">
  .send-mail-container{
    margin: 0 -16px;
    .tips {
      background: #fffaeb;
      border: 1px solid #f7a428;
      border-radius: 4px;
      margin-top: 16px;
      margin-bottom: 16px;
      p {
        text-align: left;
        margin: 6px 12px;
        font-size: 14px;
      }
    }
  }
</style>

<style lang="less">
  @brand-color: #1e6ddd;
  .send-mail-container{
    .ant-btn-primary{
      background: @brand-color;
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