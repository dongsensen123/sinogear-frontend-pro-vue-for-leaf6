import { Menu, Icon } from 'ant-design-vue';
import PropTypes from 'ant-design-vue/es/_util/vue-types';
import { mapState } from 'vuex';
import cloneDeep from 'lodash.clonedeep';
import { config } from '../../common/config';
import './GlobalMenus.less';

const { Item: MenuItem, SubMenu } = Menu;

export const MenuProps = {
  theme: PropTypes.string.def('dark')
};

const renderMenu = (h, item, subProps) => {
  if (item) {
    const bool = item.children && item.children.length;
    return bool ? renderSubMenu(h, item, subProps) : renderMenuItem(h, item)
  }
};

const renderSubMenu = (h, item, subProps) => {
  return (
    <SubMenu
      {...subProps}
      key={item.path || item.id}
      title={(
        <span>
          {renderIcon(h, item.icon)}
          <span>{renderTitle(h, item.name)}</span>
        </span>
      )}
      popupClassName="sg-popper-menu"
    >
      {item.children.map(child => renderMenu(h, child, subProps))}
    </SubMenu>
  )
};

const renderMenuItem = (h, item) => {
  return (
    <MenuItem key={item.path || item.id}>
      {renderIcon(h, item.icon)}
      {renderTitle(h, item.name)}
    </MenuItem>
  )
};

const renderIcon = (h, icon) => {
  if (icon === undefined || icon === 'none' || icon === null) {
    return null
  }
  return <Icon type={icon}></Icon>
};

const renderTitle = (h, title) => {
  return <span>{title}</span>
};

const GlobalMenus = {
  name: 'GlobalMenus',
  props: MenuProps,
  data() {
    return {
      openKeys: [],
      selectedKeys: []
    }
  },
  computed: {
    ...mapState({
      menus: state => state.menus,
      layout: state => state.setting.layout,
      collapse: state => state.collapse
    }),
    logo() {
      if (!this.collapse || this.layout === 'header-layout') {
        return <h1>SinoGear - Leaf6</h1>;
      } else {
        return null;
      }
    },
    uuid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    },
    transformMenus() {
      const mapMenu = {};
      const recursive = (list, nodePath, openPathKey = []) => {
        return list.map((item) => {
          const { children: child, path, id } = item;
          if (child && child.length) {
            recursive(child, item.path, [...openPathKey, path || id || this.uuid])
          } else {
            mapMenu[item.path] = openPathKey;
          }
        });
      };
      recursive(this.menus);
      return mapMenu;
    },
    getMenusPath() {
      const getMenus = function (data, arr = []) {
        data.forEach((item) => {
          if (item.path || item.id) {
            arr.push(item.path || item.id);
          }
          if (item.children && item.children.length) {
            getMenus(item.children, arr);
          }
        });
        return arr;
      };
      if(this.menus && this.menus.length) {
        const arr = getMenus(this.menus);
        return arr;
      } else {
        return [];
      }
    }
  },
  render(h) {
    const { menus, layout, theme } = this;
    const props = {
      mode: layout === 'sider-layout' ? 'inline' : 'horizontal',
      selectedKeys: this.selectedKeys,
      theme
    };
    if (this.layout === 'sider-layout' && !this.collapse) {
      props.openKeys = this.openKeys;
    }
    const dynamicProps = {
      props: props,
      on: {
        select: this.handleSelect,
        click: this.handleClickItem
      }
    };
    const menuItems = menus.map((item) => {
      if (layout === 'sider-layout') {
        return renderMenu(h, item, {on: {titleClick: this.handleClick}});
      } else {
        return renderMenu(h, item, {});
      }
    });
    return (
      <div
        class={layout === 'header-layout'
            ? 'global-menus-container global-menus-horizontal' : 'global-menus-container global-menus'}
        style={layout === 'sider-layout' ? !this.collapse ? {width: '208px'} : {width: '48px'} : {}}
      >
        <div class={this.collapse ? 'menus-collapse-logo menus-logo' : 'menus-logo'}>
          <router-link to="/">
            <img src={require('../../../public/favicon.png')} alt="logo" />
            {this.logo}
          </router-link>
        </div>
        <Menu style={{ width: '100%' }} {...dynamicProps}>{menuItems}</Menu>
        {layout === 'sider-layout' ? (
          <div class="menus-footer" onClick={this.handleFoldClick}>
            {this.collapse ? <Icon type="menu-unfold"/> : <Icon type="menu-fold"/>}
          </div>
        ) : null}
      </div>
    )
  },
  methods: {
    handleFoldClick() {
      this.$emit('on-collapse-change', !this.collapse);
    },
    handleSelect({key}) {
      this.selectedKeys = [key];
      this.openKeys = this.transformMenus[key];
    },
    handleClick({ key }) {
      const arr = cloneDeep(this.openKeys || []);
      if (arr.indexOf(key) > -1) {
        arr.splice(arr.indexOf(key), 1);
      } else {
        arr.push(key);
      }
      this.openKeys = arr;
    },
    handleClickItem({ key }) {
      if (key && key.indexOf('http') > -1 || key && key.indexOf('https') > -1) {
        window.location.href = key;
      } else {
        this.$router.push(key);
      }
    }
  },
  created() {
    this.selectedKeys = [this.$route.fullPath];
    this.openKeys = [];
  },
  mounted() {
    this.openKeys = this.transformMenus[this.$route.fullPath];
  },
  watch: {
    $route: function(newVal) {
      if (newVal.path !== '/exception/404' &&
        this.getMenusPath.indexOf(newVal.fullPath) > -1 || config.menusControl.indexOf(newVal.fullPath) > -1) {
        this.selectedKeys = [newVal.fullPath];
        this.openKeys = this.transformMenus[newVal.fullPath];
      }
    },
    'menus': function () {
      this.openKeys = this.transformMenus[this.$route.fullPath];
    }
  }
};

export default GlobalMenus;