// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import QS from 'qs'
// 导入格式化时间的插件
import moment from 'moment'

import VuePreview from 'vue-preview'

// MUI
import '@/assets/mui/css/mui.min.css'
import '@/assets/mui/css/icons-extra.css'
// Mint-UI
import 'mint-ui/lib/style.css'
import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
// 图片懒加载
Vue.use(Lazyload)
// 安装 图片预览插件
Vue.use(VuePreview)

Vue.config.productionTip = false

Vue.prototype.$http = axios

Vue.prototype.qs = QS

// 定义全局的过滤器
Vue.filter('dateFormat', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
