<template>
  <div>
    <h3>用户注册</h3>
    <van-cell-group>
      <van-field v-model="createForm.mobile" label="电话" left-icon="phone-o" placeholder="请输入电话" />
      <van-field
        v-model="createForm.password"
        label="密码"
        type="password"
        left-icon="user-o"
        placeholder="请输入密码"
      />
      <van-field v-model="createForm.realName" label="姓名" left-icon="smile-o" placeholder="请输入游戏姓名" />
    </van-cell-group>
    <van-button type="primary" size="large" @click="create">注册</van-button>
    <p class="ps" @click="goback">返回登录</p>
  </div>
</template>

<script>
import { Dialog } from 'vant'
import { create } from '@/api/index'
    export default {
        data() {
            return {
            createForm: {}
            }
        },
        methods: {
            async create() {
                const res = await create(this.createForm)
                if(res.code == 20000){
                    Dialog.alert({
                    message: '注册成功，前往登录页登录',
                    }).then(() => {
                    this.$router.push({name:'login'})
                    });
                }
            },
            goback() {
                this.$router.push({name:'login'})
            }
        },
    }
</script>

<style  scoped>
    .ps {
        float: right;
        font-size: 14px;
        color: #999;
        margin-right: 20px;
    }
</style>