const request = require('request');
const { v4: uuidV4 } = require('uuid');

// 映射路由
const mapRouter = {
  '/api/account/setting/users': '/api/users/my/info'
};

// 用户id
const userId = 'dd55bda7-df0d-4b77-99b2-7056717c6923';

/**
 * 将查询到用户信息中的密码过滤掉再返回（出于安全考虑）
 * @param {string} error 错误信息
 * @param {object} response 响应体
 * @returns {*} 返回的信息
 */
const filterPassword = (error, response) => {
  if (!error && response && response.statusCode === 200) {
    const { body } = response;
    let data = body;
    if (typeof body === 'string') {
      data = JSON.parse(body);
    }
    delete data.originalPassword;
    delete data.newPassword;
    delete data.confirmPassword;
    response.body = JSON.stringify(data);
  }
  return response;
};

const interceptFunction = (req, res, next, callback) => {
  const { method, body: reqBody, url } = req;
  if (method === 'GET' && url === '/api/users/my/info') {
    request(`http://${req.headers.host}/api/users/my/info/${userId}`, (err, response, body) => {
      callback(err, filterPassword(err, response), body);
    });
    return true;
  } else if (method === 'PUT' && (url === '/api/users/my/info' || url === '/api/users/my/updatePassword')) {
    const infoUrl = `http://${req.headers.host}/api/users/my/info/${userId}`;
    const returnBody = url === '/api/users/my/info';
    request(infoUrl, (err, response) => {
      const { statusCode } = response || {};
      if (!err && statusCode === 200) {
        const { body } = response;
        const data = JSON.parse(body);
        const options = {
          url: infoUrl,
          method: 'PUT',
          json: true,
          headers: {
            'content-type': 'application/json',
            flag: '1'
          },
          body: { ...data, ...reqBody }
        };
        request(options, (error, resp, resBody) => {
          let responseResult = resp;
          if (returnBody) {
            responseResult = filterPassword(error, resp);
          } else if (!returnBody && resBody.originalPassword !== data.originalPassword) {
            responseResult.statusCode = 422;
            responseResult.body = JSON.stringify({
              errId: uuidV4(),
              errMsg: '用户密码错误',
              errHint: '用户密码错误'
            });
          } else {
            responseResult.body = JSON.stringify({});
          }
          callback(error, responseResult, resBody);
        });
      }
    });
    return true;
  } else if (method === 'GET' && url.includes('/api/userStatus')) {
    request(`http://${req.headers.host}/api/account/setting/userStatus`, (error, response) => {
      callback(error, response);
    });
    return true;
  }
  return false;
};

module.exports = {
  mapRouter,
  interceptor: interceptFunction
};
