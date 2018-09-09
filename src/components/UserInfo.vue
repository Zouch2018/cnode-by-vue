<template>
  <div class="home">
    <div v-if="isLoading">
      <img src="../assets/loading.gif" alt="">
    </div>
    <div class="userInfo" v-else>
      <div class="userInfoHeader">
        <router-link :to="{name:'root'}"><span>主页 /</span></router-link>
      </div>
      <div class="userInfoDetail">
        <img :src="userHome.avatar_url" >
        <span class="username">{{userHome.loginname}}</span>
        <p class="score">
          {{userHome.score}}积分
        </p>
        <p class="register">
          注册时间：{{userHome.create_at | dateFormatter}}
        </p>
      </div>
      <div class="topics">
        <p>最近创建的话题</p>
        <ul>
          <li v-for="item in userHome.recent_topics">
            <router-link :to="{
              name:'content',
              params:{
                id:item.id
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
          <li v-for="item in userHome.recent_replies">
            <router-link :to="{
              name:'content',
              params:{
                id:item.id
              }
            }">

                {{item.title}}

            </router-link>
          </li>
        </ul>
      </div>



    </div>

  </div>
</template>


<script>
  export default {
    name: 'UserInfo',
    data(){
      return {
        isLoading:false,
        userHome:{}
      }
    },
    methods:{
      getUserInfoData(){
        this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`
        ).then(res=>{
          this.isLoading = false;
           console.log(res);
          this.userHome = res.data.data;

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

  .home {
    background-color: #e1e1e1;
    width: 100%;
    min-height: 510px;

  }

  .userInfo {
    max-width: 1200px;
    margin: 20px auto 0;

  }
  .userInfoHeader {
    background: #f5f5f5;
    border-bottom: 1px solid #e4e4e4;
    padding: 10px;
  }
  .userInfoDetail {
    padding: 10px;
    color: #878787;
    font-size: 12px;
    background-color: #fff;
  }
  .userInfoDetail img {
    width: 30px;
    height: 30px;
    vertical-align: middle;
  }
  .username {
    font-size: 14px;
  }
  .score,.register {
    padding-top:6px;
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
    font-size: 14px;
  }
  .topics ul a,
  .replies ul a {
    color: #0087cb;
  }
  .topics ul a:hover,
  .replies ul a:hover {
    color: #005580;
    text-decoration: underline;
  }
  .replies {
    margin-bottom: 20px;
  }



</style>
