<template>
  <div class="my-container">
    <div class="login-container">
      <!-- 左边部分 -->
      <div class="login-left">
        <div class="login-scan-title">扫描二维码登录</div>
        <div class="login-scan-box">
          <img class="login-scan-qrcode" src="@/assets/qrcode.png" />
          <!-- 过期后出现的界面 点击刷新 -->
          <div class="qrcode-expired-box" v-show="isQrCodeExpired">
            <div class="qrcode-reload-box">
              <img src="@/assets/reload.png" />
            </div>
            <div class="qrcode-reload-font">二维码已过期</div>
            <div class="qrcode-reload-font">请点击刷新</div>
          </div>
        </div>
        <div class="login-scan-font">
          请使用&nbsp;<span>嘻哩嘻哩客户端</span>
        </div>
        <div class="login-scan-font">扫码登录或下载APP</div>
      </div>
      <div class="login-divider"></div>
      <!-- 右边部分 -->
      <div class="login-right">
        <div class="login-type-box">
          <div
            class="login-type"
            :class="{ 'login-type-active': loginType === 0 }"
            @click="loginType = 0"
          >
            密码登录
          </div>
          <div class="login-type-divider"></div>
          <div
            class="login-type"
            :class="{ 'login-type-active': loginType === 1 }"
            @click="loginType = 1"
          >
            短信登录
          </div>
        </div>
        <!-- 账号密码登录 -->
        <div class="login-form" v-show="loginType === 0">
          <div class="account-box">
            <span class="form-info margin-right-20">账号</span>
            <input
              type="text"
              placeholder="请输入账号"
              v-model="username"
              maxlength="30"
              style="width: 310px"
            />
          </div>
          <div class="password-box">
            <span class="form-info margin-right-20">密码</span>
            <input
              :type="isShowPassword ? 'text' : 'password'"
              v-model="password"
              placeholder="请输入密码"
              maxlength="30"
              style="width: 210px"
            />
            <img
              v-show="!isShowPassword"
              class="no-visibility-password-icon"
              src="@/assets/icon/visibility_off_9499A0.svg"
              @click="isShowPassword = true"
            />
            <img
              v-show="isShowPassword"
              class="visibility-password-icon"
              src="@/assets/icon/visibility_9499A0.svg"
              @click="isShowPassword = false"
            />
            <div class="forget-password">忘记密码?</div>
          </div>
        </div>
        <!-- 手机号登录 -->
        <div class="login-form" v-show="loginType === 1">
          <div class="account-box">
            <div class="choose-phone-type-box">
              <span class="form-info pointer">+86</span>
              <img
                class="phone-icon"
                src="@/assets/icon/keyboard_arrow_down_9499A0.svg"
              />
            </div>
            <input
              type="text"
              placeholder="请输入手机号"
              maxlength="30"
              style="width: 180px"
            />
            <div class="phone-divider"></div>
            <div class="get-verification-code get-verification-code">
              获取验证码
            </div>
          </div>
          <div class="password-box">
            <span class="form-info margin-right-20">验证码</span>
            <input
              type="text"
              placeholder="请输入验证码"
              maxlength="6"
              style="width: 210px"
              oninput="value=value.replace(/[^\d]/g, '')"
            />
          </div>
        </div>
        <div class="login-btn-box">
          <div class="btn-box-pwd" v-show="loginType === 0">
            <div class="btn-register">注册</div>
            <div
              class="btn-login"
              :class="{
                'btn-login-active': username !== '' && password !== '',
              }"
              :disabled="isloginLoading"
              @click="loginByUsernameHandler"
            >
              登录
            </div>
          </div>
          <div class="login-btn-phone" v-show="loginType === 1">
            <div class="btn-phone">登录/注册</div>
          </div>
        </div>
        <div class="other-way-to-login">其他方式登录</div>
        <div class="other-way-to-login-box">
          <div class="other-way-to-login-btn margin-right-30">
            <img src="@/assets/icon/wxicon.png" />
            <div>微信登录</div>
          </div>
          <div class="other-way-to-login-btn margin-right-30">
            <img src="@/assets/icon/wbicon.png" />
            <div>微博登录</div>
          </div>
          <div class="other-way-to-login-btn">
            <img src="@/assets/icon/qqicon.png" />
            <div>QQ登录</div>
          </div>
        </div>
        <!-- 关闭页面按钮 -->
        <div class="login-close-btn" @click="closeLogin"></div>
      </div>
      <div class="friendly-tips">
        <div>未注册过嘻哩嘻哩的手机号，我们将自动帮你注册账号</div>
        <div>
          <span
            >登录活完成注册即代表你同意
            <span class="important-tip">用户协议</span>
            和
            <span class="important-tip">隐私政策</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from "@/mitt/eventBus";
