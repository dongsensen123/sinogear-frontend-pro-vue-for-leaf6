const fetchUrl = '/api/profile/basic';

const basicGoods = [
  {
    id: '1234561',
    key: 1,
    name: '矿泉水 550ml',
    barcode: '12421432143214321',
    price: '2.00',
    num: '1',
    amount: '2.00'
  },
  {
    id: '1234562',
    key: 2,
    name: '凉茶 300ml',
    barcode: '12421432143214322',
    price: '3.00',
    num: '2',
    amount: '6.00'
  },
  {
    id: '1234563',
    key: 3,
    name: '好吃的薯片',
    barcode: '12421432143214323',
    price: '7.00',
    num: '4',
    amount: '28.00'
  },
  {
    id: '1234564',
    key: 4,
    name: '特别好吃的蛋卷',
    barcode: '12421432143214324',
    price: '8.50',
    num: '3',
    amount: '25.50'
  }
];

const basicProgress = [
  {
    key: '1',
    time: '2017-10-01 14:10',
    rate: '联系客户',
    status: 'processing',
    operator: '取货员 ID1234',
    cost: '5mins'
  },
  {
    key: '2',
    time: '2017-10-01 14:05',
    rate: '取货员出发',
    status: 'success',
    operator: '取货员 ID1234',
    cost: '1h'
  },
  {
    key: '3',
    time: '2017-10-01 13:05',
    rate: '取货员接单',
    status: 'success',
    operator: '取货员 ID1234',
    cost: '5mins'
  },
  {
    key: '4',
    time: '2017-10-01 13:00',
    rate: '申请审批通过',
    status: 'success',
    operator: '系统',
    cost: '1h'
  },
  {
    key: '5',
    time: '2017-10-01 12:00',
    rate: '发起退货申请',
    status: 'success',
    operator: '用户',
    cost: '5mins'
  }
];

const userMes = {
  idCard: '3321944288191034921',
  username: '付晓晓',
  memberCard: '32943898021309809423',
  phone: '18112345678',
  address: '浙江省杭州市西湖区黄姑山路工专路交叉路口',
  deliveryName: '菜鸟仓储',
  takeItAddress: '浙江省杭州市西湖区万塘路18号',
  remark: '无'
};

const refundMes = {
  pickUpNum: '1000000000',
  status: '已取货',
  salesNum: '1234123421',
  subOrderNum: '3214321432'
};

module.exports = {
  [`GET ${fetchUrl}`](req, res) {
    res.json({ basicGoods, basicProgress, userMes, refundMes });
  },
  [`POST ${fetchUrl}`](req, res) {
    res.json({ basicGoods, basicProgress });
  }
};