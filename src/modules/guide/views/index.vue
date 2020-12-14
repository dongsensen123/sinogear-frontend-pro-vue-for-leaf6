<template>
  <div class="index-container-bd">
    <div class="section-top">
      <div class="index-nav">
        <div class="index-container-center">
          <div class="logo">
            <img alt="#" src="./resources/images/logo.svg" />
            <span>赛姬SinoGear</span>
          </div>
          <div class="nav_list">
            <a href="http://192.168.14.33:9100/">文档中心</a>
            <router-link to="http://gitlab.ggjs.sinobest.cn/Frontend/vue/sinogear-frontend-component-vue/tags">更新日志</router-link>
            <a-button
              type="primary"
              shape="round"
              size="large"
              @click="() => {$router.push({path: '/user/login', query: $route.query})}"
            >
            在线体验
            </a-button>
          </div>
        </div>
      </div>
      <div class="index-banner index-container-center">
        <h1>全方位助力智慧新政务业态的数字化建设</h1>
        <h3>一套完善的构建现代web应用的快速开发平台，更是一套解决方案</h3>
        <div class="btn-group">
          <a-button
            type="primary"
            shape="round"
            size="large"
            @click="() => {$router.push({path: '/user/login', query: $route.query})}"
          >
          在线体验
          </a-button>
          <a-button
            shape="round"
            size="large"
            @click="() => {$router.push({path: '/user/login', query: $route.query})}"
          >
            快速开始
          </a-button>
        </div>
        <div class="banner-box">
          <img alt="#" src="./resources/images/bg_mac.svg" />
        </div>
      </div>
    </div>
    <div class="index-bd index-container-center">
      <div class="section-title">
        <h1>产品优势</h1>
        <div class="tips">针对业务特点构建一个功能齐全、简单易学、易用的开发框架</div>
      </div>
      <a-row
        :gutter="[
          { xs: 16, sm: 16, md: 24, lg: 24 },
          { xs: 16, sm: 16, md: 24, lg: 24 }
        ]"
      >
        <a-col :xs=24 :md=12>
          <div class="item-box">
            <div class="item-icon">
              <img alt="#" src="./resources/images/item_1.svg" />
            </div>
            <h2>服务化</h2>
            <p>
              本框架能构建基于服务形式的应用，通过构建服务架构使得应用能够方便地嵌入到云开放平台之中，
              使得云开放平台中的服务可以通过本框架进行开发。为了满足服务化的原则，要求框架能具有方便开发出服务接口，方便部署，运行监控等功能。
            </p>
          </div>
        </a-col>
        <a-col :xs=24 :md=12>
          <div class="item-box">
            <div class="item-icon">
              <img alt="#" src="./resources/images/item_2.svg" />
            </div>
            <h2>模块化</h2>
            <p>
              框架是构建在各个不同功能的模块的基础上的，在项目组织上，每一个模块是单独的一个项目，通过Maven进行打包发布为一个个Jar文件。
              其中，使用了Spring-Boot的自动配置功能为模块提供默认的配置，使用Servlet3和Component-Scan功能自动搜索在ClassPath路径中的类文件。通过这些措施使得模块的应用是无缝的。
            </p>
          </div>
        </a-col>
        <a-col :xs=24 :md=12>
          <div class="item-box">
            <div class="item-icon">
              <img alt="#" src="./resources/images/item_3.svg" />
            </div>
            <h2>快速开发</h2>
            <p>
              在框架的规划中，会根据业务特点需要，创建代码生成工具辅助工程的快速开发。
              一般的Web应用，会采用MVC架构和分层的思想，业务特点围绕表单应用、查询应用展开，因此代码生成器专注于生成相关的模板代码，提高开发过程中的效率。
            </p>
          </div>
        </a-col>
        <a-col :xs=24 :md=12>
          <div class="item-box">
            <div class="item-icon">
              <img alt="#" src="./resources/images/item_4.svg" />
            </div>
            <h2>前后端分离</h2>
            <p>
              前后端分离，是前端后端两种角色的关注点分离。随着前端页面的要求越来越高，前端需要摆脱以往粗放的开发模式迈入工程化的道路上。
              因此采用分离的方式能让专业的人员专注于具体的一方。前后端分离后，前端负责页面的编写，后端负责服务接口的开发，两者通过约定的规范开发，最终整合一起构建完整的应用。
            </p>
          </div>
        </a-col>
      </a-row>
      
      <div class="inroduction">
        <div class="section-title">
          <h1>产品特性</h1>
          <div class="tips">针对业务特点构建一个功能齐全、简单易学、易用的开发框架</div>
        </div>
        <a-row>
          <a-col :xs=24 :md=16>
            <div class="part-img right">
              <div class="img-box">
                <img alt="#" src="./resources/images/intro_1.svg" />
              </div>
            </div>
          </a-col>
          <a-col :xs=24 :md=8>
            <h2 class="block-title">
              丰富的应用
              <span>场景</span>
            </h2>
            <div class="block-inbox">
              <ul>
                <li>
                  <h3>企业级应用</h3>
                  <p>传统的B/S企业级单体应用，提供必要的开发组件，使用代码生成器快速开发业务代码，提供开发效率。</p>
                </li>
                <li>
                  <h3>大规模微服务应用</h3>
                  <p>提供微服务的生态圈产品支持，框架能快速高效地与各项服务对接联通。</p>
                </li>
                <li>
                  <h3>重前端应用</h3>
                  <p>可以灵活应用各工程中心现有框架编写后端服务接口，搭配赛姬前端框架实现复杂功能页面。</p>
                </li>
                <li>
                  <h3>企业级应用</h3>
                  <p>传统的B/S企业级单体应用，提供必要的开发组件，使用代码生成器快速开发业务代码，提供开发效率。</p>
                </li>
              </ul>
            </div>
          </a-col>
        </a-row>
        <br />
        <br />
        <br />
        <a-row>
          <a-col :xs=24 :md=8>
            <h2 class="block-title">
              全方位安全
              <span>防护</span>
            </h2>
            <div class="block-inbox">
              <ul>
                <li>
                  <h3>企业级应用</h3>
                  <p>传统的B/S企业级单体应用，提供必要的开发组件，使用代码生成器快速开发业务代码，提供开发效率。</p>
                </li>
                <li>
                  <h3>大规模微服务应用</h3>
                  <p>提供微服务的生态圈产品支持，框架能快速高效地与各项服务对接联通。</p>
                </li>
                <li>
                  <h3>重前端应用</h3>
                  <p>可以灵活应用各工程中心现有框架编写后端服务接口，搭配赛姬前端框架实现复杂功能页面。</p>
                </li>
                <li>
                  <h3>企业级应用</h3>
                  <p>传统的B/S企业级单体应用，提供必要的开发组件，使用代码生成器快速开发业务代码，提供开发效率。</p>
                </li>
              </ul>
            </div>
          </a-col>
          <a-col :xs=24 :md=16>
            <div class="part-img left">
              <div class="img-box">
                <img alt="#" src="./resources/images/intro_1.svg" />
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
    <div class="index-framework">
      <div class="index-container-center">
        <a-row
          :gutter="[
            { xs: 16, sm: 16, md: 80, lg: 80 },
            { xs: 16, sm: 16, md: 80, lg: 80 }
          ]"
        >
          <a-col :xs=24 :md=12>
            <h2 class="block-title">技术架构</h2>
            <div class="block-inbox">
              <p>
                提供sinogear-cli、sinogear-blank等工具和项目最佳实践指南（一整套项目开发方案），助力项目快速开发 ——
                项目脚手架、项目开发(最佳实践)、项目构建等
              </p>
              <p>企业统一应用开发框架，用来支持动态网站、网络应用程序及网络服务的开发</p>
              <p>
                有助于减轻网页开发时共通性活动的工作负荷，如许多框架提供数据库访问接口、标准样板以及会话管理等，可提升代码的可重用性
              </p>
            </div>
            <div class="img-box">
              <img alt="#" src="./resources/images/frame_1.svg" />
            </div>
          </a-col>
          <a-col :xs=24 :md=12>
            <div class="part-img">
              <div class="img-box">
                <img alt="#" src="./resources/images/frame_2.svg" />
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
  import { Row, Col, Button } from 'ant-design-vue';
  export default {
    name: "GuideContainer",
    components: {
      ARow: Row, ACol: Col, AButton: Button
    }
  }
