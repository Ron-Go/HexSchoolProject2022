<template lang="">
  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasFavorite" aria-labelledby="offcanvasRightLabel">
    <div class="offcanvas-header bg-success">
      <h5 class="text-light mb-0" id="offcanvasRightLabel">我的最愛</h5>
      <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <div v-if="!favorite.length" class="container text-center">
        <h5>目前無追蹤商品</h5>
        <router-link class="btn btn-success mx-auto" to="/front/products" @click.prevent="$emit('hide-favorite')">前往購物</router-link>
      </div>
      <div v-else class="container position-relative">
        <Loading
        :active="isLoading"
        :loader="loader"
        :is-full-page="fullPage"
        :color="color"></Loading>
        <template v-for="(item, key) in favoriteProducts" :key="'item' + key">
          <div class="row border-bottom py-3">
            <div class="col-5 g-0">
              <div class=""
              style="height: 100px"
              :style="{
                backgroundImage: `url(${item.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
              }"></div>
            </div>
            <div class="col-7 position-relative d-flex flex-column justify-content-between p-3">
              <div class="d-flex justify-content-between">
                <p class="fw-bold">{{ item.title }}</p>
                <button type="button" class="position-absolute btn-close" @click="favorite.splice(key, 1)" style="top: 0; right: 0;"></button>
              </div>
              <div>
                <div class="row d-flex justify-content-center">
                  <div class="col-6">
                    <router-link class="btn btn-info w-100" :to="`/front/product/${item.id}`">
                      <span class="bi-zoom-in"></span>
                    </router-link>
                  </div>
                  <div class="col-6">
                    <button type="button" class="btn btn-info w-100" @click="favoriteToCart(item.id, key)">
                      <span class="bi-cart3"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
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
      favorite: [],
      favoriteProducts: [],
      products: [],
    };
  },
  mounted() {
    this.getProducts();
    // 監聽add-to-favorite行為，把產品id push到favorite陣列
    emitter.on('add-to-favorite', (id) => {
      this.addToFavorite(id);
      this.filterFavorite();
    });
    // 取出localStorage的favorite資料（字串轉回JSON）
    // 如果localStorage沒有資料，避免取不到值的狀況，賦予空陣列
    this.favorite = JSON.parse(localStorage.getItem('favorite')) || [];
  },
  watch: {
    // 深層監聽favorite
    favorite: {
      handler() {
        // 不管是刪除或push資料，都把陣列favorite資料轉成字串儲存在localStorage
        localStorage.setItem('favorite', JSON.stringify(this.favorite));
        // 觸發refresh-favorite事件，更新products產品頁的我的最愛追蹤
        emitter.emit('refresh-favorite');
        this.$emit('send-favorite-qty', this.favorite.length);
        // favorite陣列的產品id有更動時，重新跟全部產品資料比對
        this.filterFavorite();
      },
      deep: true,
    },
  },
  methods: {
    // 增加我的最愛
    addToFavorite(id) {
      // 用產品id去陣列favorite尋找有無相同的item，並回傳item的index賦予給favoriteIndex
      const favoriteIndex = this.favorite.findIndex((index) => index === id);
      // favoriteIndex>=0 代表有和產品id相同的item在陣列favorite內
      // 就把陣列favorite對應產品id的item刪除
      if (favoriteIndex >= 0) {
        this.favorite.splice(favoriteIndex, 1);
      } else {
        // 否則把產品id push增加到陣列favorite
        this.favorite.push(id);
      }
    },
    // 取得所有產品
    getProducts() {
      this.axios
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products`)
        .then((res) => {
          // 取得全部商品資料，存放products，準備渲染畫面用
          this.products = res.data.products;
          // 取得全部商品後，篩選出我的最愛商品
          this.filterFavorite();
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    // 從所有商品資料篩選出我的最愛商品
    filterFavorite() {
      this.favoriteProducts = [];
      this.favorite.forEach((id) => {
        this.products.forEach((item) => {
          // 我的最愛內的產品id，與所有產品的id做比對
          // 有相同的就把產品資料push到favoriteProducts
          if (item.id === id) {
            this.favoriteProducts.push(item);
          }
        });
      });
    },
    // 我的最愛商品加入到購物車
    favoriteToCart(id, key) {
      const item = {
        product_id: id,
        qty: 1,
      };
      this.isLoading = true;
      this.axios
        .post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`, { data: item })
        .then(() => {
          // 增加商品到購物車，成功後發送getCart行為（取得購物車內資料）
          emitter.emit('favorite-To-Cart', item);
          // 我的最愛商品加入到購物車後，刪除掉我的最愛商品
          this.favorite.splice(key, 1);
          this.isLoading = false;
        })
        .catch((err) => {
          console.dir(err);
        });
    },
  },
  numounded() {
    emitter.off('add-to-favorite');
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
