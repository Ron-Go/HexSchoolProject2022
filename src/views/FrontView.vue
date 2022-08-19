<template lang="">
  <navBar></navBar>
  <router-view></router-view>
  <pageFooter></pageFooter>
</template>

<script>
import navBar from '@/components/front/HeaderComponent.vue';
import pageFooter from '@/components/front/FooterComponent.vue';

export default {
  data() {
    return {
      cart: {},
    };
  },
  components: {
    navBar,
    pageFooter,
  },
  mounted() {
    console.log('front');
  },
  methods: {
  },
};
</script>
<style lang=""></style>
