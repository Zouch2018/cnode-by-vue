<template>
    <div class="slideBar">
      <div class="userInfo">
        <div class="userInfoHeader">作者</div>
        <div class="userInfoContent">
          <router-link :to="{
          name:'userInfo',
          params:{
            name:userinfo.loginname
            }
          }">
            <img :src="userinfo.avatar_url" alt="">
          </router-link>
          <span>{{userinfo.loginname}}</span>
          <p >积分:<span class="score">{{userinfo.score}}</span></p>
        </div>
      </div>
      <div class="topics">
        <p>最近创建的话题</p>
        <ul>
          <li v-for="item in topcilimitby5">
            <router-link :to="{
              name:'content',
              params:{
                id:item.id,
                name:item.author.loginname
                }
              }">
              {{item.title}}
            </router-link>
          </li>
        </ul>
      </div>
      <div class="replies">
        <p>最近参与的主题</p>
        <ul>
          <li v-for="item in replylimitby5">
            <router-link :to="{
              name:'content',
              params:{
                id:item.id,
                name:item.author.loginname
              }
            }">

                {{item.title}}

            </router-link>
          </li>
        </ul>
      </div>
    </div>


</template>


<script>
  export default {
    name: 'SildeBar',
    data(){
      return {
        isLoading:false,
        userinfo:{}
      }
    },
    computed:{
      topcilimitby5(){
        if(this.userinfo.recent_topics){
          return this.userinfo.recent_topics.slice(0,5);
        }
      },
      replylimitby5(){
        if(this.userinfo.recent_replies){
          return this.userinfo.recent_replies.slice(0,5);
        }
      }
    },
    methods:{
      getUserInfoData(){
        this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`
        ).then(res=>{
          this.isLoading = false;
           console.log(res);
          this.userinfo = res.data.data;

        }).catch(err=>{
           console.log(err);
        })
      }
    },
    beforeMount(){
      this.isLoading = true;
      this.getUserInfoData();
    }


  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>

  .slideBar {
    height: 100%;
    width: 280px;
    margin-left:1000px;
    background-color: #e1e1e1;
  }
  .userInfoHeader {
    padding:10px;
    background-color: #f4f4f4;
  }
  .userInfoContent {
    padding: 10px;
    background-color: #fff;
  }
  .userInfoContent img {
    width: 40px;
    height: 40px;
    vertical-align: middle;
  }
  .userInfoContent .score {
    padding:10px;
    font-size: 14px;
  }


  .topics,.replies {
    margin-top: 20px;
    background-color: #f4f4f4;
  }
  .topics>p,
  .replies>p {
    padding:10px;
    border-bottom: 1px solid #e4e4e4;
  }
  .topics ul li,
  .replies ul li {
    border-bottom: 1px solid #e4e4e4;
    background-color: #fff;
    padding: 8px 10px;
    font-size: 12px;
  }
  .topics ul a,
  .replies ul a {
    color: #b4b4b4;
  }
  .topics ul a:hover,
  .replies ul a:hover {
    color: #005580;
    text-decoration: underline;
  }



</style>
