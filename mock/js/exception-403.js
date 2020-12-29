const fetchUrl = '/api/403';

module.exports = {
  [`GET ${fetchUrl}`](req, res) {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      errHint: '用户未得到授权访问该资源，请重新登录后再尝试，或联系管理员获取授权。',
      errMsg: 'Forbidden',
      path: '/base/category/list'
    });
  },
  [`POST ${fetchUrl}`](req, res) {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      errHint: '用户未得到授权访问该资源，请重新登录后再尝试，或联系管理员获取授权。',
      errMsg: 'Forbidden',
      path: '/base/category/list'
    });
  }
};
