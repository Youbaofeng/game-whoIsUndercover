<template>
  <div>
    <img src="@/image/js.jpg" class="mt20" />
    <van-button round type="info" @click="showAddPopup" class="wordButton">添加游戏词汇</van-button>
    <img src="@/image/zg.jpg" />
    <van-button round type="info" @click="showGoodRanking" class="wordButton">智慧大师排行榜</van-button>
    <img src="@/image/sgg.jpg" />
    <van-button round type="info" @click="showNumberRanking" class="wordButton">创造大师排行榜</van-button>
    <van-popup v-model="addPopup" closeable position="bottom" :style="{ height: '35%' }">
      <p class="ps">请输入两个词语作为“谁是卧底”游戏词汇</p>
      <p class="tip">(实际游戏中平民词和卧底词可能互换)</p>
      <van-cell-group>
        <van-field v-model.trim="wordForm.common" label="平民词" placeholder="平民" />
        <van-field v-model.trim="wordForm.special" label="卧底词" placeholder="卧底" />
      </van-cell-group>
      <van-button class="addbutton" icon="plus" type="primary" @click="addWord">添加词语</van-button>
    </van-popup>
    <van-popup v-model="goodRanking" round :style="{ width: '80%',height:'80%' }" closeable>
      <van-list :finished="true" finished-text="没有更多了">
        <van-cell v-for="item in newArr" :key="item.author" title="智慧大师排行榜">
          <template #title>
            <span class="custom-title">{{item.author}}</span>
            <span>
              <van-icon name="good-job" color="#1989fa" />
              {{item.good}}
            </span>
          </template>
        </van-cell>
      </van-list>
    </van-popup>
    <van-popup v-model="numberRanking" round :style="{ width: '80%',height:'80%' }" closeable>
      <van-list :finished="true" finished-text="没有更多了">
        <van-cell v-for="item in newArr" :key="item.author" title="创造大师排行榜">
          <template #title>
            <span class="custom-title">{{item.author}}</span>
            <span>
              <van-icon name="star" color="#1989fa" />
              {{item.number}}
            </span>
          </template>
        </van-cell>
      </van-list>
    </van-popup>
    <bottom-guid></bottom-guid>
  </div>
</template>

<script>
import BottomGuid from "@/components/BottomGuid";
import { addWord, getWord } from "@/api/index";
import { mapState } from "vuex";
import { Toast } from "vant";
export default {
  computed: {
    ...mapState(["name", "mobile"]),
  },
  components: {
    BottomGuid,
  },
  data() {
    return {
      addPopup: false,
      wordForm: {},
      addLoading: false,
      goodRanking: false,
      numberRanking: false,
      newArr:[],
      rankType:'',
    };
  },
  methods: {
    async getRank() {
      const res = await getWord();
      if (res.code == 20000) {
        this.wordList = res.data;
      }
      this.restArr();
    },
    restArr() {
        let arr = []
        let array = this.wordList
        let key = 'mobile'
        let groups = {}
            array.forEach(function(item) {
                var value = item[key]
                groups[value] = groups[value] || []
                groups[value].push(item)
            })
            Object.keys(groups).forEach(function(key) {
                let item = {}
                let allGood = 0
                item.author = groups[key][0].author;
                item.number = groups[key].length;
                groups[key].forEach(function(item){
                    allGood = allGood + item.good
                })
                item.good = allGood;
                arr.push(item)
            });
            this.newArr = arr;
            console.log(this.newArr);
            this.newArr.sort(this.compare(this.rankType))
            console.log(this.newArr);
    },
    compare(type){
        return function(a,b){
            var value1 = a[type];
            var value2 = b[type];
            return value2 - value1;
        }
    },
    showAddPopup() {
      this.addPopup = true;
    },
    showGoodRanking() {
      this.rankType = 'good'
      this.getRank();
      this.goodRanking = true;
    },
    showNumberRanking() {
      this.rankType = 'number'
      this.getRank();
      this.numberRanking = true;
    },
    async addWord() {
      this.wordForm.author = this.name;
      this.wordForm.mobile = this.mobile;
      const res = await addWord(this.wordForm);
      if (res.code == 20000) {
        Toast("添加成功，可继续添加");
        this.wordForm = {};
      }
    },
  },
};
</script>

<style scoped>
.ps {
  font-size: 14px;
  margin-top: 30px;
}
.tip {
  font-size: 12px;
}
.addbutton {
  margin-top: 10px;
}
.van-list {
  margin-top: 30px;
}
.van-cell {
  text-align: left;
}
.van-cell > div {
  display: flex;
  justify-content: space-between;
}
img {
  height: 140px;
}
.wordButton {
  display: block;
  margin: 0 auto 50px;
}
.mt20 {
  margin-top: 20px;
}
</style>