<template>
  <div class="header-layout">
    <a-layout>
      <a-layout-header>
        <global-header></global-header>
      </a-layout-header>
      <a-layout-content v-if="setting.enableMultiTags" :style="setting.enableMultiTags ? {} : {margin: '16px 16px 0'}">
        <global-tags-view
          style="margin-bottom: 16px"
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
      <a-layout-content v-else :style="setting.showBreadcrumb ? {} : {margin: '16px 16px 0'}">
        <global-breadcrumb style="margin-bottom: 16px" v-if="setting.showBreadcrumb" :title="title"></global-breadcrumb>
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
  </div>
</template>

<script>
  import { Layout } from 'ant-design-vue';
  import { mapState, mapActions } from 'vuex';
  import GlobalHeader from '../components/GlobalHeader/index.vue'
  import GlobalTagsView from '../components/GlobalTagsView/index.vue';
  import GlobalBreadcrumb from '../components/GlobalBreadcrumb/index.vue';
  import GlobalFooter from '../components/GlobalFooter/index.vue';
  import MacroAppLayout from '../layouts/MacroAppLayout.vue';
  import { router, getTitle } from '../utils/func';

  const ALayoutHeader = Layout.Header;
  const ALayoutContent = Layout.Content;
  const ALayoutFooter = Layout.Footer;
  
  export default {
    name: "HeaderLayout",
    components: {
      GlobalHeader,
      GlobalTagsView,
      GlobalBreadcrumb,
      GlobalFooter,
      ALayout: Layout,
      ALayoutHeader,
      ALayoutContent,
      ALayoutFooter,
      MacroAppLayout
    },
    data: function() {
      return {
        isRouterAlive: true,
        exclude: null,
        title: [],
        routerData: []
      }
    },
    computed: {
      ...mapState([
        'tabs', 'currentTab', 'setting', 'menus'
      ]),
      showView: function() {
        return this.$route.path.indexOf('management') < 0;
      }
    },
    methods: {
      ...mapActions([
        'closeTabs', 'chooseTabs', 'addTabs', 'initTabs', 'closeAllTabs', 'closeOtherTabs'
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
          }
          return true;
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
      }
    },
    mounted() {
      const arr = this.$route.path.split('/');
      let str = '';
      const newArr = [];
      const nameArr = [];
      if (arr && arr.length) {
        for (let i = 1; i < arr.length; i += 1) {
          str = `${str}/${arr[i]}`;
          newArr.push(str);
        }
      }
      this.routerData = router.getRoutes(this.$router.options.routes);
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
      let title = this.$route.meta.title;
      if (!title && this.menus && this.menus.length) {
        if (getTitle(this.menus, this.$route.fullPath)) {
          title = getTitle(this.menus, this.$route.fullPath);
        } else {
          title = this.$route.fullPath;
        }
      } else {
        title = this.$route.fullPath;
      }
      this.addTabs({ title, name: this.$route.name, fullPath: this.$route.fullPath, path: this.$route.path });
    },
    watch: {
      $route: function (newVal) {
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
        let title = newVal.meta.title;
        if (!title && getTitle(this.menus, newVal.fullPath)) {
          title = getTitle(this.menus, newVal.fullPath);
        } else if (!title) {
          title = newVal.fullPath
        }
        this.addTabs({ title, name: newVal.name, fullPath: newVal.fullPath, path: this.$route.path });
      }
    }
  }
</script>

<style scoped lang="less">
  .header-layout{
    background-color: #f0f2f5;
    min-height: calc(100vh);
    .ant-layout-header{
      padding: 0;
      height: 48px;
      line-height: 48px;
      background: var(--sg-header-bg);
    }
  }
</style>