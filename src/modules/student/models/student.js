import {
  handleQueryData,
  handleAddData,
  handleEditData,
  handleDeleteData,
  getStudentConfig,
  saveStudentConfig
} from "../services/student";
import Vue from 'vue';

const state = {
  TEST_NAME: '示例',
  data: [],
  pagination: {
    page: 1,
    total: 0,
    pageSize: 10
  },
  item: {},
  studentConfig: {}
};

const mutations = {
  queryDataEnd: (state, payload) => {
    for (const item in payload) {
      state[item] = payload[item];
    }
  },
  saveStudentConfigEnd: (state, payload) => {
    if (payload.queryParams) {
      state.studentConfig = payload.queryParams;
    }
    if (payload.pagination) {
      state.pagination = payload.pagination;
    }
  }
};

const actions = {
  queryData: async (context, payload) => {
    const { queryParams, pagination } = payload;
    const obj = {};
    Object.keys(queryParams).map((item) => {
      if (item !== 'operations') {
        obj[item] = queryParams[item];
      }
    });
    const actionPayload = { queryConditions: obj, pagination };
    const response = await handleQueryData(actionPayload);
    context.commit('queryDataEnd', response)
  },
  /**
   * 删除数据
   * @param { Object } payload 参数
   * @param { function } call dva提供调用函数方法
   * @param { function } put  dva提供调用effects方法
   * @return {null} 无返回
   */
  deleteData: async (context, payload) => {
    await handleDeleteData({ id: payload.id });
    const response = await handleQueryData(payload);
    context.commit('queryDataEnd', response)
  },
  /**
   * 新增数据
   * @return {null} 无返回
   */
  addData: async (context, payload) => {
    await handleAddData({ item: { ...payload.item } });
    const response = await handleQueryData(payload);
    context.commit('queryDataEnd', response);
    if (payload.callback) {
      payload.callback();
    }
  },
  
  /**
   * 修改数据
   * @return {null} 无返回
   */
  editData: async (context, payload) => {
    const { item } = payload;
    await handleEditData({ item, id: item.id });
    const response = await handleQueryData(payload);
    context.commit('queryDataEnd', response);
    if (payload.callback) {
      payload.callback();
    }
  },
  getStudentConfig: async (context, payload) => {
    try {
      const result = await getStudentConfig(payload);
      if (result && result.attribute) {
        context.commit('saveStudentConfigEnd', result.attribute)
      }
    } catch (e) {
      Vue.prototype.$message(e.errHint)
    }
  },
  saveStudentConfig: async (context, payload) => {
    const data = { type: 'example-student', attribute: payload };
    const result = await saveStudentConfig(data);
    context.commit('saveStudentConfigEnd', result.attribute)
  },
  updateQueryConditionsAndQueryData: async (context, payload) => {
    await context.dispatch('saveStudentConfig', payload);
    context.commit('saveStudentConfigEnd', payload);
    await context.dispatch('queryData', payload);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}