import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import router from './router/router'
import store from './store/store'

// 全局引入UI库 vant
import '@/plugins/vant'

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
