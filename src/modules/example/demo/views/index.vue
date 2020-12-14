<template>
  <div class="demo_home">
    <a-row :gutter="24" class="demo_home_row">
      <ExampleColItem @click="handleItemClick" name="editor">
        <a-icon type="file-word" class="demo_home_icon" style="color: #389e0d" />
        <AIcon />
        <p>富文本编辑器</p>
        <span>对信息和文章进行编辑</span>
      </ExampleColItem>
      <ExampleColItem @click="handleItemClick" name="cache">
        <a-icon type="reconciliation" class="demo_home_icon" style="color: #909084" />
        <p>数据缓存</p>
        <span>懒加载、协商缓存示例</span>
      </ExampleColItem>
    </a-row>
  </div>
</template>

<script>
  import { Row, Icon } from 'ant-design-vue';
  import ExampleColItem from './Item.vue'
  import router from '../../../../router/index';

  export default {
    name: "DemoHome",
    components: {
      ARow: Row,
      ExampleColItem,
      AIcon: Icon,
    },
    methods: {
      handleItemClick(itemType) {
        if (itemType.includes('blankLayout')) {
          window.open(`/#/${itemType}`);
          return;
        }
        router.push(`/example/other-demo/${itemType}`)
      }
    }
  }
</script>

<style lang="less">
  .demo_home {
    min-height: 500px;
    height: 60%;
    margin: 0 16px;
    .demo_home_row {
      margin: 0 15px 15px;
      .demo_home_card {
        width: 100%;
        text-align: center;
        cursor: pointer;
        .demo_home_icon {
          font-size: 40px;
          color: #fa7a7a;
          margin-bottom: 10px;
        }
      }
    }
    .demo_home_col {
      margin-bottom: 24px;
    }
  }

</style>