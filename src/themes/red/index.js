import banner from './images/banner.png';

export default {
  themeName: '喜庆红', // 主题名称
  themeKey: 'red', // 主题key
  variable: {
    // Ant Design 样式
    'primary-color': '#ff3739', // 默认主题，拂晓蓝
    // 赛姬前端样式
    'sg-primary-color': '#ff3739',
    'sg-left-top-logo-bg': '#6c0f1a',
    'sg-left-top-logo-title-color': '#fffffe',
    'sg-sider-header-bg': `url(${banner})`,
    'sg-header-bg': '#290509',
    'sg-header-right-content-color': '#00000f',
    'sg-global-menu-font-color': '#fffffe',
    'sg-global-menu-bg': '#290509',
    'sg-global-menu-item-selected-bg': '#a52f1a',
    'sg-global-menu-item-selected-border-right-color': '#ff9f8e',
    'sg-global-menu-item-selected-font-color': '#fffffd',
    'sg-global-menu-item-active-font-color': '#ff3739',
    'sg-global-menu-sub-bg': '#0d0200'
  }
};
