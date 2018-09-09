<template>
  <div class="article ">
    <div v-if="isLoading">
      <img src="../assets/loading.gif" class="loading">
    </div>
    <div class="detail" v-else>
      <div class="topicHeader">
        <div class="topicTitle">
          <span :class="[{'type_good':(post.good==true),'type_top':(post.top==true),'type_tab':(post.good != true && post.top != true)}]">
            {{post | tabFormatter}}
          </span>
          <span class="title">{{post.title}}</span>
          <p>
            <span class="issue">• 发布于 {{post.last_reply_at | dateFormatter}}</span>
            <span class="author">• 作者 {{post.author.loginname}}</span>
            <span class="visit">• {{post.visit_count}}次浏览</span>
            <span class="from">• 来自 {{post.tab}}</span>
          </p>
        </div>
        <div v-html="post.content" class="content"></div>
        <div class="reply">
          <p>{{post.reply_count}}回复</p>
        </div>
        <div v-for="(reply,index) in post.replies" class="replyDetail">
          <router-link :to="{
          name:'userInfo',
          params:{
            name:reply.author.loginname
            }
          }">
            <img :src="reply.author.avatar_url" alt="">
          </router-link>
          <span class="user_reply">{{reply.author.loginname}}</span>
          <span>{{index + 1}}楼•</span>
          <span>{{reply.create_at | dateFormatter}} </span>
          <span v-if="reply.ups.length>0" class="replyUps">
           ☝ {{reply.ups.length}}
          </span>
          <span v-else>
          </span>
            <div v-html="reply.content" class="replyContent "></div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import SlideBar from './SlideBar'
  export default {
    name: 'Article',
    data(){
      return {
        isLoading:false,
        post:{}
      }
    },
    components:{
      SlideBar
    },
    methods:{
      getArticleData(){
        this.$http.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`
        ).then(res=>{
          this.isLoading = false;
           console.log(res);
          this.post = res.data.data;

        }).catch(err=>{
           console.log(err);
        })
      }
    },
    beforeMount(){
      this.isLoading = true;
      this.getArticleData();
    },
    watch:{
      '$route'(to,from){
        this.getArticleData()
      }
    }


  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->

<style>

  .article {
    float:left;
    width:900px;
  }

  .detail {
    width:100%;
    margin-left: 68px;
  }

  .topicTitle {
    padding:10px 15px 10px 20px;
    border-bottom: 1px solid #e1e1e1;
    background-color: #fff;
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
  .title {
    font-weight: bold;
  }
  .issue,.author,.visit,.from {
    font-size: 12px;
  }

  .content {
    font-size: 14px;
    padding-top: 20px;
    background-color: #fff;
    padding-bottom:30px;
  }
  .reply {
    margin-top:20px;
    border-bottom: 1px solid #e1e1e1;
    background-color: #e0e0e0;
  }

  .reply p{
    padding:15px;
    font-size: 15px;
    background-color: #f9f9fa;
  }
  .replyUps {
    float:right;
    margin-right:10px;
  }
  .replyDetail {
    border-bottom: 1px solid #e1e1e1;
    padding: 15px 10px;
    background-color: #fff;
    color:#919191;
  }

  .replyDetail img {
    width: 30px;
    height:30px;
    vertical-align: middle;
  }
  .replyContent {
    margin-top: 10px;
    padding:10px;
    color: #626262;
    font-size: 14px;
  }
  .markdown-text {
    box-sizing: border-box;
    max-width: 800px;
    margin: 0 auto;

  }
  .markdown-text img {
    width:90% !important;
  }

</style>
