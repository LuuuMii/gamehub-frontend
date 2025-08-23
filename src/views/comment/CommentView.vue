<template>
  <div class="myContainer">
    <div class="top-bar">
      <div class="left-bar">
        <span class="comment-span">评论</span>
        <span class="comment-number">86</span>
      </div>
      <div>
        <img class="close-btn" src="../../assets/icon/closeBt.png" @click="closeComment" />
      </div>
    </div>
    <!-- 评论内容 -->
    <div class="bottom-bar">
      <!-- 发布内容 -->
      <div class="publish-comment">
        <img class="publish-avatar" src="../../assets/banner.jpg" />
        <div class="comment-content">
          <textarea
            class="ta"
            placeholder="欢迎高质量的评论，低质的评论会被折叠"
            rows="5"
            maxlength="1000"
          >
          </textarea>
          <div class="between-space-div">
            <div>
              <span class="s1">还能输入<span class="s2">1000</span>个字符</span>
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
              <div class="publish-btn">评论</div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
      <!-- 他人评论 -->
      <div
        class="other-comment"
        v-for="(comment, index) in comments"
        :key="index"
      >
        <!-- 头像 -->
        <div>
          <img class="other-avatar" src="../../assets/banner.jpg" />
        </div>
        <!-- 右边主题 -->
        <div class="right-content">
          <!-- 上半部分名字点赞等 -->
          <div
            class="between-div"
            @mouseenter="showMoreBtn(index)"
            @mouseleave="closeMoreBtn(index)"
          >
            <div class="flex-div">
              <span class="other-comment-name">23遇见222</span>
              <span class="other-comment-date">2小时前</span>
            </div>
            <div class="flex-div">
              <div class="flex-div hover" :class="{ visible: comment.isShowMoreBtn }">
                <img
                  class="comment-icon1"
                  src="../../assets/icon/commentLookMore.png"
                />
                <img
                  class="comment-icon2"
                  src="../../assets/icon/newCommentReplyWhite.png"
                  @click="openReplyComment(index)"
                />
                <span class="reply-span" @click="openReplyComment(index)"
                  >回复</span
                >
              </div>
              <!-- 点赞 -->
              <div class="flex-div">
                <span class="like-num" v-show="comment.likeNum > 0">{{
                  comment.likeNum
                }}</span>
                <img
                  class="comment-icon3"
                  :src="comment.isLiked ? likeIcon : unlikeIcon"
                  @click="likeComment(index)"
                />
              </div>
            </div>
          </div>
          <!-- 下半部分span -->
          <div>
            <span
              ref="contentSpans"
              class="content-span"
              :class="{ collapsed: !comment.isExpanded }"
            >
              {{ comment.content }}
            </span>
            <div
              class="expanded-btn"
              v-if="comment.isOverflow"
              @click="expandedComment(index)"
            >
              {{ comment.isExpanded ? "收起" : "更多" }}
            </div>
            <div
              class="comment-content comment-content2"
              v-if="activeReplyIndex === index"
            >
              <textarea
                class="ta"
                placeholder="回复：23遇见"
                rows="3"
                maxlength="1000"
              >
              </textarea>
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
                  <div class="publish-btn">评论</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 分页 -->
      <div class="pagination-div">
        <el-pagination background small layout="prev, pager, next" :total="100">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from '../../mitt/eventBus'
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
      comments: [
        {
          name: "23遇见222",
          date: "2小时前",
          content:
            "123123123123123213123123213213123213123内容丰富详实，观点独到深刻，论证条理清晰。无论是素材的运用还是逻辑的推进都恰到好处。语言简洁流畅且富有感染力，读罢让人深受启发。",
          likeNum: 2,
          isLiked: false,
        },
        {
          name: "李四",
          date: "3小时前",
          content: "观点独到...",
          likeNum: 3,
          isLiked: false,
        },
        {
          name: "李四",
          date: "3小时前",
          content: "观点独到...",
          likeNum: 3,
          isLiked: false,
        },
        {
          name: "李四",
          date: "3小时前",
          content: "观点独到...",
          likeNum: 3,
          isLiked: false,
        },
        {
          name: "李四",
          date: "3小时前",
          content: "观点独到...",
          likeNum: 3,
          isLiked: false,
        },
        {
          name: "李四",
          date: "3小时前",
          content: "观点独到...",
          likeNum: 3,
          isLiked: false,
        },
        {
          name: "李四",
          date: "3小时前",
          content: "观点独到...",
          likeNum: 3,
          isLiked: false,
        },
      ],
    };
  },
  created() {
    //修改数据
    this.comments = this.comments.map((comment) => ({
      ...comment,
      isExpanded: false,
      isOverflow: false,
      isShowMoreBtn: false,
    }));
  },
  mounted() {
    this.$nextTick(this.checkOverflow);
    window.addEventListener("resize", this.checkOverflow);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkOverflow);
  },
  methods: {
    showMoreBtn(index) {
      this.comments[index].isShowMoreBtn = true;
    },
    closeMoreBtn(index) {
      this.comments[index].isShowMoreBtn = false;
    },
    likeComment(index) {
      const comment = this.comments[index];
      console.log(comment);
      if (!comment.isLiked) {
        //变成喜欢 +1
        this.comments[index].likeNum++;
        this.comments[index].isLiked = true;
        this.defaultIcon = this.likeIcon;
      } else {
        this.comments[index].likeNum--;
        this.comments[index].isLiked = false;
        this.defaultIcon = this.unlikeIcon;
      }
    },
    openReplyComment(index) {
      this.activeReplyIndex = this.activeReplyIndex === index ? null : index;
    },
    //判断文本是否超出
    checkOverflow() {
      this.$nextTick(() => {
        this.comments.forEach((comment, i) => {
          const el = this.$refs.contentSpans[i];
          if (!el) return;
          const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
          const maxHeight = lineHeight * 3;
          comment.isOverflow = el.scrollHeight > maxHeight;
        });
      });
    },
    //展开文本
    expandedComment(index) {
      this.comments[index].isExpanded = !this.comments[index].isExpanded;
    },
    closeComment(){
      eventBus.emit('closeMask')
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
.other-comment {
  width: 100%;
  display: flex;
  margin-top: 20px;
}
.other-avatar {
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 50%;
  display: block;
  margin-right: 8px;
}
.right-content {
  width: 100%;
}
.between-div {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.other-comment-name {
  color: #999aaa;
  font-style: normal;
  font-size: 12px;
  font-family: "SF Pro Display", Roboto, Noto, Arial, "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  margin-right: 8px;
}
.other-comment-date {
  color: #999aaa;
  font-style: normal;
  font-size: 12px;
  font-family: "SF Pro Display", Roboto, Noto, Arial, "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
}
.comment-icon1 {
  cursor: pointer;
  width: 16px;
  height: 16px;
  object-fit: cover;
  margin-right: 10px;
}
.comment-icon2 {
  cursor: pointer;
  width: 16px;
  height: 16px;
  object-fit: cover;
  margin-right: 2px;
}
.reply-span {
  cursor: pointer;
  font-size: 12px;
  color: #555666;
  font-family: "SF Pro Display", Roboto, Noto, Arial, "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  margin-right: 10px;
}

.like-num {
  font-size: 12px;
  color: #b4b3b2;
  font-family: "SF Pro Display", Roboto, Noto, Arial, "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  margin-right: 2px;
}
.comment-icon3 {
  cursor: pointer;
  width: 12px;
  height: 12px;
  object-fit: cover;
}
.hover {
  display: flex;
  align-items: center;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease;
  transform: translateY(-2px); /* 初始稍微上移 */
  transition: all 0.25s ease; /* 动画过渡 */
}

.hover.visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0); /* 回到原位 */
}
.content-span {
  margin-top: 4px;
  display: block;
  font-size: 12px;
  line-height: 16px;
  font-family: "SF Pro Display", Roboto, Noto, Arial, "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
}
.content-span.collapsed {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.comment-content2 {
  margin-top: 8px;
}
.expanded-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  cursor: pointer;
  margin-top: 4px;
  font-size: 12px;
  color: #62d5e9;
}
.expanded-btn:hover {
  color: #087fee;
  font-weight: 400;
}
.pagination-div{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}
</style>