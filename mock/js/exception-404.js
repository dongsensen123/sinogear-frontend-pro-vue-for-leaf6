const fetchUrl = '/api/404';

module.exports = {
  [`GET ${fetchUrl}`](req, res) {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      errHint: '未找到对应的资源，请检查请求及参数是否正确。',
      errMsg: '未找到对应的资源，请检查请求及参数是否正确。',
      path: '/base/category/list/2121212'
    });
  },
  [`POST ${fetchUrl}`](req, res) {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      errHint: '未找到对应的资源，请检查请求及参数是否正确。',
      errMsg: '未找到对应的资源，请检查请求及参数是否正确。',
      path: '/base/category/list/2121212'
    });
  }
};
