<template lang="">
  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasCart" aria-labelledby="offcanvasRightLabel">
    <div class="offcanvas-header bg-success">
      <h5 class="text-light mb-0" id="offcanvasRightLabel">購物車</h5>
      <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <div v-if="cart.products.length" class="container position-relative">
        <Loading
        :active="isLoading"
        :loader="loader"
        :is-full-page="fullPage"
        :color="color"></Loading>
        <div class="d-flex justify-content-between align-items-center">
          <h5 class="mb-3">已加入<span class="text-danger">{{ cart.products.length }}項</span>商品</h5>
          <button type="button"
            class="btn btn-outline-danger btn-sm mb-3"
            @click="cleanCart">清空購物車</button>
        </div>
          <div v-for="(item, key) in cart.products" :key="'item' + key" class="row position-relative align-items-center border-bottom py-3">
            <div class="col-5 g-0">
              <div
              :style="{
                backgroundImage: `url(${item.product.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
              }"
              style="height: 100px"
              ></div>
            </div>
            <div class="col-7 position-relative">
              <div class="body py-3">
                <button type="button" class="position-absolute btn-close" aria-label="Close" style="top: 0px; right: 0px; font-size: 12px" @click="deleteCartItem(item)"></button>
                <h6 class="title">{{ item.product.title }}</h6>
                <div class="row d-flex align-items-center">
                  <div class="col-12 d-flex justify-content-start align-items-center">
                    <h6 class="text text-success fs-6 me-3 mb-0">數量</h6>
                    <div class="input-group w-50">
                      <button type="button"
                        class="btn btn-outline-secondary btn-sm py-0"
                        :disabled="item.qty === 1" @click="modifyCartQty(item, 'sub')">-</button>
                      <span class="form-control border-secondary text-center px-0 py-0">{{ item.qty }}</span>
                      <button type="button"
                        class="btn btn-outline-secondary btn-sm py-0"
                        @click="modifyCartQty(item, 'add')">+</button>
                    </div>
                  </div>
                  <!-- <div class="col-7">
                  </div> -->
                </div>
                <div class="col-12 d-flex justify-content-between mt-2">
                  <h6 class="card-text">總價:
                    <span class="text-danger fw-bold">${{ currency(item.total) }}</span>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        <div class="input-group pt-3">
          <input type="text"
            class="form-control border-success"
            placeholder="請輸入折扣碼" v-model="discount.code">
          <button type="button" class="btn btn-outline-success" @click.prevent="discountConfirm">確認</button>
        </div>
        <p class="text-success text-end fs-6">開幕慶輸入折扣碼newopen可享優惠</p>
        <table class="table text-end">
          <tbody class="">
            <tr>
              <th>總價：</th>
              <td>{{ currency(this.cart.total) }}</td>
            </tr>
            <tr>
              <th>折扣：</th>
              <td class="text-success">{{`-${currency(this.cart.total - this.cart.finalTotal)}`}}</td>
            </tr>
            <tr class="fs-5">
              <th>最後總價：</th>
              <th class="text-danger">{{ currency(this.cart.finalTotal) }}</th>
            </tr>
          </tbody>
        </table>
        <button
          type="button"
          class="btn btn-primary text-white btn-lg d-block ms-auto"
          @click="cartSendOrder"
          >結帳去</button>
      </div>
      <div v-else class="container text-center">
        <h5>購物車為空的</h5>
        <router-link class="btn btn-success" to="/front/products" @click.prevent="$emit('hide-cart')">繼續購物</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import LoadingPlugin from '@/mixins/LoadingComponentMixin';
import emitter from '@/utils/emitter';

export default {
  data() {
    return {
      cart: {
        products: [],
        finalTotal: 0,
        total: 0,
      },
      // 折扣碼
      discount: {
        code: '',
      },
    };
  },
  mounted() {
    // 初始先取得購物車資料
    this.getCart();
    // 監聽getCart行為
    emitter.on('getCart', () => {
      this.getCart();
    });
    // 監聽send-orderToCart行為
    emitter.on('send-orderToCart', () => {
      this.getCart();
    });
    // 監聽favorite-To-Cart行為。把我的最愛商品加入購物車
    emitter.on('favorite-To-Cart', () => {
      this.getCart();
    });
  },
  methods: {
    // 取得購物車資料
    getCart() {
      this.isLoading = true;
      this.axios
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.cart.products = res.data.data.carts;
          this.cart.finalTotal = res.data.data.final_total;
          this.cart.total = res.data.data.total;
          // 發送get-cartToOrder事件，把cart資料傳送到front
          emitter.emit('get-cartToOrder', this.cart);
          // 購物車的資料長度(購物車有多少產品)，傳到外層header
          this.$emit('send-cart-qty', this.cart.products.length);
          this.isLoading = false;
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    // 修改購物車內item的數量
    modifyCartQty(item, mode) {
      const modifyData = {
        product_id: item.id,
        qty: mode === 'add' ? item.qty + 1 : item.qty - 1,
      };
      this.axios
        .put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`, { data: modifyData })
        .then(() => {
          // 修改完購物車的資料，再重新取得購物車資料
          this.getCart();
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    cleanCart() {
      this.axios
        .delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`)
        .then(() => {
          // 刪除完購物車的資料，再重新取得購物車資料
          this.getCart();
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    // 刪除購物車單項商品
    deleteCartItem(item) {
      this.axios
        .delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`)
        .then(() => {
          // 修改完購物車的資料，再重新取得購物車資料
          this.getCart();
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    // 轉換貨幣
    currency(num) {
      const n = parseInt(num, 10);
      return `${n.toFixed(0).replace(/./g, (c, i, a) => (i && c !== '.' && (a.length - i) % 3 === 0 ? `, ${c}`.replace(/\s/g, '') : c))}`;
    },
    // 確認折扣碼
    discountConfirm() {
      console.log(this.discount.code);
      this.axios
        .post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/coupon`, { data: this.discount })
        .then(() => {
          this.getCart();
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    // cart資料傳送到order
    cartSendOrder() {
      // 關閉offcanvas
      this.$emit('hide-cart');
      // 前往order頁面
      this.$router.push('/front/order');
      // 發送事件，購物車資料傳送到order
      setTimeout(() => {
        emitter.emit('cart-to-order', this.cart);
      }, 50);
    },
  },
  unmounted() {
    // 取消監聽
    emitter.off('getCart');
    emitter.off('send-orderToCart');
    emitter.off('favorite-To-Cart');
  },
  mixins: [LoadingPlugin],
};
</script>
<style lang="scss">
.btn-close{
  transition: all 0.2s ease-in-out;
  &:hover{
    transform: rotate(-90deg);
    transition: all 0.2s ease-in-out;
  }
}
</style>
