<template>
  <div class="sub-container">
    <!-- 一张卡片 -->
    <div class="card-box" v-for="(item, index) in searchList" :key="index">
      <div class="card-left">
        <div class="author-detail">
          <img src="@/assets/avatar.jpg" alt="" />
          <div>{{ item.createBy }}</div>
        </div>
        <a :href="`/post/` + item.id">
          <span class="title-content" v-html="item.title"></span>
        </a>
        <div class="summary-content" v-html="item.summary"></div>
        <div class="card-bottom">
          <div class="custom-details">
            <img
              class="custom-details-img"
              src="@/assets/icon/customviewimg1.png"
              alt=""
            />
            <div class="custom-details-content">
              阅读 {{ formatNumber(item.viewCount) }}
            </div>
          </div>
          <div class="custom-details">
            <img
              class="custom-details-img"
              src="@/assets/icon/customviewimg2.png"
              alt=""
            />
            <div class="custom-details-content">
              {{ formatNumber(item.LikeCount) }} 赞
            </div>
          </div>
          <div class="custom-details">
            <img
              class="custom-details-img"
              src="@/assets/icon/customviewimg3.png"
              alt=""
            />
            <div class="custom-details-content">
              收藏 {{ formatNumber(item.collectCount) }}
            </div>
          </div>
        </div>
      </div>
      <div class="card-right">
        <img class="right-img" :src="item.coverImg" alt="" />
      </div>
    </div>
    <div class="paga-div">
      <el-pagination background layout="prev, pager, next" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getArticleFromEs } from "@/api/article.js";
import numberUtils from "@/utils/numberUtils.js";
import { eventBus } from "@/mitt/eventBus";
export default {
  name: "CustomView",
  data() {
    return {
      keyword: "",
      type: "",
      publishBeginTime: null,
      publishEndTime: null,
      order: "",
      pageSize: 10,
      pageNum: 1,
      total: 100,
      searchList: [],
    };
  },
  created() {
    this.initData();
    eventBus.on("searchChange",()=>{
      this.querySearch();
    })
    
  },
  methods: {
    async initData() {
      this.querySearch();
    },
    async querySearch() {
      this.keyword = this.$route.query.keyword;
      this.type = this.$route.query.type;
      this.order = this.$route.query.order;
      this.publishBeginTime = this.$route.query.publish_begin_time;
      this.publishEndTime = this.$route.query.publish_end_time;

      const query = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        keyword: this.keyword,
        type: this.type,
        order: this.order,
        publishBeginTime: this.publishBeginTime,
        publishEndTime: this.publishEndTime,
      };
      const res = await getArticleFromEs(query);
      this.pageNum = res.data.pageNum;
      this.pageSize = res.data.pageSize;
      this.searchList = res.data.records;
      this.total = res.data.total;
    },
    formatNumber(num) {
      return numberUtils.formatNumber(num);
    },
  },
  
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
.author-detail {
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
.author-detail > div {
  font-size: 14px;

  transition: 0.3s;
}
.author-detail:hover div {
  color: #0097ff;
}
.title-content {
  font-size: 18px;
  color: #000;

  margin-bottom: 6px;

  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  transition: 0.3s;
}
.title-content:hover {
  color: #0097ff;
}
.summary-content {
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
.card-bottom {
  display: flex;
  align-items: center;
}
.custom-details {
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
.custom-details-content {
  font-size: 14px;
  line-height: 16px;
  color: #999999;
  padding: 0 24px 0 0;
}
.card-right {
  display: flex;
  align-items: center;
  margin-left: 8px;
}
.right-img {
  width: 128px;
  height: 84px;
  object-fit: cover;
  display: flex;
}
.paga-div {
  margin-top: 14px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>