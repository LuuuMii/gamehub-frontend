<template>
  <div class="sub-contaniner">
    <div class="column-type">
      <div
        class="column-paid"
        @click="getList('paid')"
        :class="{ 'active-column': activityIndex === 0 }"
      >
        <span>付费专栏</span>
      </div>
      <div
        class="column-free"
        @click="getList('free')"
        :class="{ 'active-column': activityIndex === 1 }"
      >
        <span>免费专栏</span>
      </div>
    </div>
    <div class="column-content">
      <div class="one-column" v-for="index in 10" :key="index">
        <div class="one-column-left">
          <div class="back1"></div>
          <div class="back2"></div>
          <div class="back3"><img src="../../assets/banner.jpg" /></div>
        </div>
        <div class="one-column-right">
          <div class="column-title">算法: 基础</div>
          <div class="column-data">
            <span class="one-column-data">1 篇内容</span>
            <div class="split-point">·</div>
            <span class="one-column-data">5017 阅读</span>
          </div>
        </div>
      </div>
    </div>
    <div>分页</div>
  </div>
</template>

<script>
export default {
  name: "ColumnView",
  data() {
    return {
      activityIndex: 0,
    };
  },
  methods: {
    getList(condition) {
      console.log(condition);
      if (condition === "paid") {
        this.activityIndex = 0;
        console.log(this.activityIndex);
      } else if (condition === "free") {
        this.activityIndex = 1;
        console.log(this.activityIndex);
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
.column-type {
  display: flex;
  align-items: center;
  padding: 8px 0 8px;
  border-bottom: 1px solid #e8e8ed;
}
.column-paid {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.column-paid span {
  font-size: 14px;
  color: #222226;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
}

.column-free {
  display: flex;
  align-items: center;
  margin-left: 40px;
  cursor: pointer;
}
.column-free span {
  font-size: 14px;
  color: #222226;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
}
.active-column span {
  color: #fc5531;
}

.one-column {
  cursor: pointer;
  display: flex;
  padding: 24px 0;
  border-bottom: 1px solid #e8e8ed;
}
.one-column-left {
  position: relative;
}
.back1 {
  width: 82px;
  height: 90px;
  border-radius: 4px;
  z-index: 1;
  position: absolute;
  left: 8px;
  top: 3px;
  bottom: 3px;

  border-right: 8px solid rgba(0, 0, 0, 0.08);
}
.back2 {
  width: 82px;
  height: 94px;
  border-radius: 4px;
  z-index: 2;
  position: absolute;
  left: 4px;
  top: 1px;
  bottom: 1px;

  border-right: 4px solid rgba(0, 0, 0, 0.15);
}
.back3 {
  width: 82px;
  height: 96px;
  border-radius: 4px;
  z-index: 3;
}
.back3 img {
  width: 82px;
  height: 96px;
  object-fit: cover;
  border-radius: 4px;
  display: block;
}
.one-column-right {
  margin-left: 24px;
}
.column-title {
  max-width: 650px;
  font-size: 18px;
  color: #000;
  font-weight: bold;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
}
.column-title:hover{
  color: #fc5531;
}
.column-data {
  display: flex;
  align-items: center;
  margin-top: 50px;
}
.one-column-data {
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
