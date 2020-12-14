const request = require('request');

// 映射路由
const mapRouter = {
  '/api/cache/init/cache': '/api/cache/init',
};

const interceptFunction = (req, res, next, cb) => {
  const { url, query } = req;
  if (!url.match(/\/api\/cache/)) {
    return false;
  } else {
    if (url === '/api/cache/init') {
      const now = Date.now();
      while (true) {
        if (Date.now() - now >= 5 * 1000) {
          break;
        }
      }
      return false;
    }
    request(`http://${req.headers.host}/api/cache/init`, (err, response, body) => {
      const { type, key } = query;
      const resBody = JSON.parse(response.body);
      let target = { ...resBody };
      const isKey = [type, key].every((_key) => target[_key] && (target = target[_key]));
      if (isKey) {
        target = { [type]: { [key]: target } };
      } else if (resBody[type]) {
        target = { [type]: target };
      }
      response.body = JSON.stringify(target);
      cb(err, response, body);
    });
    return true;
  }
};

module.exports = {
  mapRouter,
  interceptor: interceptFunction,
};
