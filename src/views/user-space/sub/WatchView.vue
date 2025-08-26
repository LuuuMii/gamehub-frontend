<template>
  <div class="children">
    <div class="one-user" v-for="(item, index) in userList" :key="index">
      <div class="user-details">
        <img class="user-avatar" src="../../../assets/avatar.jpg" />
        <div class="user-data">
          <span class="username">{{ item.name }}</span>
          <span class="user-introduce">{{ item.introduce }}</span>
        </div>
      </div>
      <div
        class="focus-on-btn"
        :class="{ focused: item.isFocused }"
        @click="focusedUser(index)"
      >
        {{ item.isFocused ? "已关注" : "关注" }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WatchView",
  data() {
    return {
      userList: [
        {
          name: "爱喝冰可乐",
          introduce:
            "练习两点半的啥也不会练习两点12312半的啥也不会练习两点半的啥也不会练习两点半的啥也不会练习两点半的啥也不会",
          isFocused: false,
        },
        {
          name: "爱喝冰可乐2",
          introduce:
            "练习两点半的啥也不会练习两点12312半的啥也不会练习两点半的啥也不会练习两点半的啥也不会练习两点半的啥也不会",
          isFocused: false,
        },
        {
          name: "爱喝冰可乐3",
          introduce:
            "练习两点半的啥也不会练习两点12312半的啥也不会练习两点半的啥也不会练习两点半的啥也不会练习两点半的啥也不会",
          isFocused: false,
        },
        {
          name: "爱喝冰可乐4",
          introduce:
            "练习两点半的啥也不会练习两点12312半的啥也不会练习两点半的啥也不会练习两点半的啥也不会练习两点半的啥也不会",
          isFocused: false,
        },
      ],
    };
  },
  methods: {
    focusedUser(index) {
      this.userList[index].isFocused = !this.userList[index].isFocused;
    },
  },
};
</script>

<style scoped>
.children {
  width: 100%;
  padding: 0 28px;
}
.one-user {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid #e8e8ed;
}
.user-details {
  display: flex;
  align-items: center;
}
.user-avatar {
  width: 48px;
  height: 48px;
  object-fit: cover;
  display: block;
  border-radius: 50%;
  margin-right: 8px;
  cursor: pointer;
}
.username {
  cursor: pointer;
  display: block;
  color: #222226;
  font-size: 16px;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
}
.username:hover {
  color: #fc5531;
}
.user-introduce {
  display: block;
  max-width: 700px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #555666;
  font-size: 14px;
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
.focus-on-btn:hover {
  border: 1px solid #555666;
}
.focused {
  color: #999aaa;
}
</style>
