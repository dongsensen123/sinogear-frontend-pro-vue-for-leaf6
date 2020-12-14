import {
  initPersonal,
  modifyData,
  updatePassword,
  getUserStatus } from '../services/account';
import { auth } from '../../../utils/auth';
import store from '../../../store/index';
import { config } from '../../../common/config';
import Vue from 'vue';

const { store_user_key: STORE_USER_KEY } = config.store_keys;

const state = {
  personal: {},
  userStatus: {}
};

const mutations = {
  initPersonalEnd: (state, payload) => {
    state.personal = payload.personal;
  },
  getUserStatusEnd: (state, payload) => {
    state.userSatus = payload;
  }
};

const actions = {
  initPersonal: async ({ commit }) => {
    try {
      if (auth.getUserEntity().id) {
        const personal = await initPersonal(auth.getUserEntity().id);
        commit('initPersonalEnd', { personal });
      }
    } catch (err) {
      console.info(err);
    }
  },
  saveOrUpdate: async (context, payload) => {
    try {
      if (auth.getUserEntity().id) {
        const { personal } = payload;
        const { belongsOrgName } = state.personal;
        const newPersonal = Object.assign({}, state.personal, personal);
        await modifyData(newPersonal, auth.getUserEntity().id);
        const user = JSON.parse(sessionStorage.getItem(STORE_USER_KEY));
        if (user) {
          user.loginUserDTO.userName = personal.userName;
          sessionStorage.setItem(STORE_USER_KEY, JSON.stringify(user));
          await store.dispatch('getUserInfo');
        }
        personal.belongsOrgName = belongsOrgName;
        Vue.prototype.$message.success('个人信息修改成功!');
        context.commit('initPersonalEnd', { personal });
      }
    } catch (err) {
      console.info(err);
    }
  },
  updatePassword: async (context, payload) => {
    try {
      if (auth.getUserEntity().id) {
        const data = Object.assign({}, state.personal, payload);
        await updatePassword(data, auth.getUserEntity().id);
        Vue.prototype.$message.success('修改密码成功,请重新登录!');
        await store.dispatch('login/logout');
      }
    } catch (err) {
      console.info(err)
    }
  },
  /**
   * 新增数据
   * @return {null} 无返回
   */
  getUserStatus: async (context) => {
    try {
      if (auth.getUserEntity().id) {
        const userStatus = await getUserStatus(auth.getUserEntity().id);
        if (userStatus.online) {
          userStatus.online = '在线';
        } else {
          userStatus.online = '离线';
        }
        context.commit('getUserStatusEnd', userStatus);
      }
      
    } catch (err) {
      console.info(err);
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}