</script>

<style scoped lang="less">
  .index-container-bd {
    .section-top {
      width: 100%;
      overflow-x: hidden;
      background-size: 1942px 1070px;
      background-position: top left;
      background-repeat: no-repeat;
      background-image: url('./resources/images/head_bg.png');
    }
    
    .index-container-center {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .index-nav {
      height: 90px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      
      .index-container-center {
        display: flex;
        
        .logo {
          min-width: 300px;
          
          img {
            width: 40px;
            height: 38px;
            position: relative;
            top: -8px;
          }
          
          span {
            font-size: 32px;
            color: #fff;
            line-height: 90px;
            font-weight: 400;
            margin-left: 10px;
          }
        }
        
        .nav_list {
          flex: 1;
          text-align: right;
          
          a {
            line-height: 90px;
            color: #fff;
            font-size: 20px;
            margin-right: 32px;
          }
          
          .ant-btn-primary {
            background-color: #20df9f;
            border-color: #20df9f;
            box-shadow: none;
            font-size: 20px;
          }
          
          .ant-btn-primary:hover {
            background-color: #40eab1;
          }
        }
      }
    }
    
    .index-banner {
      h1 {
        text-align: center;
        color: #fff;
        font-size: 48px;
        font-weight: normal;
        line-height: 1.5;
        margin-top: 70px;
      }
      
      h3 {
        text-align: center;
        color: #fff;
        font-size: 24px;
        font-weight: normal;
        line-height: 1.5;
      }
      
      .btn-group {
        text-align: center;
        margin-top: 30px;
        
        .ant-btn {
          box-shadow: none;
          font-size: 20px;
          color: #fff;
          background: none;
          border-color: #fff;
          margin: 30px;
        }
        
        .ant-btn-primary {
          background-color: #20df9f;
          border-color: #20df9f;
        }
      }
      
      .banner-box {
        width: 100%;
        padding-top: 8%;
        position: relative;
        
        img {
          width: 110%;
          position: relative;
          left: 50%;
          transform: translateX(-50%);
        }
      }
      
      .banner-box:before {
        content: '';
        display: table;
        width: 55%;
        height: 20%;
        background-image: url('./resources/images/welcome.png');
        background-repeat: no-repeat;
        background-size: 100%;
        background-position: top right;
        position: absolute;
        right: 54%;
        top: 0;
      }
    }
    
    .section-title {
      margin-top: 60px;
      text-align: center;
      margin-bottom: 50px;
      
      h1 {
        font-size: 40px;
      }
    }
    
    .index-bd {
      margin-top: 120px;
      
      .a-row {
        .a-col {
          min-height: 461px;
          padding: 12px;
        }
      }
      
      .item-box {
        min-height: 461px;
        border-radius: 4px;
        background: #fff;
        box-shadow: 0 0px 8px rgba(0, 0, 0, 0.1);
        box-sizing: border-box;
        padding: 50px;
        
        .item-icon {
          text-align: center;
          
          img {
            display: inline-block;
            position: relative;
            left: -3px;
          }
        }
        
        h2 {
          text-align: center;
          margin-top: 20px;
          margin-bottom: 30px;
        }
        
        p {
          text-align: justify;
          font-size: 16px;
        }
      }
    }
    
    .inroduction {
      margin-top: 120px;
      
      .block-title {
        font-size: 32px;
        
        span {
          color: #007aff;
        }
      }
      
      .block-inbox {
        ul {
          padding: 0;
          
          li {
            list-style: none;
            padding: 16px;
            margin-bottom: 8px;
            
            p {
              margin-bottom: 0;
            }
          }
          
          li:hover {
            background: #f6f6f6;
          }
        }
      }
      
      .part-img {
        .img-box {
          width: 100%;
          position: relative;
          top: 6px;
          box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
          
          img {
            width: 100%;
          }
        }
      }
      
      .right {
        padding-right: 40px;
      }
      
      .left {
        padding-left: 40px;
      }
    }
    
    .index-framework {
      margin: 100px 0;
      background-color: #f7f7f7;
      padding: 80px 0;
      
      .block-title {
        font-size: 40px;
      }
      
      .block-inbox {
        font-size: 16px;
        margin: 30px 0 60px 0;
      }
      
      .img-box {
        width: 100%;
        
        img {
          width: 100%;
        }
      }
    }
    
    .index-case {
    }
  }
  
  @media screen and (min-width: 1000px) and (max-width: 1200px) {
    .index-nav {
      .index-container-center {
        padding: 0 60px !important;
      }
    }
    
    .section-top {
      .index-banner {
        padding: 0 60px !important;
      }
    }
    
    .banner-box {
      width: 80%;
      margin: 0 auto;
    }
    
    .index-container-bd {
      .index-bd {
        padding: 0 40px;
        
        .item-box {
          min-height: 485px;
        }
      }
    }
    
    .index-framework {
      padding: 80px 40px !important;
    }
  }
  @media screen and (max-width: 860px) {
    .index-bd {
      .item-box {
        min-height: 509px;
      }
    }
    
    .index-container-bd {
      .section-top {
        background-position: bottom center;
        padding: 0 20px;
      }
      
      .index-banner {
        h1 {
          font-size: 32px;
        }
        
        h3 {
          font-size: 16px;
        }
      }
      
      .banner-box {
        width: 80%;
        margin: 0 auto;
      }
    }
    
    .index-nav {
      position: relative;
      
      .nav_list {
        display: none;
      }
      
      .logo {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        min-width: 242px !important;
      }
    }
  }
  @media screen and (max-width: 768px) {
    .index-bd {
      padding: 0 40px;
      margin-top: 40px !important;
    }
    
    .index-framework {
      margin: 30px 0;
      padding: 80px 40px !important;
      
      .a-col:nth-child(1) {
        margin-bottom: 60px;
      }
    }
  }
  @media screen and (min-width: 768px) and (max-width: 1000px) {
    .index-nav {
      padding: 0 40px;
    }
    
    .index-container-bd {
      .index-bd {
        padding: 0 40px;
        
        .item-box {
          min-height: 533px;
        }
      }
    }
    
    .section-top {
      .index-banner {
        padding: 0 60px !important;
      }
    }
    
    .index-framework {
      padding: 80px 40px !important;
    }
  }
  @media screen and (max-width: 450px) {
    .index-bd {
      padding: 0 40px !important;
    }
    
    .index-container-center {
      padding: 0;
    }
    
    .index-container-bd {
      .section-top {
        background-position: bottom center;
        padding: 0 40px;
      }
      
      .index-banner {
        h1 {
          font-size: 24px;
        }
        
        h3 {
          font-size: 14px;
        }
      }
      
      .banner-box {
        width: 80%;
        margin: 0 auto;
      }
      
      .btn-group {
        button:nth-child(2) {
          display: none;
        }
      }
    }
    
    .index-nav {
      position: relative;
      border-bottom: 0 !important;
      padding-top: 60px;
      text-align: center;
      margin-bottom: 120px;
      
      .nav_list {
        display: none;
      }
      
      .logo {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        min-width: 200px !important;
        
        img {
          width: 60px !important;
          height: 57px !important;
          top: -40px !important;
          position: absolute !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
        }
        
        span {
          font-size: 20px !important;
        }
      }
    }
  }
</style>