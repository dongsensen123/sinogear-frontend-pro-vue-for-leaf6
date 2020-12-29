<template>
  <div class="global-header" :class="layout === 'header-layout' && 'global-header-horizontal'">
    <div class="header-left" v-if="layout === 'header-layout'">
      <global-menus></global-menus>
    </div>
    <div class="header-right">
      <a-dropdown>
        <span class="account">
          <a-avatar :key="currentUser.userAvatarKey" :src="imageUrl" size="small"></a-avatar>
          <span class="name">{{ currentUser.username }}</span>
        </span>
        <a-menu slot="overlay" @click="handleCommand">
          <a-menu-item key="setting">
            <span>
              <a-icon type="user" />
              <span>个人设置</span>
            </span>
          </a-menu-item>
          <a-menu-item key="exception">
            <span>
              <a-icon type="close-circle" />
              <span>触发异常</span>
            </span>
          </a-menu-item>
          <a-menu-item key="logout">
            <span>
              <a-icon type="logout" />
              <span>退出登录</span>
            </span>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
      <a-icon type="setting" @click="onClose" />
    </div>
  </div>
</template>

<script>
  import { Icon, Dropdown, Menu, Avatar } from 'ant-design-vue';
  import { mapState, mapActions } from 'vuex';
  import GlobalMenus from '../GlobalMenus/GlobalMenus.jsx';

  const AMenuItem = Menu.Item;

  export default {
    name: "GlobalHeader",
    components: {
      GlobalMenus,
      AIcon: Icon,
      ADropdown: Dropdown,
      AMenu: Menu,
      AMenuItem,
      AAvatar: Avatar
    },
    computed: {
      ...mapState({
        currentUser: state => state.currentUser,
        layout: state => state.setting.layout,
        drawer: state => state.drawer,
        imageUrl: state => state.imageUrl
      })
    },
    methods: {
      ...mapActions([
        'login/logout', 'changeSetting', 'changeDrawer'
      ]),
      handleCommand(command) {
        switch (command.key) {
          case 'logout':
            this['login/logout']();
            break;
          case 'setting':
            this.$router.push('/account/setting');
            break;
          case 'exception':
            this.$router.push('/trigger/exception');
        }
      },
      onClose() {
        this.changeDrawer(!this.drawer)
      }
    }
  }
</script>

<style scoped lang="less">
  .global-header{
    position: relative;
    height: 48px;
    background: #fffffe;
    background: var(--sg-sider-header-bg);
    z-index: 9;
    line-height: 48px;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    width: 100%;
    margin: 0;
    padding: 0 16px;
    color: var(--sg-header-right-content-color);
    box-sizing: border-box;
    .header-left{
      width: calc(100% - 135px);
    }
    .header-right{
      top: 0;
      position: absolute;
      right: 16px;
      .anticon-setting{
        vertical-align: -3px;
        cursor: pointer;
        padding: 0 5px;
        color: var(--sg-header-right-content-color);
      }
      .account{
        padding: 0 20px;
        cursor: pointer;
        display: inline-block;
        color: var(--sg-header-right-content-color);
        &:hover{
          color: var(--sg-global-menu-item-selected-bg);
        }
        .ant-avatar{
          width: 24px;
          height: 24px;
          border-radius: 50%;
          vertical-align: -8px;
          margin-right: 8px;
        }
        .name{
          color: var(--sg-header-right-content-color);
        }
      }
    }
  }
  .global-header-horizontal{
    background: var(--sg-header-bg);
    .header-right{
      color: #fff;
      .account{
        color: #fff;
        .name{
          color: #fff;
        }
      }
      .anticon-setting{
        color: #fff;
      }
    }
  }
</style>
