<template>
  <div id="app">
<!--    <img src="./assets/logo.png">-->
    <!-- 顶部 Header 区域 -->
    <mt-header fixed title="Vue-Mobile"></mt-header>
    <!-- 中间的 路由 router-view 区域 -->
    <transition>
      <router-view/>
    </transition>
    <!-- 底部 TabBar 区域 -->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item-my" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item-my" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item-my" to="/shopCar">
              <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
                  <span class="mui-badge" id="badge">{{$store.getters.getAllCount}}</span>
              </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item-my" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin-bottom: 50px;
  overflow-x: hidden;
}
.mint-header{
  z-index: 99;
}
.v-enter{
  opacity: 0;
  transform: translateX(100%);
}
.v-leave-to{
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}
.v-enter-active,
.v-leave-active{
  transition: all 0.5s ease;

}
/*改类名，解决 tabbar 点击无法切换的问题*/
.mui-bar-tab .mui-tab-item-my.mui-active {
 color: #007aff;
}

.mui-bar-tab .mui-tab-item-my {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #929292;
}

.mui-bar-tab .mui-tab-item-my .mui-icon {
  top: 3px;
  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-my .mui-icon~.mui-tab-label {
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
