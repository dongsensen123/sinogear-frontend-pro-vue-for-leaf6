# 赛姬前端Vue框架

## 1. 介绍

赛姬前端Vue框架是基于 `Vue`、`Vuex`、`Vue-Router`和 `Ant Design Vue` 实现的轻量级前端开发框架。`sinogear-frontend-pro-vue-for-leaf6`项目是后端对接`Leaf6`, 前端使用`Vue`的最佳实践项目。提供了开箱即用的脚手架项目和示例项目，提供常用了的基础开发功能和模块， 如：常用布局、面包屑、菜单权限鉴权、数据缓存、主题切换、多标签页、账户模块、CRUD模块。并提供了核心基础服务，如： 网络请求、通用错误类。

### 1.1. 快速上手

#### 1.1.1. 拉取代码

从 Gitlab 仓库中直接安装最新的代码。

```shell
git clone http://gitlab.ggjs.sinobest.cn/Frontend/vue/sinogear-frontend-pro-vue-for-leaf6.git
```

#### 1.1.2. 安装依赖

```shell
yarn install --registry http://ggjs-app-03.hnisi.com.cn:8090
```

#### 1.1.3. 启动项目

```shell
yarn run dev
```

几秒钟后，你会看到以下输出：

```shell
 DONE  Compiled successfully in 10987ms


  App running at:
  - Local:   http://localhost:9000/
  - Network: http://192.168.6.150:9000/

  Note that the development build is not optimized.
  To create a production build, run yarn build.
```

打开浏览器访问 `http://localhost:9000`即可。接下来你可以修改代码进行业务开发了。

#### 1.1.4. 打包

当项目开发完毕，命令行输入以下命令就可以打包你的应用：

```shell
yarn run build
```

构建打包成功之后，会在根目录生成 dist 文件夹，里面就是构建打包好的文件。可通过Node、Nginx等发布部署。

### 1.2. 目录介绍

```md
│  .eslintrc.js                              // eslint配置
│  .gitignore                                // git的忽略列表
│  babel.config.js                           // babel配置
│  vue.config.js                             // webpack配置
│  package.json                              // node的配置文件
│  README.md                                 // 介绍文档
│  yarn.lock                                 // 依赖包安装信息
│  
├─public
│      favicon.png                           // favicon
│      index.html                            // html入口
│      config.js                             // 项目全局变量定义配置文件
│      less.min.js                           // 主题切换相关文件
├─mock
│   ├─js                                     // 支撑框架基础功能的mockjs文件
│   ├─public                                 // 支撑框架基础功能的静态资源
│   └─json                                   // 接口模拟的出参json和js文件
|      └─模块名称                            // 一级模块
|           └─二级模块名称                   // 二级模块（根据业务实际）
|                  xxxx.js                  //接口模拟的js文件
|                  xxxx.json                //接口模拟的json文件
└─src
    │  App.vue                               // 全局页面入口
    │  main.js                               // 全局配置文件入口
    │  
    ├─resources                              // 本地静态资源
    │  ├─fonts                               // 字体资源
    │  │      iconfont.svg
    │  │      iconfont.ttf
    │  │      iconfont.woff
    │  │      iconfont.woff2
    │  │
    │  ├─images                             // 图片资源
    │  │      logo_SinoGear4.svg
    │  │
    │  └─js                                 // js资源
    ├─common                                 // 公共配置文件
    ├─components                             // 公共组件
    │      GlobalHeader.vue
    │      GlobalBreadcrumb.vue
    │      GlobalException.vue
    │      GlobalFooter.vue
    │      GlobalMenus.vue
    │      GlobalTagsView.vue
    │
    ├─router                                 // 路由
    │      index.js
    │
    ├─store                                  // 状态管理
    │      actions.js
    │      getters.js
    │      index.js
    │      mutation-types.js
    │      mutations.js
    │      state.js
    │
    ├─themes                                 // 全局主题切换配置文件
    │
    ├─utils                                  // 公共方法
    │      func.js
    │
    ├─layouts                                // 布局文件  
    │      BlankLayout
    │      HeaderLayout
    │      Layout
    │      LoginBasicLayout
    │      SiderLayout
    │
    └─modules                                // 页面
        ├─一级模块名称                        // 一级模块名称
        │       └─二级模块名称                // 二级模块名称（根据模块实际情况确定是采用几级目录）
        │               │
        │               ├─models                           // 可选，只有使用状态管理才需要
        │               │       account.js                 
        │               │
        │               ├─services                        // 请求服务，封装后端api
        │               │       account.js                 
        │               │
        │               └─views                            // 页面
        │                   │   index.vue
        │                   └─components                  //放置模块内组件             
        │
        └─home                                            // 首页

```

### 1.3. Ant Design Vue

