// 映射路由
const mapRouter = {
  '/api/student/students': '/api/students'
};

const getUrl = (req) => {
  const { body } = req;
  const { filters, sorter, ...restBody } = body;
  let params = '';
  Object.keys(restBody).map((item) => {
    if (body[item]) {
      params = `${params}${item}_like=${body[item]}&`;
    }
    return null;
  });

  let queryUrl = req.url.split('query')[0];
  queryUrl = queryUrl.substr(0, queryUrl.length - 1);
  return `http://${req.headers.host}${queryUrl}?${encodeURI(params)}`;
};

const request = require('request');

const getSummary = (dataSource) => {
  let sumAge = 0;
  let sumCost = 0;
  dataSource.reduce((sum, item) => {
    const { cost, age } = item;
    sumAge += +age;
    sumCost += +cost;
    return 0;
  }, 0);
  const avgAge = (sumAge / (dataSource.length || 1)).toFixed(1);
  return [
    {
      cardNum: '',
      classNum: '',
      sex: '',
      age: `平均年龄 ${avgAge}`,
      hobby: '',
      cost: '',
      summary_key: 'avg_age'
    },
    { cardNum: `${sumCost.toLocaleString()}元`, summary_key: 'sum_cost' }
  ];
};

const interceptFunction = (req, res, next, cb) => {
  const { method, body: reqBody, url, query } = req;
  const { filters, sorter } = reqBody;
  if (method === 'POST' && url.match(/^\/api\/students\/query\?/)) {
    const redirectUrl = getUrl(req);
    request(redirectUrl, (err, response, body) => {
      let { pageSize, page } = query;
      pageSize = +pageSize;
      page = +page;
      const resBody = filterResult(JSON.parse(response.body), { filters, sorter });
      const start = (page - 1) * pageSize;
      const end = page * pageSize;
      const data = resBody.slice(start, end);
      const summaryData = getSummary(resBody);
      const target = { data, summaryData, pagination: { page, pageSize, total: resBody.length } };
      response.body = JSON.stringify(target);
      cb(err, response, body);
    });
    return true;
  }
  return false;
};

const filterResult = (resBody, reqBody) => {
  const { filters, sorter } = reqBody;
  let result = [...resBody];
  const { sex: _filter } = filters || {};
  if (_filter && _filter.length) {
    result = result.filter(({ sex }) => _filter.includes(sex));
  }

  const { field, order } = sorter || {};
  if (field && order) {
    result = result.sort((a, b) => {
      const aVal = `${a[field]}`;
      const bVal = `${b[field]}`;
      return /asc/.test(order) ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    });
  }

  return result;
};

module.exports = {
  mapRouter,
  interceptor: interceptFunction
};
