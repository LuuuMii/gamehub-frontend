<template>
  <div class="children">
    <div class="activity-label">
      <span
        class="label-span-topic"
        :class="{ 'active-activity-label': activeIndex === 0 }"
        @click="clickTopic"
        >创作话题</span
      >
      <span
        class="label-span-activity"
        :class="{ 'active-activity-label': activeIndex === 1 }"
        @click="clickActivity"
        >创作活动</span
      >
    </div>
    <div class="activity" v-for="index in 8" :key="index">
      <div class="activity-top">
        <img
          class="activity-icon"
          :src="activeIndex === 1 ? activityIcon : topicIcon"
        />
        <span class="activity-title">王者杯·14天创作挑战营·第4期</span>
      </div>
      <div class="activity-introduction">
        这是一个以写作博客为目的的创作活动，旨在鼓励码龄大于等于5年的博主们挖掘自己的创作潜能，展现自己的写作才华。如果你是一位热爱写作的、想要展现自己创作才华的小伙伴，那么，快来参加吧！我们一起发掘写作的魅力，书写出属于我们的故事。
        注：
        1、参赛者可以进入活动群进行交流、分享创作心得，互相鼓励与支持（开卷），答疑及活动群请见https://bbs.csdn.net/topics/619799019
        2、文章质量分查询：https://www.csdn.net/qc
        我们诚挚邀请你们参加为期14天的创作挑战赛！
      </div>
      <div class="activity-data">
        <span class="activity-span">10w+次浏览</span>
        <div class="split-point">·</div>
        <span class="activity-span">86人参与</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ActivityView",
  data() {
    return {
      activeIndex: 0,
      topicIcon: require("@/assets/icon/topic.png"),
      activityIcon: require("@/assets/icon/activity.png"),
    };
  },
  methods: {
    clickTopic() {
      this.activeIndex = 0;
    },
    clickActivity() {
      this.activeIndex = 1;
    },
  },
};
</script>


<style scoped>
.children {
  width: 100%;
  padding: 0 20px;
}
.activity-label {
  display: flex;
  align-items: center;
  padding: 7px 0;
  border-bottom: 1px solid #e8e8ed;
}
.label-span-topic {
  margin-right: 48px;
}
.label-span-topic,
.label-span-activity {
  cursor: pointer;
  color: #222226;
  font-size: 14px;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
}
.active-activity-label {
  color: #fc5531;
}
.activity {
  cursor: pointer;
  padding: 20px 18px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  margin-top: 10px;
}
.activity-top {
  display: flex;
  align-items: center;
}
.activity-icon {
  width: 20px;
  height: 20px;
  object-fit: cover;
  display: block;
  margin-right: 8px;
}
.activity-title {
  color: #000;
  font-size: 16px;
  font-weight: bold;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
}
.activity-title:hover {
  color: #fc5531;
}
.activity-introduction {
  color: #999999;
  font-size: 14px;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  margin: 12px 0;
}
.activity-data {
  display: flex;
  align-items: center;
}
.activity-span {
  color: #999999;
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
