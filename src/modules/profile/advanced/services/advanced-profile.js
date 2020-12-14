import { config } from "../../../../common/config";
import { io } from 'sinobest-functions';

/**
 * 查询全部数据
 */
export async function getData() {
  return io.get(`${config.mockContextPath}/api/profile/advanced`);
}