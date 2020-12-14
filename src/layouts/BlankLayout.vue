<template>
  <div class="blank-layout">
    <router-view transition transition-mode="out-in"></router-view>
    <div class="float-btn" @click="onClose" v-if="visible">
      <a-icon type="setting" />
    </div>
  </div>
</template>

<script>
  import { Icon } from 'ant-design-vue';
  import { mapActions, mapState } from 'vuex';
  export default {
    name: "BlankLayout",
    components: {
      AIcon: Icon
    },
    data: function() {
      return {
        visible: true
      }
    },
    computed: {
      ...mapState({
        drawer: state => state.drawer
      })
    },
    methods: {
      ...mapActions([
        'changeDrawer'
      ]),
      onClose() {
        this.changeDrawer(!this.drawer)
      }
    },
    created: function() {
      if (this.$route.path === '/guide') {
        this.visible = false;
      } else {
        this.visible = true;
      }
    },
    watch: {
      $route: function (newVal) {
        if (newVal.path === '/guide') {
          this.visible = false;
        } else {
          this.visible = true;
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .blank-layout{
    position: relative;
    .float-btn{
      right: 0;
      transform: translateY(-50%);
      position: fixed;
      top: 50%;
      width: 40px;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background-color: rgba(0, 0, 0, 0.45);
      border-radius: 20px;
      cursor: pointer;
    }
  }
</style>