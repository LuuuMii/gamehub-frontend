<template>
  <!-- 主页内容 -->
  <div class="myContainer">
    <!-- 轮播图 -->
    <div class="movingPic">
      <!-- 外部的大图  -->
      <img class="bigPic" :src="images[currentPicIndex]?.url" alt="" />
      <!-- 里面的图片 -->
      <div class="centerPicDiv">
        <div class="centerPicCarousel">
          <el-carousel
            height="550px"
            :interval="5000"
            @change="handleCarouselChange"
            ref="carouselRef"
          >
            <el-carousel-item v-for="(item, index) in images" :key="index">
              <div class="carouselItemWrapper">
                <img :src="item.url" :alt="item.title" />
                <div class="carouselTitle">{{ item.title }}</div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>

    <!-- 轮播图下面的内容 -->
    <div class="contentDiv">
      <!-- 左半部分帖子 -->
      <div class="leftContentDiv">
        <!-- 左半部分内容上面的导航栏 -->
        <div class="topContentDivForLeft">
          <!-- 帖子类型导航栏(左边) -->
          <div class="contentLeftNav">
            <ul>
              <li
                v-for="(item, index) in contentLeftNavItems"
                :key="index"
                :class="{ active: contentLeftNavSelectedItem === item }"
                @click="handleContentLeftNavClick(item)"
              >
                {{ item }}
              </li>
            </ul>
          </div>
          <!-- 帖子类型导航栏(右边) 带下拉框-->
          <div class="contentRightNav">
            <ul>
              <li @mouseenter="hover0 = true" @mouseleave="hover0 = false">
                精品栏目
                <i class="el-icon-arrow-down" :class="{ rotated: hover0 }"></i>
              </li>
              <div
                class="dropDownMenu1"
                :class="{ show: hover0 }"
                @mouseenter="hover0 = true"
                @mouseleave="hover0 = false"
              >
                <div class="dropDownItem">精品栏目菜单菜单</div>
                <div class="dropDownItem">精品栏目菜单</div>
                <div class="dropDownItem">精品栏目菜单</div>
                <div class="dropDownItem">精品栏目菜单</div>
                <div class="dropDownItem">精品栏目菜单</div>
              </div>
              <li @mouseenter="hover1 = true" @mouseleave="hover1 = false">
                更多
                <i class="el-icon-arrow-down" :class="{ rotated: hover1 }"></i>
              </li>
              <div
                class="dropDownMenu2"
                :class="{ show: hover1 }"
                @mouseenter="hover1 = true"
                @mouseleave="hover1 = false"
              >
                <div class="dropDownItem">精品栏目菜单菜单</div>
                <div class="dropDownItem">精品栏目菜单</div>
                <div class="dropDownItem">精品栏目菜单</div>
                <div class="dropDownItem">精品栏目菜单</div>
                <div class="dropDownItem">精品栏目菜单</div>
              </div>
            </ul>
          </div>
        </div>
        <!-- 下面的内容 -->
        <div>
          <div class="allPostContentDiv">
            <ul>
              <li v-for="(group, index) in groupedPosts" :key="index">
                <div
                  class="onePostContentDiv"
                  v-for="post in group"
                  :key="post.id"
                >
                  <!-- 图片 -->
                  <div class="postPicDiv">
                    <img
                      src="../assets/postPic1.jpg"
                      alt=""
                      class="postPicImg"
                    />
                    <!-- 遮罩层 -->
                    <div class="overlay">
                      <div class="overlay-content">
                        <div class="post-type-wrapper">
                          <div class="post-type">瓦洛兰特</div>
                          <div class="divider"></div>
                        </div>
                        <div class="read-more">Read More</div>
                      </div>
                    </div>
                  </div>
                  <!-- 帖子的标题 -->
                  <div class="post-title-div">
                    <span class="with-dot post-title"
                      >《王牌钓手 欢钓水族馆》：欢乐钓鱼与幸运扭蛋</span
                    >
                  </div>
                  <!-- 帖子的dig -->
                  <div>
                    <span class="post-dig"
                      >&nbsp;&nbsp;首先要说的是，这是个合家欢、欢乐向的游戏，与其他重内容的游戏的评测角度不同</span
                    >
                  </div>
                  <!-- 帖子写的版面、楼主、日期 -->
                  <div class="post-content-div">
                    <span class="post-type-span">版面:游戏综合讨论</span>
                    <span class="post-author-span">楼主：冰河葬离心丶</span>
                    <span class="post-date-span">2022.11.04</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!--分页-->
          <div class="el-pagination-div">
            <el-pagination background layout="prev, pager, next" :total="1000">
            </el-pagination>
          </div>
        </div>
      </div>
      <div class="rightContentDiv">
        <!-- 论坛热帖 -->
        <div>
          <!-- 论坛热帖导航条 -->
          <div class="post-hot-nav">
            <div class="post-hot-nav-title">论坛热帖</div>
            <div class="post-hot-nav-content">
              <ul>
                <li
                  v-for="(item, index) in postHotNavItems"
                  :key="index"
                  :class="{ active: postHotNavSelectedItem === item }"
                  @click="handlepostHostNavClick(item)"
                >
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
          <!-- 论坛热帖内容 -->
          <div>
            <div
              v-for="(post, index) in hotPostList"
              :key="index"
              class="post-hot-content"
            >
              <!-- 左边图标 -->
              <div
                class="post-hot-left-icon"
                :style="{ backgroundColor: iconStyles[index].bgColor }"
              >
                {{ index + 1 }}
              </div>

              <!-- 右边内容 -->
              <div class="post-hot-right-content">
                <div class="post-hot-right-content-title">
                  {{ post.title }}
                </div>
                <div class="post-hot-right-content-forum">
                  {{ post.forum }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      currentPicIndex: 0,
      images: [
        {
          title: "2025TapTap发布会《守爱2》惊艳登台 12月重启爱与勇气的大冒险",
          url: require("@/assets/pic1.jpg"),
        },
        {
          title: "NGA少前2：追放 火花之罪 APP签到活动 周边和礼包抽奖等你来领！",
          url: require("@/assets/pic2.jpg"),
        },
        {
          title: "NGA少前2：追放 火花之罪 APP签到活动 周边和礼包抽奖等你来领！",
          url: require("@/assets/pic3.jpg"),
        },
        {
          title: "摄影：翠鸟的闪耀瞬间",
          url: require("@/assets/pic4.jpg"),
        },
        {
          title: "逆水寒2周年签到活动来了 参与签到赢取五粮液和官方周边奖励！",
          url: require("@/assets/pic5.jpg"),
        },
      ],
      contentLeftNavItems: [
        "全部",
        "游戏综合",
        "游戏研究与杂谈",
        "魔兽世界",
        "炉石传说",
      ],
      contentLeftNavSelectedItem: "全部", // 默认选中“全部”
      hover0: false,
      hover1: false,
      postList: [
        { id: 1, title: "帖子1" },
        { id: 2, title: "帖子2" },
        { id: 3, title: "帖子3" },
        { id: 4, title: "帖子4" },
        { id: 5, title: "帖子5" },
        { id: 6, title: "帖子6" },
      ],
      postHotNavItems: [
        "暴雪游戏",
        "主机游戏",
        "手机游戏",
        "玩家生活",
        "玩家社区",
      ],
      postHotNavSelectedItem: "暴雪游戏",
      hotPostList: [
        {
          id: 1,
          title:
            "[搬运] 窝窝头11.2全职业全专精团本/大米/地下堡推荐天赋(8.7开服版)",
          forum: "艾泽拉斯议事厅 - Hall of Azeroth",
        },
        {
          id: 2,
          title: "[搬运] 奶德全流派装备选择与属性优先级（最新版）",
          forum: "德鲁伊学术交流区",
        },
        {
          id: 3,
          title: "[搬运] 奶德全流派装备选择与属性优先级（最新版）",
          forum: "德鲁伊学术交流区",
        },
        {
          id: 4,
          title: "[搬运] 奶德全流派装备选择与属性优先级（最新版）",
          forum: "德鲁伊学术交流区",
        },
        {
          id: 5,
          title: "[搬运] 奶德全流派装备选择与属性优先级（最新版）",
          forum: "德鲁伊学术交流区",
        },
        {
          id: 6,
          title: "[搬运] 奶德全流派装备选择与属性优先级（最新版）",
          forum: "德鲁伊学术交流区",
        },
        {
          id: 7,
          title: "[搬运] 奶德全流派装备选择与属性优先级（最新版）",
          forum: "德鲁伊学术交流区",
        },
        {
          id: 8,
          title: "[搬运] 奶德全流派装备选择与属性优先级（最新版）",
          forum: "德鲁伊学术交流区",
        },
        {
          id: 9,
          title: "[搬运] 奶德全流派装备选择与属性优先级（最新版）",
          forum: "德鲁伊学术交流区",
        },
        {
          id: 10,
          title: "[搬运] 奶德全流派装备选择与属性优先级（最新版）",
          forum: "德鲁伊学术交流区",
        },
      ],
      iconStyles: [
        { id: 1, bgColor: "#4A90E2" },
        { id: 2, bgColor: "#50E3C2" },
        { id: 3, bgColor: "#B8E986" },
        { id: 4, bgColor: "#F8E71C" },
        { id: 5, bgColor: "#FF8A65" },
        { id: 6, bgColor: "#A1887F" },
        { id: 7, bgColor: "#9575CD" },
        { id: 8, bgColor: "#4DD0E1" },
        { id: 9, bgColor: "#81C784" },
        { id: 10, bgColor: "#F06292" },
      ],
    };
  },
  methods: {
    handleCarouselChange(index) {
      this.currentPicIndex = index;
    },
    /* li的点击事件 */
    handleContentLeftNavClick(item) {
      this.contentLeftNavSelectedItem = item;
    },
    handlepostHostNavClick(item) {
      this.postHotNavSelectedItem = item;
    },
  },
  computed: {
    groupedPosts() {
      const result = [];
      for (let i = 0; i < this.postList.length; i += 2) {
        result.push(this.postList.slice(i, i + 2));
      }
      return result;
    },
  },
};
</script>

