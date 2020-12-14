import moment from 'moment';
import cloneDeep from 'lodash.clonedeep';
import Vue from 'vue';

export const common = {
  digitUppercase(n) {
    const fraction = ['角', '分'];
    const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    const unit = [
      ['元', '万', '亿'],
      ['', '拾', '佰', '仟'],
    ];
    let num = Math.abs(n);
    let s = '';
    fraction.forEach((item, index) => {
      s += (digit[Math.floor(num * 10 * 10 ** index) % 10] + item).replace(/零./, '');
    });
    s = s || '整';
    num = Math.floor(num);
    for (let i = 0; i < unit[0].length && num > 0; i += 1) {
      let p = '';
      for (let j = 0; j < unit[1].length && num > 0; j += 1) {
        p = digit[num % 10] + unit[1][j] + p;
        num = Math.floor(num / 10);
      }
      s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    }

    return s
      .replace(/(零.)*零元/, '元')
      .replace(/(零.)+/g, '零')
      .replace(/^整$/, '零元整');
  },
  fixedZero(val) {
    return val * 1 < 10 ? `0${val}` : val;
  },
  getTimeDistance(type) {
    const now = new Date();
    const oneDay = 1000 * 60 * 60 * 24;

    if (type === 'today') {
      now.setHours(0);
      now.setMinutes(0);
      now.setSeconds(0);
      return [moment(now), moment(now.getTime() + (oneDay - 1000))];
    }

    if (type === 'week') {
      let day = now.getDay();
      now.setHours(0);
      now.setMinutes(0);
      now.setSeconds(0);

      if (day === 0) {
        day = 6;
      } else {
        day -= 1;
      }

      const beginTime = now.getTime() - day * oneDay;
      return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))];
    }

    const year = now.getFullYear();

    if (type === 'month') {
      const month = now.getMonth();
      const nextDate = moment(now).add(1, 'months');
      const nextYear = nextDate.year();
      const nextMonth = nextDate.month();
      return [
        moment(`${year}-${common.fixedZero(month + 1)}-01 00:00:00`),
        moment(moment(`${nextYear}-${common.fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000),
      ];
    }

    return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)];
  },
};

export const url = {
  /**
   * 获取当前url中指定的name参数
   * @param {String} name 参数名称
   * @return {String} 指定的值
   */
  queryURL(name, hashURL = window.location.hash.split('?')[1]) {
    const after = hashURL;
    if (after) {
      const reg = new RegExp(`(^|&)?${name}=([^&]*)(&|$)`);
      const r = after.match(reg);
      if (r != null) {
        return decodeURIComponent(r[2]);
      } else {
        return null;
      }
    }
    return null;
  },
  /**
   * requestParams为当前url所有参数对象
   */
  getUrlParams(href = window.location.hash.split('?')[1]) {
    const requestParams = {};
    const after = href;
    if (after) {
      const params = after.split('&');
      for (let i = 0; i < params.length; i += 1) {
        const key = params[i].split('=')[0];
        // from是登录拦截的关键字,_k是router中自带的hash参数
        if (!(key === 'from' || key === '_k')) {
          requestParams[params[i].split('=')[0]] = decodeURIComponent(params[i].split('=')[1]);
        }
      }
    }
    return requestParams;
  },
  /**
   * 获取form后面所有的参数；
   * @returns {*}
   */
  getFromParam() {
    let from = this.queryURL('from');
    if (from) {
      // 增加url中的参数
      const urlParams = this.getUrlParams();
      if (Object.keys(urlParams).length > 0) {
        for (const key of Object.keys(urlParams)) {
          if (from.indexOf('?') > -1) {
            from = `${from}&${key}=${urlParams[key]}`;
          } else {
            from = `${from}?${key}=${urlParams[key]}`;
          }
        }
      }
      return from;
    } else {
      return '/';
    }
  },
  // 增加参数
  appendParams(key, value, str = '') {
    let params = str;
    if (params) {
      params = `${params}&${key}=${value}`;
    } else {
      params = `${key}=${value}`;
    }
    return params;
  },
};

export const router = {
  getRoutes(routerData, path = '', newRouterData = []) {
    if (routerData && routerData.length) {
      for (let i = 0; i < routerData.length; i += 1) {
        let newPath;
        if (path && path[path.length - 1] !== '/') {
          newPath = `${path}/${routerData[i].path}`;
        }  else {
          newPath = `${path}${routerData[i].path}`;
        }
        const item = cloneDeep(routerData[i]);
        item.path = newPath;
        newRouterData.push(item);
        if (routerData[i].children && routerData[i].children.length) {
          router.getRoutes(routerData[i].children, newPath, newRouterData);
        }
      }
      return newRouterData;
    }
  },

  /**
   * 格式化menuData，按菜单层次归类节点，补充完整path
   * @param {Array} data 菜单数据
   * @param {String} parentPath 父路径
   * @returns {Array} 补充完整的path菜单数据
   */
  formatter(data, parentPath = '') {
    const list = [];
    data.forEach((item) => {
      if (item.children) {
        list.push({
          ...item,
          path: `${parentPath}${item.path}`,
          children: this.formatter(item.children, `${parentPath}${item.path}/`),
        });
      } else {
        list.push({
          ...item,
          path: `${parentPath}${item.path}`,
        });
      }
    });
    return list;
  },

  /**
   * 获取平铺的节点数据
   * @param {Array} menuData 菜单数据
   * @returns {{}} 平铺的节点数据
   返回示例:
   {
   home: "主页"
   http://192.168.14.47:8007/#/components: "使用文档"
   test: "一级菜单1"
   test/test-1: "二级菜单1"
   test/test-1/test-1-1: "三级菜单1"
   test/test-1/test-1-2: "三级菜单2"
   test/test-1/test-1-3: "三级菜单3"
   test/test-2: "二级菜单2"
   user: "帐户"
   user/login: "登录"
   user/register: "注册"
   }
   */
  getFlatMenuData(menuData = []) {
    let keys = {};
    menuData.forEach((item) => {
      if (item.children) {
        keys[item.path] = item.name;
        keys = { ...keys, ...this.getFlatMenuData(item.children) };
      } else {
        keys[item.path] = item.name;
      }
    });
    return keys;
  },

  getPortalSite(menuData = []) {
    let keys = {};
    menuData.forEach((item) => {
      if (item.children) {
        keys = Object.assign({}, keys, this.getPortalSite(item.children));
      }
      if (item.openType === '3') {
        keys[item.name] = item.path;
      }
    });
    return keys;
  },
};

export const tips = {
  /**
   * 获取错误的提示信息
   * @param {Object} error js的error或SGError
   * @return {String} 错误提示信息
   */
  getErrorMsg(error) {
    if (error) {
      if (error.tips) {
        return error.tips();
      } else if (error.message) {
        return error.message;
      } else {
        return '错误对象未定义';
      }
    }
    return '错误对象未定义';
  },

  /**
   * 错误提示信息中是否存在字段错误
   * @param error js的error或SGError
   * @return {boolean} true:表示存在 false:表示不存在
   */
  existFieldErrorMsg(error) {
    if (error) {
      if (error.tips) {
        if (error.fieldErrors && error.fieldErrors.length > 0) {
          return true;
        }
      }
    }
    return false;
  },
};

export const store = {
  getItem(key, useLocalStorage) {
    const data = useLocalStorage && useLocalStorage === true ? localStorage.getItem(key) : sessionStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  },
  setItem(key, data, useLocalStorage) {
    if (useLocalStorage && useLocalStorage === true) {
      localStorage.setItem(key, JSON.stringify(data));
    } else {
      sessionStorage.setItem(key, JSON.stringify(data));
    }
  },
  removeItem(key, useLocalStorage) {
    if (useLocalStorage && useLocalStorage === true) {
      localStorage.removeItem(key);
    } else {
      sessionStorage.removeItem(key);
    }
  },
};

export function handleNotificationError(err, message, description) {
  if ((err?.extraCode && err.extraCode !== 'sg_error_401') || (!err || (err.extraCode && err.extraCode !== 'sg_error_401'))) {
    Vue.prototype.$notification.error({
      message,
      description,
    })
  } else if (err?.extraCode && err.extraCode === 'sg_error_401') {
    Vue.prototype.$message.error('请求被拒绝访问，请先进行登录认证');
  }
}

// 合并菜单函数
export const mergeMenus = (sourceMenus, targetMenus) => {
  if (targetMenus?.length) {
    const transformMenus = sourceMenus.map((item) => {
      let number = null;
      const flag = targetMenus.some((items, index) => {
        number = index;
        return items.path === item.path || items.id === item.id;
      });
      if (flag) {
        // 源菜单和目标菜单都有子菜单的情况
        const obj = { ...item };
        if (item?.children && targetMenus[number]?.children) {
          obj.children = mergeMenus(item.children, targetMenus[number].children);
        } else if (!item?.children && targetMenus[number]?.children) {
          // 源菜单没有子菜单，目标菜单有子菜单的情况
          obj.children = targetMenus[number].children;
        }
        targetMenus.splice(number, 1);
        return obj;
      }
      return { ...item };
    });
    return [...transformMenus, ...targetMenus];
  }
  return sourceMenus;
};

export const getTitle = (menus, url) => {
  let title = '';
  menus.every((item, index) => {
    if (item.path === url) {
      title = item.name;
      return false;
    } else if (item.children && item.children.length) {
      if (getTitle(item.children, url)) {
        title = getTitle(item.children, url);
      }
      return true;
    } else if (index === menus.length - 1) {
      return false;
    } else {
      return true;
    }
  })
  return title;
};
