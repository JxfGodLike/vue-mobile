<template>
  <div class="shopcarContainer">
    <div class="mui-card" v-for="(item, i) in goodsList" :key="item.id">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <mt-switch v-model="$store.getters.getselected[item.id]" @change="changesel({id:item.id, flag: $store.getters.getselected[item.id]})"></mt-switch>
          <img :src="item.thumb_path" alt="">
          <div>
            <h3>{{item.title}}</h3>
            <p class="control">
              <span class="price">￥{{item.sell_price}}</span>
              <number-box :goodsnum = "$store.getters.getgoodscount[item.id]" :goodsid="item.id"></number-box>
              <a href="javascript:;" @click.prevent="remove(item.id, i)">删除</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
          <div>
            <p>总计（不含运费）</p>
            <p class="buy">已勾选商品 <span>{{$store.getters.gettotal.totalcount}}</span> 件，总价：<span>￥{{$store.getters.gettotal.totalprice}}</span>元</p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NumberBox from '../common/number-box.vue'
export default {
  name: 'ShopCar',
  data() {
    return {
      goodsList: []

    }
  },
  created() {
    this.getGoodsInfo()
  },
  methods: {
    getGoodsInfo() {
      var arr = []
      this.$store.state.car.forEach(item => {
        arr.push(item.id)
      })
      this.$http({
        url: 'api/goods/getshopcarlist/' + arr.join(','),
        method: 'get',
        data: {}
      }).then(data => {
        console.log(data.data);
        if (data.data.status === 0) {
          this.goodsList = data.data.message;
        } else {
        }
      }).catch(err => {
          console.log(err)
        }
      );
    }
  },
  components: {
    NumberBox
  }
}
</script>

<style lang="scss" scoped>
  .shopcarContainer {
    background-color: #eee;
    overflow: hidden;
    .jiesuan {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .mui-card-content-inner {
      display: flex;
      align-items: center;
      img {
        width: 60px;
        height: 60px;
      }
      h3 {
        font-size: 13px;
        margin-bottom: 15px;
      }
      .price {
        color:red;
      }
      .control {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0;
      }
      .buy {
        span {
          color: red;
          font-size: 16px;
        }
      }
    }
  }
</style>
