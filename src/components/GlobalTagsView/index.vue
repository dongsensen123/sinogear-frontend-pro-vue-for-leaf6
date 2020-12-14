<template>
  <div class="tab-container">
    <a-tabs
      v-model="pageCurrent"
      type="editable-card"
      :hideAdd="true"
      @tabClick="handleClick"
      @edit="onEdit"
    >
      <template v-for="item in tabs">
        <a-tab-pane
          :key="item.fullPath"
          :tab="item.title"
          :closable="item.name !== 'HomeContainer'"
          v-if="extraMenus.indexOf(item.name) < 0"
        >
        </a-tab-pane>
      </template>
    </a-tabs>
    <a-dropdown>
      <span class="tab-operation">
        <span>标签操作</span>
        <a-icon type="down" />
      </span>
      <a-menu slot="overlay" @click="handleCommand">
        <a-menu-item key="refresh">
          <span>
            <a-icon type="redo" />
            <span>刷新当前</span>
          </span>
        </a-menu-item>
        <a-menu-item key="other">
          <span>
            <a-icon type="close" />
            <span>关闭其他</span>
          </span>
        </a-menu-item>
        <a-menu-item key="all">
          <span>
            <a-icon type="close" />
            <span>关闭所有</span>
          </span>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
  import { Tabs, Dropdown, Menu, Icon } from 'ant-design-vue';
  
  const ATabPane = Tabs.TabPane;
  const AMenuItem = Menu.Item;
  
  export default {
    name: "GlobalTagsView",
    data: function() {
      return {
        pageCurrent: '',
        extraMenus: ['Exception401', 'Exception403', 'Exception404']
      }
    },
    components: {
      ATabs: Tabs, ATabPane, ADropdown: Dropdown, AMenu: Menu, AMenuItem, AIcon: Icon
    },
    methods: {
      onEdit(targetKey, action) {
        if (action === 'remove') {
          this.$emit('on-close', targetKey);
        }
      },
      handleClick(tag) {
        console.log('tag', tag);
        this.$emit('on-click', tag)
      },
      handleClose(tag) {
        this.$emit('on-close', tag);
      },
      handleCommand(val) {
        switch (val.key) {
          case 'all':
            this.$emit('close-all');
            break;
          case 'other':
            this.$emit('close-other');
            break;
          case 'refresh':
            this.$emit('refresh');
            break;
          default:
            return;
        }
      }
    },
    mounted: function () {
      this.pageCurrent = this.currentTab;
    },
    props: {
      tabs: Array,
      currentTab: String
    },
    watch: {
      currentTab(newVal) {
        this.pageCurrent = newVal;
      }
    }
  }
</script>

<style scoped lang="less">
  .tab-container{
    height: 41px;
    width: 100%;
    position: relative;
    background-color: #fff;
    .ant-dropdown-trigger{
      padding: 0 5px 0 10px;
      width: 90px;
      position: absolute;
      right: 0;
      top: 0;
      cursor: pointer;
      box-sizing: border-box;
      height: 40px;
      border-bottom: 1px solid #E4E7ED;
      border-left: 1px solid #E4E7ED;
      line-height: 41px;
    }
    .ant-tabs{
      width: calc(100% - 90px);
    }
  }
</style>