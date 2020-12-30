const sggc = window.SinoGearGlobalConfig;
const loginURL = (sggc && sggc.loginURL) || '/user/login';
const guideURL = '/guide';
const error401URL = '/exception/401';
const error403URL = '/exception/403';
const { location } = window;
const { protocol, hostname, port } = location;
const applicationKey = `${protocol}-${hostname}-${port}`.replace(':', '');
import defaultTheme from '../themes/default/index';
import extraMenus from './extraMenu.json';

const defaultConfig = {
  collapsed: false, // 配置菜单是否收缩
  name: '赛姬',
  username: '村民', // 当登录成功，sessionStorage中user_info不存在，或user_info.username不存在时默认显示名字
  messageDuration: 2.5,
  massageMaxCount: 1,
  notificationDuration: 5,
  extraMenus,
  // 全局设置
  globalSetting: {
    layout: 'sider-layout', // 布局
    showBreadcrumb: false,
    // 是否开启多标签页
    enableMultiTags: false,
    themeConfig: defaultTheme // 主题配置
  },
  // 是否在左上角展示版本内容
  showVersionMark: false,
  versionMark: process.env.RUN_ENV,
  // contextPath不要修改，默认dev代理模式下为空字符串''
  contextPath: process.env.contextPath || '',
  // mock后端上下文地址，默认dev代理模式下为'http://localhost:3004'
  mockContextPath: process.env.mockContextPath || 'http://localhost:3004',
  // 是否打开微应用接入功能
  enableMicroApp: true,
  // 是否开启登录(账号密码)加密
  enableLoginEncrypt: false,
  // 是否开启菜单访问权限控制
  enableMenuAccessControl: false,
  // 是否开启验证码功能
  enableCaptcha: true,
  // 是否开启账号注册功能
  enableRegister: true,
  // 是否开启重置密码功能
  enableResetPassword: true,
  // 是否开启互斥菜单模式
  enableExclusiveMenu: true,
  // 是否在登录时初始缓存数据
  enableInitCacheData: false,
  // 是否开启账户分级管理功能
  enableAccountHierarchicallyAuthorizeManagement: true,
  // 是否启用按页面权限进行递归分配
  enableAssignByPagePermissionRecursively: true,
  // 是否开启用户个性化设置
  enableUserConfig: false,
  whitePages: [loginURL, error401URL, error403URL, guideURL],
  error401Url: error401URL,
  error403Url: error403URL,
  loginUrl: loginURL,
  guideUrl: guideURL,
  menusControl: [
    '/account/setting',
    '/account/setting/base',
    '/account/setting/notification',
    '/account/setting/update-password',
    '/account/setting/user-status',
    '/trigger/exception'
  ],
  store_keys: {
    store_user_key: 'user_info'
  },
  // 全局请求配置
  requestConfig: {
    reqEvalJSON: true,
    isNotice: false,
    debug: false,
    // notificationFn: (error) => {console.info('调试输出notification:', error);},
    401: { redirect: true, path: loginURL, throw: true },
    403: { redirect: false, path: error403URL },
    404: { redirect: false, path: '/exception/404' },
    500: { redirect: false, path: '/exception/500' },
    504: { redirect: true, path: '/exception/401' },
    headers: () => ({'Access-Token' : JSON.parse(sessionStorage.getItem('Access-Token'))})
  },
  microApp: {
    managementEntry: '//localhost:9000/micro-app/management/'
  },
  // 左侧菜单前缀匹配名单，不在名单中的默认按完全匹配
  menuPrefixMatch: ['/management/area'],
  cacheConfig: {
    negotiateCacheKey: `${applicationKey}-SinoGear-negotiate-cache`, // 存储本地缓存key值
    localCacheKey: `${applicationKey}-SinoGear-local-cache` // 存储协商缓存key值
    // duration: 86400000,  // 本地缓存有效时间（毫秒），默认1天
    // customGlobalFun: {} // 本地缓存数据全局自定义查询方法
  },
  loginAuth: {
    psw: {
      client_id: '1',
      client_secret: 'guest',
      grant_type: 'password'
    },
    implicit: {
      client_id: 'SA-APPID-20171221170309',
      client_secret: 'ba6bf8dbdcee46bebf96091be6226c14',
      scope: 'read',
      response_type: 'token',
      redirect_uri: 'http://localhost:8000/#/user/blank/login_redirect?1=1',
      state: '200'
    }
  },
  loginSSO: {
    redirect_uri: '/user/blank/login_sso_redirect', // 使用时需要配置完整contextPath地址
    // TODO 微服务接口代码
    getUserInfo: '/api/security/users/current/loginResponse'
    // getUserInfo: '/api/security/users/current/loginResponse'
  },
  microService: {
    commonUrl: '/leaf6-uni-cloud-uc-service'
  },
  api: {
    userLogin: '/api/login',
    userLogout: '/api/logout',
    captchaUrl: '/captcha/render',
    notices: '/api/notices',
    getMenus: '/api/getMenus',
    forms: '/api/dictForms',
    // TODO 微服务接口代码
    loginByOAuthWithPSW: '/api/auth/password/login',
    // loginByOAuthWithPSW: 'http://192.168.14.74:10080/oauth/authorize',
    loginByOAuthWithProxyPSW: 'http://192.168.14.74:18080/api/auth/login',
    loginByOAuthWithImplicit: 'http://192.168.14.100:10080/SinoAuth/oauth/authorize'
  },
  // eslint-disable-next-line max-len
  rsa_pub: `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCoqf3Q94i0meSdz/JxRIPkQL6ZF99wE+BRmTjd78zV6ZAoxEQcgpTaymbMadfp7mE1a/T5ozEsMGKbW2mLFiq4yF1lxYo6mUkZoop3isXIJRoHALxhZdTAsFYK4Zh2d76pKG4jwP2XxITcaHMI3v6Wm8KTQyeFm0+li+qblvaCdwIDAQAB`
};

const config = { ...defaultConfig, ...sggc };

export { config };
