<template>
  <div class="myContainer">
    <div class="main">
      <img class="top-skin" src="../../assets/skin.png" />
      <div class="peopel-details">
        <img class="avatar" src="../../assets/banner.jpg" />
        <!-- 主题内容 -->
        <div class="main-details">
          <div class="details-floor1">
            <div class="details-floor1-left">
              <span class="author-name">猫咪-9527</span>
              <div class="year" title="加入2年">
                <img src="../../assets/20210108035944.gif" />
                <span>码龄2年</span>
              </div>
              <div class="badge">
                <img
                  class="img-hover"
                  src="../../assets/level/blog7.png"
                  title="博客等级"
                />
                <img
                  class="img-hover"
                  src="../../assets/icon/icon-realName.png"
                  title="已完成实名认证"
                />
                <img src="../../assets/icon/male.svg" />
              </div>
            </div>
            <div class="details-floor1-right">
              <div class="request-btn" @click="requestAuthor">
                <span class="unclick-span" v-show="!isRequestAuthor"
                  >求更新</span
                >
                <span class="clicked-span" v-show="isRequestAuthor"
                  >已催更</span
                >
              </div>
              <div class="attention-btn" @click="followAuthor">
                <img
                  v-show="!isFollowAuthor"
                  class="add-icon"
                  src="../../assets/icon/addIcon.png"
                />
                <span class="unclick-span" v-show="!isFollowAuthor">关注</span>
                <span class="clicked-span" v-show="isFollowAuthor">已关注</span>
              </div>
              <el-popover placement="bottom-end" trigger="hover" width="150">
                <div class="more-operations">
                  <div>提问</div>
                  <div>私信</div>
                </div>
                <img
                  class="ellipsis-vertical"
                  src="../../assets/icon/ellipsis-vertical.svg"
                  title="更多"
                  slot="reference"
                />
              </el-popover>
            </div>
          </div>
          <div class="details-floor2">
            <el-popover trigger="hover">
              <div class="visitors">
                <div class="visitor-flex">
                  <span class="color1 create-time">博客：217,296</span>
                </div>
                <div class="visitor-flex">
                  <span class="color2 create-time">社区：401</span>
                </div>
              </div>
              <div class="some-num pointer" slot="reference">
                <span class="num-span">217,697</span>
                <span class="name-span">总访问量</span>
              </div>
            </el-popover>

            <div class="vertical-line"></div>
            <div class="some-num pointer">
              <span class="num-span">63</span>
              <span class="name-span">原创</span>
            </div>
            <div class="vertical-line"></div>
            <div class="some-num pointer">
              <span class="num-span">3,196</span>
              <span class="name-span">排名</span>
            </div>
            <div class="vertical-line"></div>
            <div class="some-num pointer">
              <span class="num-span">3,996</span>
              <span class="name-span">粉丝</span>
            </div>
            <div class="vertical-line"></div>
            <div class="some-num pointer">
              <span class="num-span">401</span>
              <span class="name-span">关注</span>
            </div>
          </div>
          <div class="details-floor3">
            <span class="ip">IP 属地：云南省</span>
            <span class="create-time">加入CSDN时间：2023-12-11</span>
          </div>
          <div class="details-floor4">
            <span class="profile">个人简介：</span>
            <span class="profile-content" :class="{ expanded: isOpenDetails }"
              >1222222222222222222222222222222222212222222222222222222222222222222222122222222222222222222222222222222221222222222222222222222222222222222212222222222222222222222222222222222122222222222222222222222222222222221222222222222222222222222222222222212222222222222222222222222222222222</span
            >
          </div>
          <div class="details-floor5" v-show="isOpenDetails">
            <span class="create-time">博客简介： </span>
            <span class="create-time">2301_81831423的博客</span>
          </div>
          <div class="details-floor6" @click="openDetails">
            <span class="create-time">{{
              isOpenDetails ? "收起详细资料" : "查看详细信息"
            }}</span>
            <i
              class="el-icon-arrow-down"
              :class="{ rotated: isOpenDetails }"
            ></i>
          </div>
        </div>
      </div>
      <div class="main-contnet">
        <div class="left-label">
          <!-- 个人成就(一个大div) -->
          <div class="achievement">
            <!-- 标题 -->
            <div class="achievement-top">
              <span>个人成就</span>
            </div>
            <!-- 成就数据 -->
            <div class="achievement-data">
              <div class="one-achievement">
                <img
                  class="achievement-icon"
                  src="../../assets/icon/achievement1.png"
                />
                <span class="achievement-span">获得5,145次点赞</span>
              </div>
              <div class="one-achievement">
                <img
                  class="achievement-icon"
                  src="../../assets/icon/achievement2.png"
                />
                <span class="achievement-span">内容获得3,118次评论</span>
              </div>
              <div class="one-achievement">
                <img
                  class="achievement-icon"
                  src="../../assets/icon/achievement3.png"
                />
                <span class="achievement-span">获得4,607次收藏</span>
              </div>
              <div class="one-achievement">
                <img
                  class="achievement-icon"
                  src="../../assets/icon/achievement4.png"
                />
                <span class="achievement-span">代码片获得985次分享</span>
              </div>
            </div>
            <!-- 创作历程 -->
            <div class="creative-process" v-show="isOpenAchievement">
              <!-- 头部 -->
              <div class="creative-top">
                <img
                  class="creative-icon"
                  src="../../assets/icon/creative.png"
                />
                <span class="creative-top-title">创作历程</span>
              </div>
              <!-- 身体 -->
              <div class="creative-bottom">
                <div class="one-creative" v-for="index in 9" :key="index">
                  <div class="creative-num">5221篇</div>
                  <div class="creative-year">2025年</div>
                </div>
              </div>
            </div>
            <!-- 成就勋章 -->
            <div class="achievement-medal" v-show="isOpenAchievement">
              <div class="medal-top">
                <img class="medal-icon" src="../../assets/icon/medal.png" />
                <div class="medal-top-title">成就勋章</div>
              </div>
              <div class="medal-bottom">
                <img
                  class="medal-img"
                  src="../../assets/icon/xiguanyangchengLv1.png"
                  title="什么勋章"
                  v-for="index in 8"
                  :key="index"
                />
              </div>
            </div>
            <!-- 展开按钮 -->
            <div class="btn-container">
              <div class="open-btn" @click="openAchievement">
                <i
                  class="el-icon-arrow-down"
                  :class="{ rotated: isOpenAchievement }"
                ></i>
              </div>
            </div>
          </div>
          <!-- ta的专栏(一个大div) -->
          <div class="column">
            <div class="column-top">
              <span class="column-bar">TA的专栏</span>
            </div>
            <div class="column-body">
              <ul class="column-ul">
                <li class="column-li" v-for="index in columnList" :key="index">
                  <div class="img-title">
                    <img class="column-img" src="../../assets/banner.jpg">
                    <span class="column-title">算法：基础</span>
                  </div>
                  <div class="column-num">1篇</div>
                </li>
              </ul>
              <div class="more-column" v-show="openColumnList && columnList>20">更多</div>
            </div>
            <!-- 展开按钮 -->
            <div class="btn-container">
              <div class="open-btn" @click="openColumnList">
                <i
                  class="el-icon-arrow-down"
                  :class="{ rotated: isOpenColumnList }"
                ></i>
              </div>
            </div>
          </div>
          <!-- ta的收藏(一个大div) -->
          <div class="user-interactive">
            <div class="one-interactive">
              <div class="interactive-title">TA关注的专栏</div>
              <div class="interactive-num">1</div>
            </div>
            <div class="one-interactive">
              <div class="interactive-title">TA关注的收藏夹</div>
              <div class="interactive-num">0</div>
            </div>
            <div class="one-interactive">
              <div class="interactive-title">TA关注的社区</div>
              <div class="interactive-num">9</div>
            </div>
            <div class="one-interactive">
              <div class="interactive-title">TA关注的活动</div>
              <div class="interactive-num">6</div>
            </div>
          </div>
          <!-- 兴趣领域 -->
          <div class="user-interest">
            
          </div>
        </div>
        <div class="right-label">右边1</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OtherSpace",
  data() {
    return {
      isRequestAuthor: false,
      isFollowAuthor: false,
      isOpenDetails: false,
      isOpenAchievement: false,
      isOpenColumnList: false,
      columnList: 6
    };
  },
  methods: {
    requestAuthor() {
      this.isRequestAuthor = !this.isRequestAuthor;
    },
    followAuthor() {
      this.isFollowAuthor = !this.isFollowAuthor;
    },
    openDetails() {
      this.isOpenDetails = !this.isOpenDetails;
    },
    openAchievement(){
      this.isOpenAchievement = !this.isOpenAchievement;
    },
    openColumnList(){
      //测试
      if(this.columnList===6){
        this.columnList=8;
        this.isOpenColumnList = true;
      }else{
        this.columnList=6;
        this.isOpenColumnList = false;
      }
    }
  },
};
</script>

