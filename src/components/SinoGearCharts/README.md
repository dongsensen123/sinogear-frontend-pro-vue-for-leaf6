# Charts --图表

## API

### 引入方式

**注**：引入路径需根据项目的相对路径进行更改。

```javascript
import { SinoGearChartCard } from '../components/SinoGearCharts';
 export default {
    components: {
      SinoGearChartCard
    }
 }
```

### SinoGearBar

基础柱状图 。用于展示数据的变化趋势。

| 参数  | 说明     | 类型          | 默认值 |
| ----- | -------- | ------------- | ------ |
| title | 图表标题 | string        | -      |
| data  | 图表数据 | array<{x, y}> | -      |

示例：

```vue
<template>
  <sino-gear-bar :data="barData" title="销售额排行" />
</template>

<script>
  import { SinoGearBar } from '../components/SinoGearCharts';

  const barData = [];
  for (let i = 0; i < 12; i += 1) {
    barData.push({
      x: `${i + 1}月`,
      y: Math.floor(Math.random() * 1000) + 200
    })
  }

  export default {
    name: "demo",
    components: {
      SinoGearBar
    },
    data() {
      return { barData }
    }  
  }
</script>
```

### SinoGearRankList

等级列表。用于展示排名次的列表。

| 参数  | 说明     | 类型               | 默认值 |
| ----- | -------- | ------------------ | ------ |
| title | 图表标题 | string             | -      |
| list  | 数据列表 | array<name, total> | -      |

示例：

```vue
<template>
  <sino-gear-rank-list title="门店销售排行榜" :list="rankList"/>
</template>

<script>
  import { SinoGearRankList } from '../components/SinoGearCharts';

  const rankList = [];
  for (let i = 0; i < 7; i++) {
    rankList.push({
      name: '白鹭岛 ' + (i + 1) + ' 号店',
      total: 1234.56 - i * 100
    })
  }

  export default {
    name: "demo",
    components: {
      SinoGearRankList
    },
    data() {
      return { rankList }
    }  
  }
</script>
```

### SinoGearChartCard

图表卡片。用于图表以卡片形式展示信息。

| 参数               | 说明       | 类型                           | 默认值 |
| ------------------ | --------  | ---------------------------- | --- |
| title              | 卡片标题   | string                     | -      |
| loading            | 加载状态   | boolean                    | false  |
| total              | 总数值     | slot\|function\|number\|string | -  |
| action             | 卡片操作   | slot                       | -      |
| footer             | 卡片底部   | slot                       | -      |
| 内容区是默认的slot | 卡片内容区 | slot                          | -      |

示例：

```vue
<template>
  <sino-gear-chart-card :loading=false title="总销售额" total="￥126,560">
    <a-tooltip title="指标说明" slot="action">
      <a-icon type="info-circle-o" />
    </a-tooltip>
    <div>
      <sino-gear-trend flag="up" style="margin-right: 16px;"
        term="周同比" :type=true percentage="12">
      </sino-gear-trend>
      <sino-gear-trend flag="down" term="日同比"
        :type=false percentage="11">
      </sino-gear-trend>
    </div>
    <template slot="footer">
      日均销售额
      <span>￥ 234.56</span>
    </template>
  </sino-gear-chart-card>
</template>

<script>
  import { SinoGearChartCard } from '../components/SinoGearCharts';
  import { Tooltip, Icon } from 'ant-design-vue';

  export default {
    name: "demo",
    components: {
      SinoGearChartCard,
       ATooltip: Tooltip,
      AIcon: Icon
    }
  }
</script>
```

### SinoGearTrend

趋势信息。通过文字和图标（涨、跌）简单展示图表信息。

| 参数       | 说明     | 类型             | 默认值 |
| ---------- | -------- | ---------------- | ------ |
| term       | 图表文本 | string           | -      |
| type       | 是否增长 | boolean          | false  |
| percentage | 百分比   | string \| number | -      |

示例：

```vue
<template>
  <div>
    <sino-gear-trend flag="up" style="margin-right: 16px;"
      term="周同比" :type=true percentage="12">
    </sino-gear-trend>
    <sino-gear-trend flag="down" term="日同比"
      :type=false percentage="11">
    </sino-gear-trend>
  </div>
</template>

<script>
  import { SinoGearTrend } from '../components/SinoGearCharts';
  export default {
    name: "demo",
    components: {
      SinoGearTrend
    }
  }
</script>
```

### SinoGearMiniBar &  SinoGearMiniArea

迷你柱状图和迷你面积图。用于展示一些子级信息。

| 参数 | 说明     | 类型          | 默认值 |
| ---- | -------- | ------------- | ------ |
| data | 图表数据 | array<{x, y}> | -      |

示例：

```vue
<template>
  <div>
    <sino-gear-mini-area :data="miniArea" />
  </div>
  <div>
    <sino-gear-mini-bar :data="miniData" />
  </div>
</template>

<script>
import { SinoGearMiniBar, SinoGearMiniArea } from '../components/SinoGearCharts';

const miniData = [];
const miniArea= [];
const beginDay = new Date().getTime();

for (let i = 0; i < 10; i++) {
  miniData.push({
    x: moment(new Date(beginDay
         + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: Math.round(Math.random() * 10)
  });
  miniArea.push({
    x: moment(new Date(beginDay
         + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: Math.round(Math.random() * 10)
  })
}
export default {
  name: "demo",
  components: {
    SinoGearMiniBar,
    SinoGearMiniArea
  },
  data() {
    return {
      miniData,
      miniArea
      }
    }
  }
</script>
```

### SinoGearMiniProgress

进度条。用于展示某任务的完成情况。

