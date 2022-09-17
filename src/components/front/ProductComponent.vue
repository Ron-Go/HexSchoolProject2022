<template lang="">
<div v-if="!product.id" class="position-relative" style="height: 100vh">
  <Loading
    :active="isLoading"
    :loader="loader"
    :is-full-page="fullPage"
    :color="color"
    :background-color="backgroundColor"
    :opacity="opacity"></Loading>
</div>
<div v-else class="container container-auto">
  <div class="position-relative row">
    <div class="col-12 mt-4">
      <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link class="text-decoration-none text--primary" :to="{ path: '/front/products' }">所有商品</router-link>
          </li>
          <li class="breadcrumb-item">
            <!-- 從$route.params傳遞product.category -->
            <router-link class="text-decoration-none text--primary"
            :to="{ name: 'products', params: { category: product.category } }">
            {{ product.category }}</router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
        </ol>
      </nav>
    </div>
    <div class="product col-12 col-xl-7 mb-4 mb-xl-0">
      <div id="carouselExampleIndicators" class="carousel slide py-0" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="btn-point active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner overflow-hidden">
          <div class="carousel-item active">
            <img :src="product.imageUrl" class="d-block w-100" alt="productImg">
          </div>
          <div v-for="(item, key) in product.imagesUrl" :key="'productImg' + key" class="carousel-item">
            <img :src="item" class="d-block w-100" :alt="'img' + key">
          </div>
        </div>
        <button class="carousel-control-prev" type="button"
        data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span class="bi bi-caret-left-fill fs-32" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next position-absolute" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span class="bi bi-caret-right-fill fs-32" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    <div class="col-12 col-xl-5">
      <div class="product d-flex flex-column justify-content-between" style="height: 100%">
        <div class="product__title">
          <h2 class="fs-36 mb-2">{{ product.title }}</h2>
          <div class="star-rating mb-2">
            <!-- 評價數>=迴圈數。實心星星 -->
            <!-- 迴圈數>評價數。空心星星 -->
            <template
              v-for="(star , key) in 5" :key="'star' + key">
                <span
                  class="fs-32 "
                  :class="{
                    'bi-star-fill': product.rating >= star,
                    'text-warning': product.rating >= star,
                    'bi-star': star > product.rating,
                    'text-info': star > product.rating,
                  }"></span>
            </template>
          </div>
        </div>
          <div class="product__info d-flex justify-content-between mb-3">
            <div class="product__info__price d-flex align-items-center">
              <p class="fs-36 text-dark me-3">{{`$${currency(product.price)}`}}</p>
              <p class="fs-32 fw-light text-muted"><del>{{`$${currency(product.origin_price)}`}}</del></p>
            </div>
          </div>
          <div class="product-content mb-3">
            <p class="fs-6 lh-lg ">{{ product.content }}</p>
          </div>
          <div class="product-cart">
            <div class="btn-group w-100">
              <button type="button" class="btn py-0 px-0 me-3 rounded-0"
              @click.prevent="addFavorite(product.id)">
              <span
                class="material-symbols-outlined d-block fs-36"
                :class="{
                  'add__favorite': !getFavorite.includes(product.id),
                  'add__favorite--fill': getFavorite.includes(product.id),
                }">favorite</span>
              </button>
              <button type="button" class="btn btn-outline-primary bi-plus-lg rounded-0"
                @click="product.qty += 1"
                ></button>
              <input type="number" class="form-control text-center border border-start-0 border-primary rounded-0 w-25 bg-white" v-model="product.qty" disabled style="text-indent: 12px;">
              <button type="button" class="btn btn-outline-primary bi-dash-lg rounded-0"
                @click="product.qty -= 1" :disabled="product.num === 1"></button>
              <button type="button" class="btn btn-outline-primary text--white rounded-0 fs-5 fs-lg-4 ms-3 w-75" @click="addToCart">Add To Cart</button>
            </div>
          </div>
      </div>
    </div>
    <div class="col-12 d-flex flex-column justify-content-center my-6">
      <h3 class="text-center fw--medium mb-5">常見問題</h3>
      <div class="col-12 col-xl-8 mx-auto">
        <div class="accordion accordion-flush" id="accordionFlushExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingOne">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                <span class="badge fs-6 fs-lg-4 fw--bold rounded text--white px-2 py-2 me-3" style="letter-spacing: 0.7px">Q1</span>
                <span class="fs-5 fs-lg-4">有提供保固和維修服務？</span>
              </button>
            </h2>
            <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
              <div class="accordion-body ms-63">
                <p class="fs-6 mb-2">保固期間自發票開立日期起計算，保固時間共兩年。</p>
                <p class="fs-6">維修服務請將商品帶至本店、或各地品牌經銷商。</p>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingTwo">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                <span class="badge fs-6 fs-lg-4 fw--bold rounded text--white px-2 py-2 me-3" style="letter-spacing: 0.7px">Q2</span>
                <span class="fs-5 fs-lg-4">運送方式及付款方式有哪些？</span>
              </button>
            </h2>
            <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
              <div class="accordion-body ms-63">
                <p class="fs-6 mb-2">收到帳款後盡快寄出商品，以宅配方式寄送至收件地址</p>
                <p class="fs-6">付款方式有信用卡付款，及Paypel國際付費</p>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingThree">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                <span class="badge fs-6 fs-lg-4 fw--bold rounded text--white px-2 py-2 me-3" style="letter-spacing: 0.7px">Q3</span>
                <span class="fs-5 fs-lg-4">退換貨方式及規則？</span>
              </button>
            </h2>
            <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
              <div class="accordion-body ms-63">
                <p class="fs-6 mb-2">收到商品當日起，七日鑑賞期內可申請退換貨，超過七日則無法受理。</p>
                <p class="fs-6 mb-2">退換貨時請務必將商品包裝完整，請附上紙條寫上您的訂單編號、姓名、電話及地址，並請標示欲辦理瑕疵換貨原因。</p>
                <p class="fs-6">若回收商品後發現商品外觀有瑕疵，我們將保留退貨退款的權利。當您的退貨需求通過審核，我們會請宅配人員至您府上取回商品。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 mb-5">
      <h3 class="text-center fw--medium mb-5">留言</h3>
      <div class="message row">
        <ul class="message__list d-flex flex-column align-items-center">
          <li class="message__list__item col-12 col-xl-8 p-5 border border-1 rounded-2">
            <div class="user d-flex mb-4">
              <div class="user__img me-3">
                <img class="rounded-circle" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw3NjA4Mjc3NHx8ZW58MHx8fHw%3D&w=1000&q=80" alt="user"
                width="53px" height="53px">
              </div>
              <div class="user__content">
                <p class="name fs-5 lh-sm fw--bold mb-2">Andy Chen</p>
                <p class="email fs-6 lh-sm text-black-50">2022/09/09</p>
              </div>
            </div>
            <div class="user__message py-4 px-4 rounded-pill mb-4 bg--lightprimary">
              <p class="fs-6">很棒的保養服務，再也不擔心半路車子出狀況.....</p>
            </div>
            <div class="store__message py-4 px-4 rounded-pill bg--light">
              <p class="fs-6 mb-2">店家回覆：</p>
              <p class="fs-6 ps-3">謝謝你對本店的肯定。</p>
            </div>
          </li>
          <li class="message__list__item col-12 col-xl-8 p-5 border border-1 rounded-3 mt-5">
            <div class="user d-flex mb-4">
              <div class="user__img me-3">
                <img class="rounded-circle" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw3NjA4Mjc3NHx8ZW58MHx8fHw%3D&w=1000&q=80" alt="user"
                width="53px" height="53px">
              </div>
              <div class="user__content">
                <p class="name fs-5 lh-sm fw--bold mb-2">Andy Chen</p>
                <p class="email fs-6 lh-sm text-gray">2022/09/09</p>
              </div>
            </div>
            <div class="user__message py-4 px-4 rounded-pill mb-4 bg--lightprimary">
              <p class="fs-6">很棒的保養服務，再也不擔心半路車子出狀況.....</p>
            </div>
            <div class="store__message py-4 px-4 rounded-pill bg--light">
              <p class="fs-6 mb-2">店家回覆：</p>
              <p class="fs-6 ps-3">謝謝你對本店的肯定。</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
