const fetchUrl = '/api/profile/advanced';

const advancedOperation1 = [
  {
    key: 'op1',
    type: '订购关系生效',
    name: '曲丽丽',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-'
  },
  {
    key: 'op2',
    type: '财务复审',
    name: '付小小',
    status: 'reject',
    updatedAt: '2017-10-03  19:23:12',
    memo: '不通过原因'
  },
  {
    key: 'op3',
    type: '部门初审',
    name: '周毛毛',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-'
  },
  {
    key: 'op4',
    type: '提交订单',
    name: '林东东',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '很棒'
  },
  {
    key: 'op5',
    type: '创建订单',
    name: '汗牙牙',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-'
  }
];

const advancedOperation2 = [
  {
    key: 'op1',
    type: '订购关系生效',
    name: '曲丽丽',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-'
  }
];

const advancedOperation3 = [
  {
    key: 'op1',
    type: '创建订单',
    name: '汗牙牙',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-'
  }
];

const userMes = {
  idCard: '3321944288191034921',
  username: '付晓晓',
  memberCard: '32943898021309809423',
  phone: '18112345678',
  address: '浙江省杭州市西湖区黄姑山路工专路交叉路口'
};

module.exports = {
  [`GET ${fetchUrl}`](req, res) {
    res.json({ advancedOperation1, advancedOperation2, advancedOperation3, userMes });
  },
  [`POST ${fetchUrl}`](req, res) {
    res.json({ advancedOperation1, advancedOperation2, advancedOperation3 });
  }
};
