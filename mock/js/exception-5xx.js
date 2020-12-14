const Mock = require('mockjs');

const { mock, Random } = Mock;

const mockErrors = '/api/5xx';

const errorObj = {
  '500': 'Internal Server Error',
  '501': 'Not Implemented',
  '502': 'Bad Gateway',
  '503': 'Service Unavailable',
  '504': 'Gateway Timeout',
  '505': 'HTTP Version Not Supported',
  '506': 'Variant Also Negotiates',
  '507': 'Insufficient Storage',
  '508': 'Loop Detected',
  '510': 'Not Extended',
  '511': 'Network Authentication Required'
};

const setRandomServerError = (response) => {
  const { status } = mock({ 'status|1': [500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511] });
  response.status(status);
  // 随机模拟服务端是否捕获异常端情况
  const isCatchError = Math.random() > 1;
  let body;
  if (!isCatchError) {
    body = mock({
      timestamp: '2020-06-01T07:21:28.497+0000',
      status,
      error: errorObj[status],
      path: '/api/errorlogs',
      errId: '282bcd41-5ff1-415f-9b0e-68421074834d',
      errMsg:
        'Required request body is missing: public org.springframework.http.ResponseEntity<cn.sinobest.sinogear.log.frontenderrorlog.dto.response.ErrorLogResponseDTO> cn.sinobest.sinogear.log.frontenderrorlog.web.rest.ErrorLogResource.createErrorLog(cn.sinobest.sinogear.log.frontenderrorlog.dto.request.ErrorLogRequestDTO)',
      errHint: '系统出现异常，请联系管理员'
    });
  } else {
    body = mock({
      errId: Random.guid(),
      errHint: '@ctitle',
      errMsg: '@errHint',
      'errCode|1': ['SG_AUTH_401_00', 'SG_AUTH_401_01', 'SG_AUTH_401_02', 'SG_AUTH_401_03', 'SG_AUTH_401_04'],
      'fieldErrors|1-2': [
        {
          fieldName: '@word',
          fieldValue: '@word',
          message: '@word'
        }
      ]
    });
  }
  response.json(body);
};

module.exports = {
  [`GET ${mockErrors}`](req, res) {
    setRandomServerError(res);
  },

  [`POST ${mockErrors}`](req, res) {
    setRandomServerError(res);
  }
};
