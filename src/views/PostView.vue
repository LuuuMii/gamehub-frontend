<template>
  <div class="myContainer">
    <div class="total-container">
      <div class="left-container">
        <!-- 作者信息 -->
        <div class="author-detail">
          <!-- 第一部分 -->
          <div class="avatar-name">
            <div class="avatar">
              <img :src="authorDetails.avatar" alt="" />
            </div>
            <div class="author-name">
              <div class="author-name-div">{{ authorDetails.nickname }}</div>
              <div class="level-year">
                <p>
                  <span>博客等级</span>
                  <img src="../assets/blog7.png" class="level-img" alt="" />
                </p>
                <p>
                  <span>码龄2年</span>
                </p>
              </div>
            </div>
          </div>
          <!-- 第二部分 -->
          <div class="author-records">
            <div class="one-record one-record-hover">
              <div>{{ formatNumber(authorData.totalOriginArticleNum) }}</div>
              <div>原创</div>
            </div>
            <div class="one-record">
              <div>{{ formatNumber(authorData.totalLikeNum) }}</div>
              <div>点赞</div>
            </div>
            <div class="one-record">
              <div>{{ formatNumber(authorData.totalCollectNum) }}</div>
              <div>收藏</div>
            </div>
            <div class="one-record one-record-hover">
              <div>{{ formatNumber(authorData.totalFansNum) }}</div>
              <div>粉丝</div>
            </div>
          </div>
          <!-- 第三部分 -->
          <div class="author-buttons" v-if="isLogin && !isOwnerArticle">
            <div class="author-button1" @click="followAuthorHandler"><span>{{ isFollerFlag? "已关注" : "关注" }}</span></div>
            <div class="author-button2"><span>私信</span></div>
          </div>
        </div>
        <!-- 轮播图 -->
        <div class="carousel-div">
          <el-carousel
            ref="carousel"
            height="138px"
            arrow="never"
            @wheel.native="handleCarouselWheel"
          >
            <el-carousel-item v-for="(img, index) in carouselImgs" :key="index">
              <img class="carousel-img" :src="img" alt="" />
            </el-carousel-item>
          </el-carousel>
        </div>
        <!-- 广告 -->
        <div class="advertisement-div" v-show="isShowAdvertisement">
          <div class="advertisement-pic-div">
            <img
              class="advertisement-img"
              src="../assets/advertisementPic.webp"
              alt=""
            />
          </div>
          <div class="advertisement-text-div">
            <span class="advertisement-text-span"
              >🆓注册即刻获得高达 $200
              抵扣金☁️开始您的云计算之旅同时获得30余项永久免费服务</span
            >
          </div>
          <div class="advertisement-icon-div">
            <img
              class="advertisement-icon-img"
              src="../assets/advertisementIcon.png"
              alt=""
            />
            <span class="advertisement-icon-span">广告</span>
          </div>
          <div class="close-btn" title="隐藏广告" @click="closeAdvertisement">
            ×
          </div>
        </div>
        <!-- 热门文章 -->
        <div class="hot-article-div">
          <div><h3 class="hot-article-top">热门文章</h3></div>
          <div class="hot-article-content">
            <ul>
              <li v-for="index in 5" :key="index">
                <span class="hot-articel-wrap">
                  <span class="hot-articel-title">
                    Linux常用命令大全这是一个很长的标题测试换行效果这是一个
                  </span>
                  <img class="hot-article" src="../assets/articleIcon.png" />
                  <span class="hot-articel-num">11378</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <!-- 分类专栏 -->
        <div class="latest-comment-div">
          <div><h3 class="latest-comment-h3">热门文章</h3></div>
          <div class="latest-comment-all">
            <ul>
              <li v-for="index in 5" :key="index">
                <div>
                  <span class="latest-comment-title">Mysql之事务（下）</span>
                </div>
                <div class="latest-comment-text">
                  <span class="latest-comment-author-name">笑口常开xpr: </span>
                  <span class="latest-comment-content"
                    >文章详解 MySQL 事务隔离级别与
                    MVCC，解析脏读、幻读等问题，结合代码与实例，清晰易懂，对理解事务并发控制极具价值。</span
                  >
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- 大家在看 -->
        <div class="everyone-watching-div">
          <div><h3 class="everyone-watching-h3">大家在看</h3></div>
          <div class="everyone-watching-content-div">
            <ul>
              <li v-for="index in 5" :key="index">
                <span class="everyone-watching-content-span"
                  >毕业论文/SCI/EI/SSCI期刊论文辅导毕业论文/SCI/EI/SSCI期刊论文辅导毕业论文/SCI/EI/SSCI期刊论文辅导：1对1全流程辅导，全学科定制化服务</span
                >
              </li>
            </ul>
          </div>
        </div>
        <!-- 最新文章 -->
        <div class="latest-post-div">
          <div><h3 class="latest-post-h3">最新文章</h3></div>
          <div class="latest-post-bottom-div">
            <!-- 最近的文章 -->
            <div class="latest-post-title-div">
              <ul>
                <li v-for="index in 5" :key="index">
                  <span class="latest-post-title-span">
                    数据库期末大作业之职员管理系统（C++语言）
                  </span>
                </li>
              </ul>
            </div>
            <!-- 当年的文章 -->
            <div class="this-year-post-div">
              <div><span class="this-year-span">2025</span></div>
              <div class="this-year-articel-div">
                <div class="this-year-one-div" v-for="index in 12" :key="index">
                  <span class="this-year-month-span">01月</span>
                  <span class="this-year-month-num-span">3篇</span>
                </div>
              </div>
            </div>
            <!-- 去年的文章 -->
            <div class="last-year-div">
              <span class="last-year-span">2024年&nbsp;&nbsp;12篇</span>
            </div>
          </div>
        </div>
      </div>
      <div class="center-container">
        <!-- 帖子内容 -->
        <div class="post-content-div">
          <div class="post-adjustment-div">
            <h1 class="post-content-title-h1">
              {{ articleDetails.title }}
            </h1>
            <!-- 文章类型 -->
            <div class="post-type-div">
              <!-- 文章类型上半部分 -->
              <div class="post-type-top-bar">
                <img
                  class="post-type-img"
                  src="../assets/original.png"
                  alt=""
                />
                <span class="post-type-author-name">{{
                  authorDetails.nickname
                }}</span>
                <div class="post-type-icon-span">
                  <img class="post-type-icon" src="../assets/newUpTime2.png" />
                  <span class="post-type-update-time-span"
                    >已于 {{ articleDetails.updateTime }} 修改</span
                  >
                </div>
                <div class="post-type-icon-span">
                  <img
                    class="post-type-icon"
                    src="../assets/articleReadEyes2.png"
                  />
                  <span class="post-type-span"
                    >阅读量 {{ formatNumber(articleDetails.viewCount) }}</span
                  >
                </div>
                <div class="post-type-icon-span post-type-collect" :class="{'post-type-collect-active':isCollectedFlag}" @click="openColectionDialog">
                  <img
                    class="post-type-icon"
                    src="../assets/tobarCollect2.png"
                  />
                  <span class="post-type-span"
                    >收藏 {{ formatNumber(articleDetails.collectCount) }}</span
                  >
                </div>
                <div class="post-type-icon-span post-type-like" :class="{'post-type-like-active':isLikedFlag}" @click="likeArticleHandler">
                  <img
                    class="post-type-icon"
                    src="../assets/newHeart2023Black.png"
                  />
                  <span class="post-type-span"
                    >点赞数 {{ formatNumber(articleDetails.likeCount) }}</span
                  >
                </div>
              </div>
              <!-- 文章类型下半部分 -->
              <div class="post-type-bottom-bar">
                <!-- 分类专栏 -->
                <span class="post-type-classification-span">所属类别:</span>
                <div class="post-type-label-div">
                  {{ articleDetails.category }}
                </div>
                <!-- 文章标签 -->
                <span class="post-type-label-span">文章标签:</span>
                <div
                  class="post-type-label-div"
                  v-for="(item, index) in articleDetails.tags"
                  :key="index"
                >
                  {{ item.name }}
                </div>
              </div>
            </div>
            <!-- 专栏 -->
            <div class="post-special-column-div">
              <div class="post-special-column-left">
                <img :src="articleColumns[0].coverImg" />
                <span class="tit">{{ articleColumns[0].name }}</span>
                <span class="dec">专栏收录该内容</span>
              </div>
              <div class="post-special-column-right">
                <span>{{ articleColumns[0].totalArticleCount }} 篇文章</span>
                <div @click="subscribeColumnHandler">
                  {{ isSubScribeColumn ? "已订阅" : "订阅专栏" }}
                </div>
              </div>
            </div>
            <!-- 内容 -->
            <div class="content1" v-html="articleDetails.content"></div>
            <div>123123</div>
          </div>

          <!-- 底层边栏 -->
          <div class="post-bottom-block">
            <div class="post-bottom-block-left">
              <img src="../assets/banner.jpg" />
              <span>{{ authorDetails.nickname }}</span>
              <div @click="followAuthorHandler">{{ isFollerFlag? "已关注" : "关注" }}</div>
            </div>
            <div class="post-bottom-block-right">
              <el-popover placement="top" trigger="hover">
                <div class="popover-div">点赞</div>
                <div class="post-bottom-block-content1" :class="{'post-bottom-block-content1-active':isLikedFlag}" @click="likeArticleHandler" slot="reference">
                  <img src="../assets/icon/like.svg" />
                  <span>{{ formatNumber(articleDetails.likeCount) }}</span>
                </div>
              </el-popover>
              <el-popover placement="top" trigger="hover">
                <div class="popover-div">踩</div>
                <div class="post-bottom-block-content2" :class="{'post-bottom-block-content2-active':isUnlikedFlag}" @click="unlikeArticleHandler" slot="reference">
                  <img src="../assets/icon/dislike.svg" />
                  <span>{{ formatNumber(articleDetails.unlikeCount) }}</span>
                </div>
              </el-popover>
              <el-popover placement="top" trigger="hover">
                <div class="popover-div">收藏</div>
                <div class="post-bottom-block-content3" @click="openColectionDialog" :class="{'post-bottom-block-content3-active':isCollectedFlag}" slot="reference">
                  <img src="../assets/icon/star.svg" />
                  <span>{{ formatNumber(articleDetails.collectCount) }}</span>
                </div>
              </el-popover>
              <el-popover placement="top" trigger="hover">
                <div class="popover-div">评论</div>
                <div
                  class="post-bottom-block-content4"
                  slot="reference"
                  @click="openComment"
                >
                  <img src="../assets/icon/comment.svg" />
                  <span>85</span>
                </div>
              </el-popover>
              <el-popover placement="top" trigger="hover">
                <div class="popover-div">hhh</div>
                <div class="post-bottom-block-content5" slot="reference">
                  <img src="../assets/icon/share.svg" />
                  <span>分享</span>
                </div>
              </el-popover>
              <el-popover placement="top" trigger="hover">
                <div class="popover-div">hhh</div>
                <div
                  class="post-bottom-block-content5 more-img"
                  slot="reference"
                >
                  <img src="../assets/icon/more.svg" />
                </div>
              </el-popover>

              <div class="label-div">专栏目录</div>
            </div>
          </div>
        </div>
        <!-- 评论区 -->
        <div class="comments-label">
          <div class="comments-left-div" @click="openComment">
            <span class="comments-label-number">86 条评论&nbsp;&nbsp;</span>
            <img
              class="comments-label-arrow"
              src="../assets/icon/arrow-right.svg"
            />
          </div>
          <img class="comments-label-avatar" src="../assets/banner.jpg" />
          <span class="comments-label-name">23遇见222</span>
          <span class="comments-label-hot-comment">热评</span>
          <span class="comments-label-hot-comment-content"
            >内容丰富详实，观点独到深刻，论证条理清晰。无论是素材的运用还是逻辑的推进都恰到好处。语言简洁流畅且富有感染力，读罢让人深受启发。</span
          >
          <div class="comments-write-comment">写评论</div>
        </div>
        <!-- 推荐文章 -->
        <div class="recommend-post">
          <!-- 一个推荐文章 -->
          <div class="recommend-one-post" v-for="index in 6" :key="index">
            <!-- 一个推荐文章上半部分 -->
            <div class="recommend-one-post-top">
              <div class="recommend-post-title" v-html="title"></div>
              <div class="recommend-post-details">
                <span class="recommend-post-author">23遇见222的博客</span>
                <div class="recommend-post-views-date">
                  <div class="recommend-post-views">
                    <img src="../assets/readCountWhite.png" />
                    <span>748</span>
                  </div>
                  <div class="recommend-post-date">
                    <span>10-14</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- 一个推荐文章下半部分 -->
            <div class="recommend-one-post-bottom">
              <span>
                📋 个人简介 🎉大家好，我是3月份新人榜排名第三的
                ༺Blog༒Hacker༻💬支持我：点赞👍+收藏⭐️+留言📝
                🌺格言：༺永做优质༒programmer༻📣123123123112312
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="right-container" v-show="showRight">右边部分</div>
    </div>
    <!-- 收藏对话框 -->
    <div class="collection-dialog" v-if="isShowCollectDialog">
      <div class="collection-dialog-top">添加到收藏夹</div>
      <div class="collection-dialog-body">
        <div class="collection-list">
        <label 
          class="collection-item" 
          v-for="(item,index) in collections" 
          :key="index"
        >
          <input 
            type="checkbox" 
            :value="item.name" 
            v-model="selectedCollections" 
          />
          <span class="checkbox"></span>
          <span class="label-text">{{ item.name }}</span>
          <span class="count">{{ item.isDeault!=="1"? item.targetCount:item.targetCount + "/1000" }}</span>
        </label>

      </div>
        <!-- 新建收藏夹 -->
        <div class="add-collection-box" v-show="!isAddingColletion" @click="showAddColletionInput">
          <img src="@/assets/icon/add_999999.svg" alt="">
          <span>新建收藏夹</span>
        </div>
        <!-- 输入框 -->
        <div class="add-collection-input" v-show="isAddingColletion">
          <input ref="collectionInput" @blur="blurColltionInput" v-model="newCollectionName" type="text" placeholder="最多可输入20个字">
          <div @click="addUserCollecttionHandler">新建</div>
        </div>
        
      </div>
      <div class="collection-divier-box">
          <div class="collection-dialog-divider"></div>
      </div>
      <div class="collection-confirm-box">
        <div class="collection-confirm-btn" :class="{ 'collection-confirm-btn-active': hasChangedColletions }" @click="collectTargetHandler">确定</div>
      </div>
      <img class="close-collection-btn" src="@/assets/icon/closeBt.png" @click="closeCollectionDialog">
    </div>
  </div>