import { loginByUsername, getUserInfoById } from "@/api/user";
import router from "@/router";

export default {
  name: "LoginComponent",
  data() {
    return {
      isQrCodeExpired: false,
      loginType: 0,
      isShowPassword: false,
      username: "",
      password: "",
      isloginLoading: false,
    };
  },
  methods: {
    closeLogin() {
      eventBus.emit("closeLogin");
      eventBus.emit("closeMask");
    },
    // 通过账号密码登录
    async loginByUsernameHandler() {
      this.isloginLoading = true;

      try {
        const user = {
          username: this.username,
          password: this.password,
        };

        const loginRes = await loginByUsername(user);

        if (loginRes.code !== 200) {
          this.$message.error({
            message: loginRes.message,
            offset: 80,
          });
          return;
        }

        // token
        this.$store.commit("setToken", loginRes.data.token);
        localStorage.setItem("token", loginRes.data.token);

        // 等待用户信息返回
        const userInfoRes = await getUserInfoById(loginRes.data.uid);

        this.$store.commit("setUser", userInfoRes.data);

        localStorage.setItem("userId", userInfoRes.data.id);
        localStorage.setItem("username", userInfoRes.data.username);
        localStorage.setItem("avatar", userInfoRes.data.avatar);

        this.$message.success({
          message: loginRes.message,
          offset: 80,
        });

        this.closeLogin();

        const redirectPath = sessionStorage.getItem("redirectPath");

        const target = redirectPath || "/";

        if (redirectPath) {
          sessionStorage.removeItem("redirectPath");
        }

        // 避免重复跳转
        if (router.currentRoute.path !== target) {
          await router.push(target);
        }
      } catch (err) {
        console.error(err);

        this.$message.error({
          message: "登录失败",
          offset: 80,
        });
      } finally {
        this.isloginLoading = false;
      }
    },
  },
};
</script>


