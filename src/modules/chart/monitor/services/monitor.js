import { config } from "../../../../common/config";
import { io } from 'sinobest-functions';

/**
 * 查询全部数据
 */
export async function getPieData() {
  return io.get(`${config.mockContextPath}/api/monitor/pieData`);
}

export async function getTagData() {
  return io.get(`${config.mockContextPath}/api/tags`);
}