<dialogModal :dialogMode="dialogMode"></dialogModal>
</template>
<script>

import LoadingPlugin from '@/mixins/LoadingComponentMixin';
import emitter from '@/utils/emitter';
// 引入dialog-modal
import dialogModal from '@/components/front/DialogModal.vue';
// mixin
import currencyMixin from '@/mixins/currencyMixin';
import dialogMixin from '@/mixins/dialogMixin';

export default {
  data() {
    return {
      product: {},
      // 觸發dialog視窗，要傳入的內容
      dialogMode: 0,
      // 從localStorage取得favorite資料
      getFavorite: [],
    };
  },
  components: {
    dialogModal,
  },
  mounted() {
    console.log(this.$route);
    this.getProduct();
    emitter.emit('product-routeName', this.$route.name);
    //
    emitter.on('refresh-favorite', () => {
      this.getLocalStorage();
    });
    this.getLocalStorage();
  },
  watch: {
    // 監聽$route的資料變化（$route.params.id）
    $route: {
      handler() {
        console.log(this.$route);
        if (this.$route.params.id) {
          this.getProduct();
        }
      },
      deep: true,
    },
  },
  methods: {
    // 取得單項商品資料
    getProduct() {
      const { id } = this.$route.params;
      this.isLoading = true;
      this.axios
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`)
        .then((res) => {
          // 取得單項商品資料，存放product，準備渲染畫面
          this.product = res.data.product;
          this.addQtyNum();
          // 從我的最愛取得商品資料，把側邊offcanvas關閉
          emitter.emit('close-favorite');
          this.isLoading = false;
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    // 增加商品到購物車
    addToCart() {
      const item = {
        product_id: this.product.id,
        qty: this.product.num,
      };
      this.axios
        .post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`, { data: item })
        .then((res) => {
          console.dir(res);
          this.product.num = 1;
          // 增加商品到購物車，成功後發送getCart行為（取得購物車內資料）
          emitter.emit('getCart', item);
          // 商品加入購物車後，顯示dialog視窗
          this.showDialog(1);
          // 加入購物車後，產品數量回到初始值1
          this.product.qty = 1;
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    // 產品資料，加上qty屬性
    addQtyNum() {
      this.product.qty = 1;
    },
    // 加入最愛
    addFavorite(id) {
      // 觸發add-to-favorite行為
      emitter.emit('add-to-favorite', id);
      this.getLocalStorage();
      if (this.getFavorite.includes(id)) {
        this.showDialog(3);
      } else {
        // 商品加入我的最愛後，顯示dialog視窗
        this.showDialog(2);
      }
    },
    // 從localStorage取得favorite的資料
    getLocalStorage() {
      setTimeout(() => {
        this.getFavorite = JSON.parse(localStorage.getItem('favorite')) || [];
      });
    },
  },
  mixins: [currencyMixin, dialogMixin, LoadingPlugin],
  unmounted() {
    emitter.off('refresh-favorite');
  },
};
</script>

<style lang=""></style>
