<template>
  <div class="sub-container">
    <div class="collect" v-for="(item, index) in collectList" :key="index">
      <div class="collect-top">
        <div class="collect-name">{{ item.name }}</div>
        <div
          class="focus-on-btn"
          :class="{ foucsed: item.isFocus === true }"
          @click="focusCollect(index)"
        >
          {{ item.isFocus ? "已关注" : "关注" }}
        </div>
      </div>
      <div class="collect-data">
        <span class="one-data">最近更新 {{ item.updateTime }}</span>
        <div class="split-point">·</div>
        <span class="one-data">{{ item.articleNum }} 内容</span>
        <div class="split-point">·</div>
        <span class="one-data">{{ item.attentionNum }} 关注</span>
        <div class="vertical-divider"></div>
        <div class="more-collect-btn" @click="openSubList(index)">
          {{ item.isOpen ? "收起" : "展开"
          }}<i class="el-icon-arrow-down" :class="{ rotated: item.isOpen }"></i>
        </div>
      </div>
      <div class="collect-content" v-show="item.isOpen">
        <div
          class="one-article"
          v-for="(subItem, index) in item.subList"
          :key="index"
        >
          <div class="article-type">{{ subItem.type }}</div>
          <div class="article-title">{{ subItem.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CollectView",
  data() {
    return {
      collectList: [
        {
          name: "默认收藏夹",
          isFocus: false,
          updateTime: "2025.07.18",
          articleNum: 207,
          attentionNum: 0,
          subList: [
            {
              type: "博客",
              title: "《c++课程设计》",
            },
            {
              type: "博客",
              title: "《c++课程设计》",
            },
            {
              type: "博客",
              title: "《c++课程设计》",
            },
          ],
        },
        {
          name: "默认收藏夹2",
          isFocus: false,
          updateTime: "2025.07.18",
          articleNum: 207,
          attentionNum: 0,
          subList: [
            {
              type: "博客",
              title: "《c++课程设计》",
            },
            {
              type: "博客",
              title: "《c++课程设计》",
            },
            {
              type: "博客",
              title: "《c++课程设计》",
            },
          ],
        },
        {
          name: "默认收藏夹3",
          isFocus: false,
          updateTime: "2025.07.18",
          articleNum: 207,
          attentionNum: 0,
          subList: [
            {
              type: "博客",
              title: "《c++课程设计》",
            },
            {
              type: "博客",
              title: "《c++课程设计》",
            },
            {
              type: "博客",
              title: "《c++课程设计》",
            },
          ],
        },
      ],
    };
  },
  created() {
    //获取数据后
    this.collectList = this.collectList.map((item) => ({
      ...item,
      isOpen: false,
    }));
  },
  methods: {
    openSubList(index) {
      if (this.collectList[index].isOpen) {
        this.collectList[index].isOpen = !this.collectList[index].isOpen;
      } else {
        this.collectList[index].isOpen = !this.collectList[index].isOpen;
      }
    },
    focusCollect(index) {
      this.collectList[index].isFocus = !this.collectList[index].isFocus;
    },
  },
};
</script>


<style scoped>
.sub-container {
  width: 100%;
  padding: 0 24px;
}
.collect {
  width: 100%;
  padding: 24px 0;
  border-bottom: 1px solid #e8e8ed;
}
.collect-top {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.collect-name {
  color: #222226;
  font-size: 18px;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
}
.focus-on-btn {
  width: 74px;
  height: 24px;
  border-radius: 12px;
  border: 1px solid #ccccd8;
  color: #555666;
  text-align: center;
  line-height: 22px;
  font-size: 14px;
  cursor: pointer;
}
.foucsed {
  color: #999aaa;
}
.focus-on-btn:hover {
  border: 1px solid #555666;
}
.collect-data {
  display: flex;
  align-items: center;
  margin-top: 16px;
}
.one-data {
  color: #555666;
  font-size: 14px;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
}
.vertical-divider {
  border-left: 1px solid #e8e8ed;
  height: 16px;
  margin: 0 16px;
}
.more-collect-btn {
  cursor: pointer;
  display: flex;
  align-items: center;
  text-align: center;
  line-height: 22px;
  color: #555666;
  font-size: 14px;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
}
.el-icon-arrow-down {
  width: 14px;
  height: 14px;
  object-fit: cover;
  display: block;
  margin-left: 2px;
  transition: transform 0.5s ease;
}
.el-icon-arrow-down.rotated {
  transform: rotate(180deg);
}
.split-point {
  color: #555666;
  font-size: 14px;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
  margin: 0 6px;
}
.collect-content {
  width: 100%;
  background-color: #f7f8f9;
  padding: 0 16px 16px;
  margin-top: 6px;
}
.one-article {
  display: flex;
  align-items: center;
  padding: 16px 0 0;
}
.one-article:hover .article-title {
  color: #fc5531;
}
.article-type {
  cursor: pointer;
  min-width: 36px;
  padding: 5px;
  height: 20px;
  border-radius: 2px;
  border: 1px solid #fc5531;
  color: #fc5531;
  font-size: 12px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-right: 8px;
}
.article-title {
  cursor: pointer;
  color: #555666;
  font-size: 16px;
  ont-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
  overflow: hidden;
  white-space: normal;
  word-break: break-word;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
</style>
