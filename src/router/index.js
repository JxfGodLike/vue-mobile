import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/tabbar/Home.vue'
import Member from '../components/tabbar/Member.vue'
import ShopCar from '../components/tabbar/ShopCar.vue'
import Search from '../components/tabbar/Search.vue'
import NewsList from '../components/news/NewsList.vue'
import NewsInfo from '../components/news/NewsInfo.vue'
import PhotoList from '../components/photo/PhotoList.vue'
import PhotoInfo from '../components/photo/PhotoInfo.vue'
import GoodsList from '../components/goods/GoodsList.vue'
import GoodsInfo from '../components/goods/GoodsInfo.vue'
import GoodsDesc from '../components/goods/GoodsDesc.vue'
import GoodsComment from '../components/goods/GoodsComment.vue'
Vue.use(Router)

export default new Router({
  linkActiveClass: 'mui-active',
  routes: [
    {path: '/', redirect: '/home'},
    {path: '/home', component: Home},
    {path: '/home/newsList', component: NewsList},
    {path: '/home/newsInfo/:id', component: NewsInfo},
    {path: '/home/photoList', component: PhotoList},
    {path: '/home/photoInfo/:id', component: PhotoInfo},
    {path: '/home/goodsList', component: GoodsList},
    {path: '/home/goodsInfo/:id', component: GoodsInfo, name: 'GoodsInfo'},
    {path: '/home/goodsDesc/:id', component: GoodsDesc, name: 'GoodsDesc'},
    {path: '/home/goodsComment/:id', component: GoodsComment, name: 'GoodsComment'},
    {path: '/member', component: Member},
    {path: '/shopCar', component: ShopCar},
    {path: '/search', component: Search}
  ]
})
