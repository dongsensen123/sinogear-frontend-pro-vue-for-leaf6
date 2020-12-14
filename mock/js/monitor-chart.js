const fetchUrl = '/api/monitor/pieData';

const sourceData = [
  { item: '中式餐厅', count: 20 },
  { item: '其他', count: 100 }
];

const sourceData2 = [
  { item: '西餐', count: 50 },
  { item: '其他', count: 100 }
];

const sourceData3 = [
  { item: '火锅', count: 40 },
  { item: '其他', count: 100 }
];

module.exports = {
  [`GET ${fetchUrl}`](req, res) {
    res.json({ sourceData, sourceData2, sourceData3 });
  }
};