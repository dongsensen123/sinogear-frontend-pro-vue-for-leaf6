import cloneDeep from 'lodash.clonedeep';
import { config } from '../common/config';
import { mergeMenus } from '../utils/func';
const { extraMenus = [] } = config;
import userImg from '../resources/images/user.jpg'

const mutations = {
  getMenuEnd: (state, payload) => {
    state.menus = mergeMenus(payload, extraMenus);
  },
  getUserInfoEnd: (state, payload) => {
    state.currentUser = payload.currentUser;
  },
  saveNotices: (state, payload) => {
    state.notices = payload;
    state.fetchingNotices = false;
  },
  saveClearedNotices: (state, payload) => {
    state.notices = state.notices.filter((item) => item.type !== payload);
  },
  changeNoticeLoading: (state, payload) => {
    state.fetchingNotices = payload;
  },
  changeUserAvatarKeyEnd: (state, payload) => {
    state.userAvatarKey = payload.userAvatarKey;
    state.currentUser = Object.assign({}, state.currentUser, { userAvatarKey: payload.userAvatarKey });
  },
  getVersionEnd: (state, payload) => {
    state.versionItem = payload.versionItem;
  },
  getAvatarEnd: (state, payload) => {
    if (payload) {
      state.imageUrl = payload;
    } else {
      state.imageUrl = userImg;
    }
  },
  addTag: (state, payload) => {
    const { tagName, tagPath, search, isReplace, group } = payload;
    const { tagList } = state;
    let isPush = true;
    if (group !== undefined) {
      tagList.forEach((item, index) => {
        if (item.group === group) {
          tagList[index] = { tagName, tagPath, search, group };
          isPush = false;
        }
      });
    }
    if (isReplace) {
      tagList.forEach((item, index) => {
        if (tagPath.indexOf(item.tagPath) > -1) {
          tagList[index] = { tagName, tagPath, search, group };
          isPush = false;
        }
      });
    }
    if (isPush) {
      tagList.push({ tagName, tagPath, search, group });
    }
    state.tagList = tagList;
  },
  closeTag: (state, payload) => {
    const { tagPath } = payload;
    const newTagList = cloneDeep(state.tagList);
    state.tagList.forEach((item, index) => {
      if (item.tagPath === tagPath) {
        newTagList.splice(index, 1);
      }
    });
    state.tagList = newTagList;
  },
  closeOtherTags: (state, payload) => {
    const { activeKey } = payload;
    const { tagList } = state;
    let activeIndex;
    tagList.forEach((item, index) => {
      if (item.tagPath === activeKey) {
        activeIndex = index;
      }
    });
    state.tagList = [state.tagList[0], state.tagList[activeIndex]];
  },
  cleanTags: (state) =>{
    state.tagList = [state.tagList[0]]
  },
  changeOpenKeys: (state, payload) => {
    const { openKeys } = payload;
    state.openKeys = openKeys;
  },
  loginByTokenEnd: (state, payload) => {
    state.validTokenSuccess = payload;
  },
  changeSetting: (state, payload) => {
    const obj = Object.assign({}, state.setting, payload);
    state.setting = obj;
  },
  handleTabsChange: (state, payload) => {
    state.tabs = payload.tabs;
    state.currentTab = payload.currentTab;
  },
  getCollapse: (state, payload) => {
    state.collapse = payload;
  },
  getDrawer: (state, payload) => {
    state.drawer = payload;
  }
};

export default mutations;