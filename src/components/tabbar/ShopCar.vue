<template>
  <div class="shopCarContainer">
    <div class="mui-card" v-for="(item, i) in goodsList" :key="item.id">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
<!--          <div class="mui-switch mui-switch-mini" :class="{'mui-active': $store.getters.getStatus[item.id]}">-->
<!--            <div class="mui-switch-handle"></div>-->
<!--          </div>-->
          <mt-switch v-model="$store.getters.getStatus[item.id]" @change="selectChange(item.id, $store.getters.getStatus[item.id])"></mt-switch>
          <img :src="item.thumb_path" alt="">
          <div>
            <h3>{{item.title}}</h3>
            <p class="control">
              <span class="price">￥{{item.sell_price}}</span>
              <number-box :auto-update="true"
                          :goodsId="item.id"
                          :initCount="$store.getters.getGoodsCount[item.id]"
                          :max="$store.getters.getGoodsMax[item.id]">
              </number-box>
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
            <p class="buy">已勾选商品 {{$store.getters.getCountAndAmount.count}}<span></span> 件，总价：<span>￥{{$store.getters.getCountAndAmount.amount}}</span>元</p>
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
      if (arr.length <= 0) {
        return;
      }
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
    },
    remove(id, index) {
      this.goodsList.splice(index, 1);
      this.$store.commit('removeForCar', id)
    },
    selectChange(id, status) {
      var shopCar = {
        id: id,
        selected: status
      };
      this.$store.commit('updateStatus', shopCar)
    }
  },
  components: {
    NumberBox
  }
}
</script>

<style lang="scss" scoped>
  .shopCarContainer {
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
