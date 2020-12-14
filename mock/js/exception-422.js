const fetchUrl = '/api/422';

module.exports = {
  [`GET ${fetchUrl}`](req, res) {
    res.status(422).send({
      errId: 'b96a7a39-ad23-436e-a442-10e4e81fa9c5',
      errMsg: '记录查询操作签名校验错误',
      errHint: '记录查询操作签名校验错误',
      fieldErrors: [
        {
          fieldName: 'className',
          fieldValue: 'cn.sinobest.sinogear.account.domain.User'
        },
        { fieldName: 'id', fieldValue: 'fd55bda7-df0d-d4b7-799b-7056717c6922' },
        {
          fieldName: 'signature',
          fieldValue: 'null'
        }
      ]
    });
  },
  [`POST ${fetchUrl}`](req, res) {
    res.status(422).send({
      errId: 'b96a7a39-ad23-436e-a442-10e4e81fa9c5',
      errMsg: '记录查询操作签名校验错误',
      errHint: '记录查询操作签名校验错误',
      fieldErrors: [
        {
          fieldName: 'className',
          fieldValue: 'cn.sinobest.sinogear.account.domain.User'
        },
        { fieldName: 'id', fieldValue: 'fd55bda7-df0d-d4b7-799b-7056717c6922' },
        {
          fieldName: 'signature',
          fieldValue: 'null'
        }
      ]
    });
  }
};
