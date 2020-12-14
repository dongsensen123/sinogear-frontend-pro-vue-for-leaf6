const request = require('request');

const interceptFunction = (req, res, next, callback) => {
  const { method, body: reqBody, url } = req;
  if (method === 'POST' && url === '/api/userConfig/save') {
    request(`http://${req.headers.host}/api/userConfig/find/${reqBody.type}`, (error, resp, data) => {
      let tempUrl = `http://${req.headers.host}/api/userConfig/find`;
      let type = 'POST';
      const saveData = reqBody;
      saveData.id = reqBody.type;
      const parseData = JSON.parse(data);
      if (typeof parseData === 'object') {
        tempUrl = `${tempUrl}/${reqBody.type}`;
        type = 'PUT';
        if (parseData && parseData.attribute) {
          saveData.attribute = { ...parseData.attribute, ...saveData.attribute };
        }
      }
      const options = {
        url: tempUrl,
        method: type,
        json: true,
        headers: {
          'content-type': 'application/json',
          flag: '1'
        },
        body: saveData
      };
      request(options, (err, response, body) => {
        callback(err, response, body);
      });
    });
    return true;
  } else if (method === 'GET' && /^\/api\/userConfig\/find\/[a-zA-Z-]+$/.test(url)) {
    const arr = url.split('/');
    request(`http://${req.headers.host}/api/userConfig/find?type=${arr[arr.length - 1]}`, (err, response, body) => {
      const data = JSON.parse(response.body);
      if (data && data.length) {
        response.body = JSON.stringify(data[0]);
      }
      callback(err, response, body);
    });
    return true;
  }
  return false;
};

module.exports = {
  interceptor: interceptFunction
};
