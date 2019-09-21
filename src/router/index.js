import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/tabbar/Home.vue'
import Member from '../components/tabbar/Member.vue'
import ShopCar from '../components/tabbar/ShopCar.vue'
import Search from '../components/tabbar/Search.vue'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'mui-active',
  routes: [
    {path: '/', redirect: '/home'},
    {path: '/home', component: Home},
    {path: '/member', component: Member},
    {path: '/shopCar', component: ShopCar},
    {path: '/search', component: Search}
  ]
})
