<template lang="html">
  <section class="banner">
    <div class="banner__container">
      <!-- :style="{'background-position-y': `${scrollTop}px`}" -->
      <div class="banner__container__bg d-flex justify-content-center align-items-end">
        <p class="bg__text text-center fw--bold mb-0">CYCLING</p>
      </div>
      <div class="banner__container__main d-flex justify-content-center align-items-end"></div>
    </div>
    <div class="banner__handline bg--secondary--100">
      <div class="banner__handline__container container-auto d-flex">
        <div class="banner__handline__body">
          <h2 class="banner__handline__title fw-bold mb-2">keep Cycling</h2>
          <p class="banner__handline__caption fs-6 fw-normal mb-0">無論是保持健康或是挑戰自我<br>都能在無數的騎程過程中共創美好回憶</p>
        </div>
        <button class="banner__handline__btn d-flex align-items-center btn-sm btn-primary">
          <span class="btn__text">More</span>
          <span class="btn__icon material-symbols-outlined ms-2">arrow_right_alt</span>
        </button>
      </div>
    </div>
  </section>
</template>
<script>
import emitter from '@/utils/emitter';
import scrollReveal from 'scrollreveal';

export default {
  data() {
    return {
      scrollTop: 0,
      scrollReveal: scrollReveal(),
    };
  },
  mounted() {
    emitter.on('homeView-scrollTop', (value) => {
      this.scrollTop = -(value / 4);
    });
    this.scrollReveal.reveal('.banner-reveal', {
      delay: 300,
      reset: false,
      distance: '100px',
      duration: 1500,
      origin: 'right',
      interval: 500,
    });
  },
  unmounted() {
    this.scrollReveal.clean('.banner-reveal');
  },
};
</script>
<style lang=""></style>
