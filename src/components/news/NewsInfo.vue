<template>
  <div class="newsInfo-container">
    <!-- 大标题 -->
    <h3 class="title">{{ newsInfo.title }}</h3>
    <!-- 子标题 -->
    <p class="subtitle">
      <span>发表时间：{{ newsInfo.add_time | dateFormat }}</span>
      <span>点击：{{ newsInfo.click }}次</span>
    </p>

    <hr>

    <!-- 内容区域 -->
    <div class="content" v-html="newsInfo.content"></div>

    <!-- 评论子组件区域 -->
    <comment-box :id="this.id"></comment-box>
  </div>
</template>

<script>
  import CommentBox from '../../components/common/comment-box.vue'
  import https from '../../http.js'
  import {Toast} from 'mint-ui'
  export default {
    name: 'NewsInfo',

    data() {
      return {
        id: this.$route.params.id,
        newsInfo: {}
      }
    },
    created () {
      this.getNewsInfo()
    },
    methods: {
      getNewsInfo() {
        https.Get('api/getnew/' + this.id, {}).then((data) => {
          console.log(data);
          if (data.data.status === 0) {
            this.newsInfo = data.data.message[0];
          } else {
            Toast('获取新闻失败。。。')
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

<style lang="scss">
  .newsInfo-container {
    padding: 0 4px;
    .title {
      font-size: 16px;
      text-align: center;
      margin: 15px 0;
      color: red;
    }
    .subtitle {
      font-size: 13px;
      color: #226aff;
      display: flex;
      justify-content: space-between;
    }
    .content {
      img {
        width: 100%;
      }
    }
  }
</style>
