import { url, store, handleNotificationError } from '../utils/func'
import { auth } from '../utils/auth'
import router from '../router/index'
import {
	queryNotices,
	getNavMenus,
	getElementPermissions,
	queryVersion,
	checkToken,
	getUserConfig,
	saveUserConfig,
  getAvatar
} from '../services/global'
import { config } from '../common/config'
import cloneDeep from 'lodash.clonedeep'
import Vue from 'vue'
import vStore from '../store/index';

const sysConfigKey = 'sys_config';

const actions = {
	getMenus: async (context) => {
    const userEntity = auth.getUserEntity();
    let menus = [];
    let elementPermissionList = [];
    if (userEntity) {
      const item = {};
      item.id = userEntity.id || '';
      menus = await getNavMenus(item);
      elementPermissionList = await getElementPermissions();
    }
    if (elementPermissionList.length) {
      sessionStorage.setItem('element-permission', JSON.stringify(elementPermissionList));
    }
    context.commit('getMenuEnd', menus || []);
	},
	getUserInfo: (context) => {
		// 用户的名字只有2种：登陆名称及用户名称
		// 登陆名称：
		//   1. currentUser.username
		// 用户名称:
		//   1. currentUser.name
		//   2. currentUser.loginUserDTO.userName
        // 注意，currentUserEntity == currentUser.loginUserDTO
		const currentUser = auth.getUserInfo();
		// let userAvatarUrl = userImg
		const currentUserEntity = auth.getUserEntity();
		if (currentUser && currentUserEntity) {
			const currentUserAvatarPath = currentUserEntity.userAvatarPath || '';
			const userId = currentUserEntity.id || '';
			const uploadUserAvatarUrl = `${config.contextPath}/api/users/${userId}/avatar`;
			// if (currentUserAvatarPath) {
			// 	userAvatarUrl = uploadUserAvatarUrl
			// }
      const userAvatarUrl = uploadUserAvatarUrl;

			// 获取当前用户的用户名称，而不是用户登录名称
			const getCurrentUserName = () => {
				if (
					currentUserEntity.userName !== null &&
					currentUserEntity.userName !== undefined
				) {
					return currentUserEntity.userName
				} else {
					return config.name
				}
			};

			currentUser.notifyCount = currentUser.notifyCount
				? ''
				: (currentUser.notifyCount = 0);
			currentUser.name = getCurrentUserName();
			// currentUser.avatar = currentUser.avatar
			// 	? ''
			// 	: (currentUser.avatar = userImg)
			currentUser.userAvatarUrl = userAvatarUrl;
			const global = context.state;
			currentUser.userAvatarKey = global.userAvatarKey;
			currentUser.uploadUserAvatarUrl = uploadUserAvatarUrl;
			context.commit('getUserInfoEnd', { currentUser })
		}
	},
  getAvatar: async (context) => {
    try {
      const res = await getAvatar(vStore.state.currentUser.userAvatarUrl);
      if (res) {
        const newBlob = await res.blob();
        const reader = new FileReader();
        reader.readAsDataURL(newBlob);
        reader.onloadend = function () {
          context.commit('getAvatarEnd', reader.result);
        };
      } else {
        context.commit('getAvatarEnd', '');
      }
    } catch (err) {
      handleNotificationError(err, '错误', err)
    }
  },
	changeUserAvatarKey: (context) => {
		const userAvatarKey = new Date().getTime();
		const userInfo = auth.getUserInfo();
		userInfo.loginUserDTO.userAvatarPath = 'new_path';
		auth.setUserInfo(userInfo);
		context.commit('changeUserAvatarKeyEnd', { userAvatarKey })
	},

	getVersion: async (context) => {
		if (auth.isLogin()) {
			const versionItem = await queryVersion();
			context.commit('getVersionEnd', { versionItem })
		}
	},

	loginByToken: async (context, payload) => {
		const result = await checkToken({ token: { payload } });
		auth.setUserInfo(result);
		await context.dispatch('getInfosAfterLogin');
		let isValidToken = true;
		if (result && result.username) isValidToken = true;
		context.commit('loginByTokenEnd', isValidToken)
	},
	getInfosAfterLogin: (context) => {
		try {
			if (auth.isLogin()) {
				context.dispatch('getMenus');
				context.dispatch('getUserInfo');
				context.dispatch('getVersion');
				context.dispatch('getAvatar')
			}
		} catch (error) {
			Vue.prototype.$message.error(error)
		}
	},
	initInfos: (context) => {
    context.commit('getMenuEnd', []);
    auth.removeAuthInfo();
    auth.removeUserInfo();
    context.commit('getAvatarEnd', '');
	},
	redirectAfterSessionChange: (context) => {
    setTimeout(() => {
      if (auth.isLogin()) {
        if (window.location.hash.match(/^#\/guide/) && url.queryURL('from')) {
          // 如果session中已经显示登录 && 当前地址/user/* && 当前地址包含 ?from=
          context.dispatch('getInfosAfterLogin');
          router.push(url.getFromParam());
        } else {
          context.dispatch('getInfosAfterLogin');
        }
      }
    }, 0)
	},
	changeCollapse: (context, payload) => {
		context.commit('getCollapse', payload)
	},
	changeDrawer: (context, payload) => {
		context.commit('getDrawer', payload)
	},
	getSetting: async (context, payload) => {
		try {
			const result = await getUserConfig(payload);
			if (result && result.attribute) {
				context.commit('changeSetting', result.attribute)
			}
		} catch (e) {
			console.error('e', e)
		}
	},
	changeSetting: async (context, payload) => {
    const data = { type: 'global-setting', attribute: payload };
    const result = await saveUserConfig(data);
    context.commit('changeSetting', result.attribute);
	},
	chooseTabs: (context, payload) => {
    const currentTab = payload;
    const { tabs } = context.state;
    context.commit('handleTabsChange', {currentTab, tabs});
	},
	closeTabs: (context, payload) => {
    let newTabs = cloneDeep(context.state.tabs);
    let newCurrentTab = context.state.currentTab;
    let newPath = '';
    if (payload === newCurrentTab && newTabs && newTabs.length) {
      newTabs.forEach((tab, index) => {
        if (tab.fullPath === payload) {
          let nextTab = newTabs[index + 1] || newTabs[index - 1];
          if (nextTab) {
            newCurrentTab = nextTab.fullPath;
            newPath = nextTab.fullPath || nextTab.path || nextTab.name;
          }
        }
      })
    }
    const tabs = newTabs.filter(tab => tab.fullPath !== payload) || [];
    context.commit('handleTabsChange', { currentTab: newCurrentTab, tabs });
    router.push(newPath)
	},
	addTabs: (context, payload) => {
    const extraData = ['Exception404', 'Exception401', 'Exception403'];
    const newTabs = cloneDeep(context.state.tabs);
    let isExist = false;
    if (newTabs && newTabs.length) {
      newTabs.forEach((item) => {
        if (item.fullPath === payload.fullPath) {
          isExist = true;
        }
      });
    }
    if (!isExist && extraData.indexOf(payload.name) < 0) {
      newTabs.push(payload);
    }
    const currentTab = payload.fullPath;
    context.commit('handleTabsChange', { currentTab, tabs: newTabs });
	},
	initTabs: (context, payload) => {
    context.commit('handleTabsChange', payload)
	},
	closeAllTabs: (context) => {
    const currentTab = '/home';
    const tabs = [{name: 'HomeContainer', title: '主页', fullPath: '/home', path: '/home'}];
    context.commit('handleTabsChange', { currentTab, tabs });
    router.push('/home')
	},
	closeOtherTabs: (context) => {
    const {tabs, currentTab} = context.state;
    const newTabs = [];
    if (tabs && tabs.length) {
      tabs.forEach((tab) => {
        if (tab.fullPath === currentTab) {
          if (tab.fullPath !== '/home') {
            newTabs.push({name: 'HomeContainer', title: '主页', fullPath: '/home', path: '/home'});
          }
          newTabs.push(tab);
        }
      })
    }
    context.commit('handleTabsChange', { currentTab, tabs: newTabs });
	}
};

export default actions
