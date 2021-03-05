<template>
  <div>
    <a-config-provider :locale="zhCN">
      <component :is="layout">
        <router-view v-if="isRouterAlive" transition transition-mode="out-in"></router-view>
      </component>
    </a-config-provider>
  </div>
</template>

<script>
  import zhCN from 'ant-design-vue/es/locale/zh_CN';
  import { Icon, ConfigProvider } from 'ant-design-vue';
  import { mapActions, mapState } from 'vuex';
  import { config } from '../common/config';
  import { getSessionFromOthers, SessionChangeEventName } from '../utils/storageEventHandler';
  import { auth } from '../utils/auth'
  import SiderLayout from './SiderLayout.vue';
  import HeaderLayout from './HeaderLayout.vue';
  import LoginLayout from './LoginLayout.vue';
  import BlankLayout from './BlankLayout.vue';
  
  export default {
    name: "LayoutContainer",
    provide(){
      return {
        reload: this.reload
      }
    },
    components: {
      AConfigProvider: ConfigProvider, AIcon: Icon, SiderLayout, HeaderLayout, LoginLayout, BlankLayout
    },
    data(){
      return {
        isRouterAlive: true,
        isSessionInit: false,
        isLogin: auth.isLogin(),
        zhCN
      }
    },
    computed:{
      ...mapState({
        globalLayout: (state) => {
          return state.setting.layout;
        }
      }),
      layout(){
        return (this.$route.meta.layout || this.globalLayout || 'sider-layout')
      }
    },
    methods: {
      ...mapActions([
        'loginRedirect', 'redirectAfterSessionChange'
      ]),
      //通过声明reload方法，控制router-view的显示或隐藏，从而控制页面的再次加载
      reload(){
        this.isRouterAlive = false;
        this.$nextTick(function () {
          this.isRouterAlive = true;
        })
      },
      handleChildApplicationMessage: function () {
        // 接收数据，避免其他地方使用window.postMessage进行通信
        const { sgInteractionData401 } = event.data;
        // 目前只处理401状态码传递过来的数据
        if (sgInteractionData401) {
          // url: 发送数据的应用中401状态码跳转的地址
          // isSendBySelf: 当前数据是否由自身应用发出的
          const { url, isSendBySelf } = sgInteractionData401;
          auth.removeUserInfo();
          auth.removeAuthInfo();
          // 不是自身应用发送的数据，当前应用跳转到登录页
          this.$router.push(isSendBySelf ? url : config.loginUrl);
        }
      }
    },
    created: async function() {
      this.isSessionInit = false;
      await getSessionFromOthers();
      this.isSessionInit = true;
      const self = this;
      document.addEventListener(SessionChangeEventName, () => {
        self.redirectAfterSessionChange();
      })
      window.addEventListener('message', this.handleChildApplicationMessage);
    },
    beforeDestroy: function() {
      const self = this;
      window.removeEventListener('message', this.handleChildApplicationMessage);
      document.removeEventListener(SessionChangeEventName, () => {
        self.redirectAfterSessionChange();
      });
    }
  }
</script>

<style lang="less">

</style>