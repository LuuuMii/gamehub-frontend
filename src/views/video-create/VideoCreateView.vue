<template>
  <div class="create-page">
    <aside class="left-container">
      <button class="submit-btn">投稿</button>
      <div class="menu-group" v-for="group in leftMenu" :key="group.title">
        <div class="menu-title">{{ group.title }}</div>
        <div class="menu-item" v-for="item in group.items" :key="item">
          {{ item }}
        </div>
      </div>
    </aside>

    <main class="right-container">
      <div class="sub-container">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "VideoCreateView",
  data() {
    return {
      leftMenu: [
        { title: "首页", items: ["首页"] },
        { title: "内容管理", items: ["内容管理", "稿件管理", "合集管理", "回收站"] },
        { title: "数据中心", items: ["播放数据", "粉丝分析", "互动数据", "收益数据"] },
        { title: "粉丝管理", items: ["粉丝管理", "弹幕管理", "评论管理"] },
        { title: "互动管理", items: ["评论管理", "弹幕管理"] },
        {
          title: "收益管理",
          items: ["收益中心", "创作激励", "充电计划", "任务广场", "花火平台", "悬赏激励"],
        },
        { title: "创作成长", items: ["任务中心", "创作学院", "成长等级", "创作工具"] },
      ],
      uploadTips: [
        { title: "视频大小", desc: "视频大小16G以内，时长10小时以内" },
        { title: "视频格式", desc: "推荐上传 MP4/MOV/MKV 格式，转码更快" },
        { title: "视频分辨率", desc: "推荐分辨率：1080P、4K、高清分辨率" },
      ],
    };
  },
};
</script>

<style scoped>
.create-page {
  height: calc(100vh - 64px);
  display: flex;
  background: #f6f7f8;
  overflow: hidden;
}

.left-container {
  width: 216px;
  flex-shrink: 0;
  border-right: 1px solid #e6e7e8;
  background: #fff;
  padding: 20px 16px;
  box-sizing: border-box;
  overflow-y: auto;
}

.submit-btn {
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 4px;
  background: #00a1d6;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 18px;
}

.menu-group {
  margin-bottom: 10px;
}

.menu-title {
  font-size: 15px;
  color: #18191c;
  padding: 8px 6px;
}

.menu-item {
  font-size: 14px;
  color: #61666d;
  padding: 8px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.menu-item:hover {
  background: #f1f2f3;
  color: #00a1d6;
}

.right-container {
  flex: 1;
  min-width: 0;
  overflow-y: auto;
  padding: 12px 18px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  background-color: #fafafa;
}
.sub-container{
  width: 70%;
  background-color: #fff;
}


</style>
