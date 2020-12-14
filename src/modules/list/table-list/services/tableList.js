import { io } from 'sinobest-functions';
import { stringify } from 'qs';

import { config } from '../../../../common/config';

export async function query(params) {
  return io.get(`${config.mockContextPath}/api/rule?${stringify(params)}`);
}

export async function remove(params) {
  return io.delete(`${config.mockContextPath}/api/rule?${stringify(params)}`);
}

export async function add(params) {
  return io.post(`${config.mockContextPath}/api/rule`, params);
}
