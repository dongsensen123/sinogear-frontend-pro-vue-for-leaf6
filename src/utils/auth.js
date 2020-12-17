import { store } from './func';
import { config } from '../common/config';
import { broadcastPostStorage, SessionChangeTimeKey } from './storageEventHandler';

const { store_user_key: STORE_USER_KEY } = config.store_keys;
const STORE_AUTH_KEY = 'auth_info';
const STORE_CSRF_TOKEN = 'X-CSRF-TOKEN';

/**
 * 权限类型
 * @type {{PAGE: string, PAGE_ELEMENT: string, API: string}}
 */
const PERMISSION_TYPE = {
  /**
   * 页面权限
   */
  PAGE: '1',

  /**
   * 页面内元素权限
   */
  PAGE_ELEMENT: '2',

  /**
   * API接口权限
   */
  API: '3',
};

const auth = {
  isLogin() {
    const userInfo = this.getUserInfo();
    const authInfo = this.getAuthInfo();
    return !!(userInfo || authInfo);
  },

  /**
   * 获取当前登录的用户,
   * 如果要获取用户实体的信息,如用户ID等,请调用getUserEntity方法,外部不要依赖此方法返回的深层结构信息
   * @return {Object|null} 登录用户相关信息
   */
  getUserInfo() {
    return store.getItem(STORE_USER_KEY, true) || store.getItem(STORE_USER_KEY);
  },

  /**
   * 获取用户基本的实体信息，如id,用户名称
   * @return {Object|null} 登录用户实体信息
   */
  getUserEntity() {
    const user = this.getUserInfo(true) || this.getUserInfo();
    if (user !== null && user.loginUserDTO !== undefined) {
      return user.loginUserDTO;
    }
    return null;
  },

  /**
   * 获取当前用户的权限信息,此函数为私有函数,外部请勿调用
   * @return {Array} 权限对象 [{ text: 权限内容 , typeCode: 权限类型编码 }]
   */
  getUserAuthority() {
    const user = this.getUserInfo();
    if (user === null) {
      return [];
    }

    return user.authorities || [];
  },

  setUserInfo(data, useLocalStorage) {
    store.setItem(STORE_USER_KEY, data, useLocalStorage);
    store.setItem(SessionChangeTimeKey, Date.now());
    broadcastPostStorage();
  },

  setCsrfToken(token) {
    store.setItem(STORE_CSRF_TOKEN, token);
  },

  removeUserInfo() {
    store.removeItem(STORE_USER_KEY, !!store.getItem(STORE_USER_KEY, true));
    store.removeItem('Access-Token');
    store.setItem(SessionChangeTimeKey, Date.now());
    broadcastPostStorage();
  },

  getAuthInfo() {
    return store.getItem(STORE_USER_KEY, true) || store.getItem(STORE_AUTH_KEY);
  },

  setAuthInfo(data) {
    store.setItem(STORE_AUTH_KEY, data);
  },

  removeAuthInfo() {
    store.removeItem(STORE_AUTH_KEY);
  },

  /**
   * 是否有菜单的访问权限,此函数为私有函数,外部请勿调用
   * @param {String} menuPathName 菜单的访问地址
   * @param {String} search 访问地址参数
   * @return {Boolean} true:表示有 false:表示无
   */
  hasMenuAccessPermission({ menuPathName, search }) {
    if (!config.enableMenuAccessControl) {
      return true;
    }

    const fullPathName = menuPathName + search;

    if (fullPathName === null || fullPathName === '') {
      return false;
    }

    const authorities = this.getUserAuthority();
    // 通过权限内容匹配pathname
    return authorities.some((authority) => {
      const { typeCode, url } = authority;
      if (typeCode === PERMISSION_TYPE.PAGE && url !== null && url !== undefined) {
        // url可以是字符串或者数组字符串
        if (typeof url === 'string') {
          const match = window.history.matchPath(fullPathName, url);
          if (match && match.isExact) {
            return true;
          }
        } else if (url.some) {
          return url.some((aUrl) => {
            const match = window.history.matchPath(fullPathName, aUrl);
            return match && match.isExact;
          });
        }
      }
      return false;
    });
  },

  checkAuth({ currentLocation, onFailure }) {
    const pathname = currentLocation.path;
    const search = '';
    // pathname === / 是处理项目根目录访问
    if (this.isLogin()) {
      if (pathname !== '/') {
        if (config.whitePages && config.whitePages.indexOf(pathname) > -1) {
          return;
        }

        if (!this.hasMenuAccessPermission({ menuPathName: pathname, search })) {
          onFailure({ redirectUrl: config.error403Url });
        }
      }
    } else {
      let redirectUrl = config.guideUrl;
      if (!(pathname === '/' || pathname.startsWith(config.guideUrl) || pathname.startsWith(config.error401Url))) {
        redirectUrl = `${config.guideUrl}?from=${encodeURIComponent(pathname + search)}`;
      }
      onFailure({ redirectUrl });
    }
  },
};

export { auth };
