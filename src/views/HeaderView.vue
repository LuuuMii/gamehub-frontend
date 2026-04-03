<template>
  <div class="myContainer">
    <div class="leftContainer">
      <img class="logoPic" src="../assets/mylogo.svg" alt="" />
      <div>
        <ul class="navList">
          <li>
            <router-link to="/"
              ><i class="el-icon-house"></i>&nbsp;首页</router-link
            >
          </li>
          <li><router-link to="/about">游戏</router-link></li>
          <li><router-link to="/post/24">论坛</router-link></li>
          <li><router-link to="/userspace/1">关于</router-link></li>
          <li><router-link to="/create/editor">编辑</router-link></li>
        </ul>
      </div>
    </div>
    <div class="search-box" ref="searchBox" @click.stop :class="{ focusInput : isFoucsInputSearchFlag }">
      <!-- 第一层 -->
      <div class="search-first-floor">
        <div class="search-first-floor-left">
          <input type="text" 
          v-model="searchContent" 
          :placeholder="placeholderSearchContent" 
          @keyup.enter="handleSearch"
          @focus="focusInputSearch"/>
        </div>
        <div class="search-first-floor-right" @click="handleSearch">
          <img src="@/assets/icon/search_24dp_000.svg" />
        </div>
      </div>
      <!-- 第二层 搜索历史-->
      <div class="search-second-floor" v-show="isFoucsInputSearchFlag">
        <div>
          <div>搜索历史</div>
          <div @click="handleDeleteAllHistory">清空</div>
        </div>
        <div :class="{ expand: isExpandSearchFlag }" ref="historyWrapper">
          <div class="search-history-content-box" @click="handleSearchByContent(item.content)" v-for="(item,index) in historyList" :key="index">
            {{ item.content }}
            <div class="close" @click.stop="handleDeleteByHistory('111')">
              <svg class="close-icon" viewBox="0 0 1024 1024" width="14" height="14">
                <path d="M512 64.303538c-247.25636 0-447.696462 200.440102-447.696462 447.696462
                0 247.254314 200.440102 447.696462 447.696462 447.696462s447.696462-200.440102
                447.696462-447.696462S759.25636 64.303538 512 64.303538zM710.491727 665.266709c12.491499
                12.491499 12.489452 32.729425-0.002047 45.220924-6.246261 6.246261-14.429641 9.370415-22.611997
                9.370415s-16.363689-3.121084-22.60995-9.366322L512 557.222971 358.730221 710.491727
                c-6.246261 6.246261-14.429641 9.366322-22.611997 9.366322s-16.365736-3.125177-22.611997-9.370415
                c-12.491499-12.491499-12.491499-32.729425 0-45.220924l153.268756-153.266709L313.50725 358.730221
                c-12.491499-12.491499-12.489452-32.729425 0.002047-45.220924s32.729425-12.495592 45.220924-0.004093
                l153.268756 153.268756 153.268756-153.268756c12.491499-12.491499 32.729425-12.487406 45.220924
                0.004093s12.493545 32.729425 0.002047 45.220924L557.225017 512 710.491727 665.266709z">
                </path>
              </svg>
            </div>
          </div>
        </div>
        <div class="search-expand-button"  @click="isExpandSearchFlag = !isExpandSearchFlag">
          <div class="search-expand-text" >{{ isExpandSearchFlag? "收起" : "展开更多" }}</div>
          <svg class="fold-icon" :class="{ rotate: isExpandSearchFlag }" viewBox="0 0 12 12">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.46967 9.17678C5.76256 9.46967 6.23744 9.46967 6.53033 9.17678L10.7286 4.97855
              C10.9238 4.78329 10.9238 4.46671 10.7286 4.27145C10.5333 4.07618 10.2167 4.07618 10.0214 4.27145L6 8.29289
              L1.97855 4.27145C1.78329 4.07618 1.46671 4.07618 1.27145 4.27145
              C1.07618 4.46671 1.07618 4.78329 1.27145 4.97855L5.46967 9.17678Z">
            </path>
          </svg>
        </div>
      </div>
      <!-- 第三层 热搜 -->
      <div class="search-third-floor" v-show="isFoucsInputSearchFlag">
        <div>cilicili热搜</div>
        <div class="hot-search-box">
          <div class="one-hot-search-box" @click="handleSearchByContent(item.content)" v-for="(item,index) in hotSearchList" :key="index">
            <div :class="{'last-seven-text' : index+1>=4}">{{ index + 1}}</div>
            <div>{{ item.content }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="rightContainer">
      <ul class="rightNavList">
        <li>
          <el-autocomplete
            ref="autoInput"
            v-if="isShowInput"
            class="inline-input"
            v-model="queryContent"
            :maxlength="16"
            prefix-icon="el-icon-search"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            resizi="horizontal"
            :trigger-on-focus="false"
            @select="handleSelect"
            @blur="queryBlur"
          ></el-autocomplete>
          <a
            href="javascript:void(0)"
            @click="showSearch"
            class="clickable-search"
            v-if="!isShowInput"
          >
            <template>
              <i class="el-icon-search">&nbsp;搜索</i>
            </template>
          </a>
        </li>
        <li v-if="!isLogin">
          <div class="not-logged" @click="openLogin">登录</div>
        </li>
        <li
          v-if="isLogin"
          @mouseenter="mouseenterHandlerForUserInfo"
          @mouseleave="mouseleaveHandlerForUserInfo"
        >
          <img class="login-avatar" :src="userAvatar" />
        </li>
        <!-- 展开个人信息栏目 -->

        <div
          v-if="isShowUserInfo"
          class="userinfo-popover"
          @mouseenter="mouseenterHandlerForUserInfo"
          @mouseleave="mouseleaveHandlerForUserInfo"
        >
          <div class="popover-top">
            <div>
              <img class="popover-user-avatar" :src="user.avatar" />
            </div>
            <div>
              <div class="popover-username">{{ user.nickname }}</div>
              <img
                class="popover-vip-icon"
                src="@/assets/vip/csdn-no-vip.png"
              />
            </div>
          </div>
          <div class="popover-mid">
            <div class="popover-one-data">
              <div class="popover-one-data-top">1</div>
              <div class="popover-one-data-bottom">粉丝</div>
            </div>
            <div class="popover-one-data">
              <div class="popover-one-data-top">78</div>
              <div class="popover-one-data-bottom">关注</div>
            </div>
            <div class="popover-one-data">
              <div class="popover-one-data-top">--</div>
              <div class="popover-one-data-bottom">获赞</div>
            </div>
          </div>
          <div class="popover-bottom">
            <div class="popover-divider"></div>

            <div class="popover-img-text-box">
              <img class="popover-img-box" src="@/assets/icon/user/1.png" />
              <div class="popover-text-box">我的主页</div>
            </div>
            <div class="popover-img-text-box">
              <img class="popover-img-box" src="@/assets/icon/user/2.png" />
              <div class="popover-text-box">个人中心</div>
            </div>
            <div class="popover-img-text-box">
              <img class="popover-img-box" src="@/assets/icon/user/3.png" />
              <div class="popover-text-box">内容管理</div>
            </div>
            <div class="popover-img-text-box">
              <img class="popover-img-box" src="@/assets/icon/user/4.png" />
              <div class="popover-text-box">会员中心</div>
            </div>

            <div class="popover-divider"></div>

            <div class="popover-img-text-box">
              <img class="popover-img-box" src="@/assets/icon/user/5.png" />
              <div class="popover-text-box">已购内容</div>
            </div>
            <div class="popover-img-text-box">
              <img class="popover-img-box" src="@/assets/icon/user/6.png" />
              <div class="popover-text-box">我的订单</div>
            </div>
            <div class="popover-img-text-box">
              <img class="popover-img-box" src="@/assets/icon/user/7.png" />
              <div class="popover-text-box">我的钱包</div>
            </div>
            <div class="popover-img-text-box my-level">
              <img class="popover-img-box" src="@/assets/icon/user/8.png" />
              <div class="popover-text-box">我的等级</div>
              <img
                class="popover-icon-box"
                src="@/assets/icon/user/right-arrow.png"
              />
              <div class="popover-right">
                <div class="popover-level">博客等级</div>
                <div class="popover-level">下载等级</div>
              </div>
            </div>

            <div class="popover-divider"></div>

            <div class="popover-img-text-box" @click="logout">
              <img class="popover-img-box" src="@/assets/icon/user/8.png" />
              <div class="popover-text-box">退出</div>
            </div>
          </div>
        </div>
        <li>
          <div class="right-one-bar">
            <img src="@/assets/icon/music_FFF.svg" />
            <span>音乐盒</span>
          </div>
        </li>
        <li>
          <div class="right-one-bar">
            <img src="@/assets/icon/mail_24dp_FFF.svg" />
            <span>消息</span>
          </div>
        </li>
        <li>
          <div class="right-one-bar">
            <img src="@/assets/icon/notifications_24dp_FFF.svg" />
            <span>动态</span>
          </div>
        </li>
        <li>
          <div class="right-one-bar">
            <img src="@/assets/icon/favorite_24dp_FFF.svg" />
            <span>收藏</span>
          </div>
        </li>
        <li>
          <div class="right-one-bar">
            <img src="@/assets/icon/history_24dp_FFF_FILL0.svg" />
            <span>历史</span>
          </div>
        </li>

        <li @click="headerPushRouter('/create/editor')">
          <div class="right-one-bar">
            <img src="@/assets/icon/add_circle_FFF.svg" />
            <span>创作</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
import { logout } from "@/api/user";
import { eventBus } from "@/mitt/eventBus";
import { mapState } from "vuex";
export default {
  data() {
    return {
      restaurants: [],
      queryContent: "",
      isShowInput: false,
      userId: null,
      userAvatar: null,
      isShowUserInfo: false,
      showUserInfoTimer: null,
      isLogin: false,
      isExpandSearchFlag: false,
      isFoucsInputSearchFlag: false,
      searchContent:"",
      placeholderSearchContent:"瓦洛兰特",
      historyList:[
        { id: 1, content: 'springcloud' },
        { id: 2, content: 'vue' },
        { id: 3, content: 'javascript' },
        { id: 4, content: 'javascript' },
        { id: 5, content: 'javascript' },
        { id: 6, content: 'javascript' },
        { id: 7, content: 'javascript' },
        { id: 8, content: 'javascript' },
        { id: 9, content: 'javascript' },
        { id: 10, content: 'javascript' },
        { id: 11, content: 'javascript' },
        { id: 12, content: 'javascript' },
        { id: 13, content: 'javascript' },
      ],
      hotSearchList:[
        {
          id: 1,
          content:'全球PC市场进入寒冬了吗'
        },
        {
          id: 2,
          content:'极客湾造出辐射哔哔小子'
        },
        {
          id: 3,
          content:'DRG vs NOVA VCT第一赛段'
        },
        {
          id: 4,
          content:'三角洲行动烽火联赛春季赛'
        },
        {
          id: 5,
          content:'沪指再度失守3900点'
        },
        {
          id: 6,
          content:'雪山救水滴'
        },
        {
          id: 7,
          content:'NCT李马克不续约离开SM'
        },
        {
          id: 8,
          content:'伊朗称再次击落美军F35战机'
        },
        {
          id: 9,
          content:'Anthropic误删数千GitHub仓库'
        },
        {
          id: 10,
          content:'东契奇受伤'
        },
      ],
      canExpand:false,
    };
  },
  created() {
    if (this.$store.state.token) {
      this.isLogin = true;
    }
  },
  methods: {
    queryBlur() {
      this.isShowInput = false;
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    loadAll() {
      return [
        { value: "三全鲜食（北新泾店）", address: "长宁区新渔路144号" },
        {
          value: "Hot honey 首尔炸鸡（仙霞路）",
          address: "上海市长宁区淞虹路661号",
        },
        {
          value: "新旺角茶餐厅",
          address: "上海市普陀区真北路988号创邑金沙谷6号楼113",
        },
        { value: "泷千家(天山西路店)", address: "天山西路438号" },
        {
          value: "胖仙女纸杯蛋糕（上海凌空店）",
          address: "上海市长宁区金钟路968号1幢18号楼一层商铺18-101",
        },
        { value: "贡茶", address: "上海市长宁区金钟路633号" },
        {
          value: "豪大大香鸡排超级奶爸",
          address: "上海市嘉定区曹安公路曹安路1685号",
        },
        {
          value: "茶芝兰（奶茶，手抓饼）",
          address: "上海市普陀区同普路1435号",
        },
        { value: "十二泷町", address: "上海市北翟路1444弄81号B幢-107" },
        { value: "星移浓缩咖啡", address: "上海市嘉定区新郁路817号" },
        { value: "阿姨奶茶/豪大大", address: "嘉定区曹安路1611号" },
        { value: "新麦甜四季甜品炸鸡", address: "嘉定区曹安公路2383弄55号" },
        {
          value: "Monica摩托主题咖啡店",
          address: "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F",
        },
        {
          value: "浮生若茶（凌空soho店）",
          address: "上海长宁区金钟路968号9号楼地下一层",
        },
        { value: "NONO JUICE  鲜榨果汁", address: "上海市长宁区天山西路119号" },
        { value: "CoCo都可(北新泾店）", address: "上海市长宁区仙霞西路" },
        {
          value: "快乐柠檬（神州智慧店）",
          address: "上海市长宁区天山西路567号1层R117号店铺",
        },
        {
          value: "Merci Paul cafe",
          address: "上海市普陀区光复西路丹巴路28弄6号楼819",
        },
        {
          value: "猫山王（西郊百联店）",
          address: "上海市长宁区仙霞西路88号第一层G05-F01-1-306",
        },
        { value: "枪会山", address: "上海市普陀区棕榈路" },
        { value: "纵食", address: "元丰天山花园(东门) 双流路267号" },
        { value: "钱记", address: "上海市长宁区天山西路" },
        { value: "壹杯加", address: "上海市长宁区通协路" },
        {
          value: "唦哇嘀咖",
          address: "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元",
        },
        { value: "爱茜茜里(西郊百联)", address: "长宁区仙霞西路88号1305室" },
        {
          value: "爱茜茜里(近铁广场)",
          address:
            "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺",
        },
        {
          value: "鲜果榨汁（金沙江路和美广店）",
          address: "普陀区金沙江路2239号金沙和美广场B1-10-6",
        },
        {
          value: "开心丽果（缤谷店）",
          address: "上海市长宁区威宁路天山路341号",
        },
        { value: "超级鸡车（丰庄路店）", address: "上海市嘉定区丰庄路240号" },
        { value: "妙生活果园（北新泾店）", address: "长宁区新渔路144号" },
        { value: "香宜度麻辣香锅", address: "长宁区淞虹路148号" },
        {
          value: "凡仔汉堡（老真北路店）",
          address: "上海市普陀区老真北路160号",
        },
        { value: "港式小铺", address: "上海市长宁区金钟路968号15楼15-105室" },
        { value: "蜀香源麻辣香锅（剑河路店）", address: "剑河路443-1" },
        { value: "北京饺子馆", address: "长宁区北新泾街道天山西路490-1号" },
        {
          value: "饭典*新简餐（凌空SOHO店）",
          address: "上海市长宁区金钟路968号9号楼地下一层9-83室",
        },
        {
          value: "焦耳·川式快餐（金钟路店）",
          address: "上海市金钟路633号地下一层甲部",
        },
        { value: "动力鸡车", address: "长宁区仙霞西路299弄3号101B" },
        { value: "浏阳蒸菜", address: "天山西路430号" },
        { value: "四海游龙（天山西路店）", address: "上海市长宁区天山西路" },
        {
          value: "樱花食堂（凌空店）",
          address: "上海市长宁区金钟路968号15楼15-105室",
        },
        { value: "壹分米客家传统调制米粉(天山店)", address: "天山西路428号" },
        {
          value: "福荣祥烧腊（平溪路店）",
          address: "上海市长宁区协和路福泉路255弄57-73号",
        },
        {
          value: "速记黄焖鸡米饭",
          address: "上海市长宁区北新泾街道金钟路180号1层01号摊位",
        },
        { value: "红辣椒麻辣烫", address: "上海市长宁区天山西路492号" },
        {
          value: "(小杨生煎)西郊百联餐厅",
          address: "长宁区仙霞西路88号百联2楼",
        },
        { value: "阳阳麻辣烫", address: "天山西路389号" },
        {
          value: "南拳妈妈龙虾盖浇饭",
          address: "普陀区金沙江路1699号鑫乐惠美食广场A13",
        },
      ];
    },
    handleSelect(item) {
      console.log(item);
    },
    showSearch() {
      this.isShowInput = true;
      this.$nextTick(() => {
        if (this.$refs.autoInput) {
          this.$refs.autoInput.focus();
        }
      });
    },
    openLogin() {
      eventBus.emit("openLogin");
      eventBus.emit("openMask");
    },
    //鼠标移入个人信息出现
    mouseenterHandlerForUserInfo() {
      this.clearTimer();
      this.showUserInfoTimer = setTimeout(() => {
        this.isShowUserInfo = true;
      }, 500);
    },
    //鼠标移出个人信息消失
    mouseleaveHandlerForUserInfo() {
      this.clearTimer();
      this.showUserInfoTimer = setTimeout(() => {
        this.isShowUserInfo = false;
      }, 500);
    },
    clearTimer() {
      if (this.showUserInfoTimer) {
        clearTimeout(this.showUserInfoTimer);
        this.showUserInfoTimer = null;
      }
    },
    async logout() {
      const res = await logout(localStorage.getItem("token"));
      alert(localStorage.getItem("token"));
      if (res.code === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("username");
        localStorage.removeItem("avatar");
        window.location.reload();
      }
    },
    headerPushRouter(url) {
      if (this.$route.path !== url) {
        this.$router.push(url);
      }
    },

    // 选中搜索框点击事件
    focusInputSearch(){
      this.isFoucsInputSearchFlag = true;
    },
    // 搜索框取消点击事件
    handleClickOutside(e) {
    const box = this.$refs.searchBox
      if (box && !box.contains(e.target)) {
        this.isFoucsInputSearchFlag = false
      }
    },
    // 搜索事件
    handleSearch(){
      if(this.searchContent === ""){
        alert(" 跳转 (无内容)"+this.placeholderSearchContent)
      }else{
        alert("跳转" + this.searchContent)
      }
      
    },
    // 根据内容查询点击事件(包含历史内容查询和热搜查询)
    handleSearchByContent(content){
      alert("历史记录跳转 : " +  content);
    },
    handleDeleteByHistory(historyContent){
      alert("删除浏览记录 : " + historyContent);
    },
    // 删除所有的浏览记录
    handleDeleteAllHistory(){
      alert("删除所有的浏览记录")
    },
    
  },
  mounted() {
    this.restaurants = this.loadAll();
    this.boundClickOutside = this.handleClickOutside.bind(this)
    document.addEventListener('click', this.boundClickOutside)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.boundClickOutside)
  },
  computed: {
    ...mapState(["user", "token"]),
  },
  watch: {
    user(newVal) {
      this.userAvatar = newVal.avatar;
      this.userId = newVal.id;
    },
  },
};
</script>

<style scoped>
.myContainer {
  width: 100%;
  height: 65px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #31393c;
  /* 背景图设置 */
  background-image: url("@/assets/headerbg.avif");
  background-repeat: no-repeat;
  background-position: top center;
  background-size: auto;
  transition: all 0.3s ease;
}

.leftContainer {
  height: 50px;
  display: flex;
  align-items: center;
  gap: 40px;
}

.logoPic {
  width: 60px;
  height: 100%;
  object-fit: contain;
}
/* 菜单导航 */
.navList {
  list-style: none;
  display: flex;
  gap: 30px;
  padding: 0;
  margin: 0;
}

.navList li {
  text-align: center;
}

.navList li a {
  text-decoration: none;
  color: white;
  font-size: 16px;
}

.navList li a:hover {
  color: #007bff;
}

/* 右边容器 */
.rightContainer {
  height: 50px;
  display: flex;
  align-items: center;
  gap: 40px;
}
.rightNavList {
  list-style: none;
  display: flex;
  gap: 18px;
  pad: 0;
  margin: 0;
}
.rightNavList li {
  display: flex;
  align-items: center;
  height: 65px; /* 和导航栏高度一致 */
  margin: 0 5px;
}
.rightNavList li a {
  text-decoration: none;
  color: white;
  font-size: 16px;
}
.right-one-bar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.right-one-bar img {
  width: 20px;
  height: 20px;
  object-fit: cover;
  display: block;
}
.right-one-bar span {
  font-size: 13px;
  font-weight: 500;
  color: #fff;
  font-family: "PingFang SC";
}

.right-one-bar:hover img {
  animation: floatUp 0.4s ease forwards;
}

@keyframes floatUp {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
  100% {
    transform: translateY(0);
  }
}

.rightNavList li a:hover {
  color: #007bff;
}
.login-avatar {
  width: 36px;
  height: 36px;
  object-fit: cover;
  display: block;
  cursor: pointer;
  border-radius: 50%;
}
.not-logged {
  width: 36px;
  height: 36px;
  font-size: 13px;
  color: #fff;
  background-color: #00aeec;
  text-align: center;
  line-height: 36px;
  border-radius: 50%;
  cursor: pointer;
}

.userinfo-popover {
  z-index: 201;
  position: absolute;
  top: 67px;
  width: 218px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  padding: 0 0 4px;
  transition: all 0.3s ease;
}
.popover-top {
  display: flex;
  padding: 20px 24px 14px;
}
.popover-user-avatar {
  width: 40px;
  height: 40px;
  object-fit: cover;
  display: block;
  border-radius: 50%;
  cursor: pointer;
  margin: 0 8px 0 0;
}
.popover-username {
  font-size: 16px;
  color: #1a1a1a;
  font-family: "PingFang SC";
  font-weight: 500;
  margin: 0 0 2px;
}
.popover-vip-icon {
  width: 36px;
  height: 16px;
  object-fit: cover;
  display: block;
  cursor: pointer;
}
.popover-mid {
  display: flex;
  justify-content: space-around;
  padding: 0 0 12px;
}
.popover-one-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.popover-one-data-top {
  font-size: 14px;
  color: #1a1a1a;
  font-family: "PingFang SC";
  font-weight: 500;
}
.popover-one-data-bottom {
  font-size: 14px;
  color: #999aaa;
  font-family: "PingFang SC";
  margin-top: 2px;
}

.popover-divider {
  border-top: 1px solid #f2f2f2;
  margin: 6px 0;
}
.popover-img-text-box {
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 16px;
  cursor: pointer;
}
.popover-img-text-box:hover {
  background-color: #f2f2f2;
}
.popover-img-box {
  width: 16px;
  height: 16px;
  object-fit: cover;
  display: block;
  margin: 0 8px 0 0;
}
.popover-text-box {
  color: #555666;
  font-size: 14px;
  font-family: "PingFang SC";
}
.popover-icon-box {
  width: 12px;
  height: 12px;
  object-fit: cover;
  display: block;
  margin: 0 0 0 85px;
}
.popover-right {
  position: absolute;
  right: 0;
  top: 0px;
  transform: translate(100%);

  width: 160px;
  background-color: #fff;
  border-radius: 8px;

  padding: 4px 0;

  display: none;
}
.my-level {
  position: relative;
}
.my-level:hover .popover-right,
.popover-right:hover {
  display: block;
}

.popover-level {
  display: flex;
  align-items: center;
  width: 160px;
  height: 40px;
  padding: 0 24px;
  cursor: pointer;

  color: #555666;
  font-size: 14px;
  font-family: "PingFang SC";
}
.popover-level:hover {
  background-color: #f2f2f2;
}
/* 搜索框 */
.search-box {
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
  width: 425px;
  min-height: 40px;
  padding: 0 10px 0 4px;
  border: 1px solid #e3e5e7;
  border-radius: 4px;
  color: #000;
  background-color: #e1e1e4;
  transition: 0.3s;
}
.focusInput{
  background-color: #fff;
}
.search-first-floor{
  display: flex;
  width: 100%;
  padding-top: 4px;
}
.search-first-floor-left{
  width: 380px;
  height: 30px;
  background-color: #e3e5e7;
  border: 1px solid #e3e5e7;
  border-radius: 4px;
  padding: 0 0 0 8px;
}
.search-first-floor-left input {
  width: 100%;
  border: none;
  outline: none;
  font-size: 14px;
  line-height: 20px;
  background-color: #e3e5e7;
}
.search-first-floor-right{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  margin-left: 10px;
  border-radius: 4px;
  transition: 0.3s;
}
.search-first-floor-right:hover{
  background-color: #e3e5e7;
  cursor: pointer;
}
.search-second-floor{
  width: 100%;
  padding: 5px 8px 2px;
}
.search-second-floor > div:nth-child(1){
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.search-second-floor > div:nth-child(1) > div:nth-child(1){
  height: 24px;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
}
.search-second-floor > div:nth-child(1) > div:nth-child(2){
  height: 15px;
  color: #9499A0;
  font-size: 12px;
  line-height: 15px;
  cursor: pointer;
  transition: 0.3s;
}
.search-second-floor > div:nth-child(1) > div:nth-child(2):hover{
  color: #00aeec;
}
.search-second-floor > div:nth-child(2){
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 8px;
  max-height: 80px;
  overflow: hidden;
}
.search-second-floor > div:nth-child(2).expand{
  max-height: 160px;
}
.search-history-content-box{
  position: relative;
  height: 30px;
  font-size: 12px;
  color: #18191c;
  line-height: 15px;
  padding: 7px 10px 8px;
  border-radius: 4px;
  background-color: #F6F7F8;
  cursor: pointer;
  margin-right: 10px;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 96px;
  transition: 0.3s;
}

.search-history-content-box:hover{
  color:#2bbbee;
}
.search-expand-button{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.search-expand-button{
  font-size: 12px;
  line-height: 15px;
  height: 15px;
  color: #9499A0;
  cursor: pointer;
  margin-bottom: 8px;
}
.fold-icon{
  width: 12px;
  height: 12px;
  fill: #9499A0;
  margin-left: 2px;
}
.fold-icon.rotate {
  transform: rotate(180deg);
}
.close{
  position: absolute;
  display: none;
  top: 0;
  right: 0;
  transition: 0.3s;
}
.close-icon{
  fill: #9499A0;;
}
.search-history-content-box:hover .close{
  display: block;
}
.search-third-floor{
  width: 100%;
  margin-bottom: 10px;
}
.search-third-floor > div:nth-child(1){
  height: 24px;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #18191C;
  margin-left: 8px;
}
.hot-search-box{
  display: flex;
  flex-wrap: wrap;
}
.one-hot-search-box{
  display: flex;
  width: 50%;
  height: 38px;
  padding: 0 8px 0;
  align-items: center;
}
.one-hot-search-box:hover{
  cursor: pointer;
  background-color: #e3e5e7;
}
/* 排行 */
.one-hot-search-box > div:nth-child(1){
  color: #18191C;
  font-size: 14px;
  line-height: 17px;
  height: 17px;
  margin-right: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: 0;
}
/* 内容 */
.one-hot-search-box > div:nth-child(2){
  font-size: 14px;
  line-height: 17px;
  height: 17px;
  margin-right: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: 0;
}
/* 排行榜后七位的颜色 */
.last-seven-text{
  color: #9499a0 !important;
}
</style>