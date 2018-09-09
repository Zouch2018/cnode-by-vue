<template>
  <div class="Postlist">
    <div v-if="isLoading">
      <img src="../assets/loading.gif" class="loading">
    </div>
    <div class="lists" v-else>
      <ul>
        <li>
          <div class="lists-bar">
            <span>全部</span>
            <span>精华</span>
            <span>分享</span>
            <span>问答</span>
            <span>招聘</span>
            <span>客户端测试</span>
          </div>
        </li>
        <li v-for="post in posts">
          <router-link :to="{
          name:'userInfo',
          params:{
            name:post.author.loginname
            }
           } ">
            <img :src="post.author.avatar_url" alt="">

          </router-link>

          <span class="allCount"><span>{{post.reply_count}}</span>/{{post.visit_count}}</span>
          <span  :class="[{'type_good':(post.good==true),'type_top':(post.top==true),'type_tab':(post.good != true && post.top != true)}]">
            {{post | tabFormatter}}
          </span>
          <router-link :to="{
          name:'content',
          params:{
            id:post.id,
            name:post.author.loginname
            }
          }" class="title"><span >{{post.title}}</span></router-link>
          <span class="last_reply">{{post.last_reply_at | dateFormatter}}</span>
        </li>

      </ul>
      <div>
        <Pagination  @handleList="renderList"></Pagination>
      </div>
    </div>


  </div>
</template>


<script>
  import　Pagination from './Pagination.vue'
  export default {
    name: 'Postlist',
    data(){
      return {
        isLoading:false,
        posts:[],
        postpage:1
      }
    },
    components:{
      Pagination
    },
    methods:{
      getData(){
        this.$http.get(' https://cnodejs.org/api/v1/topics',{
          params:{
            page:this.postpage,
            limit:20
          }
        }).then(res=>{
          this.isLoading = false;
           console.log(res)
          this.posts = res.data.data;

        }).catch(err=>{
           console.log(err)
        })
      },
      renderList(value){
        this.postpage = value;
        this.getData();
      }
    },
    beforeMount(){
      this.isLoading = true;
      this.getData();
    }


  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
  .Postlist {
    background-color: #e1e1e1;
    /*border:1px solid #e1e1e1;*/
  }
  .lists {
    margin-top:20px;

  }

  ul>li img {
    width: 30px;
    height: 30px;
    vertical-align: middle;
  }
  ul {
    max-width: 1200px;
    margin:0 auto;
  }
  ul>li:not(:first-child) {
    border-bottom:1px solid #eee;
    padding:8px;
    background-color: #fff;
  }
  ul>li>span {
    line-height:30px;
  }
  ul>li:not(:first-child):hover {
    background-color: #f5f5f5;
  }
  ul>li:first-child {
    background-color: #f9f9fa;
    padding:8px;
    line-height: 30px;
  }
  ul>li:first-child span {
    padding:8px 16px;
  }
  .lists-bar span:hover {
    color: #7fbc02;
  }
  span.type_good,
  span.type_top {
    background-color: #7fbc02;
    padding: 2px 4px;
    border-radius:4px;
    color: #fff;
    margin-right:8px;
    font-size: 12px;
  }
  span.type_tab {
    background-color: #e6e6e6;
    padding: 2px 4px;
    border-radius:4px;
    color: #919191;
    margin-right:8px;
    font-size: 12px;
  }
  .allCount {
    display: inline-block;
    width:60px;
    font-size: 12px;
    color: #bebebe;
    margin-right:6px;
    text-align: center;
  }
  .allCount>span {
    font-size: 12px;
    color: #878787;
  }

  .title {
    margin-left: 10px;
    color: #0093dc;
  }
  .title:hover {
    color: #00436b;
    text-decoration: underline;
  }

  .last_reply {
    display: inline-block;
    text-align: right;
    margin-right: 5px;
    font-size: 12px;
    color:#878787;
    float:right;
    min-width:50px;
  }



</style>
