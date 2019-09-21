<template>
  <div class="photoinfo-container">
    <h3>{{ photoInfo.title }}</h3>
    <p class="subtitle">
      <span>发表时间：{{ photoInfo.add_time | dateFormat }}</span>
      <span>点击：{{ photoInfo.click }}次</span>
    </p>

    <hr>

    <!-- 缩略图区域 -->
    <div class="thumbs">
      <!--            <img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100"-->
      <!--                 @click="$preview.open(index, list)" :key="item.src">-->
      <vue-preview :slides="list"></vue-preview>
    </div>

    <!-- 图片内容区域 -->
    <div class="content" v-html="photoInfo.content"></div>

    <!-- 放置一个现成的 评论子组件 -->
    <comment-box :id="id"></comment-box>
  </div>
</template>

<script>
  import CommentBox from '../common/comment-box.vue'
  import https from '../../http.js'
  import {Toast} from 'mint-ui'
  export default {
    name: 'PhotoInfo',
    data() {
      return {
        id: this.$route.params.id,
        photoInfo: {},
        list: []
      }
    },
    created() {
      this.getPhotoInfo();
      this.getThumbs();
    },
    methods: {
      getPhotoInfo() {
        https.Get('api/getimageInfo/' + this.id, {}).then((data) => {
          console.log(data);
          if (data.data.status === 0) {
            this.photoInfo = data.data.message[0];
          } else {
            Toast('获取图片失败。。。')
          }
        }).catch(err => {
            console.log(err)
          }
        );
      },
      getThumbs() {
        https.Get('api/getthumimages/' + this.id, {}).then((data) => {
          console.log(data);
          if (data.data.status === 0) {
            // 循环每个图片数据，补全图片的宽和高
            data.data.message.forEach(item => {
              item.w = 600;   // 设置以大图浏览时的宽度
              item.h = 400;     // 设置以大图浏览时的高度
              // item.src   // 大图
              item.msrc = item.src;  // 小图
            });
            this.list = data.data.message
          } else {
            Toast('获取图片失败。。。')
          }
        }).catch(err => {
          console.log(err)
          }
        );
      }
    },
    components: {
      CommentBox
    }
  }
</script>

<style lang="scss" scoped>
  .photoinfo-container {
    padding: 3px;

    h3 {
      color: #26a2ff;
      font-size: 15px;
      text-align: center;
      margin: 15px 0;
    }

    .subtitle {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
    }

    .content {
      font-size: 13px;
      line-height: 30px;
    }

    /*.thumbs {
        img {
            margin: 10px;
            box-shadow: 0 0 8px #999;
        }
    }*/
    .thumbs{
      /deep/ .my-gallery{   //deep深层作用选择器
        display: flex;
        flex-wrap:wrap;//默认换行
        figure{
          width: 30%;
          margin: 5px;
          img{
            width: 100%;
            box-shadow: 0 0 8px #999;
            border-radius: 5px;
          }
        }
      }
    }
  }
</style>
