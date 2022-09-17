<template lang="">
  <div class="position-relative m-4">
    <div class="progress" style="height: 1px">
      <div class="progress-bar" role="progressbar" :style="{ 'width': progress.percent }" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    <span class="material-symbols-outlined">

</span>

    <div class="position-absolute top-0 start-0 translate-middle">
      <span class="position-absolute fs-5 text-center text--primary" style="top: -60%; width:3rem">結帳</span>
      <span
        class="d-block fs-3 text-center pt-2 rounded-circle material-symbols-outlined"
        :class="{
          'bg--primary': progress.step >= 1,
          'bg--bggray': progress.step < 1,
          'text--light': progress.step >= 1,
          'text--scondary': progress.step < 1,
        }"
        style="width: 3rem; height: 3rem">shopping_cart
      </span>
    </div>
    <div class="position-absolute top-0 start-50 translate-middle">
      <span class="position-absolute fs-5 text-center text--primary" style="top: -60%; width:3rem">付款</span>
      <span
        class="d-block fs-3 text-center pt-2 rounded-circle material-symbols-outlined"
        :class="{
          'bg--primary': progress.step >= 2,
          'bg--bggray': progress.step < 2,
          'text--light': progress.step >= 2,
          'text--scondary': progress.step < 2,
          }"
        style="width: 3rem; height: 3rem">credit_card
          </span>
    </div>
    <div class="position-absolute top-0 start-100 translate-middle">
      <span class="position-absolute fs-5 text-center text--secondary" style="top: -60%; width:3rem">完成</span>
      <span
        class="d-block fs-3 text-center pt-2 rounded-circle material-symbols-outlined"
        :class="{
          'bg--primary': progress.step >= 3,
          'bg--bggray': progress.step < 3,
          'text--light': progress.step >= 3,
          'text--scondary': progress.step < 3,
          }"
        style="width: 3rem; height: 3rem;">task_alt
        </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['progress'],
  mounted() {
    console.log(this.progress.step[0] === 'order');
  },
};
</script>
<style lang=""></style>
