import { query, remove, add } from '../services/tableList';

const state = {
  data: {
    list: [],
    pagination: {}
  }
};

const mutations = {
  save: (state, payload) => {
    state.data = payload;
  }
};

const actions = {
  fetch: async (context, payload) => {
    const response = await query(payload);
    context.commit('save', response)
  },
  add: async (context, payload) => {
    const response = await add(payload);
    context.commit('save', response)
  },
  remove: async (context, payload) => {
    const response = await remove(payload);
    context.commit('save', response)
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}