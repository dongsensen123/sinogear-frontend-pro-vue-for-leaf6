<template>
  <div class="user-container">
    <div class="login-container" v-if="$route.path === '/user/login'">
      <div class="head">
        <div class="system-box">
          <img alt="#" class="logo-img" src="./resources/images/favicon.png" />
          <div class="system-name">{{config.name}} {{config.fullName}}</div>
        </div>
      </div>
      <div class="banner-container">
        <div class="center">
          <div class="banner-content">
            <img alt="#" :src="Banner" />
          </div>
          <div class="login-form-box">
            <router-view transition transition-mode="out-in"></router-view>
          </div>
        </div>
      </div>
      <div class="footer-info">
        <p class="friend-link">
          <a>帮助</a>
          <a>隐私</a>
          <a>条款</a>
        </p>
        <p>
          Copyright
          <i class="iconfont sg-copyright" />
          {{ config.copyright + ' 出品' }}
        </p>
      </div>
    </div>
    <div v-else class="register-container">
      <div class="head">
        <div class="system-box">
          <img alt="#" class="logo-img" :src="config.logo" />
          <div class="system-name">{{config.name}} {{config.fullName}}</div>
        </div>
      </div>
      <div class="banner-container">
        <div class="center">
          <div class="banner-content">
            <img alt="#" class="bg_img" :src="Banner1" />
          </div>
          <div class="login-form-box">
            <router-view transition transition-mode="out-in"></router-view>
          </div>
        </div>
      </div>
      <div class="footer-info">
        <p class="friend-link">
          <a>帮助</a>
          <a>隐私</a>
          <a>条款</a>
        </p>
        <p>
          Copyright
          <i class="iconfont sg-copyright" />
          {{ config.copyright + ' 出品' }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import { config } from '../common/config';
  import Banner from './resources/images/login-item1.svg';
  import Banner1 from './resources/images/right-bg.png';
  export default {
    name: "LoginBasicLayout",
    data: () => {
      return {
        config: config,
        Banner,
        Banner1,
      }
    }
  }
</script>

<style scoped lang="less">
  @brand-color: #1e6ddd;
  .user-container {
    height: 100vh;
    overflow: hidden;
    .logo-img {
      width: 48px;
      height: 48px;
      display: inline-block;
      background-size: 48px;
      background-position: center;
      position: relative;
    }
  
    .login-container {
      .head {
        max-width: 1440px;
        margin: 0 auto;
        height: 10vh;
        position: relative;
      
        .system-box {
          position: absolute;
          top: 42%;
          transform: translateY(-50%);
          min-width: 247px;
        
          .system-name {
            font-size: 32px;
            color: #262626;
            display: inline-block;
            position: relative;
            left: 16px;
            top: 8px;
          }
        }
      }
    
      .banner-container {
        width: 100%;
        height: calc(82vh);
        padding: 8vh 0;
        background-color: @brand-color; //var(--primary-color);//#007AFF
        background-image: url('resources/images/bg-1.svg');
        background-repeat: no-repeat;
        background-size: 1920px 848px;
        background-position: 40%;
      
        .center {
          max-width: 1440px;
          //min-width: 800px;
          margin: 0px auto;
          position: relative;
          height: 100%;
        
          .banner-content {
            width: 62%;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
          
            img {
              width: 100%;
            }
          }
        
          .login-form-box {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 28%;
            min-width: 360px;
            background-color: #fff;
            padding: 24px 40px;
            box-sizing: border-box;
            border-radius: 8px;
          }
        }
      }
    
      .footer-info {
        text-align: center;
        padding-top: 16px;
      
        p {
          font-size: 14px;
          color: #595959;
          margin-bottom: 1em;
          a {
            color: #595959;
            margin: 0 24px;
          }
        }
      }
    }
  
    .register-container {
      background: #eaf0f7;
      overflow: hidden;
      .head {
        max-width: 1440px;
        margin: 0 auto;
        height: 10vh;
        position: relative;
      
        .system-box {
          position: absolute;
          top: 42%;
          transform: translateY(-50%);
          min-width: 247px;
        
          .system-name {
            font-size: 32px;
            color: #262626;
            display: inline-block;
            position: relative;
            left: 16px;
            top: 10px;
          }
        }
      }
    
      .banner-container {
        width: 80%;
        height: 82vh;
        margin: 1vh auto;
        position: relative;
        border-radius: 16px;
      
        .center {
          margin: 0 auto;
          position: relative;
          height: 100%;
          box-shadow: 0 0 10px #007aff24;
          border-radius: 16px;
          .banner-content {
            width: 64%;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            bottom: 0;
            background: #f2f8ff;
            height: 100%;
            border-radius: 16px 0 0 16px;
          
            .bg_img {
              height: 100%;
              transform: translateX(-50%) translateY(50%) scale(2);
            }
          }
        
          .login-form-box {
            position: absolute;
            left: 64%;
            top: 0;
            width: 36%;
            min-width: 360px;
            bottom: 0;
            border-radius: 0 16px 16px 0;
            background-color: #fff;
            padding: 24px 40px;
            box-sizing: border-box;
          }
        }
        & > img {
          position: absolute;
          top: 117px;
          left: -241px;
        }
      }
    
      .footer-info {
        text-align: center;
        padding-top: 16px;
        height: 12vh;
      
        p {
          font-size: 14px;
          color: #595959;
        
          a {
            color: #595959;
            margin: 0 24px;
          }
        }
      }
    }
  
    @media screen and (max-width: 1440px) {
      .login-container {
        .system-box {
          left: 4%;
        }
      
        .center {
          padding: 20px;
        
          .login-form-box {
            right: 40px !important;
          }
        }
      }
    
      .register-container {
        .system-box {
          left: 4%;
        }
      }
    }
  
    @media screen and (max-width: 900px) {
      .login-container {
        .system-box {
          left: 50%;
          transform: translate3d(-50%, -50%, 0) !important;
        }
      
        .center {
          padding: 20px;
        
          .login-form-box {
            position: relative !important;
            margin: 0 auto;
            right: auto !important;
          }
        
          .banner-content {
            display: none;
          }
        }
      }
    
      .register-container {
        .system-box {
          left: 50%;
          transform: translate3d(-50%, -50%, 0) !important;
        }
      
        .center {
          .login-form-box {
            position: relative !important;
            left: 50% !important;
            transform: translateX(-50%);
            border-radius: 16px !important;
          }
        
          .banner-content {
            display: none;
          }
        }
      }
    }
    @media screen and (max-width: 500px) {
      .type-change {
        display: none;
      }
    
      .login-container {
        .center {
          width: 100% !important;
        
          .login-form-box {
            width: 100% !important;
            box-sizing: border-box;
            padding: 20px;
            min-width: auto !important;
          }
        }
      }
    
      .register-container {
        .center {
          width: 100% !important;
        
          .login-form-box {
            width: 100% !important;
            box-sizing: border-box;
            padding: 20px;
            min-width: auto !important;
            border-radius: 16px !important;
          }
        }
      }
    }
  }
</style>