<template>
  <div class="sub-contaniner">
    <div class="BBS-label">
      <span
        class="label-span-reply"
        :class="{ 'active-bbs-label': activeIndex === 0 }"
        @click="clickBBSForReply"
        >回复的帖子</span
      >
      <span
        class="label-span-publish"
        :class="{ 'active-bbs-label': activeIndex === 1 }"
        @click="clickBBSForPublish"
        >发布的帖子</span
      >
    </div>
    <div class="bbs" v-for="index in 5" :key="index">
      <div class="bbs-comment">欢迎交流学习!_成就一亿技术人!</div>
      <div class="bbs-data-reply" v-show="activeIndex === 0">
        <span class="bbs-span">回复帖子 2025.07.20</span>
        <div class="split-point">·</div>
        <img class="address-icon" src="@/assets/icon/tag-sub.png" />
        <span class="bbs-span address">原帖地址</span>
      </div>
      <div class="bbs-data-publish" v-show="activeIndex === 1">
        <span class="bbs-span">发布帖子 2025.07.20</span>
        <div class="split-point">·</div>
        <img class="address-icon" src="@/assets/icon/visibility.svg">
        <span class="bbs-span address">223观看</span>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BBSView",
  data() {
    return {
      activeIndex: 0,
    };
  },
  methods: {
    clickBBSForReply() {
      this.activeIndex = 0;
    },
    clickBBSForPublish() {
      this.activeIndex = 1;
    },
  },
};
</script>


<style scoped>
.sub-contaniner {
  width: 100%;
  padding: 0 20px;
}
.BBS-label {
  display: flex;
  align-items: center;
  padding: 7px 0;
  border-bottom: 1px solid #e8e8ed;
}
.label-span-reply {
  margin-right: 48px;
}
.label-span-reply,
.label-span-publish {
  cursor: pointer;
  color: #222226;
  font-size: 14px;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
}
.active-bbs-label {
  color: #fc5531;
}
.bbs {
  padding: 16px 0;
  border-bottom: 1px solid #e8e8ed;
}
.bbs-comment {
  color: #222226;
  font-size: 16px;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
}
.bbs-comment:hover {
  color: #fc5531;
  cursor: pointer;
}
.bbs-data-reply,.bbs-data-publish {
  display: flex;
  align-items: center;
  margin-top: 12px;
}
.address-icon {
  width: 16px;
  height: 16px;
  object-fit: cover;
  display: block;
  margin-right: 2px;
}

.bbs-span {
  color: #555666;
  font-size: 14px;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
}
.address:hover {
  cursor: pointer;
  color: #222226;
}
.split-point {
  color: #555666;
  font-size: 14px;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
  margin: 0 6px;
}
</style>
