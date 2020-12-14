import { io } from 'sinobest-functions';
import Constants from '../common/Constants';

/**
 * 资源分页查询
 * @param {String} url 资源查询的url地址
 * @param {Object}
 *           pagination: 分页对象
 *          queryConditions: 查询条件
 * @returns {Promise.<*|AxiosPromise>} 分页查询结果
 */
async function query(url, { pagination, queryConditions }) {
  return io.post(`${url}?pageSize=${pagination.pageSize}&page=${pagination.page}`, queryConditions);
}

/**
 * 保存或修改资源
 * @param {String} url 资源的URL地址
 * @param {Object}
 *           editType: 编辑类型
 *           item: 保存或修改的资源
 * @returns {Promise} 保存后的对象
 */
async function saveOrUpdate(url, { editType, item }) {
  let apiUrl = url;
  let method = Constants.POST_METHOD;

  if (editType === Constants.UPDATE_TYPE) {
    method = Constants.PUT_METHOD;
    apiUrl = `${url}/${item.id}`;
  } else if (editType === Constants.PATCH_UPDATE_TYPE) {
    method = Constants.PATCH_METHOD;
    apiUrl = `${url}/${item.id}`;
  }
  return io.request(apiUrl, item, method);
}

export default {
  query,
  saveOrUpdate
};
