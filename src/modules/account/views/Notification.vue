<template>
  <div class="notification-container">
    <div v-for="item in data" :key="item.key" class="list-item">
      <div class="left">
        <div class="title">{{ item.title }}</div>
        <div class="description">{{ item.description }}</div>
      </div>
      <div class="right">
        <a-switch checked-children="开" un-checked-children="关" default-checked></a-switch>
      </div>
    </div>
  </div>
</template>

<script>
  import { Switch } from 'ant-design-vue';
  export default {
    name: "NotificationContainer",
    components: {
      ASwitch: Switch
    },
    data: function () {
      return {
        data: [
          {title: '账户密码', description: '其他用户的消息将以站内信的形式通知'},
          {title: '系统消息', description: '系统消息将以站内信的形式通知'},
          {title: '账户密码', description: '账户密码'}
        ],
        value: {
          data1: false,
          data2: false,
          data3: false
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .notification-container{
    .list-item{
      border-bottom: 1px solid #e8e8e8;
      padding: 14px 0;
      display: flex;
      align-items: center;
      .left{
        flex: 1 1;
        .title{
          align-items: flex-start;
          margin-bottom: 4px;
          color: rgba(0, 0, 0, 0.65);
        }
        .description{
          color: rgba(0, 0, 0, 0.45);
          font-size: 14px;
          line-height: 22px;
        }
      }
      .right{
        margin-left: 48px;
        flex: 0 0 auto;
      }
    }
  }
</style>