<template>
  <div>
    <h3>用户注册</h3>
    <van-form validate-first @submit="onSubmit">
      <van-field
        v-model="createForm.mobile"
        label="电话"
        left-icon="phone-o"
        placeholder="请输入电话"
        :rules="[{ required: true, message: '请填写手机号' },{ pattern, message: '请输入正确手机号' }]"
      />
      <van-field
        v-model="createForm.password"
        label="密码"
        type="password"
        left-icon="user-o"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="createForm.realName"
        label="昵称"
        left-icon="smile-o"
        placeholder="请输入游戏昵称"
        :rules="[{ required: true, message: '请填写游戏昵称' }]"
      />
      <van-button type="primary" round size="large" native-type="submit">注册</van-button>
    </van-form>
    <p class="ps" @click="goback">返回登录</p>
  </div>
</template>

<script>
import { Dialog } from "vant";
import { create } from "@/api/index";
export default {
  data() {
    return {
      createForm: {},
      pattern: /^1[34578]\d{9}$/,
    };
  },
  methods: {
    async onSubmit() {
      const res = await create(this.createForm);
      if (res.code == 20000) {
        Dialog.alert({
          message: "注册成功，前往登录页登录",
        }).then(() => {
          this.$router.push({ name: "login" });
        });
      }
    },
    goback() {
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style  scoped>
.ps {
  float: right;
  font-size: 14px;
  color: #999;
  margin-right: 20px;
}
</style>