<template>
  <div class="header ">
    <router-link :to="{name:'root'}"><img src="../assets/cnodejs_light.svg"></router-link>
    <ul>
      <li><router-link :to="{name:'root'}"> <a href="#">首页</a></router-link></li>
      <li><a href="#">新手入门</a></li>
      <li><a href="#">API</a></li>
      <li><a href="#">关于</a></li>
      <li><a href="#">注册</a></li>
      <li><a href="#">登录</a></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Header'

  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>

  .header {
   background: #444444;
   height: 48px;
  }
  img {
    float:left;
    margin-top: 6px;
    margin-left: 80px;
    height:30px;
  }
  ul>li {
    display: inline-block;
    padding: 10px;
  }
  ul {
    float: right;
    line-height: 30px;
    margin-right: 80px;
  }
  ul>li a {
    color: #999;
    font-size: 14px;
  }
  ul>li>a:hover {
    color: #fff;
  }



</style>
