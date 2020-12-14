import { io } from 'sinobest-functions';
import { config } from '../../../../common/config';

const REGISTER_URL = `${config.contextPath}/api/users/register`;

/**
 * 用户注册
 * @param payload
 * @returns {Promise.<void>}
 */
export async function register(payload) {
  return io.post(`${REGISTER_URL}`, payload);
}

export async function checkLoginNameUnique(payload) {
  const { loginName } = payload;
  return io.get(`${REGISTER_URL}/loginName/unique?loginName=${loginName}`);
}