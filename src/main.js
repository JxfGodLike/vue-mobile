// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// MUI
import '@/assets/mui/css/mui.min.css'
import '@/assets/mui/css/icons-extra.css'
// Mint-UI
import 'mint-ui/lib/style.css'
import { Header, Swipe, SwipeItem } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)

Vue.config.productionTip = false
import axios from 'axios'
Vue.prototype.$http = axios;
import QS from 'qs'
Vue.prototype.qs = QS;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