<style scoped>
.movingPic {
  width: 100%;
  height: 550px;
  position: relative;
  overflow: hidden;
}
.bigPic {
  width: 100%;
  height: 550px;
  object-fit: cover;
  opacity: 0.9;
  filter: blur(5px);
}

.centerPicDiv {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 550px;
  width: 78%;
  z-index: 10;
  display: flex;
}
.centerPicCarousel {
  z-index: 20;
  height: 100%;
  width: 100%;
}
.centerPicCarousel img {
  height: 100%;
  width: 100%;
  z-index: 30;
  object-fit: cover;
  border-radius: 7px;
}
.centerPicCarousel:hover {
  cursor: pointer;
}
.carouselItemWrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
.carouselTitle {
  position: absolute;
  bottom: 0px;
  width: 100%;
  padding: 10px;
  padding-top: 20px;
  padding-left: 30px;
  padding-bottom: 25px;
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
  text-align: left;
  font-size: 30px;
  font-weight: 700;
  z-index: 40;
  border-radius: 0 0 7px 7px;
}
.contentDiv {
  width: 78%;
  margin: 0 auto;
  padding-top: 5px; /* 内容于轮播图的间距 */
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.leftContentDiv {
  display: inline-block;
  width: 66%;
}

.topContentDivForLeft {
  padding-left: 5px;
  border-bottom: 1px solid #a19e9e;
  display: flex;
  justify-content: space-between; /* 左右对齐 */
  align-items: center; /* 垂直居中对齐可选 */
  position: relative;
}
.contentLeftNav ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}
.contentLeftNav li {
  padding: 0 4px;
  margin-right: 15px;
  font-size: 18px;
  line-height: 50px;
  color: #2c3e50;
  text-decoration: none;
  font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Segoe UI",
    sans-serif;
  cursor: pointer;
  letter-spacing: 0.03em;
  position: relative;
  font-weight: normal;
  transition: 0.2s;
}
.contentLeftNav li.active {
  font-weight: bold;
}
.contentLeftNav li:hover {
  color: #2980b9;
}
/* 被点击选中的 li 显示下划线 */
.contentLeftNav li.active::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  width: 100%;
  background-color: #4d4d4d; /* 下划线颜色 */
  border-radius: 2px;
}

