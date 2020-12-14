const fetchUrl = '/api/dictForms';
const asyncUrl = '/api/dictForms/getByAsync';

const options = [
  {
    code: '选项1',
    detail: '黄金糕'
  },
  {
    code: '选项2',
    detail: '双皮奶'
  },
  {
    code: '选项3',
    detail: '蚵仔煎'
  },
  {
    code: '选项4',
    detail: '龙须面'
  },
  {
    code: '选项5',
    detail: '北京烤鸭'
  },
  {
    code: '选项2-1',
    detail: '黄金糕'
  },
  {
    code: '选项2-2',
    detail: '双皮奶'
  },
  {
    code: '选项2-3',
    detail: '蚵仔煎'
  },
  {
    code: '选项2-4',
    detail: '龙须面'
  },
  {
    code: '选项2-5',
    detail: '北京烤鸭'
  },
  {
    code: '选项3-1',
    detail: '黄金糕'
  },
  {
    code: '选项3-2',
    detail: '双皮奶'
  },
  {
    code: '选项3-3',
    detail: '蚵仔煎'
  },
  {
    code: '选项3-4',
    detail: '龙须面'
  },
  {
    code: '选项3-5',
    detail: '北京烤鸭'
  },
];

const placeList2 = [
  { code: '1', detail: '1*湖北省' },
  { code: '2', detail: '2*广东省' },
  { code: '1-2', detail: '1-2*宜昌市' },
  { code: '1-3', detail: '1-3*襄阳市' },
  { code: '1-1-1', detail: '1-1-1*汉口' },
  { code: '2-1', detail: '2-1*广州市' },
  { code: '1-1-2', detail: '1-1-2*武昌' },
  { code: '1-1-3', detail: '1-1-3*汉阳' },
  { code: '2-3', detail: '2-3*肇庆市' },
  { code: '2-1-1', detail: '2-1-1*天河区' },
  { code: '1-1', detail: '1-1*武汉市', rownum_: 11 },
  { code: '2-2', detail: '2-2*佛山市', rownum_: 12 },
  { code: '2-1-2', detail: '2-1-2*白云区', rownum_: 13 },
  { code: '2-1-3', detail: '2-1-3*黄浦区', rownum_: 14 }
];

module.exports = {
  [`GET ${fetchUrl}`](req, res) {
    res.json(placeList2);
  },
  [`GET ${asyncUrl}`](req, res) {
    res.json({data: options});
  }
};