</template>

<script>
import { eventBus } from "../mitt/eventBus";
import {
  getUserInfoByUsername,
  getAuthorDataForArticlePage,
} from "@/api/user.js";
import { getArticleById } from "@/api/article.js";
import { getColumnByArticleId } from "@/api/userColumn.js";
import {
  getSubscribeDetail,
  subscribeColumn,
  unsubscribeColumn,
} from "@/api/userColumnSubscribe.js";
import { getUserCollectionFoldersByUserIdForTarget , addUserCollectionFolder } from "@/api/userCollectionFolder.js";
import { syncCollectionRecords } from "@/api/userCollectionRecord.js"
import { syncLikeRecord , getUserLikeRecord } from "@/api/userLikeRecord.js"
import { syncUnlikeRecord , getUserUnlikeRecord} from "@/api/userUnlikeRecord.js"
import { getUserFollowRecord,syncUserFollowRecord } from "@/api/userFollowRecord.js"
export default {
  name: "ScreenDetectLayout",
  data() {
    return {
      showRight: true, // 默认显示
      carouselImgs: [
        require("../assets/carouselPic1.jpeg"),
        require("../assets/carouselPic2.png"),
      ],
      isShowAdvertisement: true,
      title: "C++<em>高精度</em>算法",
      str: "C++高精度算法",
      articleId: null,
      articleDetails: {},
      authorDetails: [],
      authorData: {},
      authorId: null,
      isLogin: false,
      isOwnerArticle: false,
      articleColumns: [{}],
      isSubScribeColumn: false,
      checkList: [],
      isShowCollectDialog:false,
      isAddingColletion:false,
      collections: [],
      selectedCollections: [],
      initialSelected: [], 
      hasChangedColletions:false,
      newCollectionName:"",
      isCollectedFlag:false,
      isLikedFlag:false,
      isUnlikedFlag:false,
      isFollerFlag: false,
    };
  },
  created() {

    eventBus.on("closeCollectionDialog", () => {
      this.isShowCollectDialog = false;
    });

    this.articleId = this.$route.params.id;

    this.initData();
    
    const token = localStorage.getItem("token");
    if(token){
      this.isLogin = true;
    }
    const username = localStorage.getItem("username");
    if(username === this.articleDetails.createBy){
      this.isOwnerArticle = true;
    }
  },
  methods: {
    async initData() {
      try {
        //查询文章信息
        const articleRes = await getArticleById(this.articleId);
        if (articleRes.code === 200) {
          this.articleDetails = articleRes.data;
          this.articleDetails.tags = JSON.parse(this.articleDetails.tags);
        }
        // 查询作者信息
        const authorInfoRes = await getUserInfoByUsername(
          articleRes.data.createBy
        );
        if (authorInfoRes.code === 200) {
          this.authorDetails = authorInfoRes.data;
        }
        // 查询作者数据信息(总点赞数等)
        const authorDataRes = await getAuthorDataForArticlePage(
          authorInfoRes.data.username
        );
        if (authorDataRes.code === 200) {
          this.authorData = authorDataRes.data;
        }
        // 查询该文章id 所包含的专栏数据
        const articleColumnsRes = await getColumnByArticleId(this.articleId);
        if (articleColumnsRes.code === 200) {
          this.articleColumns = articleColumnsRes.data;
        }
        // 查询当前用户是否订阅了
        const userId = localStorage.getItem("userId");
        if (userId) {
          const subscribeRes = await getSubscribeDetail(
            userId,
            this.articleColumns[0].id
          );
          if (subscribeRes.code === 200) {
            // 有信息  查看status 是否为1 1则是订阅 否则是 为订阅
            if (subscribeRes.data.status === "0") {
              this.isSubScribeColumn = false;
            } else if (subscribeRes.data.status === "1") {
              this.isSubScribeColumn = true;
            }
          } else {
            // 查询不到信息 则 当前用户没有订阅过该专栏
            this.isSubScribeColumn = false;
          }
        }
        // 判断当前用户是否已经收藏了这个文章
        const userCollectionsRes = await getUserCollectionFoldersByUserIdForTarget(userId,this.articleDetails.id,"0");
        this.isCollectedFlag = userCollectionsRes.data.some(item => item.isCollected === "1");

        // 查询当前用户关于这篇文章是否点赞  判断flag
        const likeRecordRes = await getUserLikeRecord(localStorage.getItem("userId"),this.articleDetails.id,"0");
        if(likeRecordRes.code === 200){
          if(likeRecordRes.data.isDeleted === "0"){
            this.isLikedFlag = true;
          }else{
            this.isLikedFlag = false;
          }
        }
        // 查询当前用户是否点踩这篇文章 判断flag
        const unLikeRecordRes = await getUserUnlikeRecord(localStorage.getItem("userId"),this.articleDetails.id,"0");
        if(unLikeRecordRes.code === 200){
          if(unLikeRecordRes.data.isDeleted === "0"){
            this.isUnlikedFlag = true;
          }else{
            this.isUnlikedFlag = false;
          }
        }
        // 查询当前用户是否关注作者
        const userFollowRecordRes = await getUserFollowRecord(localStorage.getItem("userId"),this.authorDetails.id);
        if(userFollowRecordRes.code === 200){
          if(userFollowRecordRes.data.isDeleted === "0"){
            this.isFollerFlag = true;
          }else{
            this.isFollerFlag = false;
          }
        }

      } catch (e) {
        console.error(e);
      }

    },
    formatNumber(num) {
      if (num === null || num === undefined) return "0";
      num = Number(num);
      if (isNaN(num)) return "0";

      // 小于 1,000 直接返回
      if (num < 1000) return num.toString();

      // 千以上，显示 k
      if (num < 10000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
      }

      // 万以上，显示 w
      return (num / 10000).toFixed(1).replace(/\.0$/, "") + "w";
    },
    checkScreenSize() {
      // 物理像素宽度
      const physicalWidth = window.screen.width;
      // 像素比
      const dpr = window.devicePixelRatio || 1;
      // 转换成 CSS 像素宽度
      const cssPixelWidth = physicalWidth / dpr;
      // 计算物理英寸（假设 96 CSS 像素 = 1 英寸）
      const inchesWidth = cssPixelWidth / 96;
      // 判断屏幕是否 >= 20 英寸
      this.showRight = inchesWidth >= 20;
    },
    // 轮播图滚轮时间
    handleCarouselWheel(event) {
      if (!event) return;
      // 阻止页面跟随滚动（若希望阻止）
      if (event.preventDefault) event.preventDefault();

      const now = Date.now();
      if (now - this.lastWheelTime < 300) return; // 300ms 节流
      this.lastWheelTime = now;

      const carousel = this.$refs.carousel;
      if (!carousel) return;

      if (event.deltaY > 0) {
        carousel.next();
      } else if (event.deltaY < 0) {
        carousel.prev();
      }
    },
    //关闭广告按钮点击事件
    closeAdvertisement() {
      this.isShowAdvertisement = false;
    },
    //打开评论点击事件
    openComment() {
      eventBus.emit("openMask");
      eventBus.emit("openComment");
    },
    // 订阅专栏点击事件
    async subscribeColumnHandler() {
      //判断当前用户是否是作者 如果是 则 无法订阅
      if (this.articleDetails.createBy === localStorage.getItem("username")) {
        this.$message.info({
          message: "无法订阅自己的专栏~",
          offset: 80,
        });
        return;
      }
      const newData = {
        userId: localStorage.getItem("userId"),
        columnId: this.articleColumns[0].id,
      };
      if (this.isSubScribeColumn) {
        // 取消订阅
        const res = await unsubscribeColumn(newData);
        if (res.code === 200) {
          this.isSubScribeColumn = false;
        }
      } else {
        // 订阅专栏
        const res = await subscribeColumn(newData);
        if (res.code === 200) {
          this.isSubScribeColumn = true;
        }
      }
    },
    // 打开收藏对话框
    async openColectionDialog(){
      try{
        // 获取用户收藏栏
        const userId = localStorage.getItem("userId");
        const res = await getUserCollectionFoldersByUserIdForTarget(userId,this.articleDetails.id,"0");
        this.collections = res.data;
        this.selectedCollections = [];
        for(let i=0 ;i<this.collections.length;i++){
          if(this.collections[i].isCollected==="1"){
            this.selectedCollections.push(this.collections[i].name);
          }
        }
        this.isShowCollectDialog = true;
        this.hasChangedColletions = false;
        this.initialSelected = this.selectedCollections;

        eventBus.emit("openMask");
      }catch(e){
        console.log(e);
      }
      
    },
    // 关闭收藏对话框
    closeCollectionDialog(){
      this.isShowCollectDialog = false;
      eventBus.emit("closeMask");
    },
    // 显示添加收藏夹输入框
    showAddColletionInput(){
      this.isAddingColletion = true;
      this.$nextTick(() => {
        this.$refs.collectionInput.focus();
      });
    },
    blurColltionInput(){
      setTimeout(() => {
        this.isAddingColletion = false;
      }, 150);
    },
    arraysEqual(a, b) {
      if (a.length !== b.length) return false
      const sortedA = [...a].sort()
      const sortedB = [...b].sort()
      return sortedA.every((val, index) => val === sortedB[index])
    },
    // 添加收藏文件夹事件
    async addUserCollecttionHandler(){
      if(this.newCollectionName.trim().length>=20 || this.newCollectionName.trim().length <=0){
        this.$message.error({
          message: "收藏夹名称不规范~",
          offset: 80
        })
        return;
      }
      const folder = {
        userId: localStorage.getItem("userId"),
        name: this.newCollectionName.trim(),
        description: "暂无介绍",
        targetCount: 0,
        visibility: "0",
        isDefault: 0
      }
      const res = await addUserCollectionFolder(folder);
      if(res.code===200){
        //添加成功  刷新文件夹数据
        const collectionRes = await getUserCollectionFoldersByUserIdForTarget(localStorage.getItem("userId"),this.articleDetails.id,"0");
        this.collections = collectionRes.data;
        this.newCollectionName = "";
      }else{
        this.$message.error({
          message: res.message,
          offset: 80
        })
      }
    },
    // 收藏对话框确定按钮点击事件
    async collectTargetHandler(){
      try {
        if(!this.hasChangedColletions){
          return;
        }

        const selectedIds = this.collections
          .filter(item => this.selectedCollections.includes(item.name))
          .map(item => item.id)


        const addingCollectionFolderList = [];
        for(let i = 0;i < selectedIds.length;i++){
          const record = {
            folderId: selectedIds[i],
            userId: localStorage.getItem("userId"),
            targetId: this.articleDetails.id,
            targetType: "0"
          }
          addingCollectionFolderList.push(record);
          
        }
        const syncRes = await syncCollectionRecords(localStorage.getItem("userId"),this.articleDetails.id,"0",addingCollectionFolderList);

        if(syncRes.code === 200){
          this.closeCollectionDialog();
          // 重新获取数据
          //查询文章信息
          const articleRes = await getArticleById(this.articleId);
          if (articleRes.code === 200) {
            this.articleDetails = articleRes.data;
            this.articleDetails.tags = JSON.parse(this.articleDetails.tags);
          }
          // 判断当前用户是否已经收藏了这个文章
          const userCollectionsRes = await getUserCollectionFoldersByUserIdForTarget(localStorage.getItem("userId"),this.articleDetails.id,"0");
          this.isCollectedFlag = userCollectionsRes.data.some(item => item.isCollected === "1");

          // 查询作者数据信息(总点赞数等)
          const authorDataRes = await getAuthorDataForArticlePage(
            articleRes.data.createBy
          );
          if (authorDataRes.code === 200) {
            this.authorData = authorDataRes.data;
          }

        }

      } catch (e) {
        console.log(e);
        this.$message.error('操作失败，请稍后重试');
      }
    },
    // 点赞点击事件
    async likeArticleHandler(){
      // 判断是否是自己的文章
      if(this.articleDetails.createBy === localStorage.getItem("username")){
        return;
      }
      const likeRecord = {
        userId: localStorage.getItem("userId"),
        targetId: this.articleDetails.id,
        targetType: "0",
        status: "0",
        isDeleted: "0"
      };
      const res = await syncLikeRecord(localStorage.getItem("userId"),this.articleDetails.id,"0",likeRecord);
      if(res.code===200){
        // 查询当前用户关于这篇文章是否点赞  判断flag
        const likeRecordRes = await getUserLikeRecord(localStorage.getItem("userId"),this.articleDetails.id,"0");
        if(likeRecordRes.code === 200){
          if(likeRecordRes.data.isDeleted === "0"){
            this.isLikedFlag = true;
          }else{
            this.isLikedFlag = false;
          }
          // 重新获取点赞数
          //查询文章信息
          const articleRes = await getArticleById(this.articleId);
          if (articleRes.code === 200) {
            this.articleDetails = articleRes.data;
            this.articleDetails.tags = JSON.parse(this.articleDetails.tags);
          }
          // 查询作者数据信息(总点赞数等)
          const authorDataRes = await getAuthorDataForArticlePage(
            this.articleDetails.createBy
          );
          if (authorDataRes.code === 200) {
            this.authorData = authorDataRes.data;
          }
        }
      }
    },
    // 点踩点击事件
    async unlikeArticleHandler(){
      const newData = {
        userId: localStorage.getItem("userId"),
        targetId: this.articleDetails.id,
        targetType: "0",
        status: "0",
        isDeleted: "0"
      }
      const res = await syncUnlikeRecord(localStorage.getItem("userId"),this.articleDetails.id,"0",newData);
      if(res.code===200){
        //查询当前用户关于这篇文章是否点踩  判断flag
        const unlikeRecordRes = await getUserUnlikeRecord(localStorage.getItem("userId"),this.articleDetails.id,"0");
        if(unlikeRecordRes.code === 200){
          if(unlikeRecordRes.data.isDeleted === "0"){
            this.isUnlikedFlag = true;
          }else{
            this.isUnlikedFlag = false;
          }
        }
        //查询文章信息
        const articleRes = await getArticleById(this.articleId);
        if (articleRes.code === 200) {
          this.articleDetails = articleRes.data;
          this.articleDetails.tags = JSON.parse(this.articleDetails.tags);
        }
        // 查询作者数据信息(总点赞数等)
        const authorDataRes = await getAuthorDataForArticlePage(
          this.articleDetails.createBy
        );
        if (authorDataRes.code === 200) {
          this.authorData = authorDataRes.data;
        }
      }
    },
    async followAuthorHandler(){
      // 判断是否是同一人 如果是 则无法关注
      if(this.articleDetails.createBy === localStorage.getItem("username")){
        return;
      }
      const recordData = {
        followerId: localStorage.getItem("userId"),
        followeeId: this.authorDetails.id,
        remark:"",
      }
      const res = await syncUserFollowRecord(recordData);
      if(res.code === 200){
        const recordRes = await getUserFollowRecord(localStorage.getItem("userId"),this.authorDetails.id);
        if(recordRes.code === 200){
          if(recordRes.data.isDeleted === "0"){
            this.isFollerFlag = true;
          }else{
            this.isFollerFlag = false;
          }
        }
        // 修改粉丝数量
        // 查询作者数据信息(总点赞数等)
        const authorDataRes = await getAuthorDataForArticlePage(
          this.articleDetails.createBy
        );
        if (authorDataRes.code === 200) {
          this.authorData = authorDataRes.data;
        }
      }
    }
  },
  mounted() {
    this.checkScreenSize();
    window.addEventListener("resize", this.checkScreenSize);
  },
  watch: {
    selectedCollections: {
      handler(newVal) {
        // 比较数组是否和初始值不同
        this.hasChangedColletions = !this.arraysEqual(newVal, this.initialSelected)
      },
      deep: true
    }
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.checkScreenSize);
  },
};
</script>

