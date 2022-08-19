<template lang="">
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">後台管理系統</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
        aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/admin/manage">商品</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/admin/order">訂單</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/admin/coupon">優惠券</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/admin/logout">登出</router-link>
            </li>
            <li v-for="(item, key) in linkList" :key="'item' + key" class="nav-item">
              <router-link class="nav-link"
              :class="{
                'fw-bold': $route.name === item,
              }"
              :to="`/admin/${item}`">{{ item }}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
  <router-view></router-view>
  <!-- toastMessage -->
  <toastMessage></toastMessage>
</template>

<script>
import toastMessage from '@/components/ToastsMessage.vue';

export default {
  data() {
    return {
      linkList: ['product', 'order', 'coupon', 'logout'],
      linkName: '',
      activeId: 'product',
    };
  },
  created() {
    this.adminCheck();
  },
  components: {
    toastMessage,
  },
  watch: {
    // $route() {
    //   console.log(this.$route.name);
    // },
  },
  methods: {
    // 確認登入狀態
    adminCheck() {
      // 取得存在cookie的token資訊
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      // 把token加入axios的headers授權資料
      this.axios.defaults.headers.common.Authorization = token;
      this.axios.post(`${process.env.VUE_APP_API}/api/user/check`, token)
        .then(() => {
          // 檢查登入狀態，成功的話取得商品資料
        })
        .catch((err) => {
          console.dir(err);
          this.$httpToastMessage(err.response, '登入');
        });
    },
  },
};
</script>

<style lang="scss">
</style>
