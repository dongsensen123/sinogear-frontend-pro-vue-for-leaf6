<template>
  <div id="app">
    <router-view transition transition-mode="out-in"></router-view>
    <a-drawer
      v-if="drawer"
      :destroy-on-close="true"
      @close="onClose"
      title="全局设置"
      :visible="drawer"
      wrap-class-name="sg-global-drawer"
    >
      <drawer-setting></drawer-setting>
    </a-drawer>
  </div>
</template>

<script>
  import DrawerSetting from './modules/setting/views/index.vue';
  import { auth } from './utils/auth.js';
  import { Drawer } from 'ant-design-vue';
  import { mapActions, mapState } from 'vuex';
  
  export default {
    name: 'App',
    components: {
      ADrawer: Drawer, DrawerSetting
    },
    computed: {
      ...mapState({
        drawer: state => state.drawer,
        setting: state => state.setting
      })
    },
    methods: {
      ...mapActions([
        'changeDrawer', 'getSetting'
      ]),
      onClose() {
        this.changeDrawer(!this.drawer)
      }
    },
    created() {
      if (auth.isLogin()) {
        this.getSetting('global-setting').then(() => {
          const { modifyVars } = window.less || {};
          const { themeConfig } = this.setting;
          if(modifyVars && themeConfig && themeConfig.variable) {
            modifyVars(themeConfig.variable);
          }
        });
      }
    }
  }
</script>

<style lang="less">
  *{
    outline:none;
  }
  .sg-global-drawer{
    width: 100%;
    .ant-drawer-content-wrapper{
      width: 280px !important;
      box-sizing: border-box;
      .ant-drawer-wrapper-body{
        overflow: hidden;
      }
    }
  }
</style>