<style scoped>
.myContainer {
  width: 100%;
  padding: 5px 0 0 0;
  background: linear-gradient(120deg, #a1c4fd, #c2e9fb, #fbc2eb, #a6c1ee);
  background-size: 300% 300%;
  animation: gradientFlow 10s ease infinite;
}
@keyframes gradientFlow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.total-container {
  display: flex;
  justify-content: center;
  align-items: flex-start; /* 三个div独立高度  */
  gap: 10px; /* 元素之间间距 */
}

.left-container {
  width: 300px;
}

.author-detail {
  width: 300px;
  display: flex;
  flex-direction: column; /* 垂直排列 */
  background-color: #fff;
  padding: 16px 16px;
  border-radius: 4px;
}
.avatar-name {
  display: flex;
}
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 图片填满且保持比例，超出裁剪 */
  display: block; /* 去除图片底部空隙 */
}
.author-name {
  padding: 0 0 0 10px;
}
.author-name-div {
  padding: 0 0 0 4px;
  font-size: 18px;
  font-weight: 600;
  color: #222226;
  font-family: "Helvetica Neue", "PingFang SC", "Microsoft YaHei", Arial,
    sans-serif;
}
.level-year {
  display: flex;
  gap: 8px;
}
.level-year p {
  margin: 0;
  background-color: #f5f6f7;
  font-size: 13px;
  color: #555666;
  padding: 0 6px;
  display: flex;
  align-items: center;
  gap: 4px;
}
.level-img {
  width: 18px;
  height: 18px;
  object-fit: cover;
  display: inline-block;
  vertical-align: middle;
  margin-left: 0;
}
.author-records {
  width: 100%;
  height: 76px;
  margin: 16px 0;
  background-color: #fafafa;
  border-radius: 2px;
  display: flex;
  padding: 0 16px; /* 两边留空 */
  justify-content: space-between;
  align-items: center;
}
.one-record {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-size: 15px;
  color: #222226;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Arial,
    sans-serif;
  font-weight: 400;
}
.one-record-hover:hover {
  color: #fc5531;
  cursor: pointer;
}
.author-buttons {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.author-button1 {
  width: 120px;
  height: 32px;
  border-radius: 14px;
  background-color: #fc5531;

  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  cursor: pointer; /* 鼠标手型 */

  color: #ffffff;
  font-size: 14px;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Arial,
    sans-serif;
}

.author-button2 {
  width: 120px;
  height: 32px;
  border-radius: 14px;
  background-color: #ffffff;
  border: 1px solid gray;

  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  cursor: pointer; /* 鼠标手型 */

  color: #555666;
  font-size: 14px;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Arial,
    sans-serif;
}
.author-button2:hover {
  color: #555666;
  border-color: #555666;
}
/* 轮播图 */
.carousel-div {
  width: 300px;
  height: 138px;
  cursor: pointer;
  margin-top: 8px;
}
.carousel-img {
  width: 300px;
  height: 138px;
  object-fit: cover;
  display: block;
}
/* 广告 */
.advertisement-div {
  position: relative;
  width: 300px;
  margin-top: 8px;
  background-color: #ffffff;
}
.advertisement-pic-div {
  width: 300px;
  height: 145px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.advertisement-img {
  width: 150px;
  height: 115px;
  object-fit: cover;
  display: block;
  cursor: pointer;
}
.advertisement-text-div {
  width: 300px;
  padding: 0 8px;
}
.advertisement-text-span {
  font-size: 14px;
  font-family: sans-serif;
  color: #0e1011;
  cursor: pointer;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.advertisement-icon-div {
  width: 300px;
  padding: 10px 8px;
  display: flex;
  align-items: center;
}
.advertisement-icon-img {
  width: 12px;
  height: 11px;
  object-fit: cover;
}
.advertisement-icon-span {
  color: #a6b7bf;
  font-size: 11px;
  font-family: sans-serif;
  line-height: 0px;
  margin-left: 3px;
}
.close-btn {
  position: absolute;
  right: 8px;
  bottom: 8px;
  width: 8px;
  height: 8px;
  line-height: 8px;
  text-align: center;
  font-weight: bold;
  font-size: 14px;
  color: #a6b7bf;
  cursor: pointer;
  user-select: none;
  border-radius: 50%;
  background-color: #f5f5f5;
  box-shadow: none;
  transition: box-shadow 0.3s ease, background-color 0.3s ease;
  z-index: 10;
}
.close-btn:hover {
  box-shadow: -16px -16px 20px rgba(0, 0, 0, 0.25);
  background-color: #e0e0e0;
}

/* 热门文章 */
.hot-article-div {
  width: 300px;
  margin-top: 8px;
}
.hot-article-top {
  width: 100%;
  color: #3d3d3d;
  background: #f5f5f5;
  padding: 0 16px;
  height: 38px;
  line-height: 38px;
  font-size: 14px;
}
.hot-article-content {
  width: 100%;
  padding: 0px 12px;
  background-color: #ffffff;
}
.hot-article-content ul li {
  display: flex;
  align-items: center;
  padding: 5px 0 0 0;
}
.hot-article-content ul {
  padding-bottom: 5px;
}

.hot-articel-wrap {
  display: inline;
  white-space: normal;
}
.hot-articel-title:hover {
  color: #fc5531;
  cursor: pointer;
}
.hot-articel-title {
  display: inline;
  height: 24px;
  font-size: 14px;
  line-height: 14px;
  font-weight: 400;
  color: #555666;
  padding: 5px 5px 5px 0;
}
.hot-article {
  width: 14px;
  height: 14px;
  object-fit: cover;
  vertical-align: middle;
}
.hot-articel-num {
  height: 24px;
  font-size: 12px;
  color: #999aaa;
  line-height: 24px;
  padding: 0px 5px;
}
/* 分类专栏 */
.latest-comment-div {
  width: 300px;
  margin-top: 8px;
}
.latest-comment-h3 {
  width: 100%;
  color: #3d3d3d;
  background: #f5f5f5;
  padding: 0 16px;
  height: 38px;
  line-height: 38px;
  font-size: 14px;
}
.latest-comment-all {
  width: 100%;
  padding: 12px 16px 16px;
  background-color: #ffffff;
}
.latest-comment-title {
  color: #999aaa;
  font-size: 14px;
  cursor: pointer;
}
.latest-comment-title:hover {
  color: #fc5531;
}
.latest-comment-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}
.latest-comment-author-name {
  font-size: 14px;
  color: #555666;
  cursor: pointer;
}
.latest-comment-author-name:hover {
  color: #fc5531;
}
.latest-comment-content {
  font-size: 14px;
  color: #555666;
  font-weight: 400;
}
/* 大家在看 */
.everyone-watching-div {
  width: 300px;
  margin-top: 8px;
}
.everyone-watching-h3 {
  width: 100%;
  color: #3d3d3d;
  background: #f5f5f5;
  padding: 0 16px;
  height: 38px;
  line-height: 38px;
  font-size: 14px;
}
.everyone-watching-content-div {
  background-color: #ffffff;
  width: 100%;
  padding: 12px 16px 12px;
}
.everyone-watching-content-div li {
  margin-bottom: 4px;
}
.everyone-watching-content-span {
  cursor: pointer;
  font-size: 14px;
  color: #555666;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
}
.everyone-watching-content-span:hover {
  color: #fc5531;
}
/* 最新文章 */
.latest-post-div {
  width: 300px;
  margin-top: 8px;
}
.latest-post-h3 {
  width: 100%;
  color: #3d3d3d;
  background: #f5f5f5;
  padding: 0 16px;
  height: 38px;
  line-height: 38px;
  font-size: 14px;
}
.latest-post-bottom-div {
  background-color: #ffffff;
  padding: 12px 16px 12px;
}
.latest-post-title-span {
  cursor: pointer;
  font-size: 14px;
  color: #555666;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}
.latest-post-title-span:hover {
  color: #fc5531;
}
.latest-post-title-div ul li:last-child::after {
  content: "";
  display: block;
  height: 1px;
  background-color: #ccc;
  margin-top: 8px;
  width: 100%;
}
.this-year-span {
  font-size: 14px;
  color: #4a4d52;
}
.this-year-articel-div {
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap; /* 超过一行自动换行 */
  justify-content: space-between; /* 水平均匀分布 */
  gap: 10px; /* 每个 item 之间间距，可选 */
  width: 100%; /* 或者具体宽度，比如 300px */
}

.this-year-one-div {
  display: flex;
  flex-direction: column; /* 上下排列 */
  align-items: center; /* 水平居中 */
  width: calc(25% - 12px); /* 每行最多4个，减去 gap 的一半 */
  padding: 8px;
  box-sizing: border-box;
  background-color: #f5f5f5;
  margin-bottom: 8px; /* 每行垂直间距 */
  border-radius: 8px;
}
.this-year-month-span {
  color: #999aaa;
  background-color: #edf0f3;

  font-weight: bold;
  font-size: 14px;
  margin-bottom: 4px;
}
.this-year-month-num-span {
  cursor: pointer;
  color: #555;
  background-color: #f6f8fa;
  font-size: 14px;
}
.this-year-month-num-span:hover {
  color: #fc5531;
}
.last-year-div {
  margin-top: 8px;
  margin-bottom: 4px;
}
.last-year-span {
  cursor: pointer;
  font-size: 14px;
  color: #4a4d52;
}
.last-year-span:hover {
  color: #fc5531;
}

.center-container {
  width: 1010px;
}

.post-content-div {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  min-height: calc(100vh - 65px);
}
.post-adjustment-div {
  padding: 12px 24px 0;
}
.post-content-title-h1 {
  font-size: 28px;
  color: #222226;
}

.post-type-top-bar {
  height: 32px;
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  margin-top: 10px;
}
.post-type-img {
  width: 36px;
  height: 32px;
  object-fit: cover;
  display: block;
}
.post-type-author-name {
  font-size: 14px;
  color: #555666;
  font-family: "SF Pro SC", "SF Pro Text", "SF Pro Icons", "PingFang SC",
    "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  margin-left: 20px;
  cursor: pointer;
  margin-right: 12px;
}
.post-type-author-name:hover {
  color: #fc5531;
}
.post-type-icon-span {
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 8px;
}

.post-type-icon {
  width: 16px;
  height: 16px;
  object-fit: cover;
  margin-right: 2px;
}
.post-type-update-time-span {
  font-size: 12px;
  color: #999aaa;
  font-family: "SF Pro SC", "SF Pro Text", "SF Pro Icons", "PingFang SC",
    "Helvetica Neue", "Helvetica", "Arial", sans-serif;
}
.post-type-span {
  font-size: 14px;
  color: #999aaa;
  font-family: "SF Pro SC", "SF Pro Text", "SF Pro Icons", "PingFang SC",
    "Helvetica Neue", "Helvetica", "Arial", sans-serif;
}
.post-type-collect:hover img {
  content: url("../assets/newUpTime2-hover.png");
  cursor: pointer;
}
.post-type-collect:hover span {
  cursor: pointer;
  color: #fc5531;
}
.post-type-collect-active img{
  content: url("../assets/newUpTime2-hover.png");
  cursor: pointer;
}
.post-type-collect-active span{
  cursor: pointer;
  color: #fc5531;
}
.post-type-like:hover img,.post-type-like-active img{
  content: url("@/assets/newHeart2023Active.png");
  cursor: pointer;
}
.post-type-like:hover span,.post-type-like-active span{
  cursor: pointer;
  color: #fc5531;
}
.post-type-bottom-bar {
  min-height: 28px;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  flex-wrap: wrap;
  padding-bottom: 4px;
}
.post-type-classification-span {
  margin-left: 48px;
  font-size: 14px;
  color: #999aaa;
  font-family: "SF Pro SC", "SF Pro Text", "SF Pro Icons", "PingFang SC",
    "Helvetica Neue", "Helvetica", "Arial", sans-serif;
}
.post-type-label-div {
  font-size: 12px;
  color: #5094d5;
  border: 1px solid #eaeaef;
  border-radius: 2px;
  padding: 2px 5px;
  margin-left: 8px;
  font-family: "SF Pro SC", "SF Pro Text", "SF Pro Icons", "PingFang SC",
    "Helvetica Neue", "Helvetica", "Arial", sans-serif;
}
.post-type-label-div:hover {
  cursor: pointer;
  color: #277ccc;
}
.post-type-label-span {
  margin-left: 20px;
  font-size: 14px;
  color: #999aaa;
  font-family: "SF Pro SC", "SF Pro Text", "SF Pro Icons", "PingFang SC",
    "Helvetica Neue", "Helvetica", "Arial", sans-serif;
}

/* 专栏 */
.post-special-column-div {
  padding: 0px 16px;
  margin-top: 12px;
  height: 56px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border: 1px solid #f0f0f0;
  transition: margin-top 0.2s ease-in-out;
}
.post-special-column-div:hover {
  box-shadow: 0 0 10px 0 rgba(232, 232, 237, 0.4);
}
.post-special-column-left {
  display: flex;
  height: 100%;
  align-items: center;
}
.post-special-column-left img {
  width: 36px;
  height: 36px;
  object-fit: cover;
}
.tit {
  cursor: pointer;
  margin-left: 8px;
  font-size: 16px;
  color: #222226;
  font-family: "SF Pro SC", "SF Pro Text", "SF Pro Icons", "PingFang SC",
    "Helvetica Neue", "Helvetica", "Arial", sans-serif;
}
.tit:hover {
  color: #fc5531;
}
.dec {
  margin-left: 8px;
  font-size: 14px;
  color: #999aaa;
  font-family: "SF Pro SC", "SF Pro Text", "SF Pro Icons", "PingFang SC",
    "Helvetica Neue", "Helvetica", "Arial", sans-serif;
}
.post-special-column-right {
  display: flex;
  height: 100%;
  align-items: center;
}
.post-special-column-right span {
  font-size: 14px;
  color: #999aaa;
  font-family: "SF Pro SC", "SF Pro Text", "SF Pro Icons", "PingFang SC",
    "Helvetica Neue", "Helvetica", "Arial", sans-serif;
}
.post-special-column-right div {
  margin-left: 16px;
  cursor: pointer;
  width: 80px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  border: 1px solid #ccccd8;
  background-color: #fff;
  font-size: 12px;
  border-radius: 16px;
  font-family: "SF Pro SC", "SF Pro Text", "SF Pro Icons", "PingFang SC",
    "Helvetica Neue", "Helvetica", "Arial", sans-serif;
}
.post-special-column-right div:hover {
  color: #fc5531;
}
.content1 {
  margin-top: 12px;
  min-height: 800px;
}
.post-bottom-block {
  position: sticky;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  bottom: 0px;
  height: 64px;
  background: #fff;
  box-sizing: border-box;
  padding: 17px 24px;
  box-shadow: 0 -1px 8px 0 rgba(0, 0, 0, 0.06);
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
}
.post-bottom-block-left {
  display: flex;
  align-items: center;
}
.post-bottom-block-left img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  margin-right: 8px;
}
.post-bottom-block-left span {
  cursor: pointer;
  max-width: 160px;
  height: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 16px;
  font-weight: 600;
  color: #222226;
  line-height: 24px;
  margin-right: 8px;
  font-family: "SF Pro SC", "SF Pro Text", "SF Pro Icons", "PingFang SC",
    "Helvetica Neue", "Helvetica", "Arial", sans-serif;
}
.post-bottom-block-left div {
  width: 60px;
  height: 28px;
  background-color: #fff;
  border-radius: 16px;
  font-size: 14px;
  border: 1px solid #ccccd8;
  color: #555666;
  font-family: "SF Pro SC", "SF Pro Text", "SF Pro Icons", "PingFang SC",
    "Helvetica Neue", "Helvetica", "Arial", sans-serif;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.post-bottom-block-left div:hover {
  border: 1px solid #555666;
}

.post-bottom-block-right {
  display: flex;
  align-items: center;
}
.post-bottom-block-content1,
.post-bottom-block-content2,
.post-bottom-block-content3,
.post-bottom-block-content4,
.post-bottom-block-content5 {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.post-bottom-block-content1 img,
.post-bottom-block-content2 img,
.post-bottom-block-content3 img,
.post-bottom-block-content4 img,
.post-bottom-block-content5 img {
  width: 20px;
  height: 20px;
  object-fit: cover;
}
.post-bottom-block-content1:hover img {
  content: url("../assets/icon/like_fc5531.svg");
}
.post-bottom-block-content2:hover img {
  content: url("../assets/icon/unlike_fc5531.svg");
}
.post-bottom-block-content3:hover img {
  content: url("../assets/icon/star_fc5531.svg");
}
.post-bottom-block-content4:hover img {
  content: url("../assets/icon/comment-active.svg");
}
.post-bottom-block-content5:hover img {
  content: url("../assets/icon/share-active.svg");
}

.post-bottom-block-content1 span,
.post-bottom-block-content2 span,
.post-bottom-block-content3 span,
.post-bottom-block-content4 span,
.post-bottom-block-content5 span {
  margin-left: 2px;
  margin-right: 14px;
  font-size: 14px;
  line-height: 20px;
  color: #999aaa;
  font-family: "SF Pro SC", "SF Pro Text", "SF Pro Icons", "PingFang SC",
    "Helvetica Neue", "Helvetica", "Arial", sans-serif;
}
.post-bottom-block-content1:hover span,
.post-bottom-block-content2:hover span,
.post-bottom-block-content3:hover span{
  color: #fc5531;
}
.post-bottom-block-content4:hover span,
.post-bottom-block-content5:hover span{
  color: #555666;
}
.post-bottom-block-content1-active img{
  content: url("../assets/icon/like_fc5531.svg");
}
.post-bottom-block-content1-active span{
  color: #fc5531;
}
.post-bottom-block-content2-active img{
  content: url("../assets/icon/unlike_fc5531.svg");
}
.post-bottom-block-content2-active span{
  color: #fc5531;
}
.post-bottom-block-content3-active img{
  content: url("../assets/icon/star_fc5531.svg");
}
.post-bottom-block-content3-active span{
  color: #fc5531;
}
.more-img {
  cursor: pointer;
  width: 20px;
  height: 20px;
  object-fit: cover;
}
.more-img:hover {
  content: url("../assets/icon/more-active.svg");
}
.label-div {
  cursor: pointer;
  width: 74px;
  height: 28px;
  font-size: 14px;
  color: #555666;
  box-sizing: border-box;
  border: 1px solid #ccccd8;
  text-align: center;
  text-justify: center;
  line-height: 28px;
  border-radius: 16px;
  margin-left: 18px;
}
.label-div:hover {
  border: 1px solid #555666;
}
.popover-div {
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-popover__reference-wrapper {
  display: inline-block; /* 让它表现得像原本的 img */
  line-height: 0; /* 避免 inline-block 产生的多余间隙 */
  vertical-align: middle; /* 对齐方式保持和 img 一致 */
}
.comments-label {
  margin-top: 8px;
  width: 1010px;
  height: 64px;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  background-color: #fff;
}
.comments-left-div {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.comments-label-number {
  color: #222226;
  font-size: 14px;
  font-family: "SF Pro SC", "SF Pro Text", "SF Pro Icons", "PingFang SC",
    "Helvetica Neue", "Helvetica", "Arial", sans-serif;
}
.comments-label-arrow {
  height: 20px;
  width: 12px;
  object-fit: cover;
}
.comments-label-avatar {
  cursor: pointer;
  margin-left: 25px;
  width: 32px;
  height: 32px;
  object-fit: cover;
  border-radius: 50%;
}
.comments-label-name {
  cursor: pointer;
  margin: 0 10px;
  font-size: 14px;
  color: #777888;
  font-family: "SF Pro SC", "SF Pro Text", "SF Pro Icons", "PingFang SC",
    "Helvetica Neue", "Helvetica", "Arial", sans-serif;
}
.comments-label-hot-comment {
  padding: 2px;
  color: #fc5531;
  background-color: #fc55311a;
  font-size: 12px;
  font-family: "SF Pro SC", "SF Pro Text", "SF Pro Icons", "PingFang SC",
    "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  margin-right: 6px;
}
.comments-label-hot-comment-content {
  color: #222226;
  width: 600px;
  font-size: 14px;
  font-family: "SF Pro SC", "SF Pro Text", "SF Pro Icons", "PingFang SC",
    "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  display: inline-block;
  max-width: 600px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.comments-write-comment {
  cursor: pointer;
  width: 82px;
  height: 32px;
  background-color: #fc5531;
  color: #fff;
  border-radius: 16px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.recommend-post {
  width: 1010px;
  margin-top: 8px;
  background-color: #fff;
}
.recommend-one-post {
  border-top: 1px solid #f7f7fc;
  width: 100%;
  padding: 8px 24px;
}
.recommend-one-post-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.recommend-post-title {
  color: #282b31;
  font-size: 16px;
  font-family: "SF Pro SC", "SF Pro Text", "SF Pro Icons", "PingFang SC",
    "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  display: inline-block;
  max-width: 640px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
::v-deep(.recommend-post-title em) {
  color: #fc5531;
  font-style: normal;
}
.recommend-post-details {
  display: flex;
  align-items: center;
  height: 24px;
}
.recommend-post-author {
  color: #999aaa;
  font-size: 13px;
  font-family: "SF Pro SC", "SF Pro Text", "SF Pro Icons", "PingFang SC",
    "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  line-height: 24px;
  margin-right: 12px;
}
.recommend-post-views-date {
  display: inline-block;
}

.recommend-post-views {
  display: flex;
  align-items: center;
}
.recommend-post-views img {
  width: 14px;
  height: 14px;
  object-fit: cover;
  margin-right: 4px;
}
.recommend-post-views span {
  color: #999aaa;
  font-size: 13px;
  font-family: "SF Pro SC", "SF Pro Text", "SF Pro Icons", "PingFang SC",
    "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  line-height: 24px;
}

.recommend-post-date {
  display: none;
  align-items: center;
  color: #999aaa;
  font-size: 13px;
  font-family: "SF Pro SC", "SF Pro Text", "SF Pro Icons", "PingFang SC",
    "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  line-height: 24px;
}

.recommend-post-views-date:hover .recommend-post-views {
  display: none;
}
.recommend-post-views-date:hover .recommend-post-date {
  display: flex;
}
.recommend-one-post-bottom span {
  color: #999aaa;
  font-size: 14px;
  font-family: "SF Pro SC", "SF Pro Text", "SF Pro Icons", "PingFang SC",
    "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  max-width: 100%;
}

.right-container {
  width: 300px;
  background-color: aqua;
}
.collection-dialog {
  z-index: 201;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 420px;
  background-color: #fff;
  padding-bottom: 18px;
  border-radius: 12px;
}
.collection-dialog-top {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  height: 50px;

  color: #18191c;
  font-size: 16px;
  font-family: "-apple-system";
  font-weight: 500;
}
.collection-dialog-body{
  padding:0 36px;
  max-height: 200px;
  overflow-y: auto;
  margin-top: 12px;
}
/* 滚动条整体 */
.collection-dialog-body::-webkit-scrollbar {
  width: 6px;        /* 滚动条宽度 */
  background: transparent; /* 去掉默认灰色背景 */
}

/* 滚动条轨道 */
.collection-dialog-body::-webkit-scrollbar-track {
  background: transparent; /* 轨道透明，不显示边框 */
}

/* 滚动条滑块 */
.collection-dialog-body::-webkit-scrollbar-thumb {
  background-color: #00bff3; /* 滑块颜色 */
  border-radius: 3px;        /* 滑块圆角 */
}

/* 滑块 hover 效果 */
.collection-dialog-body::-webkit-scrollbar-thumb:hover {
  background-color: #009ac6;
}
.collection-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 14px;
  color: #333;
  margin-bottom: 12px;
}

.collection-item {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
  position: relative;
  margin-bottom: 10px;
}

/* 隐藏原生复选框 */
.collection-item input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

/* 自定义多选框 */
.collection-item .checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  box-sizing: border-box;
  transition: all 0.15s ease;
}
/* hover 效果：边框和文字变色 */
.collection-item:hover .checkbox {
  border-color: #00bff3;
}

.collection-item:hover .label-text {
  color: #00bff3;
}

/* 选中状态：用图片填充背景 */
.collection-item input:checked + .checkbox {
  border-color: #2196f3;
  background: url("@/assets/blblbl_checkbox.png")
    center/cover no-repeat;
}

/* 文本对齐样式 */
.collection-item .label-text {
  flex: 1;
  margin-left: 8px;
}

.collection-item .count {
  color: #999;
  font-size: 13px;
}

.add-collection-box{
  display: flex;
  align-items: center;

  height: 36px;
  width: 100%;

  border: 1px solid #61666D;
  border-radius: 6px;
}
.add-collection-box:hover{
  border-color: #00bff3;
  cursor: pointer;
}
.add-collection-box img{
  width: 20px;
  height: 20px;
  object-fit: cover;
  display:block;
  margin: 0 4px;
}
.add-collection-box span{
  font-size:12px;
  color:#61666D;
  font-family:"-apple-system";
}
.add-collection-input{
  display: flex;
  align-items: center;

  height: 36px;
  width: 100%;

  border: 1px solid #00bff3;
  border-radius: 6px;
  margin-top: 4px;
  
}
.add-collection-input input{
  height: 20px;
  width: 75%;
  padding-left: 16px;

  font-size: 12px;

  border: none;         
  outline: none;        
  box-shadow: none;  
}
.add-collection-input div{
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
  width: 25%;
  border-radius: 6px;


  color: #00AEEC;
  background-color: #D9F1F9;
  font-size: 14px;
  font-family: "-aaple-system";
  border-left: 1px solid #00bff3;
  cursor: pointer;
}
.collection-divier-box{
  padding: 0 36px;
}
.collection-divier-box .collection-dialog-divider{
  border-top: 1px solid #61666D;
  width: 100%;
  margin: 20px 0;
}
.collection-confirm-box{
  display: flex;
  align-items: center;
  justify-content: center;

}
.collection-confirm-btn{
  display: flex;
  align-items: center;
  justify-content: center;
  
  width: 160px;
  height: 40px;
  border-radius: 8px;

  color: #9499A0;
  font-size: 14px;
  font-family: "-apple-system";
  background-color: #E3e5e7;
}
.collection-confirm-btn-active{
  color:#fff;
  cursor:pointer;
  background-color: #00AEEC;
  transition: all 0.3s ease;
}
.collection-confirm-btn-active:hover{
  background-color: #00b8f6;
}
.close-collection-btn{
  position: absolute;
  top: 20px;
  right:20px;

  width: 12px;
  height: 12px;
  object-fit: cover;
  display: block;

  cursor:pointer;

}
</style>
