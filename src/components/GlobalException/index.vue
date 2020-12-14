<template>
  <div class="exception">
    <div class="imgBlock">
      <div class="imgEle" :style="styleObj" />
    </div>
    <div class="content">
      <h1>{{ title || config[pageType].title }}</h1>
      <div class="desc">{{ desc || config[pageType].desc }}</div>
      <div class="actions">
        <a-button type="primary"><router-link :to="type === '401' ? '/user/login' : '/'">{{ type === '401' ? time + '后返回登录页面' : '返回首页' }}</router-link></a-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { Button } from 'ant-design-vue';
  import SVG_401 from './resources/401.svg';
  import SVG_403 from './resources/403.svg';
  import SVG_404 from './resources/404.svg';
  import SVG_500 from './resources/500.svg';

  const config = {
    401: {
      img: SVG_401,
      title: '401',
      desc: '抱歉，你未通过认证，请先登陆身份认证',
    },
    403: {
      img: SVG_403,
      title: '403',
      desc: '抱歉，你没有访问权限，五秒后将自动跳转到登录页面',
    },
    404: {
      img: SVG_404,
      title: '404',
      desc: '抱歉，你访问的页面不存在',
    },
    500: {
      img: SVG_500,
      title: '500',
      desc: '抱歉，服务器出错了',
    },
  };

  export default {
    name: "GlobalException",
    components: {
      AButton: Button
    },
    props: {
      type: String,
      img: String,
      title: String,
      desc: String
    },
    data: function () {
      const pageType = this.type in config ? this.type : '404';
      return {
        styleObj: {
          backgroundImage: `url(${this.img || config[pageType].img})`
        },
        config: config,
        pageType: pageType,
        time: 5
      }
    },
    methods: {
      autoRedirectLogin() {
        if (this.time - 1 <= 0) {
          this.goLogin();
        } else {
          const self = this;
          this.time -= 1;
          setTimeout(self.autoRedirectLogin, 1000)
        }
      },
      goLogin() {
        this.$router.push('/user/login');
      }
    },
    created() {
      if (this.type === '401') {
        this.autoRedirectLogin();
      }
    }
  }
</script>

<style scoped lang="less">
  .exception {
    display: flex;
    align-items: center;
    height: 100%;
    
    .imgBlock {
      flex: 0 0 50%;
      width: 50%;
      padding-right: 152px;
      &::before {
        display: table;
        content: '';
      }
      &::after {
        // https://github.com/ant-design/ant-design/issues/21864
        display: table;
        clear: both;
        content: '';
      }
    }
    
    .imgEle {
      height: 360px;
      width: 100%;
      max-width: 430px;
      float: right;
      background-repeat: no-repeat;
      background-position: 50% 50%;
      background-size: 100% 100%;
    }
    
    .content {
      flex: auto;
      
      h1 {
        color: #9fd3ff;
        font-size: 72px;
        font-weight: 600;
        line-height: 72px;
        margin-bottom: 24px;
      }
      
      .desc {
        color: #9fd3ff;
        font-size: 20px;
        line-height: 28px;
        margin-bottom: 16px;
      }
      
      .actions {
        button:not(:last-child) {
          margin-right: 8px;
        }
      }
    }
  }
</style>