import { query403, query401, query404, query500, query422 } from '../services/exception';
import Vue from 'vue';

const mutations = {
  trigger: (state, payload) => {
    Vue.prototype.$message.error(payload);
  }
};

const actions = {
  queryException: async (context, payload) => {
    let response;
    try {
      switch (payload) {
        case '403':
          response = await query403();
          break;
        case '401':
          response = await query401();
          break;
        case '404':
          response = await query404();
          break;
        case '422':
          response = await query422();
          break;
        case '500':
          response = await query500();
          break;
        default:
          return;
      }
    } catch (e) {
      console.log('e', e);
      Vue.prototype.$message.error(e.errHint);
    }
  }
};

export default {
  namespaced: true,
  mutations,
  actions
}