.contentRightNav ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}
.contentRightNav li {
  margin-right: 20px;
  font-size: 18px;
  line-height: 50px;
  color: #777;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
  transition: 0.2s;
}

.el-icon-arrow-down {
  display: inline-block;
  transition: transform 0.3s ease;
  transform: rotate(0deg);
}

.el-icon-arrow-down.rotated {
  transform: rotate(180deg);
}

.dropDownMenu1 {
  position: absolute;
  top: 100%;
  border: 1px solid #dcdcdc;
  margin-left: -17px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 10;
}
.dropDownItem {
  padding: 10px 16px;
  cursor: pointer;
  border-bottom: 1px solid #e0e0e0;
  font-size: 15px;
  color: #333;
  font-weight: 500;
  font-family: "Segoe UI", "PingFang SC", "Helvetica Neue", sans-serif;
  line-height: 1.5;
  transition: background-color 0.2s, color 0.2s;
}
.dropDownItem:hover {
  background-color: #f5f7fa;
  color: #409eff;
}
.dropDownMenu2 {
  position: absolute;
  top: 100%;
  right: 0;
  border: 1px solid #dcdcdc;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 10;
}

.dropDownMenu1,
.dropDownMenu2 {
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  pointer-events: none;
  visibility: hidden;
}
.dropDownMenu1.show,
.dropDownMenu2.show {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
  visibility: visible;
}

