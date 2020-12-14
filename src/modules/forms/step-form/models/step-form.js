import {getData} from "../services/step-form";

const state = {
  transferMes: {
    account: 'ant-design@alipay.com',
    receivedAccount: 'test@example.com',
    name: 'Alex',
    money: 5000
  },
};

const mutations = {
  saveDataEnd: (state, payload) => {
    state.transferMes = payload;
  }
};

const actions = {
  saveData: async (context, payload) => {
    context.commit('saveDataEnd', payload)
  }

};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}