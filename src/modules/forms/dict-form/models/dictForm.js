import {getDictList} from '../services/dictForm';

const state = {
  dictOptions: []
};

const mutations = {
  getDictOptionsEnd: (state, payload) => {
    state.dictOptions = payload;
  }
};

const actions = {
  getDictOptions: async(context, payload) => {
    const response = await getDictList();
    context.commit('getDictOptionsEnd', response);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}