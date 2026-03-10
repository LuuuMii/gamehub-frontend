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
          <router-link to="/">音乐盒</router-link>
        </li>
        <li>
          <router-link to="/">登录</router-link>
        </li>
        <li>
          <router-link to="/">登录</router-link>
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
import { logout } from "@/api/user"
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
      isLogin:false,
    };
  },
  created(){
    if(this.$store.state.token){
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
      if(res.code === 200){
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
  },
  mounted() {
    this.restaurants = this.loadAll();
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
  gap: 30px;
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
</style>