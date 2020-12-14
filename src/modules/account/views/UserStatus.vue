<template>
  <div class="user-status-container">
    <div v-for="item in data" :key="item.key" class="list-item">
      <div class="left">
        <div class="title">{{ item.title }}</div>
        <!--<div class="description">{{ item.description }}</div>-->
      </div>
      <div class="right">
        <p>{{ dataFormat(item) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';
  // import { mapActions, mapState } from 'vuex';
  export default {
    name: "UserStatus",
    data: function () {
      return {
        data: [
          {
            title: '在线状态',
            description: '在线',
            key: 'data1'
          },
          {
            title: '登录次数',
            description: 89,
            key: 'data2'
          },
          {
            title: '最后登录时间',
            description: 'lastLogin',
            key: 'data3'
          }
        ]
      }
    },
    // computed: {
    //   ...mapState({
    //     userSatus: state => state.account.userSatus
    //   })
    // },
    methods: {
      // ...mapActions('account', [
      //   'getUserStatus'
      // ]),
      dataFormat(item) {
        return item.description === 'lastLogin'
          ? moment().format('YYYY-MM-DD HH:mm:ss')
          : item.description;
      }
    },
    created() {
      // this.getUserStatus();
    }
  }
</script>

<style scoped lang="less">
  .user-status-container{
    .list-item{
      border-bottom: 1px solid #e8e8e8;
      padding: 14px 0;
      display: flex;
      align-items: center;
      .left{
        flex: 1 1;
        .title{
          align-items: flex-start;
          margin-bottom: 4px;
          color: rgba(0, 0, 0, 0.65);
        }
        .description{
          color: rgba(0, 0, 0, 0.45);
          font-size: 14px;
          line-height: 22px;
        }
      }
      .right{
        margin-left: 48px;
        flex: 0 0 auto;
      }
    }
  }
</style>