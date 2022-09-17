<template lang="">
<section class="about" style="overflow-x: hidden;">
  <div class="about__container container-auto">
    <h2 class="about__title text-center">服務項目</h2>
    <p class="about__caption text-center">以專業技術精神為你挑選<br class="d-none">品質、實用性與風格兼具的商品<br>服務與活動結合線上功能<br class="d-none">帶來更有效率的體驗、互動樂趣</p>
    <ul class="about__list">
      <li class="about__list__item row">
        <div class="col-12">
          <div class="list__item row g-0 d-flex align-items-stretch">
            <div class="list__item__img about-reveal-left col-lg-6 col-xl-7">
              <div style="background-image: url(https://i.ytimg.com/vi/5C9TFfYSM1Q/maxresdefault.jpg); background-position: center top; background-size: cover; background-repeat: no-repeat; height: 100%;"></div>
            </div>
            <div class="list__item__caption hover--slider--right col-lg-6 col-xl-5 d-flex flex-column align-items-center py-3">
              <span class="item__logo d-block material-symbols-outlined">directions_bike</span>
              <h3 class="item__title">整車販售、客製改裝</h3>
              <ul class="item__list text-start">
                <li class="item__list__feature">
                  依騎乘習慣方式，為你細心挑選的改裝品
                </li>
                <li class="item__list__feature">
                  爬坡型、空力型、三鐵車，我們通通有
                </li>
                <li class="item__list__feature">
                  挑選零件組車，我們也能滿足你的需求
                </li>
              </ul>
            </div>
          </div>
        </div>
      </li>
      <li class="about__list__item row">
        <div class="col-12">
          <div class="list__item row g-0 d-flex align-items-stretch">
            <div class="list__item__caption hover--slider--left col-lg-6 col-xl-5 d-flex flex-column align-items-center py-3">
              <span class="item__logo d-block material-symbols-outlined">construction</span>
              <h3 class="item__title">保養、維修、救援</h3>
              <ul class="item__list text-start">
                <li class="item__list__feature">
                  保養維修線上預約制，給你個人專屬時段
                </li>
                <li class="item__list__feature">
                  保養項目套餐化，服務細節不遺漏
                </li>
                <li class="item__list__feature">
                  遠途騎乘故障別擔心，一通電話即刻救援
                </li>
              </ul>
            </div>
            <div class="list__item__img about-reveal-right col-lg-6 col-xl-7">
              <div style="background-image: url(https://d2p6e6u75xmxt8.cloudfront.net/2/2017/10/profimedia-0216335670.jpg); background-position: center top; background-size: cover; background-repeat: no-repeat; height: 100%;"></div>
            </div>
          </div>
        </div>
      </li>
            <li class="about__list__item row">
        <div class="col-12">
          <div class="list__item row g-0 d-flex align-items-stretch">
            <div class="list__item__img about-reveal-left col-lg-6 col-xl-7">
              <div style="background-image: url(http://retaildesignblog.net/wp-content/uploads/2012/09/Rapha-Cycle-Club-by-Brinkworth-London.jpg); background-position: center top; background-size: cover; background-repeat: no-repeat; height: 100%;"></div>
            </div>
            <div class="list__item__caption hover--slider--right col-lg-6 col-xl-5 d-flex flex-column align-items-center py-3">
              <span class="item__logo d-block material-symbols-outlined">shopping_bag</span>
              <h3 class="item__title">部品販售</h3>
              <ul class="item__list text-start">
                <li class="item__list__feature">
                  我們要傳達的理念，打造全方位騎乘體驗
                </li>
                <li class="item__list__feature">
                  質感設計風格選物，讓你不易和別人撞衫
                </li>
                <li class="item__list__feature">
                  不以品牌為主，純粹以風格、實用性優先
                </li>
              </ul>
            </div>
          </div>
        </div>
      </li>
      <li class="about__list__item row">
        <div class="col-12">
          <div class="list__item row g-0 d-flex align-items-stretch">
            <div class="list__item__caption hover--slider--left col-lg-6 col-xl-5 d-flex flex-column align-items-center py-3">
              <span class="item__logo d-block material-symbols-outlined">group_add</span>
              <h3 class="item__title">揪團約騎、賽事活動</h3>
              <ul class="item__list text-start">
                <li class="item__list__feature">
                  線上揪團約騎，不怕不來，只怕不揪團
                </li>
                <li class="item__list__feature">
                  大型賽事團體報名、團體備賽練騎
                </li>
                <li class="item__list__feature">
                  業餘車隊一同團練，想測測你的實力？
                </li>
              </ul>
            </div>
            <div class="list__item__img about-reveal-right col-lg-6 col-xl-7">
              <div style="background-image: url(https://images.askmen.com/1080x540/2016/04/15-032458-spring_styling_tips_from_professional_cyclists.jpeg); background-position: center top; background-size: cover; background-repeat: no-repeat; height: 100%;"></div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</section>
</template>
<script>
import scrollReveal from 'scrollreveal';

export default {
  data() {
    return {
      scrollReveal: scrollReveal(),
    };
  },
  mounted() {
    this.scrollReveal.reveal('.about-reveal-left', {
      delay: 150,
      reset: false,
      distance: '80px',
      duration: 2000,
      origin: 'left',
      interval: 1500,
    });
    this.scrollReveal.reveal('.about-reveal-right', {
      delay: 150,
      reset: false,
      distance: '80px',
      duration: 2000,
      origin: 'right',
      interval: 1500,
    });
  },
  unmounted() {
    this.scrollReveal.clean('.about-reveal-left');
    this.scrollReveal.clean('.about-reveal-right');
  },
};
</script>
<style lang=""></style>