.allPostContentDiv {
  width: 100%;
}

.allPostContentDiv ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.allPostContentDiv li {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
}

.onePostContentDiv {
  width: 49%;
  box-sizing: border-box;
  margin: 16px 0 16px 0;
}
.postPicDiv {
  width: 100%;
  height: 160px;
  position: relative; /* 关键：为 overlay 提供参考 */
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
}
.postPicDiv:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

.postPicImg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
/* 遮罩层 */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.45);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none; /* 保证鼠标不拦截 */
}

/* 悬停时显示遮罩 */
.postPicDiv:hover .overlay {
  opacity: 1;
}
.overlay-content {
  text-align: center;
  color: white;
  font-family: sans-serif;
}
.post-type-wrapper {
  display: inline-block;
  text-align: center;
}
.post-type {
  font-size: 18px;
  font-weight: bold;
  color: white;
}
.divider {
  height: 2px;
  background-color: white;
  margin: 4px auto 8px auto;
  width: 100%;
}
.read-more {
  font-size: 14px;
  opacity: 0.9;
}
.post-title-div {
  height: 42px;
  display: flex;
  align-items: center;
}
.post-title {
  font-family: "Segoe UI", "Helvetica Neue", "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", sans-serif;
  font-size: 13px;
  font-weight: bold;
  color: #333;
  letter-spacing: 0.5px;
}
.with-dot::before {
  content: "";
  display: inline-block;
  width: 6px;
  height: 6px;
  background-color: orange;
  border-radius: 50%;
  margin-right: 6px;
  vertical-align: middle;
}
.post-title:hover {
  cursor: pointer;
  color: #677175;
}
.post-dig {
  font-size: 13px;
  display: -webkit-box; /* 创建伸缩盒模型 */
  -webkit-box-orient: vertical; /* 垂直排列子元素 */
  -webkit-line-clamp: 2; /* 显示2行 */
  overflow: hidden; /* 超出隐藏 */
  text-overflow: ellipsis; /* 省略号 */
  white-space: normal;
}
.post-content-div {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 42px;
}
.post-type-span,
.post-author-span,
.post-date-span {
  font-size: 13px;
  color: #31393c;
}
.post-type-span {
  flex: 0 0 auto;
  text-align: left;
}

.post-date-span {
  flex: 0 0 auto;
  margin-left: auto;
  text-align: right;
}

.post-author-span {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  white-space: nowrap;
}
.el-pagination-div {
  width: 100%;
  padding-top: 10px;
  justify-items: center;
}

/* 右边布局(论坛热帖) */
.rightContentDiv {
  display: inline-block;
  width: 33%;
}

.post-hot-nav {
  position: relative;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #a19e9e;
}
.post-hot-nav-title {
  width: 20%;
  font-size: 16px;
  text-align: center;
  color: #31393c;
  font-weight: bold;
  font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Segoe UI",
    sans-serif;
  margin: 0 10px 0 4px;
  padding-bottom: 5px;
}
.post-hot-nav-content {
  width: 80%;
  padding-right: 10px;
}
.post-hot-nav-content ul {
  list-style: none;
  display: flex; /* 关键：ul 是 flex 容器 */
  padding: 0;
  margin: 0;
  width: 100%;
}

.post-hot-nav-content li {
  position: relative; /* ✅ 必须加上，为 ::after 提供定位参考 */
  flex: 1;
  text-align: center;
  font-size: 13px;
  color: #808080;
  font-weight: 500;
  font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Segoe UI",
    sans-serif;
  height: 100%;
  line-height: 50px;
  cursor: pointer;
}
.post-hot-nav-content li.active::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #4d4d4d;
  border-radius: 1px;
}
.post-hot-nav-content li.active {
  font-weight: bold;
}
.post-hot-content {
  display: flex;
  width: 100%;
  padding: 5px 0 0 3px;
  justify-content: center;
  align-items: center;
}
.post-hot-left-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  font-size: 42px;
  color: #fff;
  border-radius: 8px;
  margin-right: 8px;
}
.post-hot-right-content {
  width: 80%;
  justify-content: center;
  align-items: center;
}
.post-hot-right-content-title {
  height: 40px;
  font-size: 14px;
  color: #333333;
  font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Segoe UI",
    sans-serif;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.post-hot-right-content-title:hover{
  cursor: pointer;
  color: #777;
}
.post-hot-right-content-forum {
  font-size: 12px;
  color: #c0c0c0;
  font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Segoe UI",
    sans-serif;
}
</style>