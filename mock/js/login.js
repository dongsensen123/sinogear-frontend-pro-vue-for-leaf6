/*
  mockjs语法参考官网http://mockjs.com/
 */
const Mock = require('mockjs');
const { users } = require('../json/account/setting/account.json');
const { removeCaptcha, getCaptcha } = require('./captcha');

const userLogin = '/api/login';
const userLogout = '/api/logout';
const checkToken = '/api/checkToken';

const getUserInfoBySSO = '/api/security/users/current/loginResponse';

const { mock } = Mock;

const loginData = mock({
  username: 'guest',
  enabled: true,
  accountNonExpired: true,
  credentialsNonExpired: true,
  accountNonLocked: true,
  loginUserDTO: {
    id: 'dd55bda7-df0d-4b77-99b2-7056717c6923',
    userAvatarPath: '/e39a5b790c354de1b7950e2bd42ec731.jpg',
    csrfToken: 'aabbcc22cc4ac5',
    userName: '游客'
  },
  authorities: [
    { url: ['/home'], typeCode: '1' },
    { url: ['/component/button'], typeCode: '1' },
    { url: ['/component/table'], typeCode: '1' },
    { url: ['/chart/analysis'], typeCode: '1' },
    { url: ['/chart/monitor'], typeCode: '1' }
  ]
});
module.exports = {
  [`POST ${userLogin}`](req, res) {
    const { cookie } = req.headers;
    let key = '';
    if (cookie) {
      key = cookie.split('=')[1];
    }
    if (req.body.captcha && !(getCaptcha(key) && getCaptcha(key).captcha)) {
      res.status(401).send({
        errCode: 'SG_AUTH_401_05',
        errMsg: 'Captcha incorrect.',
        errHint: '验证码已失效，请重新点击验证码刷新后输入。'
      });
      return;
    }
    if (req.body.captcha && req.body.captcha !== getCaptcha(key).captcha.text) {
      res
        .status(401)
        .send({ errCode: 'SG_AUTH_401_05', errMsg: 'Captcha incorrect.', errHint: '验证码不正确，请重新输入。' });
      return;
    }
    if (req.body.sg_username === users[0].loginName && req.body.sg_password === users[0].newPassword) {
      removeCaptcha(key);
      res.json(loginData);
    } else if (req.body.sg_username === 'test_error' && req.body.sg_password === 'test_error') {
      res.status(401).json({
        errId: '-1',
        errCode: 'SG_AUTH_401_02',
        errMsg: ''
      });
    } else {
      res.status(401).send({
        errId: 'd73e4888-3056-4de3-8801-cc2d012bd343',
        errCode: 'SG_AUTH_401_06',
        errMsg: 'Authentication failed.',
        errHint: '帐号或密码错误，再输入错误 4 次，您的账号将被锁定无法登录。'
      });
    }
  },
  [`POST ${userLogout}`](req, res) {
    res.json({});
  },
  [`GET ${userLogin}`](req, res) {
    res.json(loginData);
  },
  [`GET ${checkToken}`](req, res) {
    res.json(loginData);
  },
  [`GET ${getUserInfoBySSO}`](req, res) {
    res.json(loginData);
  }
};
