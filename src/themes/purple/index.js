import banner from './images/banner.png';

export default {
  themeName: '高雅紫', // 主题名称
  themeKey: 'purple', // 主题key
  variable: {
    // Ant Design 样式
    'primary-color': '#722ed1', // 默认主题，拂晓蓝
    // 赛姬前端样式
    'sg-primary-color': '#722ed1',
    'sg-left-top-logo-bg': '#8d4ee3',
    'sg-left-top-logo-title-color': '#fffffe',
    'sg-sider-header-bg': `url(${banner})`,
    'sg-header-bg': '#470b9a',
    'sg-header-right-content-color': '#fffffe',
    'sg-global-menu-font-color': '#fffffe',
    'sg-global-menu-bg': '#470b9a',
    'sg-global-menu-item-selected-bg': '#bf23d5',
    'sg-global-menu-item-selected-border-right-color': '#ed76ff',
    'sg-global-menu-item-selected-font-color': '#fffffd',
    'sg-global-menu-item-active-font-color': '#ed76ff',
    'sg-global-menu-sub-bg': '#27085b'
  }
};
