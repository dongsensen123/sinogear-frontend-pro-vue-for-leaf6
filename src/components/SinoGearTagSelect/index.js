import {Icon} from "ant-design-vue";
import PropTypes from 'ant-design-vue/es/_util/vue-types';
import Option from './SinoGearTagSelectOption';

const filterEmpty = (children = []) => {
  return children.filter(c => c.tag || (c.text && c.text.trim() !== ''))
};
export default {
  Option,
  name: 'TagSelect',
  components: {
    AIcon: Icon
  },
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-tag-select'
    },
    collapse: {
      type: Boolean,
      default: false
    },
    defaultValue: {
      type: PropTypes.array,
      default: null
    },
    value: {
      type: PropTypes.array,
      default: null
    },
    expandable: {
      type: Boolean,
      default: false
    },
    hideCheckAll: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      expand: false,
      localCheckAll: false,
      items: this.getItemsKey(filterEmpty(this.$slots.default)),
      val: this.value || this.defaultValue || [],
      size: window.innerWidth
    }
  },
  methods: {
    // 每一个选中项的onChange事件
    onChange (checked) {
      const key = Object.keys(this.items).filter(key => key === checked.value);
      this.items[key] = checked.checked;
      const bool = Object.values(this.items).lastIndexOf(false);
      if (bool === -1) {
        this.localCheckAll = true
      } else {
        this.localCheckAll = false
      }
    },
    onCheckAll (checked) {
      Object.keys(this.items).forEach(v => {
        this.items[v] = checked.checked
      });
      this.localCheckAll = checked.checked
    },
    getItemsKey (items) {
      const totalItem = {};
      items.forEach(item => {
        totalItem[item.componentOptions.propsData && item.componentOptions.propsData.value] = false;
      });
      return totalItem
    },
    // CheckAll Button
    renderCheckAll () {
      const props = {
        on: {
          change: (checked) => {
            this.onCheckAll(checked);
            checked.value = 'total';
            this.$emit('change', checked)
          }
        }
      };
      const checkAllElement = <Option key={'total'} checked={this.localCheckAll} {...props}>All</Option>;
      return !this.hideCheckAll && checkAllElement || null
    },
    // expandable
    renderExpandable () {
      const tagItems = filterEmpty(this.$slots.default);
      let showNum = 0;
      const screenSize = this.size;
      if (this.expand) {
        showNum = tagItems.length;
      } else {
        switch (true) {
          case screenSize >= 1600:
            showNum = tagItems.length - 1;
            break;
          case screenSize >= 1200:
            showNum = 9;
            break;
          case screenSize >= 930:
            showNum = 5;
            break;
          case screenSize >= 750:
            showNum = 2;
          break;
          default:
        }
      }
      return this.renderTags(tagItems.slice(0, showNum));
    },
    onResize() {
      const _this = this;
      window.onresize = function () {
        _this.size = window.innerWidth;
        _this.renderExpandable();
      }
    },
    // render option
    renderTags (items) {
      const listeners = {
        change: (checked) => {
          this.onChange(checked);
          this.$emit('change', checked)
        }
      };

      return items.map(vnode => {
        const options = vnode.componentOptions;
        options.listeners = listeners;
        return vnode
      })
    },
    handleChangeExpand() {
      this.expand = !this.expand;
    }
  },
  mounted() {
    this.onResize();
  },
  render () {
    const { $props: { prefixCls }, size } = this;
    const classString = {
      [`${prefixCls}`]: true
    };
    return (
      <div class={classString} id="tagsSelect">
        <div {...{
          style: {
            position: "relative !important",
            paddingRight: '85px'
          }
        }}>
          {this.renderCheckAll()}
          {this.renderExpandable()}
          <a onClick={this.handleChangeExpand} {...{
            style: {
              position: "absolute",
              width: '80px',
              top: 0,
              right: 0
            }
          }}>
            <span>{this.expand ? '收起' : '展开'}</span>
            <a-icon type={this.expand ? 'up' : 'down'} />
          </a>
        </div>
      </div>
  )
  }
}
