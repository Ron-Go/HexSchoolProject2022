<template lang="">
  <div class="position-relative m-4">
    <div class="progress" style="height: 1px">
      <div class="progress-bar" role="progressbar" :style="{ 'width': progress.percent }" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    <div class="position-absolute top-0 start-0 translate-middle">
      <span class="position-absolute text-center text-secondary" style="top: -60%; width:3rem">結帳</span>
      <span
        class="d-block fs-4 text-center pt-2 text-white rounded-circle bi-cart3"
        :class="{
          'bg-primary': progress.step >= 1,
          'bg-secondary': progress.step < 1,
        }"
        style="width: 3rem; height: 3rem">
      </span>
    </div>
    <div class="position-absolute top-0 start-50 translate-middle">
      <span class="position-absolute text-center text-secondary" style="top: -60%; width:3rem">付款</span>
      <span
        class="d-block fs-4 text-center pt-2 text-white rounded-circle bi-credit-card"
        :class="{
          'bg-primary': progress.step >= 2,
          'bg-info': progress.step < 2,
          }"
        style="width: 3rem; height: 3rem">
          </span>
    </div>
    <div class="position-absolute top-0 start-100 translate-middle">
      <span class="position-absolute text-center text-secondary" style="top: -60%; width:3rem">完成</span>
      <span
        class="d-block fs-4 text-center pt-2 text-white rounded-circle bi-check-lg"
        :class="{
          'bg-primary': progress.step >= 3,
          'bg-info': progress.step < 3,
          }"
        style="width: 3rem; height: 3rem;">
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
