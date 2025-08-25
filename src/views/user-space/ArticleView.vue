<template>
  <div class="sub-contaniner">
    <div class="sort-by">
      <div
        class="sort-by-time"
        @click="sortList('time')"
        :class="{ 'active-sort': activityIndex === 0 }"
      >
        <span>按发布时间</span>
        <img src="../../assets/icon/sort.png" />
      </div>
      <div
        class="sort-by-visits"
        @click="sortList('visits')"
        :class="{ 'active-sort': activityIndex === 1 }"
      >
        <span>按访问量</span>
        <img src="../../assets/icon/sort.png" />
      </div>

      <el-popover placement="bottom" trigger="click" width="220">
        <div class="process">
          <div class="all-creative">
            <div>全部</div>
            <div>63篇</div>
          </div>
          <div class="divider"></div>
          <div class="one-year-creative" v-for="index in 2" :key="index">
            <div class="total-creative-by-year">2025年(51篇)</div>
            <div
              class="total-creative-by-month"
              v-for="index in 6"
              :key="index"
            >
              <div class="month">08月</div>
              <div class="num">1篇章</div>
            </div>
          </div>
        </div>
        <div class="creative-process" slot="reference">
          <span>创作历程</span>
          <i class="el-icon-arrow-down"></i>
        </div>
      </el-popover>
    </div>
    <div>
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
            <span class="one-article-data">博文更新于2025.08.08</span>
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
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleView",
  props: {},
  data() {
    return {
      activityIndex: 0,
    };
  },
  methods: {
    sortList(condition) {
      if (condition === "time") {
        this.activityIndex = 0;
      } else if (condition === "visits") {
        this.activityIndex = 1;
      }
    },
  },
};
</script>

<style scoped>
.sub-contaniner {
  width: 100%;
  padding: 0 20px;
}
.sort-by {
  display: flex;
  align-items: center;
  padding: 8px 0 8px;
  border-bottom: 1px solid #e8e8ed;
}
.sort-by-time {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.sort-by-time span {
  font-size: 14px;
  color: #222226;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
}
.sort-by-time img {
  width: 16px;
  height: 16px;
  object-fit: cover;
  display: block;
}

.sort-by-visits {
  display: flex;
  align-items: center;
  margin-left: 16px;
  cursor: pointer;
}
.sort-by-visits span {
  font-size: 14px;
  color: #222226;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
}
.sort-by-visits img {
  width: 16px;
  height: 16px;
  object-fit: cover;
  display: block;
}

.creative-process {
  display: flex;
  align-items: center;
  margin-left: 48px;
  cursor: pointer;
}
.creative-process span {
  font-size: 14px;
  color: #222226;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
}
.creative-process i {
  width: 16px;
  height: 16px;
  object-fit: cover;
  display: block;
  margin-left: 2px;
}
.active-sort span {
  font-size: 14px;
  color: #fc5531;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
}
.active-sort img {
  content: url("../../assets/icon/sort-active.png");
  width: 16px;
  height: 16px;
  object-fit: cover;
  display: block;
}

.process {
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  padding-right: 10px;
}

/* 整体滚动条宽度 */
.process::-webkit-scrollbar {
  width: 6px;
}

/* 滑块背景 */
.process::-webkit-scrollbar-thumb {
  background-color: #7bc5f7; /* 天蓝色 */
  border-radius: 3px; /* 圆角 */
}

/* 滑块悬停效果 */
.process::-webkit-scrollbar-thumb:hover {
  background-color: #1a8cff;
}

/* 滚动条轨道 */
.process::-webkit-scrollbar-track {
  background-color: #f0f0f0; /* 背景色 */
  border-radius: 3px;
}

.all-creative {
  cursor: pointer;
  padding: 10px 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.all-creative:hover {
  background-color: #f5f6f7;
}
.all-creative div {
  font-size: 14px;
  color: #fc5531;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
}
.divider {
  width: 90%;
  margin: 12px auto;
  border-bottom: 2px solid #e8e8ed;
}
.one-year-creative {
  width: 100%;
}
.total-creative-by-year {
  font-size: 12px;
  color: #999aaa;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
  padding-bottom: 5px;
}
.total-creative-by-month {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 6px;
}
.total-creative-by-month:hover {
  cursor: pointer;
  background-color: #f5f6f7;
}
.month,
.num {
  font-size: 14px;
  color: #222226;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
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
</style>
