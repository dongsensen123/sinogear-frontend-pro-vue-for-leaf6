import { config } from '../../../common/config';
import { io } from 'sinobest-functions';

/**
 * 查询全部数据
 * @param {Object} queryConditions 请求的查询条件
 * @param {number} pageSize 分页信息 pageSize
 * @param {number} current 分页信息 current
 * @return {Promise.<void>} 返回数据
 */
export async function handleQueryData({ queryConditions, pagination: { pageSize, page } }) {
  return io.post(
      `${config.mockContextPath}/api/students/query?pageSize=${pageSize}&page=${page}`,
      queryConditions || {}
  );
}

/**
 * 通过id查询具体数据
 * @param {string} id 数据id
 * @return {Promise.<void>} 返回数据
 */
export async function handleQueryDataById({ id }) {
  return io.get(`${config.mockContextPath}/api/students/${id}`);
}

/**
 * 添加数据
 * @param {Object} item 请求的参数
 * @return {Promise.<void>} 返回请求数据结果
 */
export async function handleAddData({ item }) {
  return io.post(`${config.mockContextPath}/api/students`, item);
}

/**
 * 编辑数据
 * @param {Object} item 请求的参数
 * @param {string} id 请求id
 * @return {Promise.<void>} 返回请求数据结果
 */
export async function handleEditData({ item, id }) {
  return io.put(`${config.mockContextPath}/api/students/${id}`, item);
}

/**
 * 删除数据
 * @param {string} id 请求id
 * @return {Promise.<void>} 返回请求数据结果
 */
export async function handleDeleteData({ id }) {
  return io.delete(`${config.mockContextPath}/api/students/${id}`);
}

// 获取个性化设置
export async function getStudentConfig(type) {
  return io.get(`${config.contextPath}/api/userConfig/find/${type}`);
}

// 保存个性化设置
export async function saveStudentConfig(data) {
  return io.post(`${config.contextPath}/api/userConfig/save`, data);
}