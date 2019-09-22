<template>
  <div class="goodsdesc-container">
    <h3>{{ info.title }}</h3>

    <hr>

    <div class="content" v-html="info.content"></div>
  </div>
</template>

<script>
  import https from '../../http.js'
  import {Toast} from 'mint-ui'
  export default {
    name: 'GoodsDesc',
    data() {
      return {
        info: {} // 图文数据
      };
    },
    created() {
      this.getGoodsDesc();
    },
    methods: {
      getGoodsDesc() {
        https.Get('api/goods/getdesc/' + this.$route.params.id, {}).then((data) => {
          console.log(data);
          if (data.data.status === 0) {
            this.info = data.data.message[0]
          } else {
            Toast('获取详情失败。。。')
          }
        }).catch(err => {
            console.log(err)
          }
        );
      }
    }
  }
</script>

<style lang="scss">
  .goodsdesc-container {
    padding: 4px;
    h3 {
      font-size: 16px;
      color: #226aff;
      text-align: center;
      margin: 15px 0;
    }
    .content{
      img{
        width: 100%;
      }
    }
  }
</style>
