import 'whatwg-fetch';
import 'core-js/stable/promise';
import 'core-js/stable/symbol';
import 'core-js/stable/string/starts-with';
import 'core-js/web/url';
import Vue from 'vue'
import { initGlobalState, MicroAppStateActions } from 'qiankun';
import App from './App.vue'
import store from './store/index'
import { message, Modal, Drawer, notification } from 'ant-design-vue';
import router from './router'
import './themes/index.less';
import './themes/variables.less';
import './resources/fonts/iconfont.css';
import { config } from './common/config';
import vcolorpicker from 'vcolorpicker'
import { io, cache, router as sgRouter } from 'sinobest-functions';
import cssVars from 'css-vars-ponyfill';
import { handleNotificationError } from './utils/func';

cssVars({ watch: true, silent: true});
message.config({ maxCount: 1 });

const errorHandler = (error, vm, message, description) => {
  handleNotificationError(error, message, description)
  // message.error(`Error: ${error.toString()}\nInfo: ${info}`);
};

Vue.config.productionTip = false;
Vue.config.errorHandler = errorHandler;
Vue.prototype.$throw = (error, message, description) => errorHandler(error, this, message, description);
Vue.prototype.$message = message;
Vue.prototype.$notification = notification;

Vue.use(vcolorpicker);
Vue.use(Modal);
Vue.use(Drawer);

io.register(config.requestConfig);

sgRouter.register(router);

if (config.enableInitCacheData) {
  cache.register(config.cacheConfig);
}

// 在主应用中定义全局状态，并返回通信方法
const { onGlobalStateChange, setGlobalState } = initGlobalState({
  sgError: {}
});

onGlobalStateChange((value, prev) => {
  console.info('[onGlobalStateChange - master]:', value, prev);
  // 401,403状态页面跳转，其它状态错误提示
  if (value.sgError?.errMsg) {
    const { errHint, errMsg } = value.sgError;
    const msg = errHint || errMsg;
    if (value.sgError.errCode.indexOf('401') > -1) {
      message.error(msg);
      router.push(config.loginUrl);
    }else if (value.sgError.errCode.indexOf('403') > -1) {
      router.push(config.error403Url);
    } else {
      message.error(msg);
    }
  } else if (value.sgError?.extraCode) {
    if (value.sgError.extraCode === 'sg_error_401') {
      message.error('请求被拒绝访问，请先进行登录认证');
      router.push(config.loginUrl);
    }
  } else {
    message.error('请求错误，请联系管理员')
  }
});


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");

// io.register({
//   ...config.requestConfig,
//   headers: () => {
//     const userInfo = store.getItem(STORE_USER_KEY, true);
//     const headerObj = {};
//     // 判断登陆是否过期
//     if (
//         userInfo &&
//         moment(new Date()).diff(moment(userInfo.loginTime), 'seconds') < userInfo.validitySecondsOfRememberMe
//     ) {
//       headerObj['X-CSRF-TOKEN'] = Vue.$cookies.get('XSRF-TOKEN');
//     } else if (userInfo) {
//       store.removeItem(STORE_USER_KEY, true);
//       router.push('/user/login');
//     }
//     return headerObj;
//   }
// });


