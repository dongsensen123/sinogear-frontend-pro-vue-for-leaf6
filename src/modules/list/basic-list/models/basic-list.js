import {getData} from "../services/basic-list";

const state = {
 list: []
};

const mutations = {
  queryDataEnd: (state, payload) => {
    state.list = payload;
  },
  appendFetchEnd: (state, payload) => {
    state.list = [...state.list, ...payload];
  }
};

const actions = {
  queryData: async (context, payload) => {
    const response = await getData(payload);
    context.commit('queryDataEnd', Array.isArray(response) ? response : [])
  },
  appendFetch: async (context, payload) => {
    const response = await getData(payload);
    context.commit('appendFetchEnd', Array.isArray(response) ? response : [])
  },

};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}