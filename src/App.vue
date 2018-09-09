<template>
  <div id="app">
    <Header></Header>
    <div class="main">

      <router-view name="main"></router-view>
      <router-view name="slidebar"></router-view>
    </div>
    <div class="footer">Email:zouchengzj@163.com</div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Postlist from './components/Postlist.vue'

export default {
  name: 'App',
  components:{
    Header,Postlist
  }
}
</script>

<style>
  @import "../node_modules/github-markdown-css/github-markdown.css";
  @import "./assets/common.css";
  .main {
    background-color: #e1e1e1;
    padding-top:20px;
    height:100%;
  }
  .main:after {
    clear:both;
    display:block;
    content:'';
  }
  .footer {
    width:100%;
    padding:16px;
    text-align: center;
    vertical-align:middle;
    color:#878787;
    font-size: 14px;
    background-color: #fff;
  }
  .loading {
    width:120px;
    display: block;
    margin: 0 auto;
  }

</style>
