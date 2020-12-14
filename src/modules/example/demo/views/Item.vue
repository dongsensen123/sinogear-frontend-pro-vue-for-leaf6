<template>

  <a-col
      :xs="colResponsiveProps.xs"
      :sm="colResponsiveProps.sm"
      :md="colResponsiveProps.md"
      :lg="colResponsiveProps.lg"
      :xl="colResponsiveProps.xl"
      class="demo_home_col">
    <a-card class="demo_home_card" @click="handleCardClick">
      <slot />
    </a-card>
  </a-col>
</template>

<script>
  import { Col, Card } from 'ant-design-vue';
  export default {
    name: "ExampleColItem",
    props: {
      name: {
        type: String,
        default: undefined
      }
    },
    data() {
      return {
        colResponsiveProps: {
          xs: 24,
          sm: 12,
          md: 12,
          lg: 12,
          xl: 8
        }
      }
    },
    components: {
      ACol: Col,
      ACard: Card
    },
    methods: {
      handleCardClick() {
        this.$emit('click', this.name)
      }
    }
  }
</script>

<style lang="less">
  .demo_home {
    min-height: 500px;
    height: 60%;
    .demo_home_row {
      margin: 0 15px 15px;
      .demo_home_card {
        width: 100%;
        text-align: center;
        cursor: pointer;
        /*.demo_home_icon {*/
        /*  font-size: 40px;*/
        /*  color: #fa7a7a;*/
        /*  margin-bottom: 10px;*/
        /*}*/
      }
    }
    .demo_home_col {
      margin-bottom: 24px;
    }
  }

</style>