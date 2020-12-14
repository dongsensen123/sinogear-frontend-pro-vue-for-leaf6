<template>
  <div class="breadcrumb-container">
    <div class="content">
      <span v-for="(item, index) in title" :key="item">
        <span
          :style="index === title.length -1 ? {color: 'rgba(0, 0, 0, 0.65)'} : {color: 'rgba(0, 0, 0, 0.45)'}"
        >
          {{ item }}
        </span>
        <span v-if="index !== title.length - 1" style="margin: 0 6px;">/</span>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    props: {
      title: Array
    }
  }
</script>

<style scoped lang="less">
  .breadcrumb-container{
    height: 41px;
    line-height: 41px;
    color: rgba(0, 0, 0, 0.45);
    padding-bottom: 16px;
    background-color: #f0f2f5;
    width: 100%;
    .content{
      background-color: #fff;
      width: 100%;
      padding-left: 32px;
      box-sizing: border-box;
    }
  }
</style>