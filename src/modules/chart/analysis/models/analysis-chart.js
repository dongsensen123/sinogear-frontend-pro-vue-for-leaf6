import {getData, getSourceData} from "../services/analysis";

const state = {
  barData: [],
  barData2: [],
  rankList: [],
  searchUserData: [],
  searchData: [],
  sourceData: [],
  miniData: [],
  miniArea: []
};

const mutations = {
  getDataEnd: (state, payload) => {
    Object.keys(payload).map((key) => {
      state[key] = payload[key];
    });
  }
};

const actions = {
  queryData: async (context, payload) => {
    const response = await getData();
    context.commit('getDataEnd', response);
  },
  querySourceData: async (context, payload) => {
    const response = await getSourceData(payload);
    context.commit('getDataEnd', response);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}