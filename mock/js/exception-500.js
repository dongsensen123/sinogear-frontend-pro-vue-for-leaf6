const fetchUrl = '/api/500';

module.exports = {
  [`GET ${fetchUrl}`](req, res) {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      errHint: '服务器发生错误，请稍后再尝试，或联系管理员。',
      errMsg: 'Internal Server Error',
      path: '/base/category/list'
    });
  },
  [`POST ${fetchUrl}`](req, res) {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      errHint: '服务器发生错误，请稍后再尝试，或联系管理员。',
      errMsg: 'Internal Server Error',
      path: '/base/category/list'
    });
  }
};
