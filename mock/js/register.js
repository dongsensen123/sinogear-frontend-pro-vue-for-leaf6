/*
  mockjs语法参考官网http://mockjs.com/
 */
const Mock = require('mockjs');
const { users } = require('../json/account/setting/account.json');

const userRegisterBaseURL = '/api/users/register';
const { getCaptcha, removeCaptcha } = require('./captcha');

const loginNameUniqueURL = `${userRegisterBaseURL}/loginName/unique`;
const emailAuthURL = `${userRegisterBaseURL}/email/auth/token`;

module.exports = {
  [`GET ${loginNameUniqueURL}`](req, res) {
    const { loginName } = req.query;
    if (loginName && loginName === users[0].loginName) {
      return res.status(200).send(false);
    } else {
      return res.status(200).send(true);
    }
  },
  [`GET ${emailAuthURL}`](req, res) {
    return res.status(200).json(users[0].loginName);
  },
  [`POST ${userRegisterBaseURL}`](req, res) {
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
    removeCaptcha(key);
    return res.status(200).send(true);
  }
};
