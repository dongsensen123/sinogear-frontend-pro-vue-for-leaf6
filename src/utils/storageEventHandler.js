import { config } from '../common/config';

const { store_user_key: STORE_USER_KEY } = config.store_keys;
const { location } = window;
const systemId = `${location.protocol}-${location.hostname}-${location.port}-${config.name}`;
// 获取拼接字符串的hash值，取消注释，使用hash值替代拼接字符串
// systemId = systemId.split('').reduce((a, b) => {
//   a = (a << 5) - a + b.charCodeAt(0);
//   return a & a;
// }, 0);
const appID = `${systemId}`.replace(':', '');
const BroadcastGetSessionStorageKey = `${appID}_broadcastGetSessionStorage`;
const BroadcastPostSessionStorageKey = `${appID}_broadcastPostSessionStorage`;
const SessionChangeTimeKey = `${appID}_sessionChangeTime`;
const SessionChangeEventName = 'SessionChangeEventName';

const CopyKeys = [SessionChangeTimeKey, STORE_USER_KEY];
// 广播获取其它标签的sessionStorage
const broadcastGetStorage = () => {
  localStorage.setItem(BroadcastGetSessionStorageKey, Date.now());
  localStorage.removeItem(BroadcastGetSessionStorageKey);
};
// 广播发送本标签的sessionStorage
const broadcastPostStorage = () => {
  localStorage.setItem(BroadcastPostSessionStorageKey, JSON.stringify(sessionStorage));
  localStorage.removeItem(BroadcastPostSessionStorageKey);
};
// 更新session
const replaceSessionWithString = (string) => {
  const data = JSON.parse(string);
  let isSame = true;
  if (data && (sessionStorage.length === 0 || sessionStorage[SessionChangeTimeKey] < data[SessionChangeTimeKey])) {
    CopyKeys.map((key) => {
      if (data[key] !== sessionStorage[key]) {
        if (data[key]) {
          sessionStorage.setItem(key, data[key]);
        } else {
          sessionStorage.removeItem(key);
        }
        if (key !== SessionChangeTimeKey) {
          isSame = false;
        }
      }
      return false;
    });
    if (!isSame) {
      const event = new CustomEvent(SessionChangeEventName, {
        detail: {
          data,
        },
      });
      document.dispatchEvent(event);
    }
    return isSame;
  } else {
    return false;
  }
};
// 从其它标签拿session数据
const getSessionFromOthers = () => {
  const promise = new Promise((resolve) => {
    // 此处timer目的：第一个打开的标签无法获取到storage事件的定时
    const timer = setTimeout(() => {
      resolve();
      window.removeEventListener('storage', handleStorageEvents);
    }, 100);
    const handleStorageEvents = (event) => {
      if (event.key === BroadcastPostSessionStorageKey) {
        // 接收解析其它标签的session
        if (replaceSessionWithString(event.newValue)) {
          resolve(event.newValue);
        } else {
          resolve(null);
        }
        clearTimeout(timer);
        window.removeEventListener('storage', handleStorageEvents);
      }
    };
    // 单次监听storage事件（新旧页面都会）
    window.addEventListener('storage', handleStorageEvents);
  });
  broadcastGetStorage();
  return promise;
};

const handleStorageGlobalEvents = (event) => {
  // 仅当event.newValue有值需要处理(触发localstorage的修改有setItem和removeItem两步操作，处理setItem即可)
  if (event.key === BroadcastGetSessionStorageKey && event.newValue) {
    // 发送本标签的session
    broadcastPostStorage();
  } else if (event.key === BroadcastPostSessionStorageKey && event.newValue) {
    // 接收解析其它标签的session
    replaceSessionWithString(event.newValue);
  }
};
// 全局监听storage事件（新旧页面都会）
window.addEventListener('storage', handleStorageGlobalEvents);

export { getSessionFromOthers, broadcastPostStorage, SessionChangeTimeKey, SessionChangeEventName };
