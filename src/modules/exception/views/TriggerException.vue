<template>
  <div class="trigger-container">
    <a-button type="danger" @click="trigger('401')">触发401</a-button>
    <a-button type="danger" @click="trigger('403')">触发403</a-button>
    <a-button type="danger" @click="trigger('404')">触发404</a-button>
    <a-button type="danger" @click="trigger('422')">触发422</a-button>
    <a-button type="danger" @click="trigger('500')">触发500</a-button>
  </div>
</template>

<script>
  import { Button } from 'ant-design-vue';
  import { mapActions } from 'vuex';
  
  export default {
    name: "TriggerException",
    components: {
      AButton: Button
    },
    methods: {
      ...mapActions('exception', [
        'queryException'
      ]),
      trigger(type) {
        this.queryException(type);
      }
    }
  }
</script>

<style scoped lang="less">
  .trigger-container{
    width: 100%;
    padding: 24px;
    background: #fff;
    .ant-btn{
      margin-right: 12px;
    }
  }
</style>