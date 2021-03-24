import {
  handleQueryData,
  handleAddData,
  handleEditData,
  handleDeleteData,
  getDictItems
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
  item: {}
};

const mutations = {
  CHANGE_NAME: (state, payload) => {
    state.TEST_NAME = payload;
  }
};

const actions = {
  getDictItems: async (context, payload) => {
    const data = await getDictItems(payload);
    return data
  },
  changeName({ commit }, payload) {
    commit('CHANGE_NAME', payload);
  },
  queryData: async (context, payload) => {
    const { queryParams, pagination } = payload;
    const actionPayload = { queryConditions: queryParams, pagination };
    return handleQueryData(actionPayload);
  },
  /**
   * 删除数据
   * @param { Object } payload 参数
   * @param { function } call dva提供调用函数方法
   * @param { function } put  dva提供调用effects方法
   * @return {null} 无返回
   */
  deleteData: async (context, payload) => {
    await handleDeleteData(payload);
  },
  /**
   * 新增数据
   * @return {null} 无返回
   */
  addData: async (context, payload) => {
    await handleAddData(payload);
  },
  
  /**
   * 修改数据
   * @return {null} 无返回
   */
  editData: async (context, payload) => {
    await handleEditData(payload);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}