<template>
  <div class="sub-contaniner">
    <div class="blog-community" v-for="index in 9 " :key="index">
      <div class="community-top">
        <img class="community-img" src="@/assets/blog-community-img.png">
        <span class="community-title">前端交流社区</span>
      </div>
      <div class="community-body">
        <span class="community-one-data">30 个成员</span>
        <div class="split-point">·</div>
        <span class="community-one-data">352 篇内容</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlogCommunityView',
  
}
</script>


<style scoped>
.sub-contaniner{
  width: 100%;
}
.blog-community{
  cursor: pointer;
  width: 100%;
  padding: 20px 16px;
  border-bottom: 1px solid #e8e8ed;
}
.community-top,.community-body{
  display: flex;
  align-items: center;
}
.community-body{
  margin-top: 20px;
}
.community-img{
  width: 24px;
  height: 24px;
  object-fit: cover;
  display: flex;
  border-radius: 50%;
  margin-right: 8px;
}
.community-title{
  color: #000;
  line-height: 20px;
  font-size: 18px;
  font-weight: bold;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
}
.community-title:hover{
  color: #fc5531;
}
.community-one-data{
  color: #555666;
  font-size: 14px;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
}
.split-point {
  color: #555666;
  font-size: 14px;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
  margin: 0 6px;
}
</style>
