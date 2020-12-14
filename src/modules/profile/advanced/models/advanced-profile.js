import {getData} from "../services/advanced-profile";

const state = {
  advancedOperation1: [],
  advancedOperation2: [],
  advancedOperation3: [],
  userMes: null
};

const mutations = {
  queryDataEnd: (state, payload) => {
    Object.keys(payload).map((key) => {
      state[key] = payload[key]
    });
    // state.advancedOperation1 = payload.advancedOperation1;
    // state.advancedOperation2 = payload.advancedOperation2;
    // state.advancedOperation3 = payload.advancedOperation3;
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