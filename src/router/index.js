import Vue from 'vue'
import Router from 'vue-router'
import Postlist from '../components/Postlist.vue'
import Article from '../components/Article.vue'
import UserInfo from '../components/UserInfo.vue'
import SlideBar from '../components/SlideBar.vue'

  Vue.use(Router)

  export default new Router({
    routes: [
      { name:"root",
        path:"/",
        components:{
          main:Postlist
        }
      },
      { name:"content",
        path:"/topic/:id&author:name",
        components:{
          main:Article,
          slidebar:SlideBar
        }
      },
      {
        name:"userInfo",
        path:"/user/:name",
        components:{
          main:UserInfo
        }
      }
    ]
  })
