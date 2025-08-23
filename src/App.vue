<template>
  <div>
    <div>
      <HeaderView></HeaderView>
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
  </div>
</template>


<script>
import HeaderView from './views/HeaderView.vue'
import FooterView from './views/FooterView.vue'
import CommentView from './views/comment/CommentView.vue'
import { eventBus } from './mitt/eventBus'
export default {
  components: {
    HeaderView,
    FooterView,
    CommentView
  },
  data() {
    return {
      showMask: false,
      showComment: false
    }
  },
  created() {
    // 子页面通知我打开遮罩层
    eventBus.on('openMask', () => {
      this.showMask = true
    })
    // 子页面通知我打开评论区
    eventBus.on('openMask', () => {
      this.showComment = true
    })

    // 子页面通知我关闭遮罩层
    eventBus.on('closeMask', () => {
      this.showMask = false
    })
    // 子页面通知我关闭评论区
    eventBus.on('closeMask', () => {
      this.showComment = false
    })
  },
  methods: {
    closeAll() {
      this.showMask = false
      this.showComment = false
      // 通知子页面关闭弹窗
      eventBus.emit('closePopup')
      eventBus.emit('closeComment')
    }
  }
}
</script>


<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,body{
  height: 100%;
  margin: 0;
  padding: 0;
}
ul, li {
  margin: 0;
  padding: 0;
  list-style: none;
}
.myHeader{
  width: 100%;
  height: 55px;
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 998;
}
.comment{
  position: fixed;
  top: 0;
  right: 0;
  width: 450px;
  height: 100vh;
  background-color: #fff;
  z-index: 999;

  overflow-y: auto;  /* 超出时显示纵向滚动条 */
  overflow-x: hidden; /* 横向隐藏滚动条 */
}

</style>
