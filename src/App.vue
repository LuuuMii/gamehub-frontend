<template>
  <div>
    <div>
      <HeaderView class="hearrrrr"></HeaderView>
      <div>
        <router-view />
      </div>
      <FooterView></FooterView>
    </div>
    <!-- 遮罩层 -->
    <div v-if="showMask" class="overlay" @click="closeAll"></div>
    <!-- 评论区 -->
    <div v-if="showComment" class="comment">
      <CommentView></CommentView>
    </div>
    <!-- 登录页 -->
    <div v-if="showLogin" class="login">
      <LoginComponent></LoginComponent>
    </div>
  </div>
</template>


<script>
import HeaderView from "./views/HeaderView.vue";
import FooterView from "./views/FooterView.vue";
import CommentView from "./views/comment/CommentView.vue";
import LoginComponent from "@/components/LoginComponent.vue";
import { eventBus } from "./mitt/eventBus";
import { getUserInfoByToken } from "@/api/user.js";
export default {
  components: {
    HeaderView,
    FooterView,
    CommentView,
    LoginComponent,
  },
  data() {
    return {
      showMask: false,
      showComment: false,
      showLogin: false,
    };
  },
  created() {
    // 子页面通知我打开遮罩层
    eventBus.on("openMask", () => {
      this.showMask = true;
    });
    // 子页面通知我关闭遮罩层
    eventBus.on("closeMask", () => {
      this.showMask = false;
    });

    // 子页面通知我打开评论区
    eventBus.on("openComment", () => {
      this.showComment = true;
    });
    // 子页面通知我关闭评论区
    eventBus.on("closeComment", () => {
      this.showComment = false;
    });

    //子页面通知我打开登录页面
    eventBus.on("openLogin", () => {
      this.showLogin = true;
    });
    //子页面通知我关闭登录页面
    eventBus.on("closeLogin", () => {
      this.showLogin = false;
    });
    this.initData();
  },
  methods: {
    closeAll() {
      this.showMask = false;
      this.showComment = false;
      // 通知子页面关闭弹窗
      eventBus.emit("closePopup");
      eventBus.emit("closeComment");

      eventBus.emit("closeScheduledDialog");

      eventBus.emit("closeCollectionDialog");
    },
    initData() {
      const token = localStorage.getItem("token");

      if (token) {
        this.$store.commit("setToken", token);
        getUserInfoByToken(token).then((res) => {
          if (res.code === 200) {
            this.$store.commit("setUser",res.data);
            localStorage.setItem("userId",res.data.id);
            localStorage.setItem("username",res.data.username);
            localStorage.setItem("avatar",res.data.avatar);
          }else{
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            localStorage.removeItem("username");
            this.$router.push("/");
          }
        });
      }
    },
  },
};
</script>


<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
ul,
li {
  margin: 0;
  padding: 0;
  list-style: none;
}
.hearrrrr {
  position: sticky;
  top: 0;
  z-index: 199;
}
.myHeader {
  width: 100%;
  height: 55px;
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 200;
}
.comment {
  position: fixed;
  top: 0;
  right: 0;
  width: 500px;
  height: 100vh;
  background-color: #fff;
  z-index: 201;

  overflow-y: auto; /* 超出时显示纵向滚动条 */
  overflow-x: hidden; /* 横向隐藏滚动条 */
}
.login {
  width: 820px;
  height: 430px;
  background-color: #fff;
  border-radius: 8px;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 201;
}
</style>
