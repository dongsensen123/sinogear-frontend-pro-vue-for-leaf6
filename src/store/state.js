import userImg from '../resources/images/user.jpg';
import { config } from '../common/config';

const state = {
  tabs: [{name: 'HomeContainer', title: '主页', fullPath: '/home', path: '/home'}],
  currentTab: 'HomeContainer',
  notices: [],
  fetchingNotices: false,
  menus: [],
  subMenus: [],
  userAvatarKey: 'userAvatarKey',
  currentUser: {
    userAvatarUrl: userImg
  },
  imageUrl: userImg,
  versionItem: null,
  validTokenSuccess: false,
  openKeys: [],
  setting: {
    ...config.globalSetting
  },
  collapse: false,
  drawer: false
};

export default state;