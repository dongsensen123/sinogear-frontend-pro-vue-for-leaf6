const moment = require("moment");
const fetchUrl = '/api/analysis-chart';
const fetchUrl2 = '/api/analysis-chart/sourceData';

const barData = [];
const barData2 = [];
for (let i = 0; i < 12; i += 1) {
  barData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200
  });
  barData2.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200
  })
}

const rankList = [];
for (let i = 0; i < 7; i++) {
  rankList.push({
    name: '白鹭岛 ' + (i + 1) + ' 号店',
    total: 1234.56 - i * 100
  })
}

const searchUserData = [];
for (let i = 0; i < 7; i++) {
  searchUserData.push({
    x: moment().add(i, 'days').format('YYYY-MM-DD'),
    y: Math.ceil(Math.random() * 10)
  })
}

const searchData = [];
for (let i = 0; i < 50; i += 1) {
  searchData.push({
    index: i + 1,
    keyword: `搜索关键词-${i}`,
    count: Math.floor(Math.random() * 1000),
    range: Math.floor(Math.random() * 100),
    status: Math.floor((Math.random() * 10) % 2)
  })
}

const sourceData = [
  { item: '家用电器', count: 32.2 },
  { item: '食用酒水', count: 21 },
  { item: '个护健康', count: 17 },
  { item: '服饰箱包', count: 13 },
  { item: '母婴产品', count: 9 },
  { item: '其他', count: 7.8 }
];

const sourceData2 = [
  { item: '家用电器', count: 57 },
  { item: '食用酒水', count: 242 },
  { item: '个护健康', count: 17 },
  { item: '服饰箱包', count: 12 },
  { item: '母婴产品', count: 9 },
  { item: '其他', count: 7.8 }
];

const sourceData3 = [
  { item: '家用电器', count: 32.2 },
  { item: '食用酒水', count: 21 },
  { item: '个护健康', count: 123 },
  { item: '服饰箱包', count: 13 },
  { item: '母婴产品', count: 9 },
  { item: '其他', count: 7.8 }
];

const miniData = [];
const miniArea= [];
const beginDay = new Date().getTime();

for (let i = 0; i < 10; i++) {
  miniData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: Math.round(Math.random() * 10)
  });
  miniArea.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: Math.round(Math.random() * 10)
  })
}

module.exports = {
  [`GET ${fetchUrl}`](req, res) {
    res.json({ barData, barData2, rankList, searchUserData, searchData, sourceData, sourceData2, sourceData3,miniData, miniArea });
  },
  [`POST ${fetchUrl2}`](req, res) {
    const {body: {type}} = req;
    let resData = null;
    switch (type) {
      case 'all':
        resData = sourceData;
        break;
      case 'online':
        resData = sourceData2;
        break;
      default:
        resData = sourceData3;
    }
    res.json({ sourceData: resData });
  }
};