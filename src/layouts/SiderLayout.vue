<template>
  <div class="sider-layout">
    <a-layout>
      <a-layout-sider
        width="208px"
        v-model="collapse"
        :trigger="null"
        collapsible
        collapsedWidth="48px"
      >
        <global-menus @on-collapse-change="handleChange"></global-menus>
      </a-layout-sider>
      <a-layout>
        <a-layout-header :style="setting.showBreadcrumb && title && title.length ? {height: '89px'} : {height: '48px'}">
          <global-header></global-header>
          <global-breadcrumb
            style="padding-bottom: 0;"
            v-if="setting.showBreadcrumb"
            :title="title"
          ></global-breadcrumb>
        </a-layout-header>
        <a-layout-content v-if="setting.enableMultiTags" style="padding: 0">
          <global-tags-view
            style="background-color: #fff; margin-bottom: 16px; height: 42px;"
            :tabs="tabs"
            :current-tab="currentTab"
            @on-click="handleClickTabs"
            @on-close="handleCloseTabs"
            @close-all="handleCloseAllTabs"
            @close-other="handleCloseOtherTabs"
            @refresh="handleRefresh"
          ></global-tags-view>
          <transition v-if="showView">
            <keep-alive :exclude="exclude">
              <router-view
                v-if="isRouterAlive"
                transition
                transition-mode="out-in"></router-view>
            </keep-alive>
          </transition>
          <div v-else>
            <macro-app-layout class="subapp">
            </macro-app-layout>
          </div>
        </a-layout-content>
        <a-layout-content v-else style="margin: 16px 16px 0;">
          <router-view
            v-if="showView"
            transition
            transition-mode="out-in"></router-view>
          <div v-else>
            <macro-app-layout class="subapp">
            </macro-app-layout>
          </div>
        </a-layout-content>
        <a-layout-footer>
          <global-footer></global-footer>
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
  import MacroAppLayout from '../layouts/MacroAppLayout.vue';
  import { Layout } from 'ant-design-vue';
  import { enquireScreen } from 'enquire-js';
  import GlobalMenus from '../components/GlobalMenus/GlobalMenus.jsx';
  import GlobalHeader from '../components/GlobalHeader/index.vue';
  import GlobalTagsView from '../components/GlobalTagsView/index.vue';
  import GlobalBreadcrumb from '../components/GlobalBreadcrumb/index.vue';
  import GlobalFooter from '../components/GlobalFooter/index.vue';
  import { router, getTitle } from '../utils/func';
  import { mapState, mapActions } from 'vuex';
  
  const ALayoutSider = Layout.Sider;
  const ALayoutHeader = Layout.Header;
  const ALayoutContent = Layout.Content;
  const ALayoutFooter = Layout.Footer;

  let isMobile;
  enquireScreen((b) => {
    isMobile = !!b;
  });

  export default {
    name: "SiderLayout",
    data: function() {
      return {
        isRouterAlive: true,
        exclude: null,
        title: [],
        routerData: [],
        lastRoutePath: '',
        isMobile: isMobile
      }
    },
    components: {
      MacroAppLayout,
      GlobalMenus,
      GlobalHeader,
      GlobalTagsView,
      GlobalBreadcrumb,
      GlobalFooter,
      ALayout: Layout,
      ALayoutSider,
      ALayoutHeader,
      ALayoutContent,
      ALayoutFooter
    },
    computed: {
      ...mapState([
        'menus', 'tabs', 'currentTab', 'setting', 'collapse'
      ]),
      showView: function() {
        return this.$route.path.indexOf('management') < 0;
      },
      transformMenus() {
        const mapMenu = {};
        const recursive = (list, nodePath, nameArr = []) => {
          return list.map((item) => {
            const { children: child, name } = item;
            if (child && child.length) {
              recursive(child, item.path, [...nameArr, name])
            } else {
              mapMenu[item.path] = [...nameArr, name];
            }
          });
        };
        recursive(this.menus);
        return mapMenu;
      }
    },
    methods: {
      ...mapActions([
        'closeTabs', 'chooseTabs', 'addTabs', 'initTabs', 'closeAllTabs', 'closeOtherTabs', 'changeCollapse'
      ]),
      handleCloseTabs(tab) {
        this.closeTabs(tab);
      },
      handleClickTabs(tab) {
        let fullPath;
        this.tabs.every((item) => {
          if (item.fullPath === tab) {
            fullPath = item.fullPath;
            return false;
          } else {
            return true;
          }
        });
        this.$router.push(fullPath);
      },
      handleCloseAllTabs() {
        this.closeAllTabs();
      },
      handleCloseOtherTabs() {
        this.closeOtherTabs();
      },
      handleRefresh() {
        this.isRouterAlive = !this.isRouterAlive;
        this.exclude = this.$route.name;
        this.$nextTick(function () {
          this.isRouterAlive = !this.isRouterAlive;
          this.exclude = null;
        })
      },
      handleChange: function (collapse) {
        this.changeCollapse(collapse)
      }
    },
    created() {
      enquireScreen((b) => {
        this.isMobile = !!b;
      })
    },
    mounted() {
      const arr = this.$route.path.split('/');
      let str = '';
      this.routerData = router.getRoutes(this.$router.options.routes);
      if (this.transformMenus[this.$route.fullPath]) {
        this.title = this.transformMenus[this.$route.fullPath];
      } else {
        const newArr = [];
        const nameArr = [];
        if (arr && arr.length) {
          for (let i = 1; i < arr.length; i += 1) {
            str = `${str}/${arr[i]}`;
            newArr.push(str);
          }
        }
        newArr.forEach((item) => {
          this.routerData.every((rItem) => {
            if (rItem.path === item) {
              const title = rItem.meta && rItem.meta.title ? rItem.meta.title : '';
              if (title) {
                nameArr.push(title);
              }
              return false;
            }
            return true;
          });
        });
        this.title = nameArr;
      }
      let title = this.$route.meta.title;
      if (this.menus && this.menus.length && !title) {
        if (getTitle(this.menus, this.$route.fullPath)) {
          title = getTitle(this.menus, this.$route.fullPath);
        } else {
          title = this.$route.path
        }
      } else if (!title) {
        title = this.$route.fullPath;
      }
      this.addTabs({ title, name: this.$route.name, fullPath: this.$route.fullPath, path: this.$route.path });
    },
    watch: {
      $route: function (newVal) {
        if (this.transformMenus[newVal.fullPath]) {
          this.title = this.transformMenus[newVal.fullPath];
        } else {
          const arr = newVal.path.split('/');
          let str = '';
          const newArr = [];
          const nameArr = [];
          if (arr && arr.length) {
            for (let i = 1; i < arr.length; i += 1) {
              str = `${str}/${arr[i]}`;
              newArr.push(str);
            }
          }
          newArr.forEach((item) => {
            this.routerData.every((rItem) => {
              if (rItem.path === item) {
                const title = rItem.meta.title || '';
                if (title) {
                  nameArr.push(title);
                }
                return false;
              }
              return true;
            });
          });
          this.title = nameArr;
        }
        let title = newVal.meta.title;
        if (!title && getTitle(this.menus, newVal.fullPath)) {
          title = getTitle(this.menus, newVal.fullPath);
        } else if (!title) {
          title = newVal.fullPath
        }
        this.addTabs({ title, name: newVal.name, fullPath: newVal.fullPath, path: this.$route.path });
      },
      'isMobile': function (newVal) {
        this.changeCollapse(newVal);
      }
    }
  }
</script>

<style scoped lang="less">
  .sider-layout{
    background-color: #f0f2f5;
    min-height: 100vh;
    height: 100%;
    .ant-layout-sider{
      background: var(--sg-global-menu-bg);
    }
    .ant-layout{
      min-height: 100%;
    }
    .ant-layout-header{
      padding: 0;
      background: #f0f2fa;
    }
  }
</style>