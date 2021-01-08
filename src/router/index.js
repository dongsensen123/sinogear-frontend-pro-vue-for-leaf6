import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes.js';
import { auth } from '../utils/auth'
import { config } from '../common/config';
import store from '../store/index';

Vue.use(Router);

const router =  new Router({
  mode: 'hash',
  routes: routes
});

const getRoutes = (routerData, path = '', newRouterData = []) => {
  if (routerData && routerData.length) {
    for (let i = 0; i < routerData.length; i += 1) {
      let newPath;
      if (path && path[path.length - 1] !== '/') {
        newPath = `${path}/${routerData[i].path}`;
      }  else {
        newPath = `${path}${routerData[i].path}`;
      }
      newRouterData.push(newPath);
      if (routerData[i].children && routerData[i].children.length) {
        getRoutes(routerData[i].children, newPath, newRouterData);
      }
    }
    return newRouterData;
  }
};

router.beforeEach(async (to, from, next) => {
  const routerData = getRoutes(router.options.routes);
  if (store.state.login.forceUpdatePassword && to.path !== '/user/update-expired-password') {
    next('/user/update-expired-password');
  } else {
    if (routerData.indexOf (to.path) === -1
      && to.path.indexOf('/management') < 0) { // TODO 写死的路径
      next('/exception/404');
    } else {
      if (to.path.indexOf('user') > -1 || to.path === config.guideUrl) {
        next();
      } else {
        const params = from.query;
        let tokenVerification = false;
        if (JSON.stringify(params) !== '{}') {
          for (const key in params) {
            if (key.indexOf('access_token') > -1) {
              await store.dispatch('loginByToken', params[key]);
              tokenVerification = true;
            }
          }
        }
        let authCheckRedirectUrl = null;
        auth.checkAuth({
          currentLocation: to,
          onFailure: ({ redirectUrl }) => {
            authCheckRedirectUrl = redirectUrl;
          }
        });
        // 第三方http登录页
        if (authCheckRedirectUrl !== null && authCheckRedirectUrl.startsWith('http')) {
          window.location.href = authCheckRedirectUrl;
          return null;
        }
        if ((tokenVerification && !store.state.validTokenSuccess) || authCheckRedirectUrl === null){
          next();
        } else {
          next(authCheckRedirectUrl)
        }
      }
    }
  }
});

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

export default router;