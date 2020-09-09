<template>
  <div>
    <h3>谁是卧底</h3>
    <van-cell-group>
      <van-field v-model="loginForm.mobile" label="电话" left-icon="phone-o" placeholder="请输入电话" />
      <van-field
        v-model="loginForm.password"
        label="密码"
        type="password"
        left-icon="user-o"
        placeholder="请输入密码"
      />
    </van-cell-group>
    <van-button type="primary" size="large" @click="login">登录</van-button>
    <p class="ps" @click="toCreateUser">没有账号？点击注册</p>
  </div>
</template>

<script>
import router from "../router/router";
import { login,getUserInfo } from "../api/index";
import { Toast } from "vant";
import { mapMutations } from "vuex"

export default {
  data() {
    return {
      loginForm: {},
    };
  },
  methods: {
    ...mapMutations(['SET_NAME','SET_MOBILE']),
    async login() {
      const toast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: "登陆中，请稍等",
      });
      const res = await login(this.loginForm);
      if (res) {
        toast.clear();
        Toast("登录成功");
        localStorage.setItem("token", res.data.token);
        this.userInfo();
      }
    },
    async userInfo() {
      const res = await getUserInfo(this.loginForm.mobile);
      console.log(res)
      this.SET_NAME(res.data.realName)
      this.SET_MOBILE(res.data.mobile)
      this.$router.push({ name: 'home' });
    },
    toCreateUser() {
      router.push({ name: "create" });
    },
  },
};
</script>

<style scoped>
.ps {
        float: right;
        font-size: 14px;
        color: #999;
        margin-right: 20px;
}
</style>