<template>
  <div>
    <van-cell-group>
      <van-cell title="姓名" @click="showModifyBox" :value="this.name" is-link />
      <van-cell title="电话" :value="this.mobile" />
      <van-cell title="退出登录" @click="logout" is-link />
      <van-cell title="游戏说明" @click="description" is-link />
      <van-cell title="技术栈" is-link />
    </van-cell-group>
    <van-dialog ref="modifyBox" v-model="showModify" @confirm='confirmModify' title="修改姓名" show-cancel-button>
      <van-field v-model.trim="newName" label="姓名" placeholder="请输入新姓名" />
    </van-dialog>
    <bottom-guid></bottom-guid>
  </div>
</template>

<script>
import BottomGuid from "@/components/BottomGuid";
import { mapState } from "vuex";
import { logout, modifyName } from "@/api/index";
import { Toast, Dialog } from "vant";
export default {
  data() {
    return {
      newName: "",
      showModify: false,
    };
  },
  components: {
    BottomGuid,
  },
  computed: {
    ...mapState(["name", "mobile"]),
  },
  created() {
    console.log(this.name, this.mobile);
  },
  methods: {
    logout() {
      Dialog.confirm({
        title: "退出登录",
        message: "退出登录后将无法继续游戏 & 添加词汇",
        theme: "round-button",
      })
        .then(async () => {
          const res = await logout();
          if (res.code == 20000) {
            Toast("退出成功");
            this.$router.push({ name: "login" });
          }
        })
        .catch(() => {
          Toast("取消操作");
        });
    },
    showModifyBox(){
      this.showModify = true;
    },
    async confirmModify() {
        const parms = {
          mobile: this.mobile,
          name: this.newName,
        };
        const res = await modifyName(parms);
        if (res.code == 20000) {
            const res = await logout();
            if (res.code == 20000) {
              Toast("修改成功，请重新登录");
              this.$router.push({ name: "login" });
            } else {
              Toast("修改成功，重新登录生效");
            }
        }
    },
    description() {
      Dialog.alert({
        title: "游戏说明",
        message: `<p>1、用一部手机登录该游戏，确定平民，卧底，白板人数量。<br />2、开始游戏后按顺序手机，每个人查看自己的底牌。<br />3、查看结束后，各玩家按顺序描述自己的底牌，描述结束后，各玩家开始投票确定卧底或者白板人选。<br />4、若游戏显示继续，则重复步骤三，直到游戏结束。<br />备注1：白板玩家出局前可以爆词，爆词正确时(等于平民词)，白板胜利。<br />备注2：当卧底人数等于平民人数时，卧底胜利。<br />备注3：当卧底和白板都出局时，平民胜利。</p>`,
        messageAlign: "left",
        theme: "round-button",
      })
    }
  }
}
</script>

<style scoped>
.van-cell {
  text-align: left;
}
</style>