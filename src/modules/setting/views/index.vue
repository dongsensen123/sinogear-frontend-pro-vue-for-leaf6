<template>
  <div class="global-drawer-setting">
    <div class="content-title">
      <h3>主题色</h3>
      <colorPicker
        @change="(e) => colorChange(e, 'self')" v-model="themeConfig.primaryColor" class="theme-define"></colorpicker>
    </div>
    <a-radio-group v-model="themeConfig.themeKey" @change="(e) => colorChange(e, 'param')">
      <a-radio
        v-for="item in themesOptions"
        :value="item.value"
        :key="item.value"
      >
        <a-popover :content="item.name">
          <div class="theme-item">
            <span
              style="width: 100%; height: 100%; border-radius: 2px; display: inline-block"
              :style="{backgroundColor: item.color}"
            />
          </div>
        </a-popover>
      </a-radio>
    </a-radio-group>
    <a-divider></a-divider>
    <div class="content-title">
      <h3>框架布局</h3>
    </div>
    <a-radio-group v-model="themeConfig.layout" class="layout-radio-container" @change="handleLayoutChange">
      <a-radio v-for="item in showLayoutOptions" :value="item.value" :key="item.value">
        <span :class="item.value" class="layout-options"></span>
      </a-radio>
    </a-radio-group>
    <a-divider></a-divider>
    <div class="content-list">
      <span class="title">多页签模式</span>
      <span class="right-content">
        <a-switch
          style="display: block"
          v-model="themeConfig.enableMultiTags"
          :disabled="themeConfig.showBreadcrumb"
          checked-children="开"
          un-checked-children="关"
          @change="(val) => {this.handleMultiTagsChange(val, 'enableMultiTags')}"
        >
      </a-switch>
      </span>
    </div>
    <div class="content-list">
      <span class="title">面包屑导航</span>
      <span class="right-content">
        <a-switch
          style="display: block"
          v-model="themeConfig.showBreadcrumb"
          checked-children="开"
          un-checked-children="关"
          :disabled="themeConfig.enableMultiTags"
          @change="(val) => {this.handleMultiTagsChange(val, 'showBreadcrumb')}"
        >
      </a-switch>
      </span>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import { Switch, Radio, Divider, Popover, message } from 'ant-design-vue';
  import { themeUtil } from '../../../utils/theme';
  import themes from '../../../themes/index';

  const ARadioGroup = Radio.Group;

  export default {
    name: 'GlobalDrawerSetting',
    components: {
      ASwitch: Switch, ARadio: Radio, ADivider: Divider, ARadioGroup, APopover: Popover
    },
    data: function () {
      const { theme } = themes;
      const themesOptions = Object.keys(theme).map((key) => (
        {
          value: theme[key].themeKey,
          color: theme[key].variable['primary-color'],
          name: theme[key].themeName
        }
      ));
      const showLayoutOptions = [
        { label: '默认', value: 'sider-layout' },
        { label: '上下', value: 'header-layout' },
        // { label: '上下左', value: 'headerLeft' },
        { label: '空白', value: 'blank-layout' }
      ];
      return {
        themesOptions,
        showLayoutOptions
      }
    },
    computed: {
      ...mapState({
        setting: state => state.setting
      }),
      themeConfig() {
        if(this.setting && JSON.stringify(this.setting) !== '{}') {
          const { themeConfig } = this.setting;
          const obj = {};
          obj.primaryColor = themeConfig.variable['primary-color'];
          obj.themeKey = themeConfig.themeKey;
          obj.layout = this.setting.layout;
          obj.enableMultiTags = this.setting.enableMultiTags;
          obj.showBreadcrumb = this.setting.showBreadcrumb;
          return obj;
        } else {
          return {}
        }
      }
    },
    methods: {
      ...mapActions(['changeSetting', 'getSetting']),
      handleLayoutChange(val) {
        this.changeSetting({layout: val.target.value});
        message.success('布局切换成功')
      },
      colorChange(e, type) {
        if (!e) return;
        const { modifyVars } = window.less || {};
        if (type === 'param') {
          const themeObj = themes.theme;
          if (modifyVars) {
            const { value } = e.target;
            const key = Object.keys(themeObj).filter((item) => themeObj[item].themeKey === value)[0];
            if (key) {
              this.changeSetting({ themeConfig: themeObj[key] });
              modifyVars(themeObj[key].variable);
            }
          }
        } else {
          if (modifyVars) {
            const options = themeUtil.options(e);
            modifyVars(options);
            this.changeSetting({ themeConfig: { variable: options } });
          }
        }
        message.success('主题切换成功')
      },
      handleMultiTagsChange(val, key) {
        const payload = {};
        payload[key] = val;
        this.changeSetting(payload);
      }
    }
  }
</script>

<style scoped lang="less">
  .global-drawer-setting{
    .content-title{
      position: relative;
      h3 {
        font-size: 14px;
        line-height: 22px;
      }
      /deep/ .theme-define{
        cursor: pointer;
        position: absolute !important;
        right: 0;
        top: 4px;
        width: 60px;
        height: 16px;
        border-radius: 2px;
        .colorBtn{
          width: 100% !important;
          height: 100% !important;
        }
        .box.open{
          z-index: 11;
          left: -160px;
          width: 220px;
          .defaultColor{
            display: none;
          }
          .bd{
            h3{
              margin-bottom: 15px;
              &:last-of-type{
                display: none;
              }
            }
          }
        }
      }
    }
    /deep/ .ant-radio-group{
      .ant-radio {
        display: none;
      }
      .ant-radio-wrapper{
        line-height: 1;
      }
      .ant-radio-inner{
        display: none;
      }
    }
    .ant-radio-wrapper-checked{
      .theme-item{
        border: 1px solid #007aff !important;
        background-image: url('../images/theme-chosed.svg');
        background-size: 14px 14px;
        background-position: right bottom;
        background-repeat: no-repeat;
      }
    }
    .theme-item{
      width: 30px;
      height: 30px;
      background: #f4f4f4;
      border: 1px solid #f4f4f4;
      padding: 6px;
      box-sizing: border-box;
    }
    .content-list{
      display: block;
      position: relative;
      margin-bottom: 16px;
      .title{
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
      }
      .right-content {
        width: 140px;
        display: inline-block;
        position: absolute;
        text-align: right;
        right: 0;
        top: 0;
      }
    }
    .layout-radio-container{
      .ant-radio{
        display: none;
      }
      .sider-layout {
        background-image: url('../images/frame1_nor.svg');
      }
      .header-layout {
        background-image: url('../images/frame2_nor.svg');
      }
      .blank-layout {
        background-image: url('../images/frame4_nor.svg');
      }
      .layout-options{
        display: inline-block;
        width: 50px;
        height: 30px;
      }
      .ant-radio-wrapper-checked{
        .sider-layout {
          background-image: url('../images/frame1_active.svg');
        }
        .header-layout {
          background-image: url('../images/frame2_active.svg');
        }
        .blank-layout {
          background-image: url('../images/frame4_active.svg');
        }
      }
    }
  }
</style>