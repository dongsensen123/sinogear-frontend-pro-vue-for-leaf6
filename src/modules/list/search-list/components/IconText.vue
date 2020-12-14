<template>
  <span>
    <a-icon :type="type" style="margin-right: 8px" />
    {{ text }}
  </span>
</template>

<script>
  import {Icon} from 'ant-design-vue';
  export default {
    name: 'IconText',
    components: {
      AIcon: Icon
    },
    props: {
      'type': {
        type: String,
        required: true
      },
      text: {
        type: [String, Number],
        required: true
      }
    }
  }
</script>
