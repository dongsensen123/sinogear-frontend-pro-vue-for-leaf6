import banner from './images/banner.png';

export default {
  themeName: '青春绿', // 主题名称
  themeKey: 'green', // 主题key
  variable: {
    // Ant Design 样式
    'primary-color': '#00bfb3', // 默认主题，拂晓蓝
    // 赛姬前端样式
    'sg-primary-color': '#00bfb3',
    'sg-left-top-logo-bg': '#004740',
    'sg-left-top-logo-title-color': '#fffffe',
    'sg-sider-header-bg': `url(${banner})`,
    'sg-header-bg': '#024741',
    'sg-header-right-content-color': '#00000f',
    'sg-global-menu-font-color': '#fffffe',
    'sg-global-menu-bg': '#024741',
    'sg-global-menu-item-selected-bg': '#10888b',
    'sg-global-menu-item-selected-border-right-color': '#24df9f',
    'sg-global-menu-item-selected-font-color': '#fffffd',
    'sg-global-menu-item-active-font-color': '#ffffff',
    'sg-global-menu-sub-bg': '#001f1d'
  }
};
