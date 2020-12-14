import BezierEasing from 'bezier-easing';
import tinycolor from 'tinycolor2';

const options = (color) => {
  return {
    'primary-color': color,
    'sg-sider-header-bg': themeUtil.getPureBackgroundColor(color),
    'sg-header-bg': themeUtil.getBackgroundColor(color),
    'sg-left-top-logo-bg': themeUtil.getPureBackgroundColor(color),
    'sg-global-menu-bg': themeUtil.getBackgroundColor(color),
    'sg-global-menu-sub-bg': themeUtil.getDeepBackgroundColor(color),
    'sg-primary-color': color,
    'sg-global-menu-item-selected-bg': themeUtil.getActiveColor(color),
    'sg-global-menu-item-selected-border-right-color': themeUtil.getPureColor(color),
    'sg-global-menu-item-hover-font-color': themeUtil.getHoverColor(color),
    'sg-global-menu-item-active-font-color': color,
    'sg-global-menu-font-color': '#ffffff',
    'sg-header-right-content-color': '#ffffff',
    'sg-left-top-logo-title-color': '#ffffff',
    'sg-global-menu-item-selected-font-color': '#ffffff'
  }
};

export const themeUtil = {
  options,
  baseEasing: BezierEasing(0.26, 0.09, 0.37, 0.18),
  primaryEasing() {
    return themeUtil.baseEasing(0.6);
  },
  currentEasing(index) {
    return themeUtil.baseEasing(index * 0.1);
  },
  // 与传入color混色得到背景深色
  getDeepBackgroundColor(color, ratio = 9) {
    return tinycolor
      .mix(
          '#000000',
          color,
          (1 - (themeUtil.currentEasing(ratio) - themeUtil.primaryEasing) / (1 - themeUtil.primaryEasing)) * 100
      )
      .toHexString();
  },
  // 与传入color混色得到背景浅色
  getPureBackgroundColor(color, ratio = 9) {
    return tinycolor
      .mix(
          '#333333',
          color,
          (1 - (themeUtil.currentEasing(ratio) - themeUtil.primaryEasing) / (1 - themeUtil.primaryEasing)) * 100
      )
      .toHexString();
  },
  // 与传入color混色得到背景色
  getBackgroundColor(color, ratio = 9) {
    return tinycolor
      .mix(
          '#111111',
          color,
          (1 - (themeUtil.currentEasing(ratio) - themeUtil.primaryEasing) / (1 - themeUtil.primaryEasing)) * 100
      )
      .toHexString();
  },
  // 与传入color混色得到按钮高亮色
  getActiveColor(color, ratio = 7) {
    return tinycolor
      .mix(
          '#555555',
          color,
          (1 - (themeUtil.currentEasing(ratio) - themeUtil.primaryEasing) / (1 - themeUtil.primaryEasing)) * 100
      )
      .toHexString();
  },
  getHoverColor(color, ratio = 7) {
    return tinycolor
      .mix(
        '#ffffff',
        color,
        (1 - (themeUtil.currentEasing(ratio) - themeUtil.primaryEasing) / (1 - themeUtil.primaryEasing)) * 100
      )
      .toHexString();
  },
  getPureColor(color, ratio = 1) {
    return tinycolor
      .mix(
          '#ffffff',
          color,
          (1 - (themeUtil.currentEasing(ratio) - themeUtil.primaryEasing) / (1 - themeUtil.primaryEasing)) * 100
      )
      .toHexString();
  }
};