<style scoped>
.my-container {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  padding: 52px 65px 29px 92px;
  background-image: url("@/assets/loginbg1.png"), url("@/assets/loginbg2.png");
  background-position: 0 100%, 100% 100%;
  background-repeat: no-repeat, no-repeat;
  background-size: 14%;
  position: relative;
  user-select: none;
}
.login-container {
  display: flex;
}
.login-left {
  width: 173px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.login-scan-title {
  color: #505050;
  font-size: 18px;
  font-family: "PingFang SC";
  font-weight: 500;
  margin: 0px 0px 26px;
}
.login-scan-box {
  width: 175px;
  height: 175px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  border: 1px solid #e3e5e7;
  margin: 0px 0px 20px;
  position: relative;
}

.login-scan-qrcode {
  width: 160px;
  height: 160px;
  object-fit: cover;
  display: block;
}
.qrcode-expired-box {
  width: 173px;
  height: 173px;

  border-radius: 7px;
  background-color: #ffffffe6;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  cursor: pointer;
}
.qrcode-reload-box {
  width: 56px;
  height: 56px;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 10px;
}
.qrcode-reload-box img {
  width: 24px;
  height: 24px;
  object-fit: cover;
  display: block;
}
.qrcode-reload-font {
  color: #61666d;
  font-size: 13px;
  font-family: "PingFang SC";
}
.login-scan-font {
  color: #505050;
  font-size: 13px;
  font-family: "PingFang SC";
}
.login-scan-font span {
  color: #00aeec;
  cursor: pointer;
}
.login-divider {
  border-left: 1px solid #e8e8ed;
  margin: 20px 40px 20px;
}
.login-right {
  width: 400px;
}
.login-type-box {
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-type {
  cursor: pointer;
  font-size: 18px;
  color: #505050;
  font-family: "PingFang SC";
  font-weight: 500;
}
.login-type-active {
  color: #4fa5d9;
  cursor: not-allowed;
}
.login-type-divider {
  border-left: 1px solid #e8e8ed;
  height: 20px;
  margin: 0 20px;
}
.login-form {
  width: 100%;
  margin-top: 16px;
  border: 1px solid #e8e8ed;
  border-radius: 8px;
}
.account-box,
.password-box {
  height: 44px;
  display: flex;
  align-items: center;
}
.account-box {
  border-bottom: 1px solid #e8e8ed;
}
.form-info {
  color: #212121;
  font-size: 14px;
  font-family: "PingFang SC";
  margin: 0 0px 0 20px;
  height: 20px;
}
input[type="text"] {
  all: unset;
  box-sizing: border-box;
  height: 20px;
  font-size: 14px;
  line-height: 20px;
  color: #1e1e1e;
}
input[type="text"]::placeholder {
  color: #999;
  font-size: 14px;
  line-height: 20px;
}
input[type="password"] {
  all: unset;
  box-sizing: border-box;
  height: 20px;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0px;
  color: #1e1e1e;
}
input[type="password"]::placeholder {
  color: #999;
  font-size: 14px;
  line-height: 20px;
}
.visibility-password-icon,
.no-visibility-password-icon {
  cursor: pointer;
  width: 20px;
  height: 20px;
  object-fit: cover;
  display: block;
  margin: 0 10px;
}
.visibility-password-icon:hover {
  content: url("@/assets/icon/visibility_20ADDB.svg");
}
.no-visibility-password-icon:hover {
  content: url("@/assets/icon/visibility_off_20ADDB.svg");
}
.forget-password {
  height: 20px;
  line-height: 20px;
  font-size: 14px;
  color: #00a1d6;
  font-family: "PingFang SC";
  cursor: pointer;
}
.margin-right-20 {
  margin-right: 20px;
}
.pointer {
  width: 36px;
}
.phone-icon {
  width: 20px;
  height: 20px;
  object-fit: cover;
  display: block;
  margin-right: 6px;
}
.choose-phone-type-box {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.phone-divider {
  border-left: 1px solid #e8e8ed;
  margin: auto 16px;
  height: 16px;
}
.get-verification-code {
  cursor: pointer;
  margin-left: 6px;
  font-size: 14px;
  color: #c9ccd0;
  font-family: "PingFang SC";
}
.get-verification-code {
  color: #00a1d6;
}
.login-btn-box {
  width: 100%;
  margin-top: 18px;
}
.btn-box-pwd,
.login-btn-phone {
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-register,
.btn-login,
.btn-phone {
  width: 190px;
  height: 40px;
  border: 1px solid #e3e5e7;
  border-radius: 8px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
  font-family: "PingFang SC";
}
.btn-register {
  color: #18191c;
  background-color: #fff;
  margin-right: 10px;
  cursor: pointer;
}
.btn-login {
  color: #fff;
  background-color: #7fd6f5;
  cursor: not-allowed;
}
.btn-login[disabled] {
  pointer-events: none;
  opacity: 0.6; /* 禁用状态样式 */
}
.btn-login-active {
  background-color: #00aeec;
  cursor: pointer;
}
.btn-login-active:hover {
  background-color: #26baef;
}
.btn-phone {
  background-color: #00aeec;
  cursor: pointer;
  color: #fff;
}
.btn-phone:hover {
  background-color: #26baef;
}
.other-way-to-login {
  width: 100%;
  text-align: center;
  font-size: 13px;
  color: #9499a0;
  font-family: "PingFang SC";
  margin-top: 24px;
}
.other-way-to-login-box {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 12px;
}
.other-way-to-login-btn {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.other-way-to-login-btn img {
  width: 28px;
  height: 28px;
  object-fit: cover;
  display: block;
  margin-right: 8px;
}
.other-way-to-login-btn div {
  height: 16px;
  font-size: 13px;
  line-height: 16px;
  font-family: "PingFang SC";
  color: #9499a0;
}
.margin-right-30 {
  margin-right: 30px;
}
.login-close-btn {
  width: 32px;
  height: 32px;
  position: absolute;
  top: 20px;
  right: 20px;
  background: url("@/assets/icon/login_close.svg") no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
  z-index: 2;
}
.friendly-tips {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.friendly-tips div {
  font-size: 13px;
  color: #9499a0;
  font-family: "PingFang SC";
}
.important-tip {
  color: #00a1d6;
  cursor: pointer;
}
</style>
