<template>
  <div id="microapp-view" class="macro-app-container">
  </div>
</template>

<script>
  import { loadMicroApp } from 'qiankun';
  import { config } from '../common/config';
  export default {
    name: "MacroAppLayout",
    methods: {
      loadManagementApp: function () {
        this.microApp = loadMicroApp(
          {
            name: `${this.$route.path}`,
            entry: config.microApp.managementEntry,
            container: document.querySelector('#microapp-view'),
            props: {
              config: {
                requestConfig: config.requestConfig,
                enableAccountHierarchicallyAuthorizeManagement: config.enableAccountHierarchicallyAuthorizeManagement, // 是否开启分级授权
              }
            }
          }
        );
      }
    },
    mounted() {
      // console.log(`调试输出mounted`);
      config.enableMicroApp ? this.loadManagementApp() : undefined;
    },
    beforeDestroy() {
      this.microApp.unmount();
    },
    watch: {
      $route: function (newVal) {
        // console.log(`调试输出newVal`, newVal);
        if (this.microApp) {
          this.microApp.unmount();
        }
        setTimeout(() => {
          config.enableMicroApp ? this.loadManagementApp() : undefined;
        }, 100);
      }
    }
  }
</script>

<style scoped lang="less">
  .macro-app-container{
    background-color: #fff;
    margin: 0;
    overflow: auto;
    width: 100%;
    height: 100%;
    padding: 0;
    ::v-deep > div {
      height: 100%;
    }
  }
</style>