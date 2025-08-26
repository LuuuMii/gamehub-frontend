<template>
  <div class="sub-container">
    <ul class="sub-ul">
      <li v-for="(item, index) in ulList" :key="index">
        <span
          :class="{ 'active-span': activeIndex === index }"
          @click="chooseSub(index)"
          >{{ item.name }}</span
        >
      </li>
    </ul>
    <div class="divider-super">
      <div class="divider"></div>
    </div>
    <div class="children-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "SubView",
  data() {
    return {
      activeIndex: 0,
      ulList: [
        {
          name: "关注的人",
          url: "watch",
        },
        {
          name: "粉丝",
          url: "fans",
        },
        {
          name: "关注的收藏夹",
          url: "folder",
        },
        {
          name: "关注的社区",
          url: "community",
        },
        {
          name: "发布的评论",
          url: "postComment",
        },
        {
          name: "收到的评论",
          url: "receivedComment",
        },
        {
          name: "订阅专栏",
          url: "column",
        },
        {
          name: "参与的活动",
          url: "activity",
        },
      ],
      userId: null,
    };
  },
  created() {
    this.userId = this.$route.params.id;
    const targetPath = `/userspace/${this.userId}/sub/watch`;
    if (this.$route.path !== targetPath) {
      this.$router.push({
        path: `/userspace/${this.userId}/sub/watch`,
      });
    }
  },
  methods: {
    chooseSub(index) {
      this.activeIndex = index;
      const url = this.ulList[index].url;
      const targetPath = `/userspace/${this.userId}/sub/${url}`;

      if (this.$route.path !== targetPath) {
        this.$router.push({
          path: `/userspace/${this.userId}/sub/${url}`,
        });
      }
    },
  },
  watch: {
    '$route'(to){
      const targetPath = `/userspace/${to.params.id}/sub`
      if(to.path === targetPath){
        this.$router.push({
          path: `/userspace/${this.userId}/sub/${this.ulList[this.activeIndex].url}`,
        })
      }
    }
  }
};
</script>


<style scoped>
.sub-container {
  width: 100%;
}
.sub-ul {
  display: flex;
  align-items: center;
  padding: 8px 16px 8px;
}
.sub-ul li {
  display: flex;
  align-items: center;
  margin-right: 40px;
}
.sub-ul li span {
  cursor: pointer;
  color: #222226;
  font-size: 14px;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
}
.sub-ul li span.active-span {
  color: #fc5531;
}
.divider-super {
  width: 100%;
  display: flex;
  justify-content: center;
}
.divider {
  width: 96%;
  border-top: 1px solid #e8e8ed;
}
.children-container {
  width: 100%;
}
</style>