提炼自企业级中后台产品的交互语言和视觉风格, 开箱即用的高质量 Vue 组件库[Ant Design Vue](https://www.antdv.com/docs/vue/introduce-cn/)。

### 1.4. 组件库sinogear-vue介绍

[sinogear-vue](http://192.168.14.33:9100/) 是基于 [Ant Design Vue](https://www.antdv.com/docs/vue/introduce-cn/) 封装的贴合用户业务的开发需求的组件库，专注用户业务需求、方便用户快速开发、易于上手。

#### 1.4.1. 引入方法

##### 1.4.1.1. 全局引入

```js
// 引入组件
import SinogearVue from 'sinogear-vue'
// 引入样式
import 'sinogear-vue/dist/index.css'

// 全局注册组件
Vue.use(SinogearVue)
```

全局注册所有组件在一定情况下会导致构建产物的体积过大，可以通过按需引入的方式减小构建体积。

##### 1.4.1.2. 按需加载

在项目中的 `babel.config.js` 文件中添加以下配置即可使用 `babel-plugin-import` 实现按需加载。

```js
module.exports = {
  presets: ["@vue/app"],
  plugins: [
    [
      "import",
      {
        "libraryName": "sinogear-vue",
        "libraryDirectory": "lib/components",
        "camel2DashComponentName": false,
        "camel2UnderlineComponentName": false,
        "style": (name) => `${name}/style.css`
      },
      "sinogear-vue"
    ]
  ]
};

```

使用按需加载在页面中引入组件示例：

```js
<template>
	<sinogear-captcha></sinogear-captcha>
</template>

<script>

	import { SinogearCaptcha } from 'sinogear-vue'
	
	export default {
		components: { SinogearCaptcha }
	}

</script>
```

### 1.5. Vuex

Vuex 可以帮助我们管理共享状态, 并且这种状态存储是响应式的。

![Vuex图解](./vuex.png)

#### 1.5.1. 执行原理

在页面中，使用 `mapActions` 辅助函数将组件的 `methods` 映射为 `store.dispatch` 调用, 通过调用actions里定义的方法，在 `action` 内部执行异步操作，然后分发到 `mutations` 进行状态的更改。

### 1.6. 权限控制

权限控制是中后台系统中常见的需求之一，利用我们提供的前端鉴权私有函数方法，可以实现一些基本的权限控制功能。如需对某些菜单和页面进行权限控制, 则打开 `sinogear-frontend-pro-vue-for-leaf6/src/common` 目录下的 `config.js` 文件，配置 `enableMenuAccessControl` 参数为 `true`。当每一次发生路由跳转，`sinogear-frontend-pro-vue-for-leaf6` 的路由系统都会调用全局路由前置守卫方法，对即将要跳转的路由进行权限判断。

```js
router.beforeEach(async (to, from, next) => {
  const routerData = getRoutes(router.options.routes);
  if (routerData.indexOf (to.path) === -1
      && to.path.indexOf('/management') < 0) { // TODO 写死的路径
    next('/exception/404');
  } else {
    if (to.path.indexOf('user') > -1 || to.path === config.guideUrl) {
      next();
    } else {
      const params = from.query;
      let tokenVerification = false;
      if (JSON.stringify(params) !== '{}') {
        for (const key in params) {
          if (key.indexOf('access_token') > -1) {
            await store.dispatch('loginByToken', params[key]);
            tokenVerification = true;
          }
        }
      }
      let authCheckRedirectUrl = null;
      auth.checkAuth({
        currentLocation: to,
        onFailure: ({ redirectUrl }) => {
          authCheckRedirectUrl = redirectUrl;
        }
      });
      // 第三方http登录页
      if (authCheckRedirectUrl !== null && authCheckRedirectUrl.startsWith('http')) {
        window.location.href = authCheckRedirectUrl;
        return null;
      }
      if ((tokenVerification && !store.state.validTokenSuccess) || authCheckRedirectUrl === null){
        next();
      } else {
        next(authCheckRedirectUrl)
      }
    }
  }
});
```

### 1.7. 微前端方案接入子应用

对采用其它技术框架已经开发好的系统管理功能模块直接接入使用，减少重复开发、维护工作。详情看 [文档](http://192.168.14.33:9100/docs/microapp.html)

### 1.8. 技术支持

关于提需求：如果有需要封装的组件，可以在 [禅道](http://192.168.13.36/zentao/product-browse-68.html) 上录入需求，评审通过后框架组便会开始开发, 开发完毕后项目组更新`sinogear-vue`的版本即可使用最新的组件。

关于提缺陷：如果发现有组件库或者脚手架项目的缺陷，可以在 [禅道](http://192.168.13.36/zentao/bug-browse-68.html) 上录入缺陷, 评审通过后框架组便会开始开发修复缺陷，开发完毕项目组更新`sinogear-vue`的版本即可。
