<template>
  <div>
    <van-cell-group v-show="firstBox">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item><img src="@/image/image1.jpg"></van-swipe-item>
        <van-swipe-item><img src="@/image/image2.jpg"></van-swipe-item>
        <van-swipe-item><img src="@/image/image3.jpg"></van-swipe-item>
        <van-swipe-item><img src="@/image/image4.jpg"></van-swipe-item>
        <van-swipe-item><img src="@/image/image5.jpg"></van-swipe-item>
      </van-swipe>
      <van-field v-model.number="common" type="digit" label="平民人数" :error-message="commonMessage" />
      <van-field
        v-model.number="special"
        type="digit"
        label="卧底人数"
        :error-message="specialMessage"
      />
      <van-field label="白板(1人)">
        <template #extra>
          <van-switch v-model="white" size="24" />
        </template>
      </van-field>
      <van-field v-model="all" readonly label="总游戏人数" />
      <van-field label="自创词汇">
        <template #extra>
          <p class="tll">(另选一人当法官)</p>
          <van-switch v-model="createGame" size="24" />
        </template>
      </van-field>
        <van-field v-model.trim="wordForm.common" v-show="createGame" label="平民词" placeholder="平民" />
        <van-field v-model.trim="wordForm.special" v-show="createGame" label="卧底词" placeholder="卧底" />
      <van-button type="primary" size="normal" @click="start" class="startButtom">开始游戏</van-button>
    </van-cell-group>

    <div v-show="firstBox">
    </div>
    <div v-show="gameBox">
      <h1>{{this.title}}</h1>
      <div
        v-for="(item,index) in this.nowList"
        :key="item.index"
        class="gameCard"
        @click="turnCard(index,item)"
        v-show="showCard[index]"
      >
        <p v-show="!gameStart">查看{{ index + 1 }}号底牌</p>
        <p v-show="gameStart">选择{{ index + 1}}号出局</p>
      </div>
    </div>
    <van-dialog
      ref="boomBox"
      v-model="whiteBox"
      title="白板爆词中"
      show-cancel-button
      cancel-button-text="放弃"
      @confirm="boomSubmit"
      @cancel="boomFinish"
    >
      <template v-slot:default>
        <van-count-down
          ref="countDown"
          millisecond
          :time="60000"
          format="ss:SS"
          @finish="boomFinish"
        />
        <van-field v-model="boomWrord" placeholder="请输入平民词" center />
      </template>
    </van-dialog>
    <div v-show="lastBox">
      <h3>{{endTitle}} </h3>
      <p class="lastP">作者 : {{nowWord.author}}</p>
      <p class="lastP">平民词 : {{nowWord.common}}</p>
      <p class="lastP">卧底词 : {{nowWord.special}}</p>
      <div class="lastGood">
        <div class="goodItem">
          <van-icon name="good-job-o" size="40" @click="thinkGood" :color="goodColor"/>
          <p>点个赞</p>
        </div>
        <div class="goodItem">
          <van-icon name="delete" size="40" @click="thinkBad" :color="badColor"/>
          <p>有害垃圾</p>
        </div>
      </div>
      <van-button type="primary" size="large" @click="restFirst">继续游戏</van-button>
    </div>
    <bottom-guid v-show="firstBox"></bottom-guid>
  </div>
</template>

