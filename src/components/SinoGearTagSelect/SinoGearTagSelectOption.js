import { Tag } from 'ant-design-vue'
const { CheckableTag } = Tag;

export default {
  name: 'TagSelectOption',
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-tag-select-option'
    },
    value: {
      type: [String, Number, Object],
      default: ''
    },
    checked: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      localChecked: this.checked || false
    }
  },
  mounted() {
    this.localChecked = this.$parent.items[this.value];
  },
  watch: {
    'checked' (val) {
      this.localChecked = val
    },
    '$parent.items': {
      handler: function (val) {
        this.value && (this.localChecked = val[this.value]);
      },
      deep: true
    }
  },
  render () {
    const { $slots, value } = this;
    const onChange = (checked) => {
      this.$emit('change', { value, checked })
    };
    return (<CheckableTag style={{fontSize: '12px', marginRight: '24px', padding: '0 8px'}} key={value} vModel={this.localChecked} onChange={onChange}>
      {$slots.default}
      </CheckableTag>)
  }
}
