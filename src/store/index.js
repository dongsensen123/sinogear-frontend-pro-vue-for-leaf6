/**
 * 应用状态管理总入口
 **/

import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import getters from './getters';
import state from './state';
import mutations from './mutations';
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const moduleFiles = require.context('../modules', true, /\.js$/);
const moduleFilesFilter = [];
moduleFiles.keys().forEach((key) => {
  if (key.indexOf('models') > -1) {
    moduleFilesFilter.push(key);
  }
});

const modules = moduleFilesFilter.reduce((modules, modulePath) => {
  let moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  if (moduleName.indexOf('/') > -1) {
    const arr = moduleName.split('/');
    moduleName = arr[arr.length - 1];
  }
  const value = moduleFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

export default new Vuex.Store({
  modules,
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})