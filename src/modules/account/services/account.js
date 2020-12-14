import { io } from 'sinobest-functions';
import { config } from '../../../common/config';

/**
 * 请求个人中心数据URL
 * @type {string}
 */
const RESOURCE_URL = `${config.contextPath}/api/users`;

/**
 * 初始化个人中心数据信息
 * @param {Object} id 用户id
 * @returns {Promise.<void>} 个人中心数据信息
 */
export async function initPersonal(id) {
  return io.get(`${RESOURCE_URL}/${id}`);
}

export async function modifyData(data, id) {
  return io.request(`${RESOURCE_URL}/${id}`, data, 'PUT');
}

export async function updatePassword(data, id) {
  return io.request(`${RESOURCE_URL}/${id}/updatePassword`, data, 'PUT');
}

/**
 * 获取用户登录状态
 * @param {Object} id 用户id
 * @returns {Promise.<void>} 用户登录状态数据
 */
export async function getUserStatus(id) {
  return io.get(`${config.contextPath}/api/userStatus/${id}`, id);
}