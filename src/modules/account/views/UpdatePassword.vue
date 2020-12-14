<template>
  <div class="update-password-container">
    <a-form
      :form="form"
      :hide-required-mask="true"
    >
      <a-form-item label="原密码：" v-bind="formItemLayout">
        <a-input
          type="password"
          placeholder="请输入原密码"
          v-decorator="['oldPassword', {rules: rules.oldPassword}]"
        ></a-input>
      </a-form-item>
      <a-form-item label="新密码：" v-bind="formItemLayout">
        <a-input
          type="password"
          placeholder="请输入新密码"
          v-decorator="['newPassword', {rules: rules.newPassword}]"
        ></a-input>
      </a-form-item>
      <a-form-item label="确认密码：" v-bind="formItemLayout">
        <a-input
          type="password"
          placeholder="请输入确认密码"
          v-decorator="['confirmPassword', {rules: rules.confirmPassword}]"
        ></a-input>
      </a-form-item>
      <a-form-item style="text-align: center;" class="btn-form-item">
        <a-button @click.prevent="handleUpdatePassword" style="width: 100px" type="primary" native-type="submit">
          提交
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import { Form, Button, Input } from 'ant-design-vue';
  
  const AFormItem = Form.Item;
  
  export default {
    name: "UpdatePassword",
    components: {
      AForm: Form, AButton: Button, AInput: Input, AFormItem
    },
    data: function () {
      const passwordRegExp = new RegExp('^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$');
      const passwordRules = { pattern: passwordRegExp, message: '请输入正确格式的密码,8-20位数字字母组合!' };
      return {
        rules: {
          oldPassword: [{ required: true, message: '请输入原密码' }],
          newPassword: [
            { required: true, message: '请输入新密码' },
            passwordRules
          ],
          confirmPassword: [
            { required: true, message: '请输入确认密码' },
            passwordRules
          ]
        },
        form: this.$form.createForm(this, { name: 'UpdatePasswordForm' }),
        formItemLayout: {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 4 },
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
          },
        }
      }
    },
    methods: {
      ...mapActions('account', [
        'updatePassword'
      ]),
      handleUpdatePassword() {
        this.form.validateFields((err, values) => {
          if (err) {
            return;
          } else {
            if (values.newPassword !== values.confirmPassword) {
              this.$message.error('新密码与确认密码不一致！');
              return;
            } else {
              const data = {
                originalPassword: values.oldPassword,
                newPassword: values.newPassword,
                confirmPassword: values.confirmPassword
              };
              this.updatePassword(data);
              this.form.resetFields();
            }
          }
        })
      }
    }
  }
</script>

<style lang="less">
  .update-password-container{
    padding-top: 16px;
  }
</style>