<template>
  <div class="pagination">
    <button @click="changeBtn">首页</button>
    <button @click="changeBtn">上一页</button>
    <button v-if="judge" class="unshowPage">...</button>
    <button @click="changeBtn(page)" v-for="page in pagesBtn" :class="[{currentPage:page == currentPage},'pagebtn']">
     <span>{{page}}</span>
    </button>
    <button @click="changeBtn">下一页</button>

  </div>
</template>

<script>
  import $ from 'jquery'
  export default {
    name: 'Pagination',
    data(){
      return {
        pagesBtn:[1,2,3,4,5,'...'],
        currentPage:1,
        judge:false
      }
    },
    methods:{
      changeBtn(page){
        if(typeof page != 'number'){
          switch(page.target.innerText){
            case '上一页':
              $('button.currentPage').prev().click();
              break;
            case '下一页':
              $('button.currentPage').next().click();
              break;
            case '首页':
              this.pagesBtn = [1,2,3,4,5,'...'];
              this.changeBtn(1);
              break;
            default:
              break;
          }
          return;
        }
        this.currentPage = page;
        if(page>4){
          this.judge = true;
        }else{
          this.judge = false;
        }
        if(page == this.pagesBtn[4] ){
          this.pagesBtn.shift();
          this.pagesBtn.splice(4,0,this.pagesBtn[3]+1);
        }else if(page == this.pagesBtn[0] && page !=1){

          this.pagesBtn.unshift(this.pagesBtn[0]-1);

          this.pagesBtn.splice(5,1);
        }

        this.$emit('handleList',this.currentPage);
      }
    }

  }
</script>
<style scoped>
  .pagination {
    width: 1200px;
    padding:10px;
    margin:10px auto;
    background-color: #fff;
  }
  .currentPage {
    color: #0082c5;
  }
  .unshowPage,.pagebtn {
    padding:6px 12px;
  }
  button {
    font-size: 12px;
    padding:5px 10px;
    height: 32px;
    background-color: #fff;
    border: 1px solid #e1e1e1;
  }


</style>
