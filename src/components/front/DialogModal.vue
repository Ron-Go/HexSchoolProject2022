<template lang="">
  <dialog class="border-0 p-5" id="infoModal" ref="infoDom">
    <!-- 商品已加入購物車 -->
    <div v-if="dialogMode === 1" class="text-center">
      <span class="d-block border border-3 border-primary rounded-circle pt-1 mx-auto mb-3" style="width: 54px; height: 54px;">
        <i class="bi-cart-plus fs-3 text-primary"></i>
      </span>
      <p class="text-white fs-5 m-0">商品已加入購物車</p>
    </div>
    <!-- 商品已加入追蹤 -->
    <div v-else-if="dialogMode === 2" class="text-center">
      <span class="d-block border border-3 border-primary rounded-circle pt-1 mx-auto mb-2" style="width: 54px; height: 54px;">
        <i class="bi-heart-fill fs-3 text-primary"></i>
      </span>
      <p class="text-white fs-5 m-0">商品已加入追蹤</p>
    </div>
    <div v-else-if="dialogMode === 3" class="text-center">
      <span class="d-block border border-3 border-primary rounded-circle pt-1 mx-auto mb-2" style="width: 54px; height: 54px;">
        <i class="bi-heartbreak-fill fs-3 text-primary"></i>
      </span>
      <p class="text-white fs-5 m-0">商品已取消追蹤</p>
    </div>
  </dialog>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  props: ['dialogMode', 'isTracking'],
  mounted() {
  },
  methods: {
  },
};
</script>
<style lang="css">
dialog{
  background-color: rgb(0, 0, 0, .8);
}
dialog::backdrop {
  background-color: rgba(255, 255, 255, 0);
}
</style>
