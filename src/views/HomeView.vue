<template lang="">
  <navBar></navBar>
  <banner></banner>
  <about></about>
  <carousel></carousel>
  <pageFooter></pageFooter>
</template>

<script>
import navBar from '@/components/front/HeaderComponent.vue';
import pageFooter from '@/components/front/FooterComponent.vue';
import banner from '@/components/front/BannerComponent.vue';
import carousel from '@/components/front/CarouselComponent.vue';
import about from '@/components/front/AboutComponent.vue';
import emitter from '@/utils/emitter';

export default {
  data() {
    return {
    };
  },
  components: {
    navBar,
    pageFooter,
    banner,
    about,
    carousel,
  },
  mounted() {
    // 監聽scroll行為，觸發getScrollTop方法
    window.addEventListener('scroll', this.getScrollTop);
    emitter.emit('homeView-routeName', this.$route.name);
  },
  methods: {
    // 取得scrollTop值
    getScrollTop() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      // 發送emit事件，homeView-scrollTop
      emitter.emit('homeView-scrollTop', scrollTop);
    },
  },
};
</script>
<style lang="">
</style>