<script>
import BottomGuid from "@/components/BottomGuid";
import { getWord,addWord,updateGood,updateBad } from "@/api/index";
import { Toast, Dialog } from "vant";
import { mapState } from "vuex";
export default {
  data() {
    return {
      title: "查看底牌",
      common: 3,
      special: 1,
      white: true,
      createGame: false,
      all: 5,
      commonMessage: "",
      specialMessage: "",
      wordForm: {},
      wordList: {},
      nowWord: {},
      nowList: [],
      passId: [],
      firstBox: true,
      gameBox: false,
      showCard: [],
      gameStart: false,
      gamePerson:{},
      boomWrord: "",
      whiteBox: false,
      lastBox: false,
      endTitle:'',
      goodColor:'#ccc',
      badColor:'#ccc'
    };
  },
  components: {
    BottomGuid,
  },
  computed: {
    ...mapState(["name", "mobile"]),
  },
  methods: {
    async initData() {
      const res = await getWord();
      if (res.code == 20000) {
        this.wordList = res.data;
      }
    },
    async start() {
      this.restGame();  //初始化常数
      if(this.createGame){
        await this.createWord(); //添加词汇
      }else {
        await this.initData();  //获取词语列表
        this.pickWord();  //选择词汇
      }
    },
    restGame() {
      this.gamePerson = {
          common:this.common,
          special:this.special,
          white:this.white ? 1 : 0
      }
      this.gameStart = false;
      this.showCard = [];
      this.title = "查看底牌";
      for (let i = 0; i < this.all; i++) {
        this.showCard.push(true);
      }
      this.firstBox = false;
      this.gameBox = true;
      this.boomWrord = "";
      this.goodColor = "#ccc";
      this.badColor = "#ccc";
    },
    restFirst() {
      this.firstBox = true;
      this.gameBox = false;
      this.lastBox = false;
    },
    pickWord() {
      if (this.wordList.length == this.passId.length) {
        Toast("没有新词汇可以玩了，请添加词汇");
        return null;
      }
      const random = Math.round(Math.random() * (this.wordList.length - 1));
      const { _id } = this.wordList[random];
      const good = this.wordList[random].good + 1;
      const bad = this.wordList[random].bad + 1;
      const point = good / (good + bad);
      if (this.passId.includes(_id)) {
        this.pickWord();
      } else if (Math.random() > point) {
        this.pickWord();
      } else {
        this.passId.push(this.wordList[random]._id);
        this.nowWord = this.wordList[random];
        this.makeList();  //制作卡牌
      }
    },
    async createWord() {
      if(this.wordForm.common == '' || this.wordForm.common == null || this.wordForm.common == undefined || this.wordForm.special == '' || this.wordForm.special == null || this.wordForm.special == undefined){
        Toast("词语为空或错误，请重新输入");
        return false;
      }
      this.wordForm.author = this.name;
      this.wordForm.mobile = this.mobile;
      const res = await addWord(this.wordForm);
      if (res.code == 20000) {
        Toast("添加成功，游戏开始");
        this.wordForm = {};
        this.createGame = false;
        this.nowWord = res.data
        this.makeList();  //制作卡牌
      }else {
        Toast("添加错误，重新添加");
        return false;
      }
    },
    makeList() {
      console.log(this.nowWord);
      this.nowList = [];
      for (let i = 0; i < this.common; i++) {
        this.nowList.push({
          name: "common",
          word: this.nowWord.common,
        });
      }
      for (let i = 0; i < this.special; i++) {
        this.nowList.push({
          name: "special",
          word: this.nowWord.special,
        });
      }
      if (this.white == true) {
        this.nowList.push({
          name: "white",
          word: "白板",
        });
      }
      //打乱顺序
      this.nowList = this.shuffle();
    },
    shuffle() {
      let array = this.nowList;
      let m = array.length,
        t,
        i;
      while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
      }
      return array;
    },
    turnCard(index, item) {
      if (this.gameStart) {
        if (item.name == "white") {
          this.gamePerson.white = 0;
          this.whiteBox = true; //展示爆词组件
          this.$refs.countDown.reset();
          this.$set(this.showCard, index, false);
        } else if (item.name == "common") {
          this.gamePerson.common = this.gamePerson.common - 1;
          if (this.gamePerson.special == this.gamePerson.common) {
            Toast({
                message: "游戏结束，卧底胜利",
                icon: 'smile-o',
            })
            this.endTitle ="卧底胜利"
            this.showLast(2);
          } else if(this.gamePerson.white == this.gamePerson.common){
            Toast({
                message: "游戏结束，白板胜利",
                icon: 'smile-o',
            })
            this.endTitle ="白板胜利"
            this.showLast(3);
          }else {
            Toast(index + 1 + "号玩家被淘汰，游戏继续");
            this.$set(this.showCard, index, false);
          }
        } else {
          this.gamePerson.special = this.gamePerson.special - 1;
          if (this.gamePerson.special == 0 && this.gamePerson.white == 0) {
            Toast({
                message: "游戏结束，平民胜利",
                icon: 'smile-o',
            })
            this.endTitle ="平民胜利"
            this.showLast(1);
          }else {
            Toast({
                message: index + 1 + "号玩家被淘汰，游戏继续",
                icon: 'warning-o',
            })
            this.$set(this.showCard, index, false);
          }
        }
      } else {
        Dialog.alert({
          title: index + 1 + "号玩家，你的词是",
          message: item.word,
        }).then(() => {
          this.$set(this.showCard, index, false);
          if (this.showCard.includes(true) == false) {
            this.title = "游戏开始";
            this.showCard = [];
            for (let i = 0; i < this.all; i++) {
              this.showCard.push(true);
            }
            this.gameStart = true;
          }
        });
      }
    },
    boomFinish() {
    if(this.gamePerson.special == 0){
      this.$refs.countDown.pause();
            this.whiteBox = false;
            this.endTitle ="平民胜利"
            Toast({
                message: "放弃爆词，平民胜利",
                icon: 'smile-o',
            })
            this.showLast();
    }else {
      this.$refs.countDown.pause();
            this.whiteBox = false;
            Toast({
                message: "放弃爆词，游戏继续",
                icon: 'warning-o',
            })
    }
    },
    boomSubmit() {
      this.$refs.countDown.pause();
      if (this.boomWrord == this.nowWord.common) {
        Dialog.alert({
          icon: 'smile-0',
          message: "游戏结束，白板胜利",
        }).then(() => {
          this.endTitle ="白板胜利"
          this.whiteBox = false;
          this.showLast();
        });
      } else {
          if(this.gamePerson.special == 0){
            this.whiteBox = false;
            this.endTitle ="平民胜利"
            Toast({
                message: '爆词错误，平民胜利',
                icon: 'cross',
            })
            this.showLast();
          }else {
            this.whiteBox = false;
            Toast({
                message: '爆词错误，游戏继续',
                icon: 'cross',
            })
          }
      }
    },
    showLast() {
      this.gameBox = false;
      this.lastBox = true;
    },
    async thinkGood(){
      if(this.goodColor == "#ccc"){
        this.goodColor = "#00BB00"
        const res = await updateGood(this.nowWord._id)
        if(res.code == 20000){
          Toast('点赞成功！')
        }
      }else{
        Toast('只可以点一次哦！')
      }
    },
    async thinkBad(){
      if(this.badColor == "#ccc"){
        this.badColor = "#FF0000"
        const res = await updateBad(this.nowWord._id)
        if(res.code == 20000){
          Toast('垃圾已分类！')
        }
      }else{
        Toast('只可以点一次哦！')
      }
    }
  },
  watch: {
    common(newValue) {
      if (newValue < 3) {
        this.commonMessage = "平民人数不能小于3人";
      } else {
        this.commonMessage = "";
      }
      this.special = Math.floor(newValue / 2);
      if (this.white) {
        this.all = this.special + this.common + 1;
      } else {
        this.all = this.special + this.common;
      }
    },
    special(newValue) {
      if (newValue <= Math.floor(this.common / 2) && newValue >= 1) {
        this.specialMessage = "";
      } else {
        this.specialMessage = "卧底人数大于0且小于平民数的一半";
      }
      if (this.white) {
        this.all = this.special + this.common + 1;
      } else {
        this.all = this.special + this.common;
      }
    },
    white(newvalue) {
      if (newvalue) {
        this.all++;
      } else {
        this.all--;
      }
    },
  },
};
</script>

<style scoped>
p {
    margin: 0;
}
.startButtom {
  margin: 20px auto;
}
.gameCard {
  width: 80%;
  height: 140px;
  line-height: 140px;
  text-align: center;
  margin: 20px auto;
  border-radius: 10px;
  border: 1px solid black;
}
.lastP {margin: 20px auto;}
.van-swipe-item {
  width: 375px;
  height: 375px;
}
.van-swipe-item img{
 width: 100%;
 height: 100%; 
}
.lastGood {
  display: flex;
  width: 100%;
  margin: 20px auto;
  justify-content: space-around;
}
.tll {
    position: absolute;
    left: 7rem;
}
</style>