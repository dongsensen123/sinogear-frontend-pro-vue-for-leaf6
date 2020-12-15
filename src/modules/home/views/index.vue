<template>
  <div class="home-container">
    <div class="content">
      <img class="logo" src="../resources/images/sinogear.svg" alt="sinogear" />
      <h1>HELLO! SINOGEAR VUE!</h1>
    </div>
    <div class="console">
      <div class="top"> <span class="options">⦿ ○ ○</span> <span class="title">PSY - GANGNAM STYLE </span></div>
      <div class="tabs"> </div>
      <div class="text">
        <br>[06:24:55] 85% <span class="pink">'recording...'</span> after 8.81 s
        <br>[06:24:55] 92% <span class="pink">'recording...'</span> after 12 s
        <br>[06:24:55] 95% <span class="pink">'recording HotModuleReplacementPlugin'</span>...
        <br>[06:25:00] 95% <span class="blue">'emitting HtmlWebpackPlugin'</span>
        <br> [06:25:02] <span class="orange">Eh, SinoGear Vue!</span>
        <br> [06:25:06] Compiled successfully in 2073ms
        <br>[06:24:55][webpack.Progress]<span class="pink">100% </span> after 12 s
        <br> <span class="blue">? </span> Would you like to start coding? <span class="orange">Yes</span>
        <br> [06:25:14] Danced <span class="blue">234</span> steps, <span class="blue">234</span> passes, <span class="blue">0</span> failures: <span class="pink">SUCCESS </span>
        <br>
        <p class="typewriter"> Local <span class="pink"> http://localhost:9000/ </span></p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomeContainer"
  }
</script>

<style scoped lang="less">
  .home-container {
    background: #fff;
    font-family: helvetica;
    min-height: calc(100vh - 220px);
    padding: 20px;
    .content{
      margin-top: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      vertical-align: middle;
      margin-bottom: 20px;
    }
    h1{
      margin-top: 16px;
      font-size: 28px;
      display: inline-block;
      vertical-align: middle;
    }
    .logo{
      display: inline-block;
      margin-right: 12px;
      vertical-align: middle;
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
    
    .blue {
      color: #53d9d1;
    }
    .pink {
      color: #f27b9b;
    }
    .orange {
      color: #eb7132;
    }
    .console {
      border: 1px solid #444;
      border-radius: 3px;
      margin: 2rem;
      background-color: #222;
      width: 630px;
      margin: 0 auto;
      box-shadow: 0 0 15px 0px rgba(0, 0, 0, 0.75);
      .top {
        background: #333;
        color: #666;
        text-align: center;
        font-size: 12px;
        padding: 5px;
        .options {
          font-size: 16px;
          float: left;
        }
      }
      .text {
        font-family: courier;
        color: #fff;
        font-size: 14px;
        padding: 0.25rem;
      }
    }
  }
  
  .typewriter {
    overflow: hidden;
    width: fit-content;
    white-space: nowrap;
    border-right: 0.15em solid #eb7132;
    animation: typing 3s steps(15, end), blink-caret 0.75s step-end infinite;
  }
  
  /* The typing effect */
  @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 60%;
    }
  }
  
  /* The typewriter cursor effect */
  @keyframes blink-caret {
    from,
    to {
      border-color: transparent;
    }
    50% {
      border-color: orange;
    }
  }

</style>