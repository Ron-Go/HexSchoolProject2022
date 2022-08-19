<template lang="">
  <nav class="navbar navbar-expand-lg navbar-light justify-content-center bg-background sticky-top" style="padding-top:64px">
    <div class="navbar-nav category flex-row overflow-auto navbar-custom-scroll">
      <a class="nav-item nav-link category-item text-nowrap px-2" href="#" @click="categoryActive" @click.prevent="getProducts()">所有產品</a>
      <!-- 用productsCategory渲染出商品分類 -->
      <a v-for="(item, key) in productsCategory" :key="'item' + key"
        class="nav-item nav-link category-item text-nowrap px-2" href="#"
        @click="categoryActive" @click.prevent="getProducts(item)">{{ item }}</a>
    </div>
  </nav>
  <div v-if="!products.length" class="position-relative" style="height: 75vh">
    <Loading
      :active="isLoading"
      :loader="loader"
      :is-full-page="fullPage"
      :color="color"></Loading>
  </div>
  <div v-else class="container">
    <div class="row">
      <div v-for="(item, key) in products" :key="'item' + key" class="col-12 col-sm-6 col-lg-4">
        <div class="productItem border-0 mb-4 position-relative scale overflow-hidden">
          <div class="overflow-hidden position-relative">
              <router-link class="position-absolute w-100" :to="`product/${item.id}`"
                style="height: 100%; z-index:1"></router-link>
              <div
                class="img overflow-hidden"
                :style="{backgroundImage: `url(${item.imageUrl})`}"
                style="height: 250px; background-size: cover; background-position: center center"></div>
          </div>
          <div class="card-body position-absolute px-1 py-0 bg-white" style="bottom: -30px; right: 0px; left: 0px; z-index:2">
            <div class="card-body-top d-flex justify-content-between align-items-center mt-2">
              <h6 class="mb-0">
                <router-link
                  class="link-secondary text-decoration-none"
                  :to="`product/${item.id}`">{{ item.title }}</router-link>
              </h6>
              <p class="text-muted mb-0">
                <span>$</span>
                <span>{{ item.price }}</span>
              </p>
            </div>
            <div class="card-body-bottom d-flex justify-content-between align-items-center">
              <div class="icon">
                <a href="#" class="bi-bag-plus fs-5 text-primary pe-3"
                  @click.prevent="addToCart(item.id)"></a>
                  <!-- 比對getFavorite陣列裡面有無符合的item.id -->
                <a class="fs-5 text-center text-primary pe-auto" href="#"
                  :class="{
                    'bi-heart': !getFavorite.includes(item.id),
                    'bi-heart-fill': getFavorite.includes(item.id),
                  }"
                  @click.prevent="addFavorite(item.id)"></a>
              </div>
              <div class="star-rating">
                <template
                  v-for="(star , key) in 5" :key="'star' + key">
                    <span
                      class="fs-6 text-warning"
                      :class="{
                        'bi-star-fill': item.rating >= star,
                        'bi-star': star > item.rating,
                      }"></span>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- dialog視窗 -->
  <dialog-modal
  :dialogMode="dialogMode"
  ></dialog-modal>
</template>

<script>
// vue-loading-overlay 作為元件引入
import LoadingComponent from '@/mixins/LoadingComponentMixin';
// 引入emitter
import emitter from '@/utils/emitter';
// 引入dialog-modal
import dialogModal from '@/components/front/DialogModal.vue';
import dialogMixin from '@/mixins/dialogMixin';

export default {
  data() {
    return {
      products: [],
      // 所有產品種類
      productsCategory: [],
      cartLink: '',
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
    this.getCategory();
    this.getProducts();
    emitter.emit('products-routeName', this.$route.name);
    // 監聽refresh-favorite事件，更新我的最愛追蹤
    emitter.on('refresh-favorite', () => {
      this.getLocalStorage();
    });
    this.getLocalStorage();
  },
  watch: {
    // 監聽this.$route的資料變化（$route.query.category）
    $route() {
      this.getProducts();
    },
  },
  methods: {
    // 取得分類商品資料-----沒代參數，category用空字串代入，取得所有產品
    getProducts(category = '') {
      this.isLoading = true;
      // 如果$route.query.category有資料，就用此資料來取得商品資料。否則用methods方法參數取得商品資料
      const isCategory = this.$route.query.category ? this.$route.query.category : category;
      this.axios
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/?category=${isCategory}`)
        .then((res) => {
          // 取得分類商品資料，存放products，準備渲染畫面
          this.products = res.data.products;
          this.isLoading = false;
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    // 取得商品分類
    getCategory() {
      this.axios
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products`)
        .then((res) => {
          // 取得商品資料，存放tempProducts
          const tempProducts = res.data.products;
          const tempCategory = [];
          tempProducts.forEach((item, index) => {
            tempCategory.push(item.category);
            if (tempCategory.indexOf(item.category) === index) {
              this.productsCategory.push(item.category);
            }
          });
          setTimeout(() => {
            this.correspondActive();
            this.$route.query.category = '';
          }, 50);
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    // 點擊產品分類active
    categoryActive(e) {
      console.log(e.target.innerText);
      // 連結的父層節點
      const { parentNode } = e.target;
      // 連結的父層元素內的所有子節點
      const { children } = parentNode;
      // 把所有子節點移除className，category-item-active
      for (let i = 0; i <= children.length - 1; i += 1) {
        children[i].classList.remove('category-item-active');
      }
      // 點選的連結加上className，category-item-active
      e.target.classList.add('category-item-active');
    },
    correspondActive() {
      const categoryDom = document.querySelectorAll('.category')[0].children;
      console.log(this.$route);
      console.log(this.$route.query.category);
      for (let i = 0; i < categoryDom.length; i += 1) {
        if (categoryDom[i].innerText === this.$route.query.category) {
          categoryDom[i].classList.add('category-item-active');
          // console.log(categoryDom[i].innerText);
        } else if (this.$route.query.category === undefined) {
          categoryDom[0].classList.add('category-item-active');
        }
      }
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
    // 增加商品到購物車
    addToCart(id) {
      const item = {
        product_id: id,
        qty: 1,
      };
      this.axios
        .post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`, { data: item })
        .then((res) => {
          console.dir(res);
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
  mixins: [dialogMixin, LoadingComponent],
  unmounted() {
    emitter.off('refresh-favorite');
  },
};
</script>
<style lang="scss">
.scale {
  .img{
    transition: all 0.3s ease-in-out;
  }
  &:hover {
    .img {
      transition: all 0.3s ease-in-out;
      transform:translateY(-30px);
    }
  };
};
.productItem{
  &:hover{
    .star-rating{
      transform:translateX(0px);
    };
    .card-body{
      transform:translateY(-30px);
    };
    .icon{
      transform:translateX(0px);
    }
  }
  .star-rating{
    transform:translateX(80px);
    transition: all 0.3s ease-in-out;
  };
  .card-body{
    transition: all 0.3s ease-in-out;
  };
  .icon{
    transform:translateX(-56px);
    transition: all 0.3s ease-in-out;
  }
};

.category-item {
  border-bottom: 2px solid transparent;
}

.category-item-active{
  // font-weight: bold;
  border-bottom: 2px solid #005792;
}
</style>
