import { sendResetPasswordMail } from '../services/forgot-password';
import Vue from 'vue';

const state = {
  isResult: false
};
const mutations = {
  sendMailSuccess: (state, payload) => {
    state.isResult = payload;
  }
};
const getters = {};
const actions = {
  sendResetPasswordMail: async (context, payload) => {
    
    try{
      await sendResetPasswordMail(payload);
      context.commit('sendMailSuccess', true);
    } catch (e) {
      Vue.prototype.$message.error(e.errMsg);
    }
  },
  init: (context) => {
    context.commit('sendMailSuccess', false);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}