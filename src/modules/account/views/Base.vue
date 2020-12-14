<template>
  <div class="base-container">
    <div class="left">
      <a-form
        :form="form"
        :hide-required-mark="true"
      >
        <a-form-item label="登录名称：">
          <a-input
            v-decorator="['loginName', {rules: rules.loginName, initialValue: personal.loginName}]"
            placeholder="请输入登录名称"
            v-if="display"
            disabled
          ></a-input>
          <span v-else>{{ personal.loginName }}</span>
        </a-form-item>
        <a-form-item label="所属组织机构：">
          <a-input
            v-decorator="['belongsOrgCode', {initialValue: personal.belongsOrgCode}]"
            placeholder="请选择组织机构"
            v-if="display"
            disabled
          ></a-input>
          <span v-else>{{ personal.belongsOrgCode }}</span>
        </a-form-item>
        <a-form-item label="电子邮箱：">
          <a-input
            v-decorator="['email', {rules: rules.email, initialValue: personal.email}]"
            placeholder="请输入电子邮箱"
            v-if="display"
          ></a-input>
          <span v-else>{{ personal.email }}</span>
        </a-form-item>
        <a-form-item label="电话号码：">
          <a-input
            v-decorator="['phoneNumber', {rules: rules.phoneNumber, initialValue: personal.phoneNumber}]"
            placeholder="请输入电话号码"
            v-if="display"
          ></a-input>
          <span v-else>{{ personal.phoneNumber }}</span>
        </a-form-item>
        <a-form-item label="用户名称：">
          <a-input
            v-decorator="['userName', {rules: rules.userName, initialValue: personal.userName}]"
            placeholder="请输入用户名称"
            v-if="display"></a-input>
          <span v-else>{{ personal.userName }}</span>
        </a-form-item>
        <a-form-item label="证件号码：">
          <a-input
            v-decorator="['cardCode', {rules: rules.cardCode, initialValue: personal.cardCode}]"
            placeholder="请输入证件号码"
            v-if="display"
          ></a-input>
          <span v-else>{{ personal.cardCode }}</span>
        </a-form-item>
        <a-form-item label="备注：" prop="remark">
          <a-input
            v-decorator="['remark', {initialValue: personal.remark}]"
            placeholder="请输入备注"
            v-if="display"
          ></a-input>
          <span v-else>{{ personal.remark }}</span>
        </a-form-item>
        <a-form-item class="btn-group">
          <template v-if="display">
            <a-button type="primary" @click.prevent="handleUpdate">修改</a-button>
            <a-button style="margin-left: 20px" type="primary" @click="handleQuery">取消</a-button>
          </template>
          <a-button v-else type="primary" @click="display = true">编辑</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="right">
      <div class="avatar-title">头像</div>
      <div class="avatar">
        <img alt="avatar" :src="imageUrl" :key="currentUser.userAvatarKey" />
      </div>
      <a-upload
        :key="currentUser.userAvatarKey"
        list-type="picture"
        :action="currentUser.uploadUserAvatarUrl || ''"
        :show-upload-list="false"
        :with-credentials="true"
        :headers="getHeaders"
        @change="handleFile"
      >
        <div class="button-view">
          <a-button><a-icon type="upload" />更换头像</a-button>
        </div>
      </a-upload>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import { Form, Upload, Input, Button, Icon } from 'ant-design-vue';
  
  const AFormItem = Form.Item;
  
  export default {
    name: "BaseContainer",
    components: {
      AForm: Form, AUpload: Upload, AInput: Input, AFormItem, AButton: Button, AIcon: Icon
    },
    data: function () {
      const phoneRegExp = new RegExp('^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\\d{8}$');
      return {
        form: this.$form.createForm(this, { name: 'accountForm' }),
        display: false,
        rules: {
          loginName: [{ max: 30, message: '长度不超过30个字符' }],
          email: [{ type: 'email', message: '请输入正确的邮箱地址!' }],
          phoneNumber: [{ pattern: phoneRegExp, message: '请输入正确的手机号' }],
          userName: [
            { required: true, message: '用户名称必填' },
            { max: 10, message: '用户名长度不超过10个字符' }
          ],
          cardCode: [{ max: 30, message: '证件号码长度不超过30个字符' }]
        }
      }
    },
    computed: {
      ...mapState({
        currentUser: (state) => state.currentUser,
        personal: state => state.account.personal,
        imageUrl: state => state.imageUrl
      }),
      getHeaders() {
        const obj = {}
        obj['Access-Token'] = JSON.parse(localStorage.getItem('Access-Token'))
        return obj
      }
    },
    methods: {
      ...mapActions([
        'changeUserAvatarKey', 'getAvatar'
      ]),
      ...mapActions('account', [
          'initPersonal', 'saveOrUpdate'
      ]),
      handleFile(info) {
        if (info.file.status === 'done') {
          this.changeUserAvatarKey();
          this.getAvatar();
          this.$message.success('头像上传成功');
        }
        if (info.file.status === 'error') {
          this.$message.info('头像上传失败')
        }
      },
      handleUpdate() {
        this.form.validateFields((err, values) => {
          if (!err) {
            this.saveOrUpdate({ personal: values });
            this.display = false;
          } else {
            return;
          }
        });
      },
      handleQuery() {
        setTimeout(() => {
          this.display = false;
        }, 100)
      }
    },
    mounted: function () {
      this.initPersonal();
    }
  }
</script>

<style scoped lang="less">
  .base-container{
    display: flex;
    padding-top: 12px;
    .left{
      max-width: 448px;
      min-width: 301px;
      .btn-group{
        .ant-btn{
          width: 100px;
          height: 32px;
        }
      }
    }
    .right {
      flex: 1;
      padding-left: 104px;
      .avatar-title {
        height: 22px;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.85);
        line-height: 22px;
        margin-bottom: 8px;
      }
      .avatar {
        width: 144px;
        height: 144px;
        margin-bottom: 12px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .button-view {
        width: 144px;
        text-align: center;
      }
    }
  }
  @media screen and (max-width: 1200px) {
    .base-container {
      flex-direction: column-reverse;
    
      .right {
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 448px;
        .avatar-title {
          display: none;
        }
      }
    }
  }
</style>