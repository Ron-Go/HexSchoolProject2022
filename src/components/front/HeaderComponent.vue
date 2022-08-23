<template lang="html">
<header class="header fixed-top pt-3" >
  <div class="header__container container-auto d-flex justify-content-between align-items-center" :style="bgcStyle()">
    <nav class="nav" :style="bgcStyle()">
      <ul class="nav__list d-flex mb-0">
        <li class="nav__list__item">
          <router-link class="nav__list__item__link fs-6 fw--normal color--black--85"
          @click="collapseHide"
          to="/front/products">商品銷售</router-link>
        </li>
        <li class="nav__list__item">
          <a href="" class="nav__list__item__link fs-6 fw--normal color--black--85">揪團約騎</a>
        </li>
        <li class="nav__list__item">
          <a href="" class="nav__list__item__link fs-6 fw--normal color--black--85">預約服務</a>
        </li>
      </ul>
    </nav>
    <button type="button" class="hamburger btn__hamburger d-flex" @click="navToggle">
      <span class="material-symbols-outlined material-symbols-outlined--hamburger">menu</span>
    </button>
    <h1 class="header__title mb-0">
      <router-link class="logo" to="/">logo</router-link>
    </h1>
    <ul class="header__connect d-flex align-items-center mb-0">
      <li class="header__connect__item">
        <button type="button" class="header__connect__btn d-flex align-items-center btn btn-outline-black-50 rounded-pill">
          <span class="btn__icon material-symbols-outlined account fs-4" style="font-size:24px">account_circle</span>
          <span class="btn__caption fs-6 ms-2">未登入</span>
        </button>
      </li>
      <li class="header__connect__item">
        <a class="text-decoration-none" href="#" @click.prevent="showFavorite">
          <span class="d-block material-symbols-outlined favorite fs-4 color--black--85">favorite</span>
        </a>
      </li>
      <li class="header__connect__item">
        <a class="text-decoration-none" href="#" @click.prevent="showOffcanvas">
          <span class="d-block material-symbols-outlined cart fs-4 color--black--85">shopping_cart</span>
        </a>
      </li>
    </ul>
  </div>
</header>
<!-- 購物車 -->
<cart @send-cart-qty="getCartQty" @hide-cart="hideOffcanvas"></cart>
<!-- 我的最愛 -->
<favorite @send-favorite-qty="getFavoriteQty" @hide-favorite="hideFavorite"></favorite>
</template>
<script>
// 購物車
import cart from '@/components/front/OffcanvasCart.vue';
// 我的最愛
import favorite from '@/components/front/OffcanvasFavorite.vue';
// 購物車、我的最愛 mixin
import offcanvasMixin from '@/mixins/offcanvasMixin';
// navbar收折
// import { Collapse } from 'bootstrap/dist/js/bootstrap.bundle';
import emitter from '@/utils/emitter';

export default {
  data() {
    return {
      cartQty: 0,
      favoriteQty: 0,
      routeName: '',
      // scrollTop值
      scrollTop: 0,
      // navbar背景色透明度
      bgcOpacity: 0,
      // navbar文字顏色透明度
      fontColorOpacity: 1,
    };
  },
  components: {
    cart,
    favorite,
  },
  mounted() {
    // this.navBar = new Collapse(document.getElementById('navbarNavAltMarkup'), { toggle: false });
    // 監聽從HomeView傳來的scrollTop值
    emitter.on('homeView-scrollTop', (value) => {
      this.scrollTop = value;
    });
    emitter.on('close-favorite', () => {
      this.hideFavorite();
    });
  },
  unmounted() {
    // 解除以下emitter監聽
    emitter.off('homeView-scrollTop');
    emitter.off('close-favorite');
  },
  watch: {
    scrollTop() {
      // 隨著scrollTop值改變navbar背景顏色透明度
      const num = this.scrollTop / 200;
      this.bgcOpacity = num < 1 ? num : 1;
      // 隨著scrollTop值改變navbar文字顏色透明度
      this.fontColorOpacity = this.$route.name === 'products' ? 0 : 1 - this.bgcOpacity;
    },
    $route() {
      this.fontColorOpacity = this.$route.name === 'home' ? 1 : 0;
    },
  },
  methods: {
    // 取得購物車商品數量
    getCartQty(qty) {
      this.cartQty = qty;
    },
    // 取得favority資料長度
    getFavoriteQty(qty) {
      this.favoriteQty = qty;
    },

    navToggle() {
      document.querySelector('.nav').classList.toggle('active');
    },
    // navbar collaplse收折
    // collapseHide() {
    //   this.navBar.hide();
    // },

    // route路徑===home的時候，navbar的背景顏色透明度隨scrollTop值變化
    // route路徑!==home的時候，navbar的背景顏色透明度則是固定
    // :style="bgcStyle()"
    bgcStyle() {
      const [r, g, b] = [234, 234, 234];
      return this.$route.name === 'home' ? { backgroundColor: `rgba(${r},${g},${b},${this.bgcOpacity})` } : { backgroundColor: `rgba(${r},${g},${b},1)` };
    },
    fontColorstyle() {
      const [r, g, b] = [246, 246, 233];
      return this.$route.name === 'home' && this.fontColorOpacity >= 0.25
        ? { color: `rgba(${r},${g},${b},${this.fontColorOpacity})` } : { color: `rgba(0, 87, 146, ${1})` };
    },
  },
  mixins: [offcanvasMixin],
};
</script>
<style lang=""></style>
