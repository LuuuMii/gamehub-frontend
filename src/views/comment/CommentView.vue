<template>
  <div class="myContainer">
    <div class="top-bar">
      <div class="left-bar">
        <span class="comment-span">评论</span>
        <span class="comment-number">86</span>
      </div>
      <div>
        <img
          class="close-btn"
          src="../../assets/icon/closeBt.png"
          @click="closeComment"
        />
      </div>
    </div>
    <!-- 评论内容 -->
    <div class="bottom-bar">
      <!-- 发布内容 -->
      <div class="publish-comment">
        <img class="publish-avatar" :src="userAvatar" />
        <div class="comment-content">
          <textarea
            class="ta"
            placeholder="欢迎高质量的评论，低质的评论会被折叠"
            rows="5"
            v-model="commentContent"
            maxlength="1000"
          >
          </textarea>
          <div class="between-space-div">
            <div>
              <span class="s1">还能输入<span class="s2">{{ 1000 - commentContent.length }}</span>个字符</span>
            </div>
            <div class="flex-div">
              <img
                class="img-icon"
                src="../../assets/icon/commentReward.png"
                title="添加红包"
              />
              <img
                class="img-icon"
                src="../../assets/icon/commentEmotionIcon.png"
                title="添加表情"
              />
              <img
                class="img-icon"
                src="../../assets/icon/commentCodeIcon.png"
                title="代码块"
              />
              <div class="publish-btn" @click="postCommentHandler">评论</div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
      <!-- 他人评论 -->
      <div class="other-comments-box">
        <!-- 单一条他人评论 -->
        <div
          class="one-other-comment-box"
          v-for="(item, index) in comments"
          :key="index"
        >
          <!-- 左边头像 -->
          <div class="left-avatar-box">
            <img :src="item.userAvatar" alt="" />
          </div>
          <!-- 右边内容 -->
          <div class="right-content-box">
            <div
              class="top-box"
              @mouseenter="showMoreBtnHandler(item)"
              @mouseleave="hiddenMoreBtnHandler(item)"
            >
              <div class="comment-data-box">
                <span class="comment-name">{{ item.username }}</span>
                <span class="comment-data">{{
                  formatTimeAgo(item.createTime)
                }}</span>
              </div>
              <div class="comment-op-box">
                <div
                  class="more-op-btn"
                  :class="{
                    'more-op-btn-active': activeMoreBtnIndex === item.id,
                  }"
                >
                  <img src="@/assets/icon/more_777888.svg" />
                </div>
                <div
                  class="reply-comment-btn"
                  :class="{
                    'reply-comment-btn-active': activeMoreBtnIndex === item.id,
                  }"
                  @click="openReplyComment(item.id)"
                >
                  <img src="@/assets/icon/newCommentReplyWhite.png" alt="" />
                  <span>回复</span>
                </div>
                <div class="like-comment-btn">
                  <img src="@/assets/icon/commentLikeHover.png" alt="" />
                  <span>{{
                    item.likeCount === 0 || !item.likeCount ? "" : 0
                  }}</span>
                </div>
              </div>
            </div>
            <div class="bottom-box">
              {{ item.content }}
            </div>
            <!-- 回复框 -->
            <div
              class="reply-comment-box"
              v-show="activeReplyIndex === item.id"
            >
              <textarea
                class="reply-ta"
                rows="4"
                v-model="replyCommentContent"
                :placeholder="replyUserPlaceholder"
              ></textarea>
              <div class="between-space-div">
                <div>
                  <span class="s1"
                    >还能输入<span class="s2">1000</span>个字符</span
                  >
                </div>
                <div class="flex-div">
                  <img
                    class="img-icon"
                    src="../../assets/icon/commentEmotionIcon.png"
                    title="添加表情"
                  />
                  <img
                    class="img-icon"
                    src="../../assets/icon/commentCodeIcon.png"
                    title="代码块"
                  />
                  <div class="publish-btn" @click="replyCommentHandler(item)">
                    评论
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
            <!-- 评论下面的回复 -->
            <div
              class="reply-again-box"
              v-for="(sub, index) in item.childrenList"
              :key="index"
            >
              <div class="again-left">
                <img :src="sub.userAvatar" alt="" />
              </div>
              <div class="again-right">
                <div
                  class="top-box"
                  @mouseenter="showMoreBtnHandler(sub)"
                  @mouseleave="hiddenMoreBtnHandler(sub)"
                >
                  <div class="comment-data-box">
                    <span class="comment-name">{{ sub.username }} </span>
                    <span class="comment-data">回复</span>
                    <span class="comment-data">{{ sub.replyUsername }}</span>
                    <span class="comment-data">{{
                      formatTimeAgo(sub.createTime)
                    }}</span>
                  </div>
                  <div class="comment-op-box">
                    <div
                      class="more-op-btn"
                      :class="{ 'more-op-btn-active': activeMoreBtnIndex === sub.id }"
                    >
                      <img src="@/assets/icon/more_777888.svg" />
                    </div>
                    <div
                      class="reply-comment-btn"
                      @click="openReplyComment(sub.id)"
                      :class="{ 'reply-comment-btn-active': activeMoreBtnIndex === sub.id }"
                    >
                      <img
                        src="@/assets/icon/newCommentReplyWhite.png"
                        alt=""
                      />
                      <span>回复</span>
                    </div>
                    <div class="like-comment-btn">
                      <img src="@/assets/icon/commentLikeHover.png" alt="" />
                      <span>{{ sub.likeCount<=0? "" : sub.likeCount }}</span>
                    </div>
                  </div>
                </div>
                <div class="bottom-box1">
                  <span>{{ sub.content }}</span>
                </div>
                <div class="reply-comment-again-box" v-show="activeReplyIndex === sub.id">
                  <textarea
                    class="reply-ta"
                    rows="4"
                    v-model="replyCommentContent"
                    :placeholder="replyUserPlaceholder"
                  ></textarea>
                  <div class="between-space-div">
                    <div>
                      <span class="s1"
                        >还能输入<span class="s2">1000</span>个字符</span
                      >
                    </div>
                    <div class="flex-div">
                      <img
                        class="img-icon"
                        src="../../assets/icon/commentEmotionIcon.png"
                        title="添加表情"
                      />
                      <img
                        class="img-icon"
                        src="../../assets/icon/commentCodeIcon.png"
                        title="代码块"
                      />
                      <div class="publish-btn" @click="replyCommentSubHandler(item,sub)">评论</div>
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from "../../mitt/eventBus";
import { formatTimeAgo } from "@/utils/time";
import {
  getArticleCommentByArticleId,
  addArticleComment,
} from "@/api/articleComment.js";
export default {
  name: "CommentView",
  data() {
    return {
      isShowLikeNum: false,
      isLike: false,
      defaultIcon: require("../../assets/icon/commentLikeHover.png"),
      likeIcon: require("../../assets/icon/commentLikeActive.png"),
      unlikeIcon: require("../../assets/icon/commentLikeHover.png"),
      likeNum: 3,
      isShowReplyComment: false,
      activeReplyIndex: null,
      comments: [],
      activeMoreBtnIndex: null,
      commentContent: "",
      replyCommentContent: "",
      articleId: null,
      replyUserPlaceholder: "",
      userAvatar:null,
    };
  },
  created() {
    //修改数据
    this.initData();
    this.userAvatar = localStorage.getItem("avatar");
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    formatTimeAgo,
    async initData() {
      const articleId = this.$route.params.id;
      if (articleId) {
        // 获取数据
        this.articleId = articleId;
        const articleCommentRes = await getArticleCommentByArticleId(articleId);
        this.comments = articleCommentRes.data;
        console.log(this.comments);
      }
    },
    // 发布评论
    async postCommentHandler() {
      if (this.commentContent === "") {
        this.$message.info("请输入内容~");
        return;
      }
      const commentData = {
        articleId: this.articleId,
        userId: localStorage.getItem("userId"),
        content: this.commentContent,
      };
      const res = await addArticleComment(commentData);
      if (res.code === 200) {
        //发布成功  重新获取数据
        const articleCommentRes = await getArticleCommentByArticleId(
          this.articleId
        );
        this.comments = articleCommentRes.data;
        this.commentContent = "";
      }
    },
    // 回复评论
    async replyCommentHandler(item) {
      if (this.replyCommentContent === "") {
        return;
      }
      console.log(item);
      const replyComment = {
        articleId: this.articleId,
        userId: localStorage.getItem("userId"),
        parentId: item.id,
        replyUserId: item.userId,
        content: this.replyCommentContent,
      };
      const res = await addArticleComment(replyComment);
      if (res.code === 200) {
        //发布成功  重新获取数据
        const articleCommentRes = await getArticleCommentByArticleId(
          this.articleId
        );
        this.comments = articleCommentRes.data;
        this.replyCommentContent = "";
        this.hiddenMoreBtnHandler();
        this.activeReplyIndex = null;
      }
    },
    async replyCommentSubHandler(item,sub){
      if (this.replyCommentContent === "") {
        return;
      }
      const replyComment = {
        articleId: this.articleId,
        userId: localStorage.getItem("userId"),
        parentId: item.id,
        replyUserId: sub.userId,
        content: this.replyCommentContent,
      };
      const res = await addArticleComment(replyComment);
      if (res.code === 200) {
        //发布成功  重新获取数据
        const articleCommentRes = await getArticleCommentByArticleId(
          this.articleId
        );
        this.comments = articleCommentRes.data;
        this.replyCommentContent = "";
        this.hiddenMoreBtnHandler();
        this.activeReplyIndex = null;
      }
    },
    showMoreBtnHandler(item) {
      this.activeMoreBtnIndex = item.id;
      this.replyUserPlaceholder = "回复 " + item.username;
    },
    
    hiddenMoreBtnHandler(item) {
      console.log(item);
      this.activeMoreBtnIndex = null;
    },
    openReplyComment(commentId) {
      this.replyCommentContent = "";
      this.activeReplyIndex = this.activeReplyIndex ? null : commentId;
    },

    closeComment() {
      eventBus.emit("closeMask");
      eventBus.emit("closeComment");
    },
  },
};
</script>

