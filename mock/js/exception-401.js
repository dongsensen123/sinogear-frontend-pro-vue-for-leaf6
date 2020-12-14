const fetchUrl = '/api/401';

module.exports = {
  [`GET ${fetchUrl}`](req, res) {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      errHint: '用户未通过认证，请先进行登陆认证。',
      errMsg: 'Unauthorized',
      path: '/base/category/list'
    });
  },
  [`POST ${fetchUrl}`](req, res) {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      errHint: '用户未通过认证，请先进行登陆认证。',
      errMsg: 'Unauthorized',
      path: '/base/category/list'
    });
  }
};
