<template>
  <div class="global-login-box">
    <div>{{ title }}</div>
    <div @click="handleTipsClick" class="global-login-box_title" v-html="tips()"></div>
  </div>
</template>

<script>
  export default {
    name: "GlobalLoginBox",
    props: {
      title: {
        type: String,
        default: '账号注册'
      },
      tips: {
        type: Function,
        default: () => undefined
      }
    },
    methods: {
      handleTipsClick() {
        this.$emit('on-tips-click')
      }
    }
  }
</script>

<style scoped lang="less">
  .global-login-box{
    width: 100%;
    margin: 0 -16px 24px;
    position: relative;
    font-size: 24px;
    box-sizing: border-box;
    &_title{
      position: absolute;
      right: 0;
      bottom: 5px;
      font-size: 13px;
      line-height: inherit;
      color: #151515;
      margin-right: -32px;
    }
  }
</style>