<style scoped>
.myContainer {
  width: 100%;
}
.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px 16px;
  border-bottom: 1px solid #e8e8ed;
}
.comment-span {
  color: #222226;
  font-size: 16px;
  font-family: "SF Pro SC", "SF Pro Text", "SF Pro Icons", "PingFang SC",
    "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  margin-right: 4px;
}
.comment-number {
  color: #222226;
  font-size: 14px;
  font-family: "SF Pro SC", "SF Pro Text", "SF Pro Icons", "PingFang SC",
    "Helvetica Neue", "Helvetica", "Arial", sans-serif;
}
.close-btn {
  width: 12px;
  height: 12px;
  object-fit: cover;
  cursor: pointer;
}
.bottom-bar {
  width: 100%;
  padding: 12px 20px;
}
.publish-comment {
  width: 100%;
  display: flex;
}
.publish-avatar {
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 50%;
  display: block;
  margin-right: 8px;
}
.comment-content {
  background-color: #f5f6f7cc;
  border-radius: 8px;
  width: 100%;
  padding: 14px 16px;
}
.ta {
  width: 100%;
  border: none; /* 去边框 */
  outline: none; /* 去聚焦外框 */
  box-shadow: none; /* 去阴影（有些浏览器默认有） */
  background: transparent; /* 背景透明，如需底色可改成#f7f8fa等 */
  resize: none; /* 禁止用户拖拽改变大小；想允许就删掉这行 */
  -webkit-appearance: none; /* iOS/Safari 去默认样式 */
  appearance: none;
  overflow: auto;
  font-size: 14px;
  font-family: "SF Pro Display", Roboto, Noto, Arial, "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  margin-bottom: 4px;
  border-bottom: 1px solid #e8e8ed;
}
.ta::placeholder {
  color: #999;
  font-size: 12px;
  font-family: "SF Pro Display", Roboto, Noto, Arial, "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
}
/* 自定义滚动条 (仅webkit内核浏览器有效) */
.ta::-webkit-scrollbar {
  width: 60px; /* 滚动条宽度 */
}
.ta::-webkit-scrollbar-track {
  background: transparent; /* 滚动条轨道背景 */
}
.ta::-webkit-scrollbar-thumb {
  background: #c1c1c1; /* 滑块颜色 */
  border-radius: 4px; /* 圆角 */
}
.ta::-webkit-scrollbar-thumb:hover {
  background: #999; /* hover时更深 */
}

