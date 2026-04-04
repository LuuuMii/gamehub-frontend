<template>
  <div class="myContainer">
    <!-- 条件过滤box -->
    <div class="choose-type-box">
      <!-- 普通的选择 第一层 -->
      <div class="choose-type">
        <ul class="choose-type-navbar">
          <li
            class="choose-type-li"
            @click="handleChooseType(item)"
            :class="{
              'selected-choose-type-li': selectedTypeChoose === item.name,
            }"
            v-for="(item, index) in typeChooseList"
            :key="index"
          >
            {{ item.name }}
          </li>
        </ul>
        <div
          class="filter-box"
          @click="isExpandFilterFlag = !isExpandFilterFlag"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            class="ZDI ZDI--VipFilter16 css-1sylyko"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M2.06 3.078c-.577-.682-.092-1.728.802-1.728H13.14c.893 0 1.378 1.043.803 1.726l-3.418 4.061v5.092c0 .43-.261.816-.66.975l-2.95 1.18a1.05 1.05 0 0 1-1.44-.975V7.113L2.06 3.078Zm1.341-.428 3.125 3.693c.16.19.249.43.249.679v6.018l2.45-.98V7.046c0-.247.087-.487.247-.676l3.131-3.72H3.401Z"
              clip-rule="evenodd"
            ></path>
          </svg>
          筛选
        </div>
      </div>
      <div class="filter-more-expand" v-show="isExpandFilterFlag">
        <div class="searchTabs-customFilter">
          <ul class="searchTabs-customFilter-group">
            <li
              @click="searchContentByCustom(item)"
              v-for="(item, index) in customFilterList"
              :key="index"
            >
              <div
                class="searchTabs-customFilter-tag"
                :class="{ 'tag-selected': selectedCustomFilter === item.name }"
              >
                {{ item.name }}
              </div>
            </li>
          </ul>
          <ul class="searchTabs-customFilter-group">
            <li
              @click="searchContentByDate(item)"
              v-for="(item, index) in dateFilterList"
              :key="index"
            >
              <div
                class="searchTabs-customFilter-tag"
                :class="{ 'tag-selected': selectedDateFilter === item.name }"
              >
                {{ item.name }}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 中间内容 -->
    <div class="main-container">
      <!-- 左边内容 -->
      <div class="main-container-left">
        <router-view></router-view>
      </div>
      <!-- 右边内容  大家都在搜等 -->
      <div class="main-container-right">
        <div class="hot-search-box">
          <div class="first-hot-search">
            <div class="left-first-hot-search">
              <img src="@/assets/icon/fire.png" alt="" />
              <div>大家都在搜</div>
            </div>
            <div class="right-first-hot-search" @click="refreshHotSearch">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="#9196A1"
                class="ZDI ZDI--ArrowCirclePath24"
                :class="{ 'search-rotate': rotateFlag }"
                style="margin-right: 6px"
              >
                <path
                  fill-rule="evenodd"
                  d="M20.678 10.797a.747.747 0 0 0 .064-.41C20.2 6.075 16.487 2.75 12 2.75c-4.487 0-8.2 3.325-8.743 7.637a.75.75 0 1 0 1.488.187C5.193 7.015 8.264 4.25 12 4.25c3.334 0 6.14 2.204 7.023 5.209l-2.811-.706a.753.753 0 0 0-.362 1.46l3.97.997a.746.746 0 0 0 .86-.413ZM3.305 13.24a.746.746 0 0 0-.047.373C3.8 17.925 7.513 21.25 12 21.25c4.487 0 8.2-3.325 8.743-7.636a.75.75 0 0 0-1.488-.188c-.449 3.559-3.52 6.324-7.255 6.324-3.334 0-6.14-2.204-7.023-5.21l2.811.707a.753.753 0 0 0 .362-1.46l-3.97-.997a.747.747 0 0 0-.876.45Z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <div>换一换</div>
            </div>
          </div>
          <div class="second-hot-search">
            <div class="one-search" v-for="item in 10" :key="item">
              <div class="left-one-search">
                <span class="HotSearchCard-dot"></span>
                <a href="/post/24">
                  <span class="hot-search-title"
                    >一栏局势一栏局势一栏局势一栏局势一栏局势12321321312123</span>
                </a>
                <span class="hot-search-vivst-count ">533 万</span>
              </div>
              <div class="right-one-search">
                <span>热</span>
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
  name: "SearchView",
  data() {
    return {
      typeChooseList: [
        {
          id: 1,
          name: "综合",
        },
        {
          id: 2,
          name: "用户",
        },
        {
          id: 3,
          name: "论文",
        },
        {
          id: 4,
          name: "AI搜索",
        },
        {
          id: 5,
          name: "专栏",
        },
        {
          id: 6,
          name: "盐选内容",
        },
        {
          id: 7,
          name: "电子书",
        },
        {
          id: 8,
          name: "圈子",
        },
        {
          id: 9,
          name: "话题",
        },
        {
          id: 10,
          name: "视频",
        },
      ],
      selectedTypeChoose: "综合",
      isExpandFilterFlag: false,
      customFilterList: [
        {
          id: 1,
          name: "综合排序",
        },
        {
          id: 2,
          name: "最多浏览",
        },
        {
          id: 3,
          name: "最新发布",
        },
        {
          id: 4,
          name: "最多评论",
        },
      ],
      selectedCustomFilter: "综合排序",
      dateFilterList: [
        {
          id: 1,
          name: "全部日期",
        },
        {
          id: 2,
          name: "最近一天",
        },
        {
          id: 3,
          name: "最近一周",
        },
        {
          id: 4,
          name: "最近半年",
        },
      ],
      selectedDateFilter: "全部日期",
      rotateFlag: false,
    };
  },
  methods: {
    handleChooseType(item) {
      this.selectedTypeChoose = item.name;
    },
    // 普通过滤条件
    searchContentByCustom(item) {
      this.selectedCustomFilter = item.name;
    },
    // 根据日期来过滤
    searchContentByDate(item) {
      this.selectedDateFilter = item.name;
    },
    // 换一换点击事件
    refreshHotSearch() {
      this.rotateFlag = !this.rotateFlag;
    },
  },
};
</script>

