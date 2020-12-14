import { config } from "../../../../common/config";
import { io } from 'sinobest-functions';
import { stringify } from 'qs';
/**
 * 获取数据
 */
export async function getData(params) {
  return io.get(`${config.mockContextPath}/api/list?${stringify(params)}`);
}