| 参数       | 说明       | 类型   | 默认值    |
| ---------- | ---------- | ------ | --------- |
| percentage | 完成进度   | number | 0         |
| target     | 目标值     | number | 0         |
| height     | 图表高度   | string | '10px'    |
| color      | 进度条颜色 | string | '#13C2C2' |

示例：

```vue
<template>
  <div>
    <sino-gear-mini-progress color="rgb(19, 194, 194)"
      :target="80" :percentage="78" height="8px"
    />
  </div>
</template>

<script>
  import { SinoGearMiniProgress } from '../components/SinoGearCharts';
  export default {
    name: "demo",
    components: {
      SinoGearMiniProgress
    }
  }
</script>
```

### SinoGearMiniSmoothArea

面积图。用于展示数据变化的趋势。

| 参数       | 说明             | 类型          | 默认值 |
| ---------- | ---------------- | ------------- | ------ |
| dataSource | 图表数据         | array<{x, y}> | -      |
| scale      | 图表scale属性值  | array         | -      |
| style      | 图表外层容器样式 | CSSProperties | -      |

示例：

```vue
<template>
  <div>
    <sino-gear-mini-smooth-area
      :style="{ height: '45px' }"
      :dataSource="searchUserData"
      :scale="searchUserScale"
    />
  </div>
</template>

<script>
  import { SinoGearMiniSmoothArea } from '../components/SinoGearCharts';
  
  const searchUserScale = [
    {
      dataKey: 'x',
      alias: '时间'
    },
    {
      dataKey: 'y',
      alias: '用户数',
      min: 0,
      max: 10
    }
  ];
  const searchUserData = [];
  for (let i = 0; i < 7; i++) {
    searchUserData.push({
      x: moment().add(i, 'days').format('YYYY-MM-DD'),
      y: Math.ceil(Math.random() * 10)
    });
  }
  
  export default {
    name: "demo",
    components: {
      SinoGearMiniSmoothArea
    },
    data() {
      return {
        searchUserScale,
        searchUserData
      }
    }
  }
</script>
```

### SinoGearNumberInfo

数值信息展示。用于展示一些数值文本信息。

| 参数      | 说明     | 类型                       | 默认值 |
| --------- | -------- | -------------------------- | ------ |
| total     | 总数     | number \| string           | -      |
| sub-total | 子总数   | number                     | -      |
| sub-title | 子标题   | string \| function \| slot | -      |
| status    | 增加状态 | string，值可为'up \| down' | -      |

示例：

```vue
<template>
  <sino-gear-number-info
    total="12,321" :sub-total="17.1" status="up"
  >
    <span slot="subtitle">
      <span>搜索用户数</span>
      <a-tooltip title="指标说明" slot="action">
        <a-icon type="info-circle-o" :style="{ marginLeft: '8px' }" />
      </a-tooltip>
    </span>
  </sino-gear-number-info>
</template>

<script>
  import { SinoGearNumberInfo } from '../components/SinoGearCharts';
  import { Tooltip, Icon } from 'ant-design-vue';

  export default {
    name: "demo",
    components: {
      SinoGearNumberInfo,
      ATooltip: Tooltip,
      AIcon: Icon
    }
  }
</script>
```

### SinoGearTagCloud

词云。用于文本数据的处理和分析，比如展示搜索关键词。

| 参数    | 说明     | 类型               | 默认值 |
| ------- | -------- | -------------    | ------ |
| tagList | 数据列表 | array<{x, value}> | -      |
| height  | 图表高度 | number            | 160    |

示例：

```vue
<template>
  <a-card title="热门搜索" :bordered="false">
    <sino-gear-tag-cloud :tagList="tagList" />
  </a-card>
</template>

<script>
  import { SinoGearTagCloud } from '../components/SinoGearCharts';
  import { Card } from 'ant-design-vue';
  
  const tagList = [];
  for(let i = 0; i < 60; i += 1) {
    tagList.push({
      x: i + 1,
      value: Math.floor(Math.random() * 100 + 1)
    });
  }
  
  export default {
    name: "demo",
    components: {
      SinoGearTagCloud,
      ACard: Card
    },
    data() {
      return {
        tagList
      }
    }
  }
</script>
```

### SinoGearWaterWave

水波图。直观展示进度的示意图，例如资源剩余量。

| 参数    | 说明     | 类型   | 默认值 |
| ------- | -------- | ------ | ------ |
| title   | 标题     | string | -      |
| percent | 百分比   | number | 0      |
| height  | 图表高度 | number | 160    |

示例：

```vue
<template>
  <a-card title="资源剩余" :bordered="false">
    <sino-gear-water-wave :title="'补贴资金剩余'"
      :height="161"  :percent="34"
    />
  </a-card>
</template>

<script>
  import { SinoGearWaterWave } from '../components/SinoGearCharts';
  import { Card } from 'ant-design-vue';
  
  export default {
    name: "demo",
    components: {
      SinoGearWaterWave,
      ACard: Card
    }
  }
</script>
```

### SinoGearPie

圆环图。用于展示目标元素在整体部分所占比例。

| 参数      | 说明           | 类型                 | 默认值 |
| --------- | -------------- | -------------------- | ------ |
| title     | 标题           | string               | -      |
| testData | 图表数据(第一个索引下标为目标元素且长度为2的数组)      | array<{item, count}> | -      |

示例：

```vue
<template>
  <sino-gear-pie :testData="sourceData" :title="'中式餐厅'" />
</template>

<script>
  import { SinoGearPie } from '../components/SinoGearCharts';
  
  const sourceData = [
    { item: '中式餐厅', count: 20 },
    { item: '其他', count: 100 }
  ];
  
  export default {
    name: "demo",
    components: {
      SinoGearPie
    },
    data() {
      return {
        sourceData
      }
    }
  }
</script>
```
