import banner from './images/banner.png';

export default {
  themeName: '活力橙', // 主题名称
  themeKey: 'yellow', // 主题key
  variable: {
    // Ant Design 样式
    'primary-color': '#ffaa00', // 默认主题，拂晓蓝
    // 赛姬前端样式
    'sg-primary-color': '#ffaa00',
    'sg-left-top-logo-bg': '#5d392a',
    'sg-left-top-logo-title-color': '#fffffe',
    'sg-sider-header-bg': `url(${banner})`,
    'sg-header-bg': '#2b0500',
    'sg-header-right-content-color': '#00000f',
    'sg-global-menu-font-color': '#fffffe',
    'sg-global-menu-bg': '#2b0500',
    'sg-global-menu-item-selected-bg': '#c58609',
    'sg-global-menu-item-selected-border-right-color': '#ff0053',
    'sg-global-menu-item-selected-font-color': '#fffffd',
    'sg-global-menu-item-active-font-color': '#ffaa00',
    'sg-global-menu-sub-bg': '#090600'
  }
};