<style scoped>
.myContainer {
  width: 100%;
}
a {
  text-decoration: none; /* 去掉下划线 */
  color: inherit; /* 继承父元素颜色 */
}
.choose-type-box {
  width: 100%;
  padding-left: 230px;
}
.choose-type {
  width: 100%;
  display: flex;
  align-items: center;
}
.choose-type-navbar {
  display: flex;
  gap: 25px;
}
.choose-type-li {
  font-size: 16px;
  color: #191b1f;
  line-height: 22px;
  padding: 14px 0 10px;
  text-align: center;
  cursor: pointer;
  transition: 0.3s;
}
.choose-type-li:hover {
  color: #00b5f0;
}
.selected-choose-type-li {
  color: #00b5f0;
  border-bottom: 3px solid #00aeec;
}
.filter-box {
  display: flex;
  align-items: center;
}
.filter-box > svg {
  fill: #8491a5 !important;
}
.filter-box {
  color: #8491a5;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  cursor: pointer;
  margin-left: 30px;
}
.filter-more-expand {
  width: 100%;
  margin-top: 10px;
}
.searchTabs-customFilter-group {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 12px;
}
.searchTabs-customFilter-tag {
  color: #61666d;
  font-size: 14px;
  line-height: 32px;
  padding: 0 15px;
  transition: 0.3s;
  cursor: pointer;
}
.searchTabs-customFilter-tag:hover {
  color: #00aeec;
}
.tag-selected {
  background-color: #dff6fd;
  border-radius: 4px;
  color: #00aeec;
}
.main-container {
  width: 100%;
  background-color: #f4f6f9;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 12px 180px 12px 220px;
}
.main-container-left {
  width: 66%;
  background-color: #f4f6f9;
}
.main-container-right {
  width: 33%;
  background-color: #f4f6f9;
}
.hot-search-box {
  background-color: #fff;
  padding: 12px 10px 12px;
}
.first-hot-search {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.left-first-hot-search {
  display: flex;
  align-items: center;
}
.left-first-hot-search img {
  width: 16px;
  height: 16px;
  object-fit: cover;
  display: block;
  margin-right: 2px;
}
.left-first-hot-search div {
  font-size: 16px;
  color: #191b1f;
  line-height: 16px;
  font-weight: 500;
}
.right-first-hot-search {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.right-first-hot-search div {
  font-size: 12px;
  line-height: 14px;
  color: #999999;
}
.ZDI {
  transition: transform 0.3s ease;
}
.search-rotate {
  transform: rotate(180deg);
}
.second-hot-search{
  margin-top: 10px;
}
.one-search{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}
.left-one-search {
  display: flex;
  align-items: center;
}
.HotSearchCard-dot {
  border-radius: 50%;
  display: inline-block;
  height: 4px;
  width: 4px;
  background-color: rgb(255, 80, 26);
}
.hot-search-title {
  color: #191b1f;
  font-size: 14px;
  font-family: PingFang SC;
  line-height: 16px;
  font-weight: 400;
  display: inline-block;
  max-width: 240px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: 8px;
  transition: 0.3s;
}
.one-search:hover .hot-search-title{
  color: #00aeec;
}
.hot-search-vivst-count {
  color: #81858f;
  line-height: 16px;
  font-size: 12px;
  margin-left: 6px;
}
.right-one-search{
  display: flex;
  width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
  border: 1px solid #d95451;
  background-color: #fbeded;
  border-radius: 4px;
  padding: 2px;
  cursor: pointer;
  margin-right: 10px;
}
.right-one-search span{
  font-size: 12px;
  line-height: 20px;
  color: #d95451;
}
</style>
