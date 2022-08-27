<template lang="">
  <dialog class="dialog border-0 p-5" id="infoModal" ref="infoDom">
    <!-- 商品已加入購物車 -->
    <div v-if="dialogMode === 1" class="dialog__addCart text-center">
      <span class="material-symbols-outlined dialog__addCart__logo">add_shopping_cart</span>
      <p class="dialog__addCart__caption fs-4">已加入購物車</p>
    </div>
    <!-- 商品已加入追蹤 -->
    <div v-else-if="dialogMode === 2" class="dialog__favorite text-center">
      <span class="material-symbols-outlined dialog__favorite__logo">favorite</span>
      <p class="dialog__favorite__caption fs-4">已加入追蹤</p>
    </div>
    <div v-else-if="dialogMode === 3" class="dialog__unfavorite text-center">
      <span class="material-symbols-outlined dialog__unfavorite__logo">heart_broken</span>
      <p class="dialog__unfavorite__caption fs-4">已取消追蹤</p>
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
<style lang=""></style>
