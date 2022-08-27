<template lang="">
<!-- v-for用.total_pages去渲染所有頁數 -->
<!-- 點擊頁數、前一頁、後一頁，透過emit觸發外層根元件『同一個』methods -->
<!-- 點擊頁數，把頁數作為參數用emit代入外層根元件methods，取得對應頁數的商品資料 -->
<!-- 點擊前一頁、後一頁，把當前頁數current_page加減後，作為參數用emit代入外層根元件methods -->
<section class="pagination">
  <div class="pagination__container container-auto text-center">
    <ul class="pagination__list d-flex justify-content-center">
      <li class="pagination__list__item d-flex" :class="{ disabled: !pagination.has_pre }">
        <a href="#" class="pagination__previous"
            @click.prevent="$emit('send-page', pagination.current_page - 1)">
          <span class="material-symbols-outlined d-block">keyboard_double_arrow_left</span>
        </a>
      </li>
      <li v-for="(page, key) in pagination.total_pages" :key="'page' + key"
          class="pagination__list__item">
        <a class="pagination__link"
        :class="{ active: page === pagination.current_page }" href="#" @click.prevent="$emit('send-page', page)">{{ page }}</a>
      </li>
      <li class="pagination__list__item d-flex" :class="{ disabled: !pagination.has_next }">
        <a href="#" class="pagination__next"
        @click.prevent="$emit('send-page', pagination.current_page + 1)">
        <span class="material-symbols-outlined d-block">keyboard_double_arrow_right</span>
        </a>
      </li>
    </ul>
  </div>
</section>
</template>
<script>
export default {
  props: ['pagination'],
  data() {
    return {
    };
  },
};
</script>
<style lang=""></style>
