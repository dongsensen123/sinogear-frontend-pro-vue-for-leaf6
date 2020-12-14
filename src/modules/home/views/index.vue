<template>
  <div class="home-container">
    <div class="content">
      <img class="logo" src="../resources/images/sinogear.svg" alt="sinogear" />
      <h1>HELLO! SINOGEAR VUE!</h1>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomeContainer"
  }
</script>

<style scoped lang="less">
  .home-container{
    background-color: #fff;
    padding: 16px;
    text-align: center;
    min-height: calc(100vh - 220px);
    .content{
      margin-top: 24px;
    }
    h1{
      margin-top: 16px;
      font-size: 28px;
    }
    .logo{
      -webkit-transition-property: -webkit-transform;
      -webkit-transition-duration: 1s;
      -moz-transition-property: -moz-transform;
      -moz-transition-duration: 1s;
      -webkit-animation: rotate 3s linear infinite;
      -moz-animation: rotate 3s linear infinite;
      -o-animation: rotate 3s linear infinite;
      animation: rotate 3s linear infinite;
    }
    @-webkit-keyframes rotate{from{-webkit-transform: rotate(0deg)}
      to{-webkit-transform: rotate(360deg)}
    }
    @-moz-keyframes rotate{from{-moz-transform: rotate(0deg)}
      to{-moz-transform: rotate(359deg)}
    }
    @-o-keyframes rotate{from{-o-transform: rotate(0deg)}
      to{-o-transform: rotate(359deg)}
    }
    @keyframes rotate{from{transform: rotate(0deg)}
      to{transform: rotate(359deg)}
    }
  }
</style>