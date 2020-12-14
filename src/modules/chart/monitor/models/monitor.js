import {
  getPieData,
  getTagData
} from "../services/monitor";

const state = {
  tags: [],
  sourceData1: [],
  sourceData2: [],
  sourceData3: [],
};

const mutations = {
  getTagDataEnd: (state, payload) => {
    state.tags = payload.list;
  },
  getPieDataEnd: (state, payload) => {
    state.sourceData1 = payload.sourceData;
    state.sourceData2 = payload.sourceData2;
    state.sourceData3 = payload.sourceData3;
  }
};

const actions = {
  getTagData: async (context, payload) => {
    const response = await getTagData();
    context.commit('getTagDataEnd', response);
  },
  getPieData: async (context, payload) => {
    const response = await getPieData();
    context.commit('getPieDataEnd', response);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}