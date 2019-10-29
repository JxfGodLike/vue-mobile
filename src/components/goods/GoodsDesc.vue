<template>
  <div class="goodsdesc-container">
    <h3>{{ info.title }}</h3>

    <hr>

    <div class="content" v-html="info.content"></div>
  </div>
</template>

<script>

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
        this.$http({
          url: 'api/goods/getdesc/' + this.$route.params.id,
          method: 'get',
          data: {}
        }).then(data => {
          console.log(data.data);
          if (data.data.status === 0) {
            this.info = data.data.message[0]
          } else {
            this.Toast('获取图文详情失败...')
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
