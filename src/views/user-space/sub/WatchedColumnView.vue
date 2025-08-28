<template>
  <div class="children">
    <div class="watched-column-label">
      <span
        class="label-span-normal"
        :class="{ 'active-column-label': activeColumnIndex === 0 }"
        @click="clickColumnForNormal"
        >普通专栏</span
      >
      <span
        class="label-span-paid"
        :class="{ 'active-column-label': activeColumnIndex === 1 }"
        @click="clickColumnForPaid"
        >付费专栏</span
      >
    </div>
    <div class="watched-column" v-for="index in 8" :key="index">
      <img class="watched-column-img" src="../../../assets/column.jpeg" />
      <div>
        <div class="watched-column-title">前沿技术分享</div>
        <div class="watched-column-introduction">
          前沿技术分享，聚焦程序员领域，前沿技术不断涌现，为软件开发与信息技术发展注入新活力。大语言模型驱动的智能编程工具，如
          GitHub
          Copilot，能依据代码上下文自动补全和生成代码，极大提升开发效率。低代码
          / 无代码开发平台兴起，让非专业程序员也能搭建应用程序，拓宽开发边界。
        </div>
        <div class="watched-column-data">
          <span class="watched-column-num">28 人关注</span>
          <div class="split-point">·</div>
          <span class="watched-column-num">41 篇文章</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WatchedColumnView",
  data() {
    return {
      activeColumnIndex: 0,
    };
  },
  methods: {
    clickColumnForNormal(){
      this.activeColumnIndex = 0;
    },
    clickColumnForPaid(){
      this.activeColumnIndex = 1;
    }
  },
};
</script>


<style scoped>
.children {
  width: 100%;
  padding: 0 20px;
}
.watched-column-label {
  display: flex;
  align-items: center;
  padding: 7px 0;
  border-bottom: 1px solid #e8e8ed;
}
.label-span-normal {
  margin-right: 48px;
}
.label-span-normal,
.label-span-paid {
  cursor: pointer;
  color: #222226;
  font-size: 14px;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
}
.active-column-label {
  color: #fc5531;
}

.watched-column {
  display: flex;
  width: 100%;
  padding: 20px 0;
  border-bottom: 1px solid #e8e8ed;
}
.watched-column-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  display: block;
  margin-right: 16px;
  cursor: pointer;
}
.watched-column-title {
  color: #222226;
  font-size: 16px;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
}
.watched-column-title:hover {
  color: #fc5531;
  cursor: pointer;
}
.watched-column-introduction {
  color: #555666;
  font-size: 14px;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 800px;
  margin-top: 4px;
}
.watched-column-data {
  display: flex;
  align-items: center;
  margin-top: 16px;
}
.watched-column-num {
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
