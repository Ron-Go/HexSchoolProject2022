<template lang="">
<div class="container" style="padding-top:56px">
  <div class="position-relative row mt-4">
    <Loading :active="isLoading" :loader="loader" :is-full-page="fullPage" :color="color"></Loading>
    <div class="row">
      <div class="col-12">
        <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link class="text-decoration-none" :to="{ path: '/front/products' }">所有商品</router-link>
            </li>
            <li class="breadcrumb-item">
              <router-link class="text-decoration-none" :to="{ path: '/front/products', query: { category: product.category } }">
              {{ product.category }}</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
          </ol>
        </nav>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-xl-6 mb-5 mb-xl-0">
        <div id="carouselExampleIndicators" class="carousel slide carousel-fade" data-bs-ride="carousel">
          <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img :src="product.imageUrl" class="d-block w-100" alt="img">
            </div>
            <div v-for="(item, key) in product.imagesUrl" :key="'img' + key" class="carousel-item">
              <img :src="item" class="d-block w-100" :alt="'img' + key">
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div class="col-12 col-xl-6">
        <div class="product d-flex flex-column justify-content-between" style="height: 100%">
          <h3 class="product-title mb-3">{{ product.title }}</h3>
            <div class="product-price d-flex justify-content-between mb-3">
              <ul class="list-unstyled d-flex justify-content-start align-items-center mb-0">
                <li class="fs-4 text-dark me-3">{{`$${currency(product.price)}`}}</li>
                <li class="fs-6 fw-light text-muted"><del>{{`$${currency(product.origin_price)}`}}</del></li>
              </ul>
              <div class="star-rating ms-auto">
                <!-- 評價數>=迴圈數。實心星星 -->
                <!-- 迴圈數>評價數。空心星星 -->
                <template
                  v-for="(star , key) in 5" :key="'star' + key">
                    <span
                      class="fs-6 "
                      :class="{
                        'bi-star-fill': product.rating >= star,
                        'text-warning': product.rating >= star,
                        'bi-star': star > product.rating,
                        'text-info': star > product.rating,
                      }"></span>
                </template>
              </div>
            </div>
            <div class="product-content mb-3">
              <p class="fs-6 lh-lg ">{{ product.content }}</p>
            </div>
            <div class="product-cart mb-3">
              <div class="btn-group w-100">
                <button type="button" class="btn btn-outline-success me-3 rounded-0 bi-heart"></button>
                <button type="button" class="btn btn-outline-success bi-plus-lg rounded-0"
                  @click="product.num += 1"
                  ></button>
                <input type="number" class="form-control text-center border border-start-0 border-success rounded-0 w-25" v-model="product.num">
                <button type="button" class="btn btn-outline-success bi-dash-lg rounded-0"
                  @click="product.num -= 1" :disabled="product.num === 1"></button>
                <button type="button" class="btn btn-primary text-white rounded-0 ms-3 w-75" @click="addToCart">Add To Cart</button>
              </div>
            </div>
        </div>
      </div>
    </div>
    <div class="col-12 d-flex flex-column justify-content-center my-5">
      <h3 class="text-center">常見問題</h3>
      <div class="col-12 col-xl-8 mx-auto">
        <div class="accordion accordion-flush" id="accordionFlushExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingOne">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                <span class="fw-bolder lh-lg rounded text-white bg-primary px-2 me-3" style="letter-spacing: 0.7px">Q1</span>
                <span>有提供保固和維修服務？</span>
              </button>
            </h2>
            <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
              <div class="accordion-body">
                保固期間自發票開立日期起計算，保固時間共兩年。
                維修服務請將商品帶至本店、或各地品牌經銷商。
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingTwo">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                <span class="fw-bolder lh-lg rounded text-white bg-primary px-2 me-3" style="letter-spacing: 0.7px">Q2</span>
                <span>運送方式及付款方式有哪些？</span>
              </button>
            </h2>
            <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
              <div class="accordion-body">
                <ul class="list-unstyled">
                  <li>收到帳款後盡快寄出商品，以宅配方式寄送至收件地址</li>
                  <li>付款方式有信用卡付款，及Paypel國際付費</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingThree">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                <span class="fw-bolder lh-lg rounded text-white bg-primary px-2 me-3" style="letter-spacing: 0.7px">Q3</span>
                <span>退換貨方式及規則？</span>
              </button>
            </h2>
            <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
              <div class="accordion-body">
                <ul class="list-unstyled">
                  <li>收到商品當日起，七日鑑賞期內可申請退換貨，超過七日則無法受理。</li>
                  <li>退換貨時請務必將商品包裝完整，請附上紙條寫上您的訂單編號、姓名、電話及地址，並請標示欲辦理瑕疵換貨原因。</li>
                  <li>若回收商品後發現商品外觀有瑕疵，我們將保留退貨退款的權利。當您的退貨需求通過審核，我們會請宅配人員至您府上取回商品。</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
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
    };
  },
  components: {
    dialogModal,
  },
  mounted() {
    this.getProduct();
    emitter.emit('product-routeName', this.$route.name);
  },
  watch: {
    // 監聽$route的資料變化（$route.params.id）
    $route: {
      handler() {
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
        })
        .catch((err) => {
          console.dir(err);
        });
    },
  },
  mixins: [currencyMixin, dialogMixin, LoadingPlugin],
};
</script>

<style lang="css">
.carousel-indicators [data-bs-target] {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.accordion-button:not(.collapsed) {
  color: #000000;
  background-color: rgba(255, 255, 255, 0);
}
.accordion-button:not(.collapsed) >span {
  font-weight: bolder;
}
.accordion-button:focus {
  box-shadow: 0px 0px;
}
</style>
