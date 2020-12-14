import { io } from 'sinobest-functions';
import { config } from '../../../../common/config';
const { api, contextPath, loginSSO, microService } = config;
const { userLogin } = api;

export async function login(data) {
  const options = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    config: {
      reqEvalJSON: false,
      isNotice: false,
      401: { redirect: false, throw: true }
    }
  };
  const { enableCaptcha } = config;
  let loginData;
  if (enableCaptcha) {
    loginData = `sg_username=${encodeURIComponent(data.username)}&sg_password=${encodeURIComponent(
        data.password
    )}&captcha=${encodeURIComponent(data.captcha)}&remember-me=${encodeURIComponent(data['remember-me'])}`;
  } else {
    loginData = `sg_username=${encodeURIComponent(data.username)}&sg_password=${encodeURIComponent(data.password)}&remember-me=${encodeURIComponent(data['remember-me'])}`;
  }
  return io.post(contextPath + userLogin, loginData, options);
}

export async function loginByOAuthWithPSW(data) {
  // const options = {
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded'
  //   }
  // };
  const { psw } = config.loginAuth;
  const headers = {
    'Authorization': 'Basic ' + window.btoa(`${psw.client_id}:${psw.client_secret}`)
  };
  const ioConfig = {
    401: { redirect: false, throw: true }
  };
  const options = { headers, config:ioConfig };
  // let searchParamsStr = '';
  let searchParamsObj = {};
  // if (data && data.constructor === URLSearchParams) {
  //   searchParamsStr = data.toString();
  // } else {
  //   console.error(`不支持的参数对象类型 - ${data.constructor}`); // eslint-disable-line
  // }
  if (data) {
    searchParamsObj = data;
  }

  const userLoginByOAuth = api.loginByOAuthWithPSW;
  // const url = searchParamsStr === '' ? `${userLoginByOAuth}` : `${userLoginByOAuth}?${searchParamsStr}`;
  // console.info('loginByOAuthWithPSW requestURL: ', url); // eslint-disable-line
  // return io.post(url, {}, options);
  return io.post(contextPath + userLoginByOAuth, searchParamsObj, options);
}

export async function loginByOAuthWithProxyPSW(data) {
  const addRememberMe = Object.assign(data, { rememberMe: false });
  const url = api.loginByOAuthWithProxyPSW;
  return io.post(url, addRememberMe, {});
}

export async function loginByOAuthWithImplicit(data) {
  let searchParamsStr = '';
  // if (data && data.constructor === URLSearchParams) {
  //   searchParamsStr = data.toString();
  // } else {
  //   console.error(`不支持的参数对象类型 - ${data.constructor}`); // eslint-disable-line
  // }
  if (data) {
    searchParamsStr = data;
  }
  const userLoginByOAuth = api.loginByOAuthWithImplicit;
  const url = searchParamsStr === '' ? `${userLoginByOAuth}` : `${userLoginByOAuth}?${searchParamsStr}`;
  console.info('loginByOAuthWithImplicit href: ', url); // eslint-disable-line
  window.location.href = url;
}

export async function logout() {
  return io.post(contextPath + api.userLogout, {});
}

export async function getUserInfoBySSO() {
  return io.get(`${contextPath}${loginSSO.getUserInfo}`);
}

// 获取本地字段缓存数据
export async function initCacheData() {
  return io.initCacheData(`${contextPath}/api/cache/init`);
}