/* Firefox */
.ta {
  scrollbar-width: thin; /* 细滚动条 */
  scrollbar-color: #c1c1c1 transparent; /* 滑块色 + 背景色 */
}
.between-space-div {
  display: flex;
  justify-content: space-between;
}
.s1 {
  color: #999aaa;
  font-style: normal;
  font-size: 12px;
  font-family: "SF Pro Display", Roboto, Noto, Arial, "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
}
.s2 {
  color: #222226;
  font-style: normal;
  font-size: 12px;
  font-family: "SF Pro Display", Roboto, Noto, Arial, "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
}
.flex-div {
  display: flex;
  align-items: center;
}
.img-icon {
  cursor: pointer;
  width: 20px;
  height: 20px;
  object-fit: cover;
  margin-right: 8px;
  display: block;
}
.publish-btn {
  cursor: pointer;
  padding: 1px 0 2px;
  width: 60px;
  background-color: #fc5531;
  border-radius: 16px;
  color: #fff;
  font-size: 12px;
  border: 1px solid #b4b3b2;
  display: flex;
  text-align: center;
  justify-content: center;
  align-content: center;
  margin-left: 8px;
}
.other-comments-box {
  width: 100%;
}
.one-other-comment-box {
  width: 100%;
  display: flex;
  margin-top: 12px;
}
.left-avatar-box img {
  width: 32px;
  height: 32px;
  object-fit: cover;
  display: block;
  border-radius: 50%;
  cursor: pointer;
}
.right-content-box {
  width: 100%;
  margin-left: 8px;
}
.top-box {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
}
.comment-data-box {
  display: flex;
  align-items: center;
  overflow: hidden; /* 超出隐藏 */
  text-overflow: ellipsis; /* 显示省略号 */
  white-space: nowrap; /* 不换行 */
}
.comment-name,
.comment-data {
  font-size: 12px;
  color: #777888;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.comment-data {
  margin-left: 4px;
}
.comment-op-box {
  display: flex;
  align-items: center;
}
.more-op-btn img {
  width: 20px;
  height: 20px;
  object-fit: cover;
  display: block;
  cursor: pointer;
}
.reply-comment-btn,
.like-comment-btn {
  display: flex;
  align-items: center;
  margin-left: 8px;
  cursor: pointer;
}
.reply-comment-btn img,
.like-comment-btn img {
  width: 16px;
  height: 16px;
  object-fit: cover;
  display: block;
  margin-right: 2px;
}
.reply-comment-btn span,
.like-comment-btn span {
  font-size: 14px;
  color: #777888;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.more-op-btn,
.reply-comment-btn {
  opacity: 0;
  transition: opacity 0.1s ease;
}
.more-op-btn-active,
.reply-comment-btn-active {
  opacity: 1;
}
.bottom-box {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 8px;

  font-size: 14px;
  color: #222226;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.reply-comment-box {
  width: 100%;
  height: 120px;
  padding: 12px 16px;
  background-color: #f8f9fb;
  border-radius: 8px;
  margin-top: 8px;
}
.reply-ta {
  width: 100%;
  border: none; /* 去边框 */
  outline: none; /* 去聚焦外框 */
  box-shadow: none; /* 去阴影（有些浏览器默认有） */
  background: transparent; /* 背景透明，如需底色可改成#f7f8fa等 */
  resize: none; /* 禁止用户拖拽改变大小；想允许就删掉这行 */
  -webkit-appearance: none; /* iOS/Safari 去默认样式 */
  appearance: none;
  overflow: auto;
  font-size: 14px;
  font-family: "SF Pro Display", Roboto, Noto, Arial, "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  margin-bottom: 4px;
  border-bottom: 1px solid #e8e8ed;
}
.reply-ta::placeholder {
  color: #999;
  font-size: 12px;
  font-family: "SF Pro Display", Roboto, Noto, Arial, "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
}
/* 自定义滚动条 (仅webkit内核浏览器有效) */
.reply-ta::-webkit-scrollbar {
  width: 60px; /* 滚动条宽度 */
}
.reply-ta::-webkit-scrollbar-track {
  background: transparent; /* 滚动条轨道背景 */
}
.reply-ta::-webkit-scrollbar-thumb {
  background: #c1c1c1; /* 滑块颜色 */
  border-radius: 4px; /* 圆角 */
}
.reply-ta::-webkit-scrollbar-thumb:hover {
  background: #999; /* hover时更深 */
}

/* Firefox */
.reply-ta {
  scrollbar-width: thin; /* 细滚动条 */
  scrollbar-color: #c1c1c1 transparent; /* 滑块色 + 背景色 */
}
.reply-again-box {
  display: flex;
  width: 100%;
  margin-top: 12px;
}
.again-left img {
  width: 24px;
  height: 24px;
  object-fit: cover;
  display: block;
  margin-right: 8px;
  border-radius: 50%;
  cursor: pointer;
}
.again-right {
  width: 100%;
}
.bottom-box1 {
  margin-top: 4px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.bottom-box1 span {
  font-size: 14px;
  color: #222226;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.reply-comment-again-box {
  width: 100%;
  height: 120px;
  padding: 12px 16px;
  background-color: #f8f9fb;
  border-radius: 8px;
  margin-top: 8px;
}
</style>