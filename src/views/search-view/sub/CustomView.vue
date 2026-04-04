<template>
  <div class="sub-container">
    <!-- 一张卡片 -->
    <div class="card-box" v-for="item in 10" :key="item">
      <div class="card-left">
        <div class="author-detail">
          <img src="@/assets/avatar.jpg" alt="">
          <div>作者名字</div>
        </div>
        <a href="/post/24">
          <span class="title-content">大厂裁Java，面试却更卷：阿里P8整理的100万字题库助你通关</span>
        </a>
        <div class="summary-content">摘要:1231232131212312321232131232123213123212321312321232131232123213123212321312321312321312123123213123213121231232131232131212312321312321312123123213123213121231232131232131212312321312321312321312</div>
        <div class="card-bottom">
          <div class="custom-details">
            <img class="custom-details-img" src="@/assets/icon/customviewimg1.png" alt="">
            <div class="custom-details-content">阅读 2.4k</div>
          </div>
          <div class="custom-details">
            <img class="custom-details-img" src="@/assets/icon/customviewimg2.png" alt="">
            <div class="custom-details-content">44 赞</div>
          </div>
          <div class="custom-details">
            <img class="custom-details-img" src="@/assets/icon/customviewimg3.png" alt="">
            <div class="custom-details-content">收藏 7</div>
          </div>
        </div>
      </div>
      <div class="card-right">
        <img class="right-img" src="@/assets/article-img.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomView",
};
</script>

<style scoped>
.sub-container {
  width: 100%;
}
a {
  text-decoration: none; /* 去掉下划线 */
  color: inherit; /* 继承父元素颜色 */
}
.card-box {
  width: 100%;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  padding: 12px;
  margin-bottom: 12px;
}
.author-detail{
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 6px;
}
.author-detail > img {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: block;
  margin-right: 12px;
}
.author-detail > div{
  font-size: 14px;
  
  transition: 0.3s;
}
.author-detail:hover div {
  color: #0097ff;
}
.title-content{
  font-size: 18px;
  color: #000;

  margin-bottom: 6px;

  display: block;       
  overflow: hidden;      
  white-space: nowrap;   
  text-overflow: ellipsis;

  transition: 0.3s;
}
.title-content:hover{
  color: #0097ff;
}
.summary-content{
  font-size: 14px;
  color: #999999;
  cursor: pointer;

  margin-bottom: 8px;
  
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
}
.card-bottom{
  display: flex;
  align-items: center;
}
.custom-details{
  cursor: pointer;
  display: flex;
  align-items: center;
}
.custom-details-img {
  width: 16px;
  height: 16px;
  display: block;
  margin-right: 4px;
}
.custom-details-content{
  font-size: 14px;
  line-height: 16px;
  color: #999999;
  padding: 0 24px 0 0;
}
.card-right{
  display: flex;
  align-items: center;
  margin-left: 8px;
}
.right-img{
  width: 128px;
  height: 84px;
  object-fit: cover;
  display: flex;
}
</style>