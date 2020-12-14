const banner = require('./images/banner.png');

export default {
  themeName: '深邃蓝', // 主题名称
  themeKey: 'default', // 主题key
  variable: {
    'primary-color': '#1e6ddd', // 默认主题，拂晓蓝
    // 赛姬前端样式
    'sg-primary-color': '#1e6ddd',
    'sg-left-top-logo-bg': '#459eff',
    'sg-left-top-logo-title-color': '#fffffe',
    'sg-sider-header-bg': `url(${banner})`,
    'sg-header-bg': '#007aff',
    'sg-header-right-content-color': '#00000f',
    'sg-global-menu-font-color': '#fffffe',
    'sg-global-menu-bg': '#007aff',
    'sg-global-menu-item-selected-bg': '#00b2b6',
    'sg-global-menu-item-selected-border-right-color': '#24df9f',
    'sg-global-menu-item-selected-font-color': '#fffffd',
    'sg-global-menu-item-active-font-color': '#2baf83',
    'sg-global-menu-sub-bg': '#0168f2'
  }
};
