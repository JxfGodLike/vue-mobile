<template>
  <div>
    <!-- 顶部滑动条区域 -->
    <div id="slider" class="mui-slider">
      <div id="sliderSegmentedControl" class="mui-scroll-wrapper
            mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
          <a :class="['mui-control-item',item.id === 0 ? 'mui-active' : '']"
             v-for="item in cates" :key="item.id"
             @tap="getPhotoListByCateId(item.id)">
            {{item.title}}
          </a>

        </div>
      </div>
    </div>

    <!-- 图片列表区域 -->
    <ul class="photo-list">
      <router-link v-for="item in list" :key="item.id" :to="'/home/photoInfo/' + item.id" tag="li">
        <img v-lazy="item.img_url">
        <div class="info">
          <h1 class="info-title">{{ item.title }}</h1>
          <div class="info-body">{{ item.zhaiyao }}</div>
        </div>
      </router-link>
    </ul>

  </div>
</template>

<script>
  import mui from '../../assets/mui/js/mui.js'
  import https from '../../http.js'
  import {Toast} from 'mint-ui'
  export default {
    name: 'PhotoList',
    data() {
      return {
        cates: [], // 分类标签数组
        list: [] // 图片列表的数组
      }
    },
    created () {
      this.getAllCategory();
      // 默认进入页面，就主动请求 所有图片列表的数据
      this.getPhotoListByCateId(0);
    },
    mounted() {
      // 当 组件中的DOM结构被渲染好并放到页面中后，会执行这个 钩子函数
      // 如果要操作元素了，最好在 mounted 里面，因为，这里时候的 DOM 元素 是最新的
      // 2. 初始化滑动控件
      mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 // flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
      });
    },
    methods: {
      getAllCategory() {
        https.Get('api/getimgcategory', {}).then((data) => {
          console.log(data);
          if (data.data.status === 0) {
            this.cates = data.data.message;
          } else {
            Toast('获取图片种类失败。。。')
          }
        }).catch(err => {
            console.log(err)
          }
        );
      },
      getPhotoListByCateId(id) {
        https.Get('api/getimages/' + id, {}).then((data) => {
          console.log(data);
          if (data.data.status === 0) {
            this.list = data.data.message;
            Toast('获取图片列表成功。。。')
          } else {
            Toast('获取图片列表失败。。。')
          }
        }).catch(err => {
            console.log(err)
          }
        );
      }

    }
  }
</script>

<style lang="scss" scoped>
  * {
    touch-action: pan-y;
  }

  .photo-list {
    list-style: none;
    margin: 0;
    padding: 10px;
    padding-bottom: 0;

    li {
      background-color: #ccc;
      text-align: center;
      margin-bottom: 10px;
      box-shadow: 0 0 9px #999;
      position: relative;

      img {
        width: 100%;
        vertical-align: middle;
      }

      img[lazy="loading"] {
        width: 40px;
        height: 300px;
        margin: auto;
      }

      .info {
        color: white;
        text-align: left;
        position: absolute;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.4);
        max-height: 84px;

        .info-title {
          font-size: 14px;
        }

        .info-body {
          font-size: 13px;
        }
      }
    }
  }
</style>
