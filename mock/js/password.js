/*
  mockjs语法参考官网http://mockjs.com/
 */
const Mock = require('mockjs');
const { users } = require('../json/account/setting/account.json');
const { getCaptcha, removeCaptcha } = require('./captcha');

const sendMail = `/api/users/password/sendResetPasswordMail`;
const verifyToken = `/api/users/password/verifyToken/token`;
const resetPassword = `/api/users/password/resetPassword/token`;

const { mock } = Mock;

const viewUser = mock({
  integrityCheck: true,
  id: '756a41f6-4111-46de-b75f-2958351040a3',
  userName: 'guest',
  loginName: 'guest',
  email: '123456789@qq.com',
  valid: true,
  isEmailAuth: true
});

const userData = mock({
  integrityCheck: true,
  id: '756a41f6-4111-46de-b75f-2958351040a3',
  userName: 'guest',
  loginName: 'guest',
  email: '123456789@qq.com',
  valid: true
});

module.exports = {
  [`POST ${sendMail}`](req, res) {
    const { cookie } = req.headers;
    const key = cookie.split('=')[1];
    if (req.body.captcha && !(getCaptcha(key) && getCaptcha(key).captcha)) {
      res.status(422).send({
        errCode: 'SG_CAPTCHA_422',
        errMsg: 'Captcha incorrect.',
        errHint: '验证码已失效，请重新点击验证码刷新后输入。'
      });
      return;
    }
    if (req.body.captcha && req.body.captcha !== getCaptcha(key).captcha.text) {
      res
        .status(422)
        .send({ errCode: 'SG_CAPTCHA_422', errMsg: 'Captcha incorrect.', errHint: '验证码不正确，请重新输入。' });
      return;
    }
    if (req.body.loginName === users[0].loginName && req.body.email === users[0].email) {
      removeCaptcha(key);
      return res.status(200).send();
    } else {
      res.status(422).send({
        errId: 'd73e4888-3056-4de3-8801-cc2d012bd343',
        errMsg: '信息错误，请再检查一遍并重新输入',
        errHint: '信息错误，请再检查一遍并重新输入'
      });
    }
  },
  [`GET ${verifyToken}`](req, res) {
    res.json(viewUser);
  },
  [`PUT ${resetPassword}`](req, res) {
    if (req.body.loginPassword === users[0].originalPassword) {
      res.status(422).send({
        errId: '"c32a72fe-e305-44b6-8f49-ca8200ae21fb',
        errMsg: '修改的密码不允许和上次密码一致',
        errHint: '修改的密码不允许和上次密码一致'
      });
    } else {
      res.json(userData);
    }
  }
};
