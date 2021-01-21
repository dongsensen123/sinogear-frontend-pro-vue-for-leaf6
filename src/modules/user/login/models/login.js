import {
  login,
  logout,
  loginByOAuthWithPSW,
  loginByOAuthWithProxyPSW,
  loginByOAuthWithImplicit,
  getUserInfoBySSO,
  initCacheData,
} from '../services/login';
import { url } from '../../../../utils/func';
import { auth } from '../../../../utils/auth';
import { config } from '../../../../common/config';
import router from '../../../../router/index';
import store from '../../../../store/index';
import Vue from 'vue';

const state = {
  LOGIN_LOADING: false,
  forceUpdatePassword: false
};

const getters = {
  getLoginLoading: state => state.LOGIN_LOADING
};

const mutations = {
  SET_LOGIN_LOADING: (state, payload) => {
    state.LOGIN_LOADING = payload;
  },
  setForceUpdatePasswordStatus: (state, payload) => {
    state.forceUpdatePassword = payload;
  }
};

const actions = {
  login: async (context, payload) => {
    try {
      let { captcha } = payload.data;
      let key;
      if (typeof captcha === 'object') {
        ({ code: captcha, key } = captcha);
      }
      const user = await login({...payload.data, captcha, key});
      if (user && user.username) {
        if (payload.data['remember-me']) {
          user.loginTime = new Date();
        }
        auth.setUserInfo(user, payload.data['remember-me']);
        await context.dispatch('redirectAfterLogin');
      } else {
        Vue.prototype.$message.error('用户名或密码错误，或用户被禁用，登录失败');
        payload.onFail();
      }
    } catch (error) {
      // throw error;
      Vue.prototype.$message.error(error.errHint);
      payload.onFail();
    }
  },
  redirectAfterLogin: async (context) => {
    if (auth.isLogin()) {
      await store.dispatch('getInfosAfterLogin');
      await store.dispatch('getSetting', 'global-setting');
      const { modifyVars } = window.less || {};
      const { themeConfig } = store.state.setting;
      if(modifyVars && themeConfig && themeConfig.variable) {
        modifyVars(themeConfig.variable);
      }
      if (config.enableInitCacheData) {
        Vue.prototype.$message.info(`<span><Icon type="loading" />正在加载字典数据，这可能要几分钟时间，请稍候…</span>`);
        context.commit('SET_LOGIN_LOADING', true);
        try {
          await initCacheData();
        } catch (e) {
          console.warn(e)
        } finally {
          Vue.prototype.$message.success('本地缓存字典数据加载完成！');
          context.commit('SET_LOGIN_LOADING', false);
        }
      }
      router.push(url.getFromParam());
    }
  },
  loginByOAuthWithPSW: async (context, payload) => {
    try {
      // TODO 微服务接口代码
      const searchParamsObj = {};
      searchParamsObj.username = payload.values.username;
      searchParamsObj.password = payload.values.password;
      searchParamsObj.reqid = payload.values.reqid;
      searchParamsObj.captcha = payload.values.captcha;
      const result = await loginByOAuthWithPSW(searchParamsObj);
      if (result && result.map && result.map['Access-Token']) {
        sessionStorage.setItem('Access-Token', JSON.stringify(result.map['Access-Token']));
        await context.dispatch('loginBySSORedirect');
        if (auth.isLogin()) {
          Vue.prototype.$message.success(result.map.msg || '登录成功');
        }
      }
    } catch (error) {
      payload.onFail();
      if (error && error.appcode === '2') {
        context.commit('setForceUpdatePasswordStatus', true);
        Vue.prototype.$message.error('登录密码已过期，请修改密码');
        router.push('/user/update-expired-password');
      } else {
        Vue.prototype.$message.error(`用户名或密码错误，或用户被禁用，登录失败! ${error.msg}`);
        throw error;
      }
    }
  },
  loginByOAuthWithProxyPSW: async (context, payload) => {
    auth.removeAuthInfo();
    auth.removeUserInfo();
    try {
      const loginReqDto = { username: payload.username, password: payload.password };
      const result = await loginByOAuthWithProxyPSW(loginReqDto);
      if (result && result.access_token) {
        auth.setAuthInfo(result);
        if (result.userInfo && result.userInfo.loginUserDTO && result.userInfo.loginUserDTO.id) {
          auth.setUserInfo(result.userInfo);
          await context.dispatch('redirectAfterLogin');
        } else {
          Vue.prototype.$message.error('登录成功，获取用户id信息失败!');
        }
      } else {
        Vue.prototype.$message.error('用户名或密码错误，或用户被禁用，登录失败!');
      }
    } catch (error) {
      Vue.prototype.$message.error(`用户名或密码错误，或用户被禁用，登录失败! ${error.msg}`);
    }
  },
  loginByOAuthWithImplicit: async () => {
    auth.removeAuthInfo();
    auth.removeUserInfo();
    const { implicit } = config.loginAuth;
    // const searchParams = new URLSearchParams();
    // searchParams.append('response_type', config.loginAuth.implicit.response_type);
    // searchParams.append('client_id', config.loginAuth.implicit.client_id);
    // searchParams.append('redirect_uri', config.loginAuth.implicit.redirect_uri);
    // searchParams.append('scope', config.loginAuth.implicit.scope);
    // searchParams.append('state', config.loginAuth.implicit.state);
    let searchParamsStr = '';
    searchParamsStr = url.appendParams('response_type', implicit.response_type, searchParamsStr);
    searchParamsStr = url.appendParams('client_id', implicit.client_id, searchParamsStr);
    searchParamsStr = url.appendParams('redirect_uri', implicit.redirect_uri, searchParamsStr);
    searchParamsStr = url.appendParams('scope', implicit.scope, searchParamsStr);
    searchParamsStr = url.appendParams('state', implicit.state, searchParamsStr);
    await loginByOAuthWithImplicit(searchParamsStr);
  },
  loginRedirect: async (context) => {
    try {
      const href = window.location.hash;
      if (url.queryURL('access_token', href)) {
        const result = {};
        result.access_token = url.queryURL('access_token', href);
        result.jti = url.queryURL('jti', href);
        result.expires_in = url.queryURL('expires_in', href);
        result.state = url.queryURL('state', href);
        auth.setAuthInfo(result);
        
        // 使用mock，TODO 真正生产环境同时需要返回userInfo，或使用access_token去请求获取userInfo
        const userInfo = {
          loginUserDTO: {
            id: 'dd55bda7-df0d-4b77-99b2-7056717c6923',
          },
        };
        auth.setUserInfo(userInfo);
        await context.dispatch('redirectAfterLogin');
      } else {
        Vue.prototype.$message.error( '获取token失败，登录失败!');
        router.push(config.api.userLogin);
      }
    } catch (error) {
      Vue.prototype.$message.error(`${error.error_description} 登录失败!`);
      throw error;
    }
  },
  loginBySSORedirect: async (context, payload) => {
    // TODO 微服务接口代码
    const userInfo = await getUserInfoBySSO();
    // const userInfo = await getUserInfoBySSO();
    if (userInfo) {
      auth.setUserInfo(userInfo);
      await context.dispatch('redirectAfterLogin')
    } else {
      Vue.prototype.$message.error('获取用户信息失败!');
      router.push(config.api.userLogin);
    }
  },
  logout: async () => {
    // try {
    //   await logout();
    // } catch (e) {
      // FireFox使用CAS的单点登出时，会因为CAS服务器跨域被拦截出现异常的情况：response is null
      // 登出出现异常可以直接跳转到登录页，故仅捕获不进行处理
    // }
    // 调用logout成功后，才清空前端的auth认证相关信息。避免CSRF Token丢失造成调用logout失败
    auth.removeAuthInfo();
    auth.removeUserInfo();
    router.push(config.loginUrl);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}