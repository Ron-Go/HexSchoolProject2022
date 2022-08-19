<template lang="">
<div class="toast-container position-fixed top-0 end-0 pt-3 pe-3" style="z-index: 9999">
  <div v-for="(item, key) in msg" :key="'item' + key"
    class="toast show" :class="`toast${key}`" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header" :class="`bg-${item.style}`" style="opacity: 0.87;">
      <strong class="text-white me-auto">{{ item.title }}</strong>
      <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div v-if="item.content" class="toast-body">
      {{ item.content }}
    </div>
  </div>
</div>
</template>
<script>
import emitter from '@/utils/emitter';

export default {
  data() {
    return {
      msg: [
      ],
    };
  },
  mounted() {
    emitter.on('toastMessage', (msg) => {
      this.msg.push(msg);
      this.toastShow();
    });
  },
  methods: {
    toastShow() {
      setTimeout(() => {
        this.msg.shift();
      }, 6000);
    },
  },
};
</script>
<style lang="">
</style>
