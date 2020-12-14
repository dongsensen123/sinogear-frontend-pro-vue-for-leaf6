<template>
  <div :class="prefixCls">
    <div class="chart-wrapper" :style="{ height: 46 }">
      <v-chart :force-fit="true" :height="100" :data="dataSource" :scale="scale" :padding="[36, 0, 18, 0]">
        <v-tooltip />
        <v-smooth-line position="x*y" :size="2" />
        <v-smooth-area position="x*y" />
      </v-chart>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SinoGearMiniSmoothArea',
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-smooth-area'
    },
    scale: {
      type: [Object, Array],
      required: true
    },
    dataSource: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      height: 100
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../../../../node_modules/ant-design-vue/lib/style/index";

  // The prefix to use on all css classes from ant-pro.
  @ant-pro-prefix             : ant-pro;
  @ant-global-sider-zindex    : 106;
  @ant-global-header-zindex   : 105;

  @smoothArea-prefix-cls: ~"@{ant-pro-prefix}-smooth-area";

  .@{smoothArea-prefix-cls} {
    position: relative;
    width: 100%;
  
    .chart-wrapper {
      position: absolute;
      bottom: -28px;
      width: 100%;
    }
  }
</style>
