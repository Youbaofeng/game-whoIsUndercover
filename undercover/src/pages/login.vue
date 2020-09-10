<template>
  <div>
    <h3>谁是卧底</h3>
    <van-form validate-first @submit="onSubmit">
      <van-field
        v-model="loginForm.mobile"
        label="电话"
        left-icon="phone-o"
        placeholder="请输入电话"
        :rules="[{ required: true, message: '请填写手机号' },{ pattern, message: '请输入正确手机号' }]"
      />
      <van-field
        v-model="loginForm.password"
        label="密码"
        type="password"
        left-icon="user-o"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-button round block type="info" native-type="submit">登录</van-button>
    </van-form>
    <p class="ps" @click="toCreateUser">没有账号？点击注册</p>
  </div>
</template>

<script>
import router from "../router/router";
import { login, getUserInfo } from "../api/index";
import { Toast } from "vant";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      loginForm: {},
      pattern: /^1[34578]\d{9}$/,
    };
  },
  methods: {
    ...mapMutations(["SET_NAME", "SET_MOBILE"]),
    async onSubmit() {
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
      console.log(res);
      this.SET_NAME(res.data.realName);
      this.SET_MOBILE(res.data.mobile);
      this.$router.push({ name: "home" });
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