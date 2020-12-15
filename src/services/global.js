import { io } from 'sinobest-functions';
import { config } from '../common/config';

export async function queryNotices() {
  return io.get(config.contextPath + config.api.notices);
}

export async function getNavMenus({ id }) {
  return io.get(`${config.contextPath}/api/users/${id}/navMenus`, id);
}

export async function queryVersion() {
  return io.get(`${config.contextPath}/api/version`, {});
}

export async function checkToken({ token }) {
  return io.get(`${config.contextPath}/api/checkToken?access_token=${token}`);
}

// 获取个性化设置
export async function getUserConfig(type) {
  return io.get(`${config.contextPath}/api/userConfig/find/${type}`);
}

// 保存个性化设置
export async function saveUserConfig(data) {
  return io.post(`${config.contextPath}/api/userConfig/save`, data);
}

export async function getAvatar(url) {
  return io.get(url)
}

// 获取用户元素权限列表
export async function getElementPermissions() {
  return io.post(`${config.contextPath}/api/permissions/queryElementPermissions`);
}