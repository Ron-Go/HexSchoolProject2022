<template lang="">
  <section class="products">
    <div v-if="!products.length" class="position-relative" style="height: 100vh">
      <Loading
        :active="isLoading"
        :loader="loader"
        :is-full-page="fullPage"
        :color="color"
        :background-color="backgroundColor"
        :opacity="opacity"></Loading>
    </div>
    <div v-else class="products__category sticky-top">
      <div class="products__category__container container-auto">
        <ul class="products__category__list d-flex mx-auto">
          <li class="products__category__item">
            <a class="item__link" href="#" @click="categoryActive" @click.prevent="getProducts()">ALL</a>
          </li>
          <!-- item__link--active -->
          <li v-for="(item, key) in productsCategory" :key="'item' + key" class="products__category__item">
            <a class="item__link" href="#" @click="categoryActive"
              @click.prevent="getProducts(item)">{{ item }}</a>
          </li>
        </ul>
      </div>
    </div>
    <ul class="products__container container-auto">
      <li v-for="(item, key) in products" :key="'item' + key" class="product__item position-relative">
        <a class="product__item__click position-absolute" href="#" @click.prevent="getProduct(item.id)"></a>
        <!-- 加入favorite -->
        <a class="product__favorite" href="#" @click.prevent="addFavorite(item.id)">
          <span class="material-symbols-outlined d-block fs-4"
          :class="{
            'favorite': !getFavorite.includes(item.id),
            'favorite--fill': getFavorite.includes(item.id),
            }">favorite</span>
        </a>
        <div class="product__img"
        :style="{backgroundImage: `url(${item.imageUrl})`}"
        ></div>
        <div class="product__body">
          <div class="product__body__top">
            <div class="product__data">
              <p class="product__series mb-1">2019 Bicycle</p>
              <h3 class="product__title">{{ item.title}}</h3>
            </div>
          </div>
          <div class="product__body__center d-flex">
            <div class="product__rating">
              <!-- v-for渲染出星星（星星數最大為5） -->
              <!-- 每次v-for，item.rating>=迴圈star數，出現實心星星 -->
              <!-- 每次v-for，item.rating<迴圈star數，出現空心星星 -->
              <template v-for="(star , key) in 5" :key="'star' + key">
                    <span class="material-symbols-outlined fs-6 "
                    :class="{
                      'star': item.rating >= star,
                      'star--fill': star > item.rating,
                      }">star</span>
              </template>
            </div>
            <p class="product__price">{{ `NT $ ${currency(item.price)}` }}</p>
          </div>
          <div class="product__body__bottom justify-content-between">
            <div class="product__num">
              <button type="button" class="product__num__reduce"
              @click="item.qty -= 1" :disabled="item.qty === 1">
                <span class="material-symbols-outlined">remove</span>
              </button>
              <p class="product__num__value d-flex">
                <span class="fs-6 my-auto">{{ item.qty }}</span>
              </p>
              <button type="button" class="product__num__add"
              @click="item.qty += 1">
                <span class="material-symbols-outlined">add</span>
              </button>
            </div>
            <button type="button" class="product__addCart d-flex btn btn-primary border-0 text-white-100"
            @click.prevent="addToCart(item.id, item.qty)">
              加入購物車
              <span class="material-symbols-outlined">add_shopping_cart</span>
            </button>
          </div>
        </div>
      </li>
    </ul>
  </section>
    <!-- 分頁 -->
    <pagination :pagination="pagination" @send-page="selectPagination">
    </pagination>
  <!-- dialog視窗 -->
  <dialog-modal :dialogMode="dialogMode">
  </dialog-modal>
</template>

<script>
// vue-loading-overlay 作為元件引入
import LoadingComponent from '@/mixins/LoadingComponentMixin';
// 引入emitter
import emitter from '@/utils/emitter';
// 引入dialog-modal
import dialogModal from '@/components/front/DialogModal.vue';
// 引入pagination元件
import pagination from '@/components/PaginationComponent.vue';

