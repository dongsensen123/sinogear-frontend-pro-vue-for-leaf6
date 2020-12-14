<template>
  <div class="account-container">
    <div class="left-menus">
      <a-menu
        :selected-keys="selectedKeys"
        @select="select"
      >
        <a-menu-item
          v-for="item in Object.keys(menuMap)"
          :key="'/account/setting/' + item"
          :title="menuMap[item]"
        >
          {{ menuMap[item] }}
        </a-menu-item>
      </a-menu>
    </div>
    <div class="right">
      <div class="title">{{ title }}</div>
      <router-view transition transition-mode="out-in"></router-view>
    </div>
  </div>
</template>

<script>
  import { Menu } from 'ant-design-vue';
  
  const AMenuItem = Menu.Item;
  
  export default {
    name: "AccountContainer",
    components: {
      AMenu: Menu, AMenuItem
    },
    data: function () {
      return {
        menuMap: {
          base: '个人信息',
          "update-password": '修改密码',
          notification: '新消息通知',
          "user-status": '登录状态'
        },
        selectedKeys: ['/account/setting/base'],
        title: ''
      }
    },
    created: function () {
      this.selectedKeys = [this.$route.path];
      const arr = this.$route.path.split('/');
      const key = arr[arr.length - 1];
      this.title = this.menuMap[key];
    },
    methods: {
      select({ key }) {
        this.$router.push(key);
      }
    },
    watch: {
      $route: function(newVal) {
        this.selectedKeys = [newVal.path];
      }
    }
  }
</script>

<style scoped lang="less">
  .account-container{
    display: flex;
    height: 100%;
    overflow: auto;
    background-color: #fff;
    padding: 16px 0;
    margin: 0 16px;
    .left-menus{
      width: 224px;
      border-right: solid 1px #e6e6e6;
    }
    .right{
      flex: 1;
      padding-left: 40px;
      padding-right: 40px;
      padding-top: 8px;
      padding-bottom: 8px;
      .title {
        font-size: 20px;
        color: rgba(0, 0, 0, 0.8);
        line-height: 28px;
        font-weight: 500;
        margin-bottom: 12px;
      }
    }
  }
</style>