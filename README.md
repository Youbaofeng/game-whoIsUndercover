<div align=center>
<img src="http://47.107.126.241:7001/public/uploads/tx.jpg" width = "100" height = "100" div align=center />
</div>
<p align="center">
  <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/Vue-2.8.10-brightgreen.svg" alt="Vue">
  </a>
  <a href="https://youzan.github.io/vant/#/zh-CN/intro">
    <img src="https://img.shields.io/badge/Vant--UI-2.7.0-brightgreen.svg" alt="Vant-ui">
  </a>
  <img src="https://img.shields.io/badge/Node-8.9+-brightgreen.svg" alt="nodejs">
  <a href="https://github.com/eggjs/">
    <img src="https://img.shields.io/badge/egg-2.15.1-brightgreen.svg" alt="egg">
  </a>
  <a href="https://github.com/mongodb/mongo">
    <img src="https://img.shields.io/badge/mongo-brightgreen.svg" alt="mongo">
  </a>
</p>

## 简介

**game-whoIsUndercover**是谁是卧底小游戏H5项目，相信大部分人都玩过，项目前端部分基于vue,vuex,vue-router,vant-ui,axios搭建,后端采用node+egg+mongoose搭建。对于刚接触EGG和VUE的同学、想自己亲手搭建完整的前后端项目的同学，有一定的参考价值。

作者 **[小柚子](https://github.com/Youbaofeng)**

**项目线上浏览地址点击访问(http://47.107.126.241:8080/#/login),欢迎大家登陆加词和试玩游戏哦**

### 游戏交流
**微信群:扫码回复 加群 一起进行游戏交流 提出宝贵修改意见**

<div>
<img src="http://47.107.126.241:7001/public/uploads/wxq.jpg" width = "120" height = "140" />
</div>

## 项目图

<div>
<img src="http://47.107.126.241:7001/public/uploads/Image 2.png" width = "200" />
<img src="http://47.107.126.241:7001/public/uploads/Image 3.png" width = "200" />
<img src="http://47.107.126.241:7001/public/uploads/Image 5.png" width = "200" />
<img src="http://47.107.126.241:7001/public/uploads/Image 6.png" width = "200" />
<img src="http://47.107.126.241:7001/public/uploads/Image 7.png" width = "200" />
<img src="http://47.107.126.241:7001/public/uploads/Image 8.png" width = "200" />
<img src="http://47.107.126.241:7001/public/uploads/Image 9.png" width = "200" />
<img src="http://47.107.126.241:7001/public/uploads/Image 10.png" width = "200" />
</div>

## 如何运行
#(在安装前请先确定本地已经安装了node8.9+和mongo)
```bash
# 克隆项目到本地
git clone https://github.com/Youbaofeng/game-whoIsUndercover.git

# 进入项目目录
cd game-whoIsUndercover

# 进入后端目录
cd egg-server

# 安装依赖
npm install -g cnpm --registry=https://registry.npm.taobao.org  //已经安装淘宝镜像的省略这一步
cnpm install

# 启动后端服务
npm start

# 进入前端目录
cd ..
cd undercover

# 安装依赖
cnpm install

# 启动前端服务
npm run serve

```

浏览器访问 http://localhost:8080

## 免责声明
本项目为本人个人开发使用,仅做技术交流和娱乐使用,不建议用于商业目的,产生的一切侵权著作法律后果,与本作者无关，如有版权侵权请告知，本人会配合将项目下线。
