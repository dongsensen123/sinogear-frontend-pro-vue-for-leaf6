import {getData} from "../services/basic-profile";

const state = {
  TEST_NAME: '示例',
  basicProgress: [],
  basicGoods: [],
  userMes: null,
  refundMes: null
};

const mutations = {
  queryDataEnd: (state, payload) => {
    Object.keys(payload).map((key) => {
      state[key] = payload[key]
    });
    // state.basicGoods = payload.basicGoods;
    // state.basicProgress = payload.basicProgress;
  }
};

const actions = {
  queryData: async (context, payload) => {
    const response = await getData(payload);
    context.commit('queryDataEnd', response)
  }

};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}