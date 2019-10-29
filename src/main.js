// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import http from './http.js'
// import QS from 'qs'
// 导入格式化时间的插件
import moment from 'moment'

import VuePreview from 'vue-preview'

// MUI
import '@/assets/mui/css/mui.min.css'
import '@/assets/mui/css/icons-extra.css'
// Mint-UI
import 'mint-ui/lib/style.css'
import { Header, Swipe, SwipeItem, Button, Lazyload, Switch, Toast } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
Vue.component(Switch.name, Switch)
Vue.component(Toast.name, Toast)
Vue.use(Vuex)
// 图片懒加载
Vue.use(Lazyload)
// 安装 图片预览插件
Vue.use(VuePreview)

Vue.config.productionTip = false

Vue.prototype.$http = http
Vue.prototype.Toast = Toast

// Vue.prototype.qs = QS

// 定义全局的过滤器
Vue.filter('dateFormat', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})
/* eslint-disable no-new */
var car = JSON.parse(localStorage.getItem('car') || '[]')
var store = new Vuex.Store({
  state: {
    car: car// {id,count,price,selected}
  },
  mutations: {
    saveCar(state, shopCar) {
      var flag = false;
      // eslint-disable-next-line consistent-return
      state.car.some(item => {
        if (item.id === shopCar.id) {
          item.count += parseInt(shopCar.count)
          flag = true
          return flag
        }
      })
      if (!flag) {
        state.car.push(shopCar)
      }
      // 保存到本地
      localStorage.setItem('car', JSON.stringify(state.car))
    }
  },
  getters: {
    getAllCount(state) {
      var c = 0;
      state.car.forEach(item => {
        c += item.count;
      })
      return c;
    }
  }
})
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
