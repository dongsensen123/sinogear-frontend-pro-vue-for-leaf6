import { checkLoginNameUnique, register } from '../services/register';
import Vue from 'vue';

const state = {
  registerStatus: false,
  loginName: ''
};
const getters = {};
const mutations = {
  registerEnd: (state, payload) => {
    state.registerStatus = true;
    state.loginName = payload;
  }
};
const actions = {
  register: async (context, payload) => {
    try{
      const result = await register(payload.data);
      if (result) {
        Vue.prototype.$message.success('注册成功')
      } else {
        payload.onFail();
      }
    } catch (e) {
      Vue.prototype.$message.error(e.errMsg);
      payload.onFail();
      return;
    }
    context.commit('registerEnd', payload.loginName)
  },
  checkLoginName: async (context, payload) => {
    const result = await checkLoginNameUnique(payload.data);
    if (result && result.errHint) {
      Vue.prototype.$message.error(result.errHint)
    } else {
      payload.checkLoginNameCallback(result);
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}