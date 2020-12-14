import { config } from "../../../../common/config";
import { io } from 'sinobest-functions';

/**
 * 查询全部数据
 */
export async function getData() {
  return io.get(`${config.mockContextPath}/api/analysis-chart`);
}
export async function getSourceData(type) {
  return io.post(`${config.mockContextPath}/api/analysis-chart/sourceData`, {type});
}