<style scoped>
.myContainer {
  width: 100%;
  margin: 0;
  padding: 0;
  background: linear-gradient(270deg, #a8edea, #fed6e3, #d0e6a5, #89f7fe);
  background-size: 800% 800%;
  animation: gradientShift 100s ease infinite;
}

@keyframes gradientShift {
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
.main {
  width: 1310px;
  margin: 0 auto;
}
.top-skin {
  height: 100px;
  width: 100%;
  object-fit: cover;
  display: block;
}
.peopel-details {
  width: 100%;
  background-color: #fff;
  position: relative;
  border-radius: 2px;
}
.avatar {
  height: 94px;
  width: 94px;
  object-fit: cover;
  border-radius: 50%;
  display: block;
  position: absolute;
  top: -10px;
  left: 20px;

  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3), 0 0 20px rgba(100, 200, 255, 0.6);
}
.main-details {
  padding: 20px 35px 20px 130px;
}
.details-floor1 {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.details-floor1-left {
  width: 100%;
  display: flex;
  align-items: center;
}
.author-name {
  font-size: 22px;
  color: #222226;
  font-weight: 400;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
}
.year {
  display: flex;
  align-items: center;
  border-radius: 10px;
  background-color: rgb(209, 221, 241);
  padding: 0 6px 0 0;
  margin-left: 8px;
}
.year img {
  width: 22px;
  height: 22px;
  object-fit: cover;
  display: block;
}
.year span {
  font-size: 12px;
  color: #455165;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
  margin-left: 4px;
}
.badge {
  display: flex;
  align-items: center;
}
.badge img {
  width: 22px;
  height: 22px;
  object-fit: cover;
  display: block;
  margin-left: 4px;
}
.img-hover {
  cursor: pointer;
}
.details-floor1-right {
  display: flex;
  align-items: center;
}
.request-btn,
.attention-btn {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90px;
  height: 30px;
  border: 1px solid #ccccd8;
  border-radius: 20px;
  margin-left: 16px;
}
.request-btn:hover,
.attention-btn:hover {
  border: 1px solid #555666;
}
.add-icon {
  width: 12px;
  height: 12px;
  object-fit: cover;
  display: block;
  margin: 0 2px 0 0;
}
.unclick-span {
  font-size: 14px;
  color: #555666;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
}
.clicked-span {
  font-size: 14px;
  color: #cccccc;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
}
.ellipsis-vertical {
  cursor: pointer;
  width: 25px;
  height: 25px;
  object-fit: cover;
  display: block;
  margin-left: 8px;
}
.more-operations {
  width: 100%;
}
.more-operations div {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  font-size: 14px;
  color: #555666;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
}
.more-operations div:hover {
  background-color: #f0f0f5;
}
.details-floor2 {
  width: 100%;
  height: 50px;
  position: relative;
  display: flex;
  align-items: center;
}
.visitors {
  width: 100%;
}
.visitor-flex {
  display: flex;
  align-items: center;
  padding: 5px 0;
}
.visitor-flex span {
  display: inline-flex;
  align-items: center;
}
.visitor-flex span::before {
  content: "";
  display: inline-block;
  width: 6px;
  height: 6px;

  border-radius: 50%;
  margin-right: 8px;
}
.color1::before {
  background-color: #fc5531;
}
.color2::before {
  background-color: #3387ff;
}
.vertical-line {
  height: 20px;
  border-left: 1px solid #e8e8ed;
  box-shadow: -1px 0 3px rgba(0, 0, 0, 0.1);
  margin: 0 15px;
}

.some-num {
  display: flex;
  align-items: center;
}
.pointer {
  cursor: pointer;
}
.some-num:hover .num-span,
.some-num:hover .name-span {
  color: #fc5531;
}
.num-span {
  font-size: 20px;
  color: #222226;
  font-family: "Inter", sans-serif;
  font-weight: bold;
  margin-right: 4px;
}
.name-span {
  font-size: 14px;
  color: #222226;
  font-family: "Inter", sans-serif;
}
.details-floor3 {
  width: 100%;
  display: flex;
  align-items: center;
}
.ip {
  font-size: 14px;
  color: #555666;
  margin-right: 35px;
}
.create-time {
  font-size: 14px;
  color: #555666;
}

.details-floor4 {
  margin-top: 14px;
  width: 100%;
  display: flex;
  align-items: flex-start;
}

.profile {
  font-size: 14px;
  color: #555666;
  flex: 0 0 auto;
  width: 70px;
}

.profile-content {
  font-size: 14px;
  color: #555666;
  flex: 1;
  white-space: normal;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* 初始只显示1行 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all 0.3s ease;
}

.profile-content.expanded {
  -webkit-line-clamp: unset; /* 展开显示全部 */
  overflow: visible;
}

.details-floor5 {
  margin-top: 14px;
}
.details-floor6 {
  margin-top: 14px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
}

.el-icon-arrow-down {
  margin-left: 3px;
  display: inline-block;
  transition: transform 0.5s ease; /* 平滑过渡 */
}

.el-icon-arrow-down.rotated {
  transform: rotate(180deg); /* 顺时针旋转180度 */
}

.main-contnet {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.left-label {
  width: 338px;
}
.achievement {
  width: 100%;
  background-color: #fff;
}
.achievement-top {
  width: 100%;
  border-bottom: 1px solid #e8e8ed;
  padding: 16px 16px 16px;
}
.achievement-top span {
  font-size: 16px;
  color: #222226;
}
.achievement-data {
  width: 100%;
  padding: 16px 16px 8px;
  border-bottom: 1px solid #e8e8ed;
}
.one-achievement {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}
.achievement-icon {
  width: 22px;
  height: 22px;
  object-fit: cover;
  display: block;
  margin-right: 10px;
}
.achievement-span {
  color: #555666;
  font-size: 14px;
  font-size: "PingFang SC", "Hiragino Sans GB", Arial, "Microsoft YaHei",
    Verdana, Roboto, Noto, "Helvetica Neue", sans-serif;
}
.creative-process {
  width: 100%;
  border-top: 1px solid #e8e8ed;
  padding: 0px 16px 24px;
}
.creative-top {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 14px 0px 12px;
}
.creative-icon {
  width: 20px;
  height: 20px;
  object-fit: cover;
  display: block;
  margin-right: 8px;
}
.creative-top-title {
  font-size: 14px;
  color: #222226;
}
.creative-bottom {
  padding: 10px 16px 16px;
  background-color: #f8f1f1;
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 一行四个 */
  gap: 16px;
}

.one-creative {
  text-align: center;
}
.creative-num {
  font-size: 16px;
  color: #222226;
  margin-bottom: 4px;
}
.creative-num:hover {
  color: #fc5531;
  cursor: pointer;
}
.creative-year {
  font-size: 14px;
  color: #999aaa;
}


.achievement-medal {
  width: 100%;
  padding: 0 16px 20px;
  transition: all 0.3s ease;
}
.medal-top {
  display: flex;
  align-items: center;
  border-top: 1px solid #e8e8ed;
  padding: 16px 0 14px;
}
.medal-top-title {
  font-size: 14px;
  color: #222226;
}

.medal-icon {
  width: 20px;
  height: 20px;
  object-fit: cover;
  display: block;
  margin-right: 10px;
}
.medal-bottom {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}
.medal-img {
  cursor: pointer;
  width: 34px;
  height: 34px;
  object-fit: contain;
  display: block;
  margin-right: 8px;
  margin-bottom: 8px;
}

.btn-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 12px;
}
.open-btn{
  margin-top: 12px;
  cursor: pointer;
  width: 50px;
  height: 20px;
  border-radius: 10px;
  background-color: #f5f6f7;
  display: flex;
  justify-content: center;
  align-items: center;
}
.column{
  margin-top: 12px;
  width: 100%;
  background-color: #fff;
}
.column-top{
  width: 100%;
  display: flex;
  align-items: center;
  padding: 14px 0 0 16px;
}
.column-bar{
  padding: 0 0 16px 0;
  width: 100%;
  font-size: 16px;
  color: #222226;
  font-weight: 500;
  border-bottom: 1px solid #e8e8ed;
}
.column-body{
  width: 100%;
}
.column-ul{

  width: 100%;
  padding: 14px 20px 0px 30px;

  position: relative;

}
.column-ul::before{
  /* 竖线 */
  content: "";
  display: block;
  position: absolute;

  top: 26px;
  left: 13px;
  bottom: 12px;
  border-left: 1px dashed #8c8ca5;

}
.column-li{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;

  position: relative;
}
.column-li::before{
  /* 横线 */
  content:"";
  display:block;
  position: absolute;
  left: -16px;
  width: 16px;
  border-bottom: 1px dashed #8c8ca5;
}

.img-title{
  display: flex;
  align-items: center;
  cursor: pointer;
}
.img-title:hover .column-title{
  color: #fc5531;
}
.column-img{
  width: 24px;
  height: 24px;
  object-fit: cover;
  display: block;
  margin: 0 8px 0 4px;
}
.column-title{
  font-size: 14px;
  color: #555666;

  display: inline-block;   
  max-width: 200px;        
  white-space: nowrap;     
  overflow: hidden;        
  text-overflow: ellipsis; 
}

.column-num{
  font-size: 14px;
  color: #999aaa;
}

.more-column{
  font-size: 14px;
  cursor: pointer;
  color: #40a9ff;
  transition: color 0.3s ease;
  margin-left: 30px;
}
.more-column:hover{
  color: #096dd9;
}

.user-interactive{
  width: 100%;
  padding: 0 16px 0;
  background-color: #fff;
  margin-top: 10px;
  margin-bottom: 10px;
}
.one-interactive{
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 3px 12px;
  border-bottom: 1px solid #e8e8ed;
}
.one-interactive:hover .interactive-title{
  color: #fc5531;
}
.interactive-title{
  font-size: 14px;
  color: #666666;
}
.interactive-num{
  font-size: 14px;
  color: #666666;
}

.right-label {
  width: 962px;
  height: 300px;
  background: #fff;
}
</style>