import dialogMixin from '@/mixins/dialogMixin';
import currencyMixin from '@/mixins/currencyMixin';

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
      // 傳入元件的分頁資訊
      pagination: {},
      categoryRender: false,
    };
  },
  components: {
    dialogModal,
    pagination,
  },
  mounted() {
    this.getCategory();
    this.getProducts(this.$route.params.category);
    emitter.emit('products-routeName', this.$route.name);
    // 監聽refresh-favorite事件，更新我的最愛追蹤
    emitter.on('refresh-favorite', () => {
      this.getLocalStorage();
    });
    this.getLocalStorage();
  },
  watch: {
    $route: {
      handler() {
        console.log(this.$route);
      },
      deep: false,
    },
    // 監聽categoryRender，取得商品分類渲染完成後，active該產品分類
    categoryRender() {
      if (this.categoryRender === true) {
        // 帶入產品分類，初始值為'ALL'，若從產品內容點擊分類（Breadcrumb）則帶入this.$route.params.category
        this.activeCategory(this.$route.params.category || 'ALL');
      }
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
          this.addQtyNum();
          // 取得分頁
          this.pagination = res.data.pagination;
          this.isLoading = false;
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    // 選擇產品分頁
    selectPagination(page = 1) {
      this.products = [];
      this.$router.push('products');
      this.isLoading = true;
      // 用query的方式，代出商品資料
      // /?page=${ 頁數 }
      this.axios
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/?page=${page}`)
        .then((res) => {
          // 取得該分頁商品資料，products
          this.products = res.data.products;
          // 取得分頁資訊，存放pagination
          this.pagination = res.data.pagination;
          this.addQtyNum();
          this.isLoading = false;
        })
        .catch(() => {
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
            this.categoryRender = true;
          }, 50);
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    // 點擊產品分類active
    categoryActive(e) {
      // 連結的父層節點
      const { parentNode } = e.target;
      // 連結的父層元素再上一層內的所有子節點
      const { children } = parentNode.parentNode;
      // 把所有子節點移除className(category-item-active)
      for (let i = 0; i <= children.length - 1; i += 1) {
        children[i].childNodes[0].classList.remove('item__link--active');
      }
      // 點選的連結加上className，category-item-active
      e.target.classList.add('item__link--active');
    },
    // 所有產品資料，加上qty屬性
    addQtyNum() {
      this.products.forEach((item, index) => {
        this.products[index].qty = 1;
      });
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
    addToCart(productId, productQty) {
      const productItem = {
        product_id: productId,
        qty: productQty,
      };
      this.axios
        .post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`, { data: productItem })
        .then((res) => {
          console.dir(res);
          // 增加商品到購物車，成功後發送getCart行為（取得購物車內資料）
          emitter.emit('getCart', productItem);
          // 商品加入購物車後，顯示dialog視窗
          this.showDialog(1);
          // 加入購物車後，把該商品選擇數量設為1
          this.products.forEach((item, index) => {
            if (item.id === productId) {
              this.products[index].qty = 1;
            }
          });
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    getProduct(id) {
      this.$router.push(`product/${id}`);
    },
    activeCategory(category) {
      console.log(category);
      // this.$route.params.category !== undefined &&
      if (this.categoryRender === true) {
        const domList = document.querySelector('.products__category__list').children;
        console.log(domList);
        for (let i = 0; i <= domList.length - 1; i += 1) {
          domList[i].children[0].classList.remove('item__link--active');
          if (domList[i].children[0].innerText === category) {
            domList[i].children[0].classList.add('item__link--active');
          }
        }
        this.categoryRender = false;
      } else {
        this.categoryRender = false;
      }
    },
  },
  mixins: [currencyMixin, dialogMixin, LoadingComponent],
  unmounted() {
    emitter.off('refresh-favorite');
  },
};
</script>
<style lang=""></style>
