<template>
  <div class="sub-container">
    <div class="one-lately-article" v-for="index in 10" :key="index">
      <div class="left-content">
        <img class="article-img" src="../../assets/article-img.png" />
      </div>
      <div class="right-content">
        <div class="article-title">
          高精度算法：突破整型限制的算法实现【C++实现】
        </div>
        <div class="article-introduction">
          <span
            >大数计算，如计算 11112345678901234567890 和
            111198765432109876543210的运算；竞赛场景，如 CCF CSP、NOI、ACM
            等常考题型；科学/金融/密码学计算，需处理任意长度的大整数。常规整型变量无法满足精度需求，因此我们需要模拟竖式运算的过程，通过字符串或数组逐位计算来实现。</span
          >
        </div>
        <div class="article-data">
          <div class="article-type">原创</div>
          <span class="one-article-data">发布博客 2025.08.08</span>
          <div class="split-point">·</div>
          <span class="one-article-data">5017 阅读</span>
          <div class="split-point">·</div>
          <span class="one-article-data">118 点赞</span>
          <div class="split-point">·</div>
          <span class="one-article-data">88 评论</span>
          <div class="split-point">·</div>
          <span class="one-article-data">111 收藏</span>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination background layout="prev, pager, next" :total="100">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "LatelyView",
};
</script>


<style scoped>
.sub-container {
  width: 100%;
  padding: 0 20px;
}
.one-lately-article {
  width: 100%;
  padding: 20px 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e8e8ed;
  cursor: pointer;
}
.article-img {
  width: 170px;
  height: 100px;
  object-fit: cover;
  display: block;
}
.right-content {
  margin-left: 10px;
  height: 100px;
}
.article-title {
  width: 650px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #222226;
  font-size: 18px;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
}
.article-title:hover {
  color: #fc5531;
}
.article-introduction {
  margin-top: 6px;
}
.article-introduction span {
  color: #555666;
  font-size: 14px;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}
.article-data {
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.article-type {
  display: flex;
  align-items: center;
  padding: 2px 2px;
  background-color: #fcebea;
  color: #e33e33;
  font-size: 12px;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
  margin-right: 8px;
}
.one-article-data {
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
.pagination {
  margin: 